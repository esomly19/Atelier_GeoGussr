<template>

     <div class="box one">
          <div class="poster p1">
      
          <h4>{{soro.ville}}</h4> <button v-on:click="modfier()" class="btn btn-info">modfier</button>

              <l-map  style="height: 400px;  width:100%" :zoom="zoom" :center="center" :markerZoomAnimation="true" attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>'>
            <l-tile-layer :url="url"></l-tile-layer>
            <l-marker :lat-lng="positionCentre" :draggable="false" :icon="icon"></l-marker>
               <l-marker v-for="photo in photos" :key="photo.id" :lat-lng="[photo.positionX, photo.positionY]"></l-marker>
        </l-map>
     
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
  props: ["soro"],
 components: {
      LMap,
      LTileLayer,
      LMarker,
  },
  

  data: function() {
    return { 
zoom: this.soro.map_refs.zoom,
 url: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png',
 positionCentre: { lat: this.soro.map_refs.positionX, lng: this.soro.map_refs.positionY},
 icon: icon({
              iconUrl: "http://pngimg.com/uploads/gps/gps_PNG74.png",
              iconSize: [32,37],
              iconAnchor: [16,37]
          }),
   center: [this.soro.map_refs.positionX, this.soro.map_refs.positionY],
    photos: "",

};
  },methods:{

 getPhotofromSerie(url) {
            console.log(url)
            axios.get(url).then(res => {
                this.photos = res.data.photos
            })
        },modfier(){

this.$router.push({ name: 'detail', params: { id: this.soro.id } });
}
},
  computed: {},created() {
    
  
      this.photos = this.getPhotofromSerie(this.soro.links.photos.href)
  },
};
</script>
<style lang="scss" scoped></style>
