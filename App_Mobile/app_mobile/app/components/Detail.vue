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
  <Button row ="3" text="MISE A JOUR"  @tap="update(soro)"></Button>
  {{ this.afficherPhoto(soro.id)}}


   
   <photolist :Photos="lolo"></photolist>

  </StackLayout>
  </Page>
</template>
<script>
import axios from "axios";
import photolist from "./photolist";
import updateSerie from "./updateSerie";
export default {
  props: ["soro"],
components: { photolist, updateSerie },
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
    const newId = new Date().getTime();
      this.$showModal(updateSerie, { props: { serie: lul } }).then(newItem => {
        if (newItem) {
          console.log(newItem);
        }
      });
   

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
