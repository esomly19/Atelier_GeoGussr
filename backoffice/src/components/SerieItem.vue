<template>

     <div class="box one">
          <div class="poster p1">
      
            <h4>{{soro.serie.ville}}</h4> <button class="btn btn-primary"> Modifier</button>
              <l-map  style="height: 420px;  width:100%" :zoom="zoom" :center="center" :markerZoomAnimation="true" attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>'>
            <l-tile-layer :url="url"></l-tile-layer>
            <l-marker :lat-lng="positionCentre" :draggable="false" :icon="icon"></l-marker>
            
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
export default {
  props: ["soro"],
 components: {
      LMap,
      LTileLayer,
      LMarker,
  },
  

  data: function() {
    return { 
zoom: this.soro.serie.map_refs.zoom,
 url: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png',
 positionCentre: { lat: this.soro.serie.map_refs.positionX, lng: this.soro.serie.map_refs.positionY},
 icon: icon({
              iconUrl: "http://pngimg.com/uploads/gps/gps_PNG74.png",
              iconSize: [32,37],
              iconAnchor: [16,37]
          }),
   center: [this.soro.serie.map_refs.positionX, this.soro.serie.map_refs.positionY],

};
  },
  computed: {}
};
</script>
<style lang="scss" scoped></style>
