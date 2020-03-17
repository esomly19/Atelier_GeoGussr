<template>
    <div  class="mx-auto mt-4" style="width: 45%; ">
        <div class="card mx-auto p-5">
            <h1 class="h1">Bienvenue sur GeoQuizz</h1>
            <p>Commencer une partie pour tester votre capacité à vous localiser uniquement à partir de photo</p>
            <h3>Votre pseudo : </h3>
            <input type="text">
            <small class="text-muted">Permet d'établir votre classement</small>
            <router-link class="btn btn-primay p-2 mt-2" v-bind:to="'/game/'+token"><button type="submit" class="btn btn-primay p-2 mt-2">Commencer</button></router-link>
        </div>
    </div>
</template>

<script>
export default {
  name: 'StartGame',
  data() {
      return {
         token: "Coucou"
      }
    },

    mounted() {
        
    },

    methods: {
        
    },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->

