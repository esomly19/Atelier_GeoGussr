import Vue from "vue";

import VModal from "vue-js-modal";

import VueRouter from "vue-router";

import "leaflet/dist/leaflet.css";

import App from "./App.vue";

import AddPhoto from "./components/AddPhoto.vue";
import Home from "./components/Home.vue";
import NotFound from "./components/NotFound.vue";
import Photos from "./components/Photos.vue";
import Serie from "./components/Serie.vue";

Vue.use(VueRouter);
Vue.use(VModal);
const router = new VueRouter({
  mode: "history",

  routes: [
    { path: "/", component: Home },
    { path: "/Serie", component: Serie },
    { path: "/AddPhoto", component: AddPhoto },
    { path: "/Photos", component: Photos },
    { path: "/*", component: NotFound }
  ]
});
new Vue({
  el: "#app",
  router,
  render: h => h(App)
});
