<template>
    <div>
        <div>
            <div class="card text-white bg-info">
                <div class="card-header">Information sur la partie</div>
                <div class="card-body">
                    <h5 class="card-title">Ville : {{v}}</h5>
                    <p class="card-text">Votre score : {{totalScore}}</p>
                    <p>Temps moyen : {{moyenneTemps}} s</p>
                    <p>photos restantes : {{nbScore}} / {{nbPhoto}}</p>
                </div>
            </div>
        </div>
        <modal name="Score" @before-open="beforeOpen" @before-close="beforeClose" :clickToClose="false" :width="450" :height="400">
            <div class="card text-white bg-success">
                <h2 class="card-header">Information</h2>
                <div class="card-body">
                    <h3 class="card-title">{{v}}</h3>
                    <p v-if="!metreOrKm">{{distance}} m</p>
                    <p v-else>{{distance}} Km</p>
                    <p>Votre temps : {{t}}</p>
                    <p>Point  pour la distance : {{pointDistance}}</p>
                    <p>Score multiplié par : {{multiplicateur}}</p>
                    <p>Total : {{pointTotal}}</p>
                    <button class="btn btn-primary" v-on:click="next">Continuer</button>
                </div>
            </div>
        </modal>

        
    </div>
</template>
<script>

export default {
  name: 'Score',
  props: ['D', 't', 'v', 'nbPhoto'],
  data() {
      return {
          distance: "",
          metreOrKm: false,
          pointDistance: 0,
          pointTemps: 0,
          pointTotal: 0,
          multiplicateur: 0,
          totalScore: 0,
          moyenneTemps: 0,
          nbScore: 0,
          tempsTotal:0
          
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
            this.tempsTotal += this.t
            this.nbScore += 1
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
           
           this.totalScore += this.pointTotal
        },

        beforeClose() {
            this.moyenneTemps = this.tempsTotal/this.nbScore
            this.moyenneTemps = Math.round(this.moyenneTemps*100)/100
            this.$emit('score', this.totalScore)
            this.$emit('time', this.moyenneTemps)
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

