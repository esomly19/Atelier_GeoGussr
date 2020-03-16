<template>
  <Page>
    <ActionBar title="Camera Tests FTW!" />
    <StackLayout>
      <Button text="Take Picture" @tap="takePicture" />
      <Button text="Choose Picture" @tap="selectPicture" />
      <WrapLayout v-bind:key="img" v-for="img in images">
        <Image :src="img.src" width="75" height="75" />
        <Button text="Upload" @tap="upload(img)" />
      </WrapLayout>
    </StackLayout>
  </Page>
</template>

<script>
import * as camera from "nativescript-camera";
import * as imagepicker from "nativescript-imagepicker";

import { Image } from "tns-core-modules/ui/image";

const bghttp = require("nativescript-background-http");
const session = bghttp.session("image-upload");

export default {
  data() {
    return {
      images: []
    };
  },
  methods: {
    selectPicture() {
      let context = imagepicker.create({
        mode: "multiple"
      });

      context
        .authorize()
        .then(function() {
          return context.present();
        })
        .then(selection => {
          selection.forEach(selected => {
            console.log(JSON.stringify(selected));

            let img = new Image();
            img.src = selected;
            this.images.push(img);
          });
        })
        .catch(function(e) {
          console.log("error in selectPicture", e);
        });
    },
    takePicture() {
      camera
        .requestPermissions()
        .then(() => {
          camera
            .takePicture({
              width: 300,
              height: 300,
              keepAspectRatio: true,
              saveToGallery: false
            })
            .then(imageAsset => {
              let img = new Image();
              img.src = imageAsset;
              this.images.push(img);
              console.log("ive got " + this.images.length + " images now.");
            })
            .catch(e => {
              console.log("error:", e);
            });
        })
        .catch(e => {
          console.log("Error requesting permission");
        });
    },

    upload(img) {
      const key = "5b8d8ddf5f51b132601bd919362ebdbb";
      let urlApi = "https://api.imgbb.com/1/upload?key=" + key;
      let path = img.src._android;

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
          localisation: "Nancy"
        }
      ];

      const task = session.multipartUpload(params, request);
    }
  }
};
</script>
