<template>
    <div class="card-body">
        <l-map style="height: 40rem" :zoom="zoom" :center="center"  :minZoom="zoom" :markerZoomAnimation="true" attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>'>
            
            <l-tile-layer :url="url"></l-tile-layer>
            <l-marker :lat-lng.sync="marker.position" :draggable="marker.draggable" :icon="icon"></l-marker>
            <l-marker :lat-lng="PlaceToFind" :draggable="false" :visible="end"></l-marker>
            
        </l-map>
        
        <button v-on:click="submitLoc()" class="btn btn-primary myb">Valider</button>
    </div>  
</template>

<script>
import {LMap, LTileLayer, LMarker} from 'vue2-leaflet';

import { Icon, icon } from 'leaflet';


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
      

      
  },
  props: ['x','y','refs'],
  data() {
      return {
          url: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png',
          zoom: 13,
          center: [this.x, this.y],
          marker: {
              id: 'm1',
              position: { lat: this.x, lng: this.y},
              tooltip: 'tooltip for marker1',
              draggable: true,
              visible: true,
          },
          PlaceToFind: { lat: this.x, lng: this.y},
          dist: 0,
          distM: 0,
          end: false,
          launch: setTimeout(this.initialisation, 600),
          icon: icon({
              iconUrl: "https://image.flaticon.com/icons/svg/60/60834.svg",
              iconSize: [32,37],
              iconAnchor: [16, 37]
          })
          
          
          
          
      }
    },

    methods: {
       setPosition() {
            this.PlaceToFind.lat = this.x
            this.PlaceToFind.lng = this.y
            this.end = true
       },
        
       

       submitLoc() {
           this.setPosition()
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
           this.end = true
           
           this.$emit('submitResult', this.dist)
       },

       initialisation() {
           this.center = [this.refs.positionX, this.refs.positionY]
           this.zoom = this.refs.zoom
           this.marker.position.lat = this.refs.positionX
           this.marker.position.lng = this.refs.positionY
       }
    },
    
}
</script>
<style>
    l-map { height: 50rem; }
    .myb {
        margin-left: 22%;
        margin-right: auto;
        width: 45rem;
        height:3em;
        margin-top: 1%;
    }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->

