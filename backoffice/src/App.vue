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
          <router-link class="nav-item nav-link"  to="/connexion">
          <p v-if="isConnected()" v-on:click="seDeconnecter">Se Déconnecter</p>
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
      // connected: false,
    }
  },

  methods:{
    seDeconnecter(){
      localStorage.removeItem('jwt')
      console.log(localStorage.getItem('jwt'))
      this.connected = false
      this.$router.push({name:'Home'})
    },

    isConnected(){
      if(localStorage.getItem('jwt')){
        return true
      }else{
        return false
      }
    }
  },
}
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
