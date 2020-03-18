<template>
    <div>
        <l-map style="height: 50rem" :zoom="zoom" :center="center" attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>'>
            <l-tile-layer :url="url"></l-tile-layer>
            <l-marker :lat-lng.sync="marker.position" :draggable="marker.draggable" v-on:click="setPosition()"></l-marker>
            <l-circle :lat-lng="PlaceToFind" :radius="distM" v-if="dist !== 0"></l-circle>
        </l-map>
        
        <button v-on:click="submitLoc()" class="btn btn-primary">Valider</button>
    </div>  
</template>

<script>
import {LMap, LTileLayer, LMarker, LCircle} from 'vue2-leaflet';

import { Icon } from 'leaflet';

delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export default {
  name: 'Maps',
  components: {
      LMap,
      LTileLayer,
      LMarker,
      LCircle
  },
  data() {
      return {
          map: null,
          tileLayer: null,
          layers: [],
          url: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png',
          zoom: 13,
          center: [48.6833, 6.2],
          marker: {
              id: 'm1',
              position: { lat: 48.6833, lng: 6.2 },
              tooltip: 'tooltip for marker1',
              draggable: true,
              visible: true,
          },
          PlaceToFind: { lat: 48.6833, lng: 6.2},
          dist: 0,
          distM: 0
          
          
      }
    },

    methods: {
       setPosition() {
           console.log(this.marker.position)
       },

       submitLoc() {
           let lat1 = this.marker.position.lat
           let lng1 = this.marker.position.lng
           let lat2 = this.PlaceToFind.lat
           let lng2 = this.PlaceToFind.lng  
           let rLat1 = Math.PI * lat1/180
           let rLat2 = Math.PI * lat2/180
           let theta = lng1 - lng2
           let rtheta = Math.PI * theta/180
           this.dist = Math.sin(rLat1) * Math.sin(rLat2) + Math.cos(rLat1) * Math.cos(rLat2) * Math.cos(rtheta)
           if(this.dist > 1) {
               this.dist = 1
           }     
           this.dist = Math.acos(this.dist)
           this.dist = this.dist * 180/Math.PI
           this.dist = this.dist * 60 * 1.1515
           this.dist = this.dist * 1.609344
           this.distM = this.dist*1000
           this.$modal.show("Stats", {distance: this.dist})

       }
    },
}
</script>
<style>
    l-map { height: 50rem; }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->

