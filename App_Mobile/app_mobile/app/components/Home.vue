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
          <Label text="Création Série"></Label>
        </TabStripItem>
      <TabStripItem>
          <Label text="Séries"></Label>
        </TabStripItem>
      </TabStrip>

      <!-- The number of TabContentItem components should corespond to the number of TabStripItem components -->
      <TabContentItem>
        <GridLayout>
          <StackLayout>
            <Button text="Take Picture" @tap="takePicture" />
            <Button text="Choose Picture" @tap="selectPicture" />
            <Label> Images prises :</Label>


    <ImagesList :Imgli="images" />


          </StackLayout>
        </GridLayout>
      </TabContentItem>
      <TabContentItem>
        <GridLayout>
          <StackLayout>
            <Label text="Création d'une série" class="h2 text-center"></Label>
           
<Button @tap="onAddTap"> Créer une série </Button>
     </StackLayout>

   </GridLayout>
      </TabContentItem>
      <TabContentItem>
   <GridLayout>
          <StackLayout>
            <Label text="Série dans la bdd " class="h2 text-center"></Label>
           

            <SerieList :Series="Series" />
      

     </StackLayout>
   </GridLayout>
    </TabContentItem>

    </BottomNavigation>
  </Page>
</template>

<script>
import * as camera from "nativescript-camera";
import ImagesList from "./ImagesList";
import createSerie from "./CreateSerie";
import SerieList from "./SerieList";
import * as imagepicker from "nativescript-imagepicker";
import * as Geolocation from "nativescript-geolocation";
import { Image } from "tns-core-modules/ui/image";
import axios from "axios";



export default {
  components: { createSerie, SerieList, ImagesList },
  data() {
    return {
      finds: [],
      images: [],
      imagesprises: [],
      series: [],
      needLocation: true,
      locationFailure: false,
      location: null,
      Series: [],
      PhoSerie: [],
      url: null,
      donnees:null,
      affiche:false
    };
  },
  methods: {
  ok(){this.affiche=true;},
    onAddTap() {
      const newId = new Date().getTime();
      this.$showModal(createSerie, { props: { id: newId } }).then(newItem => {
        if (newItem) {
          this.series.push(newItem);
        }
      });
    },
    AjoutSerie(img){
this.PhoSerie.push(img);
this.imagesprises.splice(img);
},Retirer(img){},
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
              this.finds.push({ value: 'd' });
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
    ajouterAseries() {},

lololo(){   
 axios({
        method: "GET",
        url: "http://docketu.iutnc.univ-lorraine.fr:19501/serie",
      
      })
        .then(result => {
        this.Series=result.data.series;
        console.log(result.data.series);
        })
        .catch(err => {
          console.error(err.message);
        })
        .finally(() => {});

}
  },mounted(){
  this.lololo();
  
}
};
</script>
<style>
label {
  font-size: 19em;
  text-align: center;
}
</style>
