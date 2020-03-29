<template>
  <div class="app container text-center">
         <div class="gallery">
               <h1>{{ title }}  </h1>  
         </div>
<div class="container">
  <div class="card-columns">
<div v-for=" ph in photos" v-bind:key="ph.id">
  <Photo :lol="ph"/>
  </div>
  </div>
  </div>
<nav>
  <Button  v-on:click="previousPage()">previous</Button>
  <Button v-on:click="nextPage()">next</Button>
</nav>
  </div>
</template>

<script>
import axios from "axios";
import Photo from "./Photo";
export default {
  name: "GeogussrBackoffice",
  components: { Photo },
  props: {
  
  },
  data() {
    return {
       title: 'Collection of picture',
      photos: [],
      page:1,
      size:10,
      numberofpages:0,
      count:0
    };
  },

  methods: {
   nextPage(){
if((this.page+1) >this.numberofpages){
this.page=this.numberofpages;}else{
  this.page++;}
  this.searchPhtos();
},
  previousPage(){
  if((this.page-1) <1){
  this.page=1;}else{this.page--;}
   this.searchPhtos();
},
  searchPhtos(){
     axios
        .get(
          "http://docketu.iutnc.univ-lorraine.fr:19502/photo?page="+this.page+"&size=10"
        )
        .then(res => {
          console.log(res.data.photos);
          this.count=res.data.count;
              this.numberofpages =res.data.nbpage;

          this.photos=res.data.photos;
        })
        .catch(error => {
          console.log(error);
        })
        .finally();

  },


}, mounted () {
this.searchPhtos();

}, computed:{


}


  
   
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
