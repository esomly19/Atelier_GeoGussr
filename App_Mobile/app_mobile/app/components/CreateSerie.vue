<template>
  <Page>
    <StackLayout>
      <Label text="Créer une nouvelle série"></Label>
      <TextField v-model="name" hint="Nom de la série"></TextField>
      	<WrapLayout> <Label text="Position X " />: <TextField v-model="posX" hint="Position x de la série"></TextField> 	</WrapLayout>
       	<WrapLayout><Label text="Position Y " />   <TextField v-model="posY" hint="Position y de la série"></TextField> 	</WrapLayout>
       <TextField v-model="zoom" hint="Zoom de la série"></TextField>
      <TextField v-model="distance" hint="Distance de la série"></TextField>
      <Button text="Créer" @tap="onSaveTap"></Button>
    </StackLayout>
  </Page>
</template>
<script>
import * as Geolocation from "nativescript-geolocation";
import axios from "axios";
export default {
  props: ["id"],
  data: function() {
    return {
      name: " ",
      posX: 48.6850,
      posY: 6.1638,
      zoom: 12,
      distance:150
   
    };
  },
  methods: {
    onSaveTap() {

const myObj = {
 'positionX':this.posX,'positionY':this.posY,'zoom':this.zoom
};


      axios({
        method: "post",
        url: "http://docketu.iutnc.univ-lorraine.fr:19501/serie",
        data: {
          "ville": this.name,
          "map_refs": myObj,
          "dist": this.distance
        }
      })
        .then(result => {
          this.Reponse = result;
          console.log(result);
        })
        .catch(err => {
          console.error(err.message);
        })
        .finally(() => {      
     this.$modal.close(newItem);  });
    
           
    
     }
  }
};
</script>
