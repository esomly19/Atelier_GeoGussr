<template>
    <div>
        <modal name="endgame" @before-open="beforeOpen" @before-close="beforeClose" :clickToClose="false" :width="450" :height="400">
            <div class="card bg-light mb-3">
                <div class="card-header">Partie Terminée</div>
                    <div class="card-body">
                        <h5 class="card-title">Félicitation {{name}}</h5>
                        <p class="card-text">Merci d'avoir joué dans la ville de : {{ville}}</p>
                        <p class="card-text">Votre score est de : {{score}}</p>
                        <p class="card-text">Avec un temps moyen de : {{tm}} s</p>
                        
                        <button class="btn btn-primary" v-on:click="endGame()">Terminer</button>
                    </div>
                </div>    
        </modal>
    </div>
</template>
<script>


export default {
  name: 'EndGame',
  props: ['score', 'tm', 'ville', 'name'],
  data() {
      return {
          
      }
    },

    mounted() {
        
    },

    methods: {
       
        beforeOpen() {
            
        },

        beforeClose() {
            this.$emit('end')
        },

        endGame() {
            this.$modal.hide('endgame')
        },
    },
}
</script>
<style scoped>
    
    .card {
        margin: 2%;
    }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->

