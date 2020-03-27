<template>
    <div>
    <div class="card bg-light mb-3" style="max-width: 18rem;">
    <div class="card-header">Classement TOP 20</div>
        <div class="card-body">
            <ul v-for="score in listeScores" :key="score.joueur">
                <li>{{score.joueur}} - {{score.score}}</li>
            </ul>
        </div>
    </div>
        
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Classement',
  data() {
      return {
         listeScores: "",
         joueur: ""
      }
    },

    mounted() {
        
    },

    methods: {
        
    },

    created() {
        axios.get("https://geogassur.pagekite.me/getScore").then(res => {
            this.listeScores = res.data.scores
        })
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->

