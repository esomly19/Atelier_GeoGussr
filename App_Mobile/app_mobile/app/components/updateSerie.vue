<template>
  <Page>
    <StackLayout>
      <Label text="Update">{{serie.id}}</Label>
      <TextField v-model="serie.ville" hint="Nom de la série"></TextField>
      	<WrapLayout > <Label text="Position X " />: <TextField v-model="serie.map_refs.positionX" hint="Position x de la série"></TextField> 	</WrapLayout>
       	<WrapLayout ><Label text="Position Y " />   <TextField v-model="serie.map_refs.positionY" hint="Position y de la série"></TextField> 	</WrapLayout>
       <TextField v-model="serie.map_refs.zoom" hint="Zoom de la série"></TextField>
      <TextField v-model="serie.dist" hint="Distance de la série"></TextField>
      <Button text="Updater" @tap="onSaveTap"></Button>
    </StackLayout>
  </Page>
</template>
<script>
import * as Geolocation from "nativescript-geolocation";
import axios from "axios";
export default {
  props: ["serie"],
  data: function() {
    return {
  
   
    };
  },
  methods: {
    onSaveTap() {

            axios.put("http://docketu.iutnc.univ-lorraine.fr:19501/serie/"+this.serie.id,{
    "ville": this.serie.name,
    "map_refs": {"positionX":this.serie.map_refs.positionX,"positionY":this.serie.map_refs.positionY,"zoom":this.serie.map_refs.zoom},
    "dist": this.serie.dist
})
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
        .finally(() => {     this.$modal.close(newItem);})}
  }
};
</script>
