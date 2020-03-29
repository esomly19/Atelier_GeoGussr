<template>
  <div>
  <timer v-on:timeForResponse="getTime" :stopTime="stop" v-on:loseBytime="nextPicture"></timer>
      <div class="row game">
      <maps class="col-8" v-on:submitResult="submitR" :x="coordX" :y="coordY" :refs="map_refs"></maps>
      <div class="col-4">
        <div class="card">
            <picture-to-find :urlPicture="url"></picture-to-find>
            <div class="card-body">
              <score :D="distanceForWin" :t="time" v-on:next="nextPicture" :v="ville" :nbPhoto="nb_photo" v-on:score="setScore" v-on:time="setTime"></score>
            </div>
            </div>
      </div>
      <end-game :score="scoreFinal" :tm="avgTime" :ville="ville" :name="pseudo" v-on:end="end"></end-game>
      
    </div>
    
    
    
  </div>    
</template>
<script>
import Maps from './Maps.vue'
import PictureToFind from "./PictureToFind.vue"
import Score from "./Score.vue"
import Timer from "./Timer.vue"
import EndGame from "./EndGame.vue"

import axios from 'axios'

export default {
  name: 'Game',
  components: {
    Maps,
    PictureToFind,
    Score,
    Timer,
    EndGame
    
  },
  data() {
      return {
          url: "",
          distanceForWin: 200,
          time: 0,
          stop: true,
          token: this.$route.params.token,
          ville: "",
          map_refs:"",
          nb_photo: "",
          MesPhotos: "",
          pseudo: "",
          currentPhoto: 0,
          coordX: "",
          coordY: "",
          scoreFinal: 0,
          avgTime: 0

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
          setTimeout(() => this.showModal(d), 400)
        },
        nextPicture() {
          this.currentPhoto += 1
          if(this.currentPhoto >= this.nb_photo) {
            this.$modal.show("endgame", {draggable: true})
          }else{
            this.url = this.MesPhotos[this.currentPhoto]['url']
            setTimeout(() => {
              this.coordX = this.MesPhotos[this.currentPhoto]['positionX']
              this.coordY = this.MesPhotos[this.currentPhoto]['positionY']
              this.stop = false
            }, 500)
            
          }
        },

        setTime(event){
          this.avgTime = event
        },

        setScore(event) {
          this.scoreFinal = event
        },

        end(){
          axios.put("http://docketu.iutnc.univ-lorraine.fr:19500/updatePartie", {token: this.token, score: this.scoreFinal}).catch(err => {
            console.log(err)
          })
          this.$router.push({ path: '/'})
        },

        showModal(d) {
            this.$modal.show("Score", {distance: d}, {draggable: true})
        },
    },

    created() {
        axios.get("http://docketu.iutnc.univ-lorraine.fr:19500/createPartie?token="+this.token).then(res => {
                this.ville = res.data.ville
                this.distanceForWin = res.data.dist
                this.MesPhotos = res.data.photos
                this.nb_photo = res.data.nb_photo
                this.pseudo = res.data.name
                this.map_refs = res.data.map_refs
                this.url = this.MesPhotos[this.currentPhoto]['url']
                setTimeout(() => {
                  this.coordX = this.MesPhotos[this.currentPhoto]['positionX']
                  this.coordY = this.MesPhotos[this.currentPhoto]['positionY']
                  this.stop = false
                  console.log("nothing append")
                }, 1000)
                
                
            }).catch(err => {
              alert('une err survenu : '+err)
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

