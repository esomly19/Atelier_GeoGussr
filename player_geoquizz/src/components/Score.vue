<template>
    <div>
        <modal name="Score" @before-open="beforeOpen" @before-close="beforeClose" :clickToClose="false" :width="450" :height="450">
            <div class="card">
                <img class="card-img-top" src="../assets/gps.jpg" style="width: 4rem;">
                <div class="card-body">
                    <h1 class="card-title">Information</h1>
                    <h2>Nancy</h2>
                    <h3 v-if="!metreOrKm">{{distance}} m</h3>
                    <h3 v-else>{{distance}} Km</h3>
                    <h2>Votre temps : {{t}}</h2>
                    <h2>Point  pour la distance : {{pointDistance}}</h2>
                    <h2>Score multiplié par : {{multiplicateur}}</h2>
                    <h3>Total : {{pointTotal}}</h3>
                    <button class="btn btn-primary" v-on:click="next">Continuer</button>
                </div>
            </div>
        </modal>
    </div>
</template>
<script>

export default {
  name: 'Score',
  props: ['D', 't'],
  data() {
      return {
          distance: "",
          metreOrKm: false,
          pointDistance: 0,
          pointTemps: 0,
          pointTotal: 0,
          multiplicateur: 0
          
      }
    },

    mounted() {
        
    },

    methods: {
        next() {
            this.$modal.hide('Score')
            this.$emit('next')
        },
        beforeOpen(event) {
            this.distance = event.params.distance
            
            if((this.distance*1000) < this.D) {
               this.pointDistance = 5
            }else {
               if((this.distance*1000) < 2*this.D) {
                   this.pointDistance = 3
               }else{
                   if((this.distance*1000) < 3*this.D) {
                       this.pointDistance = 1
                   }else{
                       this.pointDistance = 0
                   }
                   
               }
           }
           if(this.t <= 5) {
               this.pointTotal = this.pointDistance*4
               this.multiplicateur = 4
           }else{
                if(this.t <= 10){
                    this.pointTotal = this.pointDistance*2
                    this.multiplicateur = 2
                }else{
                    this.pointTotal = this.pointDistance
                    this.multiplicateur = 1
                }
           }
            if(this.distance > 1) {
               this.distance = Math.round(this.distance)
               this.metreOrKm = true
           }else{
               this.distance = Math.round(this.distance*1000)
               this.metreOrKm = false
           } 
        },

        beforeClose() {
            console.log("not yet done")
        }
    },
}
</script>
<style scoped>
    
    .card {
        margin: 2%;
    }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->

