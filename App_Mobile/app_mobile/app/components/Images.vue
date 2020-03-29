<template>
  <Page>
   	<WrapLayout v-show="montre">
			<Image  :src="img.src" width="75" height="75" />
            <TextField v-model="name" hint="Description" />   
            <Button text="Upload" @tap="upload(img)" />
  </WrapLayout>
  </Page>
</template>
<script>
import axios from "axios";
const bghttp = require("nativescript-background-http");
import * as imagepicker from "nativescript-imagepicker";
import * as Geolocation from "nativescript-geolocation";
import { Image } from "tns-core-modules/ui/image";
const session = bghttp.session("image-upload");

export default {
  props: ["img"],

  data() {return {
    name:"",
     needLocation: true,
      locationFailure: false,
      location: null,
         donnees:null,
    montre:true


}
  
  },
  computed: {},
  methods: {
    loc() {
      Geolocation.enableLocationRequest(true).then(() => {
        Geolocation.isEnabled().then(isLocationEnabled => {
          if (!isLocationEnabled) {
            // potentially do more then just end here...
            return;
          }

          // MUST pass empty object!!
          Geolocation.getCurrentLocation({})
            .then(result => {
            this.location=result;
              
            })
            .catch(e => {
              console.log("loc error", e);
            });
        });
      });
    },
        upload(img) {
      const key = "5b8d8ddf5f51b132601bd919362ebdbb";
      let urlApi = "https://api.imgbb.com/1/upload?key=" + key;
      let path = img.src._android;
         this.loc();
      const request = {
        url: urlApi,
        method: "POST",
        headers: {
          "Content-type": "application/octet-stream"
        },
        description: "Uploading"
      };

      const params = [
        {
          name: "image",
          filename: path,
          mimeType: "img/jpeg",
         
        }
      ];


      const task = session.multipartUpload(params, request);
  task.on("responded", (e) => {
 // console.log(JSON.parse(e.data));
this.donnees = JSON.parse(e.data);
this.url=this.donnees.data.url;
console.log(this.url);
this.montre=false;
 axios({
        method: "post",
        url: "http://docketu.iutnc.univ-lorraine.fr:19501/photo",
        data: {
    "desc": this.name,
    "positionX": this.location.longitude,
    "positionY": this.location.latitude,
    "url": this.url
}
      })
        .then(result => {

         // console.log(result);
        })
        .catch(err => {
          console.error(err.message);
        })
        .finally(() => { 
});

});
   
  
    }   
     
  },mounted(){
 
  
}
};
</script>
