<template>
    <div>
    <div class="card bg-light mb-3 ml-md-auto">
    <div class="d-flex shadow-lg bg-light border-dark">
            <input v-model="searchContaint" class="form-control mr-sm-1" type="search" placeholder="Search" aria-label="Search" onfocus="if(this.value == 'Votre nom')this.value = '';">
            <button class="btn btn-light border-dark" v-on:click="deleteSearch()">❌</button>
            <button class="btn btn-light border-dark" v-on:click="search()">🔎</button>
        </div>
        <div v-if="src">
    <div class="card-header">Classement de la recherche</div>

        <table class="table">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Pseudo</th>
                <th scope="col">Score</th>
                <th scope="col">Ville</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="player in findplayers" :key="player.classement">
                <td>{{player.classement}}</td>
                <td>{{player.joueur}}</td>
                <td>{{player.score}}</td>
                <td>{{player.ville}}</td>
            </tr>
        </tbody>
        </table>
    </div>
    <div class="card-header">Classement TOP 20</div>
        <table class="table">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Pseudo</th>
                <th scope="col">Score</th>
                <th scope="col">Ville</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="score in listeScores" :key="score.id">
                <td>{{score.id}}</td>
                <td>{{score.joueur}}</td>
                <td>{{score.score}}</td>
                <td>{{score.ville}}</td>
            </tr>
        </tbody>
        </table>
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
         joueur: "",
         searchContaint: "Votre nom",
         src: false,
         findplayers: "",
      }
    },

    mounted() {
        
    },

    methods: {
        search(){
            this.src = true
            if(this.searchContaint === null || this.searchContaint === "Votre nom") {
                this.findplayers = {classement: 0,
                                    joueur: "pas de joueurs",
                                    score: "0",
                                    ville: "0"}               
            }else{
                axios.get("https://geogassur.pagekite.me/getPlayerScore?name="+this.searchContaint).then(rep => {
                    this.findplayers = rep.data
                })
            }
        },

        deleteSearch(){
            this.searchContaint = "Votre nom"
        },
    },

    created() {
        axios.get("https://geogassur.pagekite.me/getScore").then(res => {
            this.listeScores = res.data.scores
        }).catch(err => {
            console.log(err)
        })
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->

