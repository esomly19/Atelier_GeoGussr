<template>
  <Page>
  <ActionBar title="GeoGussr">
  <NavigationButton text="Go Back" android.systemIcon="ic_menu_back" @tap="onBackTap"/>
</ActionBar>
  <StackLayout>
 <Label   row="0"   col="1" :text="soro.ville"></Label>
    <GridLayout columns="*, *"  rows="50">
      <Label   row="0"  col="0" :text="soro.map_refs.positionX"></Label>
      <Label   row="0"  col="1" :text="soro.map_refs.positionY"></Label>
   </GridLayout>
  <Button row ="3" text="MISE A JOUR"  @tap="update(soro.id)"></Button>
  {{ this.afficherPhoto(soro.id)}}


   
   <photolist :Photos="lolo"></photolist>

  </StackLayout>
  </Page>
</template>
<script>
import axios from "axios";
import photolist from "./photolist";
export default {
  props: ["soro"],
components: { photolist },
  data() {
    return {
  lolo:[]
  };
  },
  computed: {},
  methods: {
    onBackTap() {
      this.$navigateBack();
    },
    update(lul){
     axios({
        method: "PUT",
        url: "http://geogatotor.pagekite.me/serie/(id)",
      
      })
        .then(result => {
    
        })
        .catch(err => {
          console.error(err.message);
        })
        .finally(() => {});
   

    },
  afficherPhoto(lol){
 axios({
        method: "GET",
        url: "http://geogatotor.pagekite.me/photo/serie/"+lol,
      
      })
        .then(result => {
    
      this.lolo=result.data.photos;
        })
        .catch(err => {
          console.error(err.message);
        })
        .finally(() => {});
},
     
  },mounted(){
 
  
}
};
</script>
