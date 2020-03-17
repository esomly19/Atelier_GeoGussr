<template>
  <div>
    <timer></timer>
    <div class="row game">
    
      <maps class="col-8"></maps>
      <picture-to-find :urlPicture="url" class="col-4"></picture-to-find>
      <statistiques></statistiques>
      
    </div>
    
    
  </div>    
</template>
<script>
import Maps from './Maps.vue'
import PictureToFind from "./PictureToFind.vue"
import Statistiques from "./Statistiques.vue"
import Timer from "./Timer.vue"

export default {
  name: 'Game',
  components: {
    Maps,
    PictureToFind,
    Statistiques,
    Timer
  },
  data() {
      return {
          url: "https://www.nancy-tourisme.fr/app/uploads/nancy/2019/01/place-stanislas-nocturne-2016-7200-rgine-datin-1920x2878.jpg",
          
      }
    },

    mounted() {
        
    },

    methods: {
        
    },
}
</script>
<style>
  .game{
    padding: 1%;
  }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->

