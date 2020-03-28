<template>
    <div>
        <div class="d-flex flex-row">
        <div class="list-group">
            <button type="button" class="list-group-item list-group-item-action" v-for="serie in currentSeries" :key="serie.id" v-on:click="confSerie(serie)">{{serie.serie.id}}#  {{serie.serie.ville}}</button>
        </div>
        <l-map class="col-6" style="height: 40rem" :zoom="zoom" :center="center" @update:zoom="updateZoom"  @update:center="updateC" :markerZoomAnimation="true" attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>'>
            <l-tile-layer :url="url"></l-tile-layer>
            <l-marker :lat-lng="positionCentre" :draggable="true" @update:lat-lng="updateC" :icon="icon"></l-marker>
            <l-marker v-for="photo in photos" :key="photo.id" :lat-lng="[photo.positionX, photo.positionY]"></l-marker>
        </l-map>
        <div class="card bg-light">
        <div class="card-header">Configurer votre Série : <br>
            {{ville}}
        </div>
        <div class="card-body">
            <h5 class="card-title">Configuration : </h5>
            <div class="input-group">
                <label class="input-group-text">Zoom  </label><input type="number" max="15" min="0" v-model.number="zoom"/>
            </div>
            <div class="input-group">
                <label class="input-group-text">Centre  </label><input type="number"  v-model.number="coordXCentre"/><input type="number" v-model.number="coordYCentre"/><button class="btn btn-primary" v-on:click="updateCentre()">valider</button>
            </div>
            <div class="input-group">
                <label class="input-group-text">Distance  </label><input type="number"  v-model.number="distance"/>
            </div>
            <button class="btn btn-primary" v-on:click="save">Enregistrer les modifications</button>
        </div>
        </div>
        </div>
        

    </div>

</template>
<script>


import axios from 'axios'
import {LMap, LTileLayer, LMarker} from 'vue2-leaflet';

import {Icon, icon} from 'leaflet';


delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export default {
  name: 'Configurer',
  components: {
      LMap,
      LTileLayer,
      LMarker,
  },
  
  data() {
      return {
          currentSeries: "",
          url: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png',
          zoom: 13,
          center: [0, 0],
          coordXCentre: 0,
          coordYCentre: 0,
          positionCentre: { lat: 0, lng: 0},
          ville: "",
          photos: "",
          icon: icon({
              iconUrl: "http://pngimg.com/uploads/gps/gps_PNG74.png",
              iconSize: [32,37],
              iconAnchor: [16,37]
          }),
          distance:0,
          id: ""
      }
    },

    mounted() {
        
    },

    computed: {
    },
    methods: {
        confSerie(serie) {
            console.log(serie)
            this.zoom = serie.serie.map_refs.zoom
            this.coordXCentre = serie.serie.map_refs.positionX
            this.coordYCentre = serie.serie.map_refs.positionY
            this.center= {lat: this.coordXCentre, lng: this.coordYCentre}
            this.positionCentre.lat = this.coordXCentre
            this.positionCentre.lng = this.coordYCentre
            this.ville = "#"+serie.serie.id+"-"+serie.serie.ville
            this.photos = this.getPhotofromSerie(serie.links.photos.href)
            this.distance = serie.serie.dist
            this.id = serie.serie.id
        },

        getPhotofromSerie(url) {
            console.log(url)
            axios.get(url).then(res => {
                this.photos = res.data.photos
            })
        },

        updateCentre() {
            this.positionCentre.lat = this.coordXCentre
            this.positionCentre.lng = this.coordYCentre
            this.center= {lat: this.coordXCentre, lng: this.coordYCentre}
        },

        updateZoom(z) {
            this.zoom = z
        }, 

        updateC(centre) {
            this.center = centre
            this.coordXCentre = centre.lat
            this.coordYCentre = centre.lng
            this.positionCentre.lat = this.coordXCentre
            this.positionCentre.lng = this.coordYCentre
            
        },

        updateMarker(c) {
            console.log(c)
        },
        save() {
            axios.put("http://geogatotor.pagekite.me/serie/"+this.id,{
    "ville": this.ville,
    "map_refs": {"positionX":this.positionCentre.lat,"positionY":this.positionCentre.lng,"zoom":this.zoom},
    "dist": this.distance
})
            .then(res => console.log(res.data))
            .catch(err => alert(console.log(err)))
        }
        
    },

    created() {
        axios.get("http://geogatotor.pagekite.me/serie").then(res => {
                this.currentSeries = res.data.series
                console.log(res.data.series)
            }).catch(err => {
              alert('une err survenu : '+err)
            })
    },
}
</script>
<style>
    .game {
      margin-top: 1%;
      margin-left: 1%;
    }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->

