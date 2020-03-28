import Vue from "vue";

import VModal from "vue-js-modal";

import VueRouter from "vue-router";

import "leaflet/dist/leaflet.css";

import "bootstrap/dist/css/bootstrap.css";

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';

import VueDraggable from 'vue-draggable';

import App from "./App.vue";
import './custom.scss';

import AddPhoto from "./components/AddPhoto.vue";
import ConfigurerSerie from './components/ConfigurerSerie.vue';
import Connexion from "./components/Connexion.vue";
import CreerCompte from "./components/CreerCompte.vue";
import Detail from "./components/Detail.vue";
import Home from "./components/Home.vue";
import NotFound from "./components/NotFound.vue";
import Photos from "./components/Photos.vue";
import Serie from "./components/Serie.vue";

Vue.use(VueDraggable);
// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);


Vue.use(VueRouter);
Vue.use(VModal);
const router = new VueRouter({
  mode: "history",

  routes: [
    { path: "/connexion", component: Connexion },
    { path: "/creerCompte", component: CreerCompte },
    { path: "/", component: Home },
    { path: "/Serie", component: Serie },
    { path: "/AddPhoto", component: AddPhoto },
    { path: "/Photos", component: Photos },
    { path: "/configuerSerie", component: ConfigurerSerie },
    { path: "/detail/:id", name: 'detail', component: Detail },
    { path: "/*", component: NotFound }
  ]
});
new Vue({
  el: "#app",
  router,
  render: h => h(App)
});
