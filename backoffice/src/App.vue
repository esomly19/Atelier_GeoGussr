<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">GeoGussr Backoffice</a>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <router-link class="nav-item nav-link" to="/">Accueil</router-link>
          <router-link class="nav-item nav-link" to="/Serie"
            >Series</router-link
          >
        <router-link class="nav-item nav-link" to="/Photos"
            >Photos</router-link>
          <router-link class="nav-item nav-link" v-if="connected" v-on:click="seDeconnecter" to="/connexion"
            >Se Déconnecter</router-link>
          <router-link class="nav-item nav-link" v-on:click="seDeconnecter" to="/connexion">
          <p v-if="connected">Se Déconnecter</p>
          <p v-else>Se Connecter</p>
          </router-link>
        </div>
      </div>
    </nav>

    <div id="appli">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",

  data(){
    return {
      connected: false,
    }
  },

  methods:{
    seDeconnecter(){
      this.localStorage.setItem('jwt',false)
      console.log(this.localStorage.getItem('jwt'))
      this.connected = false
    }
  },

  watch: {
    isConnect(){
      this.connected = localStorage.getItem('jwt')
    }
    
    
  },

};
</script>

<style>
#appli {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}
</style>
