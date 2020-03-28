<template>
    <div class=" card  bg-light mx-auto" style="width: 30%;">
        <div class="card-header">
            Connexion
        </div>
        <div class="card-body">
            <div class="form-group" >
                <label for="exampleInputEmail1">Votre email</label>
                <input type="email" class="form-control" aria-describedby="emailHelp" v-model="mail">
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Mot de passe</label>
                <input type="password" class="form-control" v-model="mdp">
            </div>
            <button type="submit" class="btn btn-primary" v-on:click="makeConnection()">Se connecter</button>
            <button class="btn btn-info" v-on:click="newAccount()">Créer un compte</button>
        </div>
        <modal name="err" :width="450" :height="400">
            <div class="card text-white bg-warning">
                <div class="card-header">Attention</div>
                <div class="card-body">
                    <h5 class="card-title">Erreur lors de la connexion</h5>
                    <p class="card-text">Vérifier votre mot de passe ou votre nom d'utilisateur</p>
                    <p>{{erreur}}</p>
                </div>
            </div>
        </modal>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Connexion',
  data() {
      return {
          mail: '',
          mdp: '',
          erreur: ""
      }
    },

    mounted() {
        
    },

    methods: {
        newAccount() {
            this.$router.push({ path: '/creerCompte'})
        },

        makeConnection() {
            if(this.mail === null || this.mail === "" || this.mdp === null || this.mdp === "" ) {
                this.$modal.show('err')
            }else {
                 axios.post('http://geogatotor.pagekite.me/connexion', {email: this.mail, password: this.mdp}).then(res => {
                    console.log(res.data)
                    localStorage.setItem('jwt',res.data.token)
                    console.log(localStorage)
                    this.router.push({name:'Home'})
                 }).catch(err => {
                     this.$modal.show('err', {erreur: err})
                 })
            }
           
        },
        
    },

}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->

