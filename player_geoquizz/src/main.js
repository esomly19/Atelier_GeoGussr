import Vue from 'vue'
import App from './App.vue'
import Game from './components/Game.vue'
import StartGame from "./components/StartGame.vue"
import "bootstrap/dist/css/bootstrap.css"
import 'leaflet/dist/leaflet.css';
import VueRouter from 'vue-router';
import VModal from 'vue-js-modal';
import ProgressBar from 'vuejs-progress-bar'
import axios from 'axios'

Vue.use(VueRouter)
Vue.use(VModal, { dynamic: true, dynamicDefaults: { clickToClose: false }})
Vue.use(ProgressBar)
Vue.use(axios)
const router = new VueRouter({
  mode: "history",

  routes: [
    { path: "/", component: StartGame},
    { path: "/game/:token", component: Game},
    
  ]
})
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})