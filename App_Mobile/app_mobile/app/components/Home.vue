<template>
  <Page>
    <ActionBar title="GeoGussr" />

    <BottomNavigation selectedIndex="0">
      <!-- The bottom tab UI is created via TabStrip (the containier) and TabStripItem (for each tab)-->
      <TabStrip>
        <TabStripItem class="special">
          <Label text="Home"></Label>
        </TabStripItem>
        <TabStripItem>
          <Label text="Série"></Label>
        </TabStripItem>
      </TabStrip>

      <!-- The number of TabContentItem components should corespond to the number of TabStripItem components -->
      <TabContentItem>
        <GridLayout>
          <StackLayout>
            <Button text="Take Picture" @tap="takePicture" />
            <Button text="Choose Picture" @tap="selectPicture" />
            <Label> Images prises :</Label>
          </StackLayout>
        </GridLayout>
      </TabContentItem>
      <TabContentItem>
        <GridLayout>
          <StackLayout>
            <Label text="Série" class="h2 text-center"></Label>
            <Button @tap="onAddTap"> Créer une série </Button>

            <SerieList :Series="Series" />
          </StackLayout>
        </GridLayout>
      </TabContentItem>
    </BottomNavigation>
  </Page>
</template>

<script>
import * as camera from "nativescript-camera";
import createSerie from "./CreateSerie";
import SerieList from "./SerieList";
import seriedata from "../serie-data.json";
import * as imagepicker from "nativescript-imagepicker";
import * as Geolocation from "nativescript-geolocation";
import { Image } from "tns-core-modules/ui/image";

const bghttp = require("nativescript-background-http");
const session = bghttp.session("image-upload");

export default {
  components: { createSerie, SerieList },
  data() {
    return {
      images: [],
      series: [],
      needLocation: true,
      locationFailure: false,
      location: null,
      Series: seriedata.Series
    };
  },
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
              alert(result.latitude + " " + result.longitude);
            })
            .catch(e => {
              console.log("loc error", e);
            });
        });
      });
    },
    onAddTap() {
      const newId = new Date().getTime();
      this.$showModal(createSerie, { props: { id: newId } }).then(newItem => {
        if (newItem) {
          this.series.push(newItem);
        }
      });
    },
    createSerie() {
      this.$navigateTo(createSerie);
    },
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
              this.loc();
            })
            .catch(e => {
              console.log("error:", e);
            });
        })
        .catch(e => {
          console.log("Error requesting permission");
        });
    },
    ajouterAseries() {},
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
<style>
label {
  font-size: 19em;
  text-align: center;
}
</style>
