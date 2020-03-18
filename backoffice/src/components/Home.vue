<template>
  <div class="app">
    <h1>Geogussr Backoffice</h1>
    <Button type="button" class="btn btn-primary" v-on:click="show">Ajouter des photos</Button>
    <Button type="button" class="btn btn-primary">Créer une série</Button>

    <modal name="hello-world">
      <button id="x" v-on:click="hide">X</button>

      <div>
        <input type="file" v-on:change="onFileChanged" />
        <button v-on:click="onUpload">Upload!</button>
      </div>
    </modal>
  </div>
</template>

<script>
let config = {
  headers: {
    "Content-type": "application/octet-stream"
  },
  description: "Uploading"
};
import axios from "axios";
export default {
  name: "Geogussr Backoffice",
  components: {},
  props: {
    msg: String
  },
  data() {
    return { selectedFile: null, images: [] };
  },

  methods: {
    show() {
      this.$modal.show("hello-world");
    },
    hide() {
      this.$modal.hide("hello-world");
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

.rokka-uploader .button,
.rokka-uploader .rokka-fileupload {
  padding: 5px;
  background-color: transparent;
  border: 1px solid;
  display: inline-block;
  vertical-align: middle;
  font-size: 16px;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}

.rokka-uploader .drop-active h3 {
  margin: -0.5em 0 0;
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  font-size: 40px;
  color: #fff;
  padding: 0;
}

.rokka-uploader .removeButton {
  background-color: transparent;
  border: 0;
  font-weight: 100;
  color: black;
  cursor: pointer;
}
</style>
