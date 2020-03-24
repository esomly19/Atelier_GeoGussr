<template>
    <div  class="mx-auto mt-4" style="width: 45%; ">
        <div class="card mx-auto p-5">
            <h1 class="h1">Bienvenue sur GeoQuizz</h1>
            <p>Commencer une partie pour tester votre capacité à vous localiser uniquement à partir de photo</p>
            <h3>Votre pseudo : </h3>
            <input type="text" v-model="pseudo">
            <small class="text-muted">Permet d'établir votre classement</small>
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
         pseudo: ""

      }
    },

    mounted() {
        
    },

    methods: {
        start() {
            axios.post("https://geogassur.pagekite.me/createPartie", {name: this.pseudo}).then(res => {
                console.log(res.data)
                this.token = res.data
                this.$router.push({ path: '/game/'+this.token})
            })
        }
    },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->

