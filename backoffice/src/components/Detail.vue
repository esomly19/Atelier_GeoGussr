<template>
  <div class="app">
    <h1>Serie {{city}}</h1>
   <div class="row">

      <l-map  class="col-8" style="height: 700px;" :zoom="zoom" :center="center" :markerZoomAnimation="true" attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>'>
            <l-tile-layer :url="url"></l-tile-layer>
            <l-marker :lat-lng="positionCentre" :draggable="false" :icon="icon"></l-marker>
              <l-marker v-for="photo in photos" :key="photo.id" :lat-lng="[photo.positionX, photo.positionY]"></l-marker>
        </l-map>
 <div  class="col-4">
            <h5 class="card-title">Configuration : </h5>
            <div class="input-group">
                <label class="input-group-text">ville  </label><input type="text"  v-model="city"/>
            </div>
            <div class="input-group">
                <label class="input-group-text">Zoom  </label><input type="number" max="15" min="0" v-model.number="zoom"/>
            </div>
            <div class="input-group">
                <label class="input-group-text">Centre  </label><input type="number"  v-model.number="positionCentre.lat"/><input type="number" v-model.number="positionCentre.lng"/><button class="btn btn-primary" v-on:click="updateCentre()">valider</button>
            </div>
            <div class="input-group">
                <label class="input-group-text">Distance  </label><input type="number"  v-model.number="distance"/>
            </div>
         <br/>
    <div class="container">
     <div class="card-columns">
        <div v-for="ph in photos" :key="ph.id">
        <div class="card ">  <img :src="ph.url"  class="card-img-top"   width="20" height="100"/>
            </div>
   </div>
  <div class="card ">  <b-button id="show-btn" @click="showModal">Ajouter images</b-button>
 
   <b-modal   ref="my-modal" id="modal-xl"  size="lg" centered title="Ajout Photo">
  {{city}}
   <div class="row">
      <div class="col-6">
  <h3>Image dans la bdd </h3>
  <div v-for=" ph in photosdd" v-bind:key="ph.id">
  <div class="card ">  <img :src="ph.url"  class="card-img-top"   width="60px" height="250px"/>  <p>{{ph.desc}} <button  v-on:click="ajout(ph)" class="btn btn-primary" >Ajouter à la série >> </button></p> </div>
  </div>
  <Button  v-on:click="previousPage()">previous</Button>
  <Button v-on:click="nextPage()">next</Button>
      </div>
  <div class="col-6">
  <h3>Image à ajouter à la série </h3>
 <div v-for=" ph in phoajouter" v-bind:key="ph.id">
  <div class="card ">  <img :src="ph.url"  class="card-img-top"   width="60px" height="250px"/>  <p> {{ph.desc}} <button  v-on:click="retirer(ph)" class="btn btn-primary" >Retirer</button></p> </div>
  </div>
      </div>
     </div>
      <b-button class="mt-3" variant="outline-primary" block @click="ajouterserie()">Ajouter à la série </b-button>
    </b-modal>

</div>
   </div>
   </div>
               <br/>
            <button class="btn btn-primary" v-on:click="save">Enregistrer les modifications</button>
           
        </div>
</div>
     
  </div>
</template>

<script>
import {LMap, LTileLayer, LMarker} from 'vue2-leaflet';
import {Icon, icon} from 'leaflet';


delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});
import axios from "axios";
export default {
 components: {
      LMap,
      LTileLayer,
      LMarker, 
  },
data() {
    return {
city :"",
currentSerie:"",
urlimage:"/src/assets/plus.png",
distance:0,
zoom: 10,
 url: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png',
 positionCentre: { lat: 48.689 ,lng: 6.1738},
 icon: icon({
              iconUrl: "http://pngimg.com/uploads/gps/gps_PNG74.png",
              iconSize: [32,37],
              iconAnchor: [16,37]
          }),
    center: [0, 0],
    photos: "",
    photosdd:"",
   numberofpages:0,
    phoajouter:[],
phoajouterid:[],
  page:1,
    };
},
  methods: {
ajouterserie(){
axios.post(
          "http://geogatotor.pagekite.me/serie/ajouterphoto/"+this.$route.params.id, {
	"idPhotos":this.phoajouterid
} )
        .then(res => {
          console.log(res);
    
        })
        .catch(error => {
          console.log(error);
        })
        .finally( this.$refs['my-modal'].hide());
},
nextPage(){
if((this.page+1) >this.numberofpages){
this.page=this.numberofpages;}else{
  this.page++;}
  this.searchPhtos();
},
  previousPage(){
  if((this.page-1) <1){
  this.page=1;}else{this.page--;}
   this.searchPhtos();
},
 showModal() {
        this.$refs['my-modal'].show()
      },
      hideModal() {
        this.$refs['my-modal'].hide()
      },
 searchPhtos(){
     axios
        .get(
          "http://geogatotor.pagekite.me/photo?page="+this.page+"&size=3"
        )
        .then(res => {
          console.log(res.data.photos);
          this.count=res.data.count;
              this.numberofpages =res.data.nbpage;

          this.photosdd=res.data.photos;
        })
        .catch(error => {
          console.log(error);
        })
        .finally();},
ajout(photo){
this.phoajouter.push(photo);
this.phoajouterid.push(photo.id);
},
retirer(photo){
const index =  this.phoajouter.indexOf(photo);
const indexff =  this.phoajouterid.indexOf(photo.id);
this.phoajouterid.splice(indexff,1);
 this.phoajouter.splice(index, 1);


},
  save() {
 axios.put("http://geogatotor.pagekite.me/serie/"+this.$route.params.id,{
    "ville": this.city,
    "map_refs": {"positionX":this.positionCentre.lat,"positionY":this.positionCentre.lng,"zoom":this.zoom},
    "dist": this.distance
})
            .then(res => console.log(res.data))
            .catch(err => alert(console.log(err)))

},
 getPhotofromSerie(url) {
     
            axios.get(url).then(res => {
                this.photos = res.data.photos
            })}
  },
  created() {
 axios.get("http://geogatotor.pagekite.me/serie/"+this.$route.params.id).then(res => {
                this.currentSerie = res.data;
                this.positionCentre= { lat:  this.currentSerie.map_refs.positionX, lng: this.currentSerie.map_refs.positionY};
                this.center= [this.currentSerie.map_refs.positionX, this.currentSerie.map_refs.positionY];
                this.zoom= this.currentSerie.map_refs.zoom;
                this.distance=this.currentSerie.dist;
                this.city=this.currentSerie.ville;
                this.photos = this.getPhotofromSerie(this.currentSerie.photos.href);
                this.searchPhtos();
            }).catch(err => {
              alert('une err survenu : '+err)
            })


}
    


};
</script>

<style scoped>
.modal-backdrop {
    /* bug fix - no overlay */    
    display: none;    
}
</style>
