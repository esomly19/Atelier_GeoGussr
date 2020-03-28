<template>
    <div  class="mx-auto mt-4" style="width: 45%; ">
        <div class="card mx-auto p-5">
            <h1 class="h1">Bienvenue sur GeoQuizz</h1>
            <p>Commencer une partie pour tester votre capacité à vous localiser uniquement à partir de photo</p>
            <h3>Votre pseudo : </h3>
            <input type="text" v-model="pseudo">
            <small class="text-muted">Permet d'établir votre classement</small>
            <div class="dropdown">
                <p>Vous pouvez sélectionner une ville</p>
                <select class="custom-select" v-model="v">
                    <option selected>Sélectionner une ville</option>
                    <option v-for="ville in villes" :key="ville.id" :value="ville.ville" >{{ville.ville}}</option>
                </select>
            </div>

            <button type="submit" class="btn btn-primary p-2 mt-2" v-on:click="start">Commencer</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'StartGame',
  data() {
      return {
         token: "",
         v: "Sélectionner une ville",
         pseudo: "",
         villes: "",
      }
    },

    mounted() {
        
    },

    methods: {
        start() {
            if(this.v === "Sélectionner une ville") {
                this.v = null
            }
            axios.post("https://geogassur.pagekite.me/createPartie", {name: this.pseudo, ville: this.v}).then(res => {
                
                this.token = res.data
                this.$router.push({ path: '/game/'+this.token})
            }).catch(err => {
                console.log(err)
            })
        }
    },

    created() {
        axios.get("https://geogassur.pagekite.me/getVilles").then(res => {
            this.villes = res.data
        }).catch(err => {
            console.log(err)
        })
    },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->

