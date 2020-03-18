import Vue from "vue";
import App from "./App.vue";
import VModal from "vue-js-modal";
import VueRouter from "vue-router";
import Home from "./components/Home.vue";

import "leaflet/dist/leaflet.css";
import Serie from "./components/Serie.vue";
import AddPhoto from "./components/AddPhoto.vue";
import NotFound from "./components/NotFound.vue";

Vue.use(VueRouter);
Vue.use(VModal);
const router = new VueRouter({
  mode: "history",

  routes: [
    { path: "/", component: Home },
    { path: "/Serie", component: Serie },
    { path: "/AddPhoto", component: AddPhoto },
    { path: "/*", component: NotFound }
  ]
});
new Vue({
  el: "#app",
  router,
  render: h => h(App)
});
