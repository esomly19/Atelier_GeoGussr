<template>
  <div>
    <timer v-on:timeForResponse="getTime" :stopTime="stop"></timer>
    <div class="row game">
    
      <maps class="col-8" v-on:submitResult="submitR"></maps>
      <picture-to-find :urlPicture="url" class="col-4"></picture-to-find>
      <score :D="distanceForWin" :t="time" ></score>
      
    </div>
    <modals-container/>
    
  </div>    
</template>
<script>
import Maps from './Maps.vue'
import PictureToFind from "./PictureToFind.vue"
import Score from "./Score.vue"
import Timer from "./Timer.vue"

export default {
  name: 'Game',
  components: {
    Maps,
    PictureToFind,
    Score,
    Timer
  },
  data() {
      return {
          url: "https://www.nancy-tourisme.fr/app/uploads/nancy/2019/01/place-stanislas-nocturne-2016-7200-rgine-datin-1920x2878.jpg",
          distanceForWin: 100,
          time: 0,
          stop: false
          
      }
    },

    mounted() {
        
    },

    methods: {
        getTime(e) {
          this.time = e
        },
        submitR() {
          this.stop = true
          console.log(this.time)
        }
    },
}
</script>
<style>
  .game{
    padding: 1%;
  }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->

