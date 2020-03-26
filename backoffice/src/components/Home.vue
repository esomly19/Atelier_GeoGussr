<template>
  <div class="app">
    <h1>Geogussr Backoffice</h1>
    <Button type="button" class="btn btn-primary" v-on:click="show"
      >Ajouter des photos</Button
    >
    <Button type="button" class="btn btn-primary">Créer une série</Button>

    <modal :width="1200" :height="500" name="ok">
      <button id="x" v-on:click="hide">X</button>

      <div class="row">
        <div class="col-md-8">
          <l-map
            style="height:900px"
            :zoom="zoom"
            :center="center"
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>'
          >
            <l-tile-layer :url="url"></l-tile-layer>
            <l-marker
              :lat-lng.sync="marker.position"
              :draggable="marker.draggable"
              v-on:click="setPosition()"
            ></l-marker>
          </l-map>
        </div>
        <div class="col-md-4">
          <br />
          <br />
          <button v-on:click="submitLoc()" class="btn btn-primary">
            Valider localisation
          </button>
          <input type="file" v-on:change="onFileChanged" />
          <button v-on:click="onUpload">Upload!</button>

          <Label>{{ msg }}</Label>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import { Icon } from "leaflet";

delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});
let config = {
  headers: {
    "Content-type": "application/octet-stream"
  },
  description: "Uploading"
};
import axios from "axios";
export default {
  name: "Geogussr Backoffice",
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  props: {
    msg: String
  },
  data() {
    return {
      selectedFile: null,
      images: [],
      map: null,
      tileLayer: null,
      layers: [],
      url:
        "https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png",
      zoom: 13,
      center: [48.6833, 6.2],
      marker: {
        id: "m1",
        position: { lat: 48.6833, lng: 6.2 },
        tooltip: "tooltip for marker1",
        draggable: true,
        visible: true
      }
    };
  },

  methods: {
    setPosition() {
      console.log(this.marker.position);
    },
    submitLoc() {
      let lat1 = this.marker.position.lat;
      let lng1 = this.marker.position.lng;
      this.msg = "Latitude : " + lat1 + " Longitude :" + lng1;
    },
    show() {
      this.$modal.show("ok");
    },
    hide() {
      this.$modal.hide("ok");
    },
    onFileChanged(event) {
      this.selectedFile = event.target.files[0];
    },
    onUpload() {
      axios
        .post(
          "https://api.imgbb.com/1/upload?key=5b8d8ddf5f51b132601bd919362ebdbb",
          {
            name: "image",
            filename: "img/jpeg",
            mimeType: "img/jpeg",
            localisation: "Nancy"
          },
          config
        )
        .then(res => {
          console.log(res);
          alert("ok");
        })
        .catch(error => {
          console.log(error);
        })
        .finally(alert("ok"));
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

#x {
  position: absolute;
  background: red;
  color: white;
  top: 0px;
  right: 0px;
}
.container {
  width: 800px;
}
</style>
