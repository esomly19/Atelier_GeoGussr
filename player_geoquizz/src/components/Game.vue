<template>
  <div>
      <div class="row game">
    
      <maps class="col-8" v-on:submitResult="submitR" :x="coordX" :y="coordY" :refs="map_refs"></maps>
      <picture-to-find :urlPicture="url" class="col-4"></picture-to-find>
      <score :D="distanceForWin" :t="time" v-on:next="nextPicture"></score>
      
    </div>
    <timer v-on:timeForResponse="getTime" :stopTime="stop" v-on:loseBytime="nextPicture"></timer>
    
    
  </div>    
</template>
<script>
import Maps from './Maps.vue'
import PictureToFind from "./PictureToFind.vue"
import Score from "./Score.vue"
import Timer from "./Timer.vue"
import axios from 'axios'

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
          url: "",
          distanceForWin: 200,
          time: 0,
          stop: false,
          token: this.$route.params.token,
          ville: "",
          map_refs:"",
          nb_photo: "",
          MesPhotos: "",
          pseudo: "",
          currentPhoto: 0,
          coordX: "",
          coordY: "",
      }
    },

    mounted() {
        
    },

    computed: {
      
    },
    methods: {
        getTime(e) {
          this.time = e
          
        },
        submitR(d) {
          this.stop = true
          setTimeout(() => this.showModal(d), 100)
          
        },
        nextPicture() {
          this.currentPhoto += 1
          this.url = this.MesPhotos[this.currentPhoto]['url']
          this.coordX = this.MesPhotos[this.currentPhoto]['positionX']
          this.coordY = this.MesPhotos[this.currentPhoto]['positionY']
          
          this.stop = false
        },

        showModal(d) {
            this.$modal.show("Score", {distance: d}, {draggable: true})
        },
    },

    created() {
        axios.get("https://geogassur.pagekite.me/createPartie?token="+this.token).then(res => {
                this.ville = res.data.ville
                this.distanceForWin = res.data.dist
                this.MesPhotos = res.data.photos
                this.nb_photo = res.data.nb_photo
                this.pseudo = res.data.name
                this.url = this.MesPhotos[this.currentPhoto]['url']
                this.coordX = this.MesPhotos[this.currentPhoto]['positionX']
                this.coordY = this.MesPhotos[this.currentPhoto]['positionY']
                this.map_refs = res.data.map_refs
                this.pseudo = res.data.name
            })
    },
}
</script>
<style>
    .game {
      margin-top: 1%;
      margin-left: 1%;
    }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->

