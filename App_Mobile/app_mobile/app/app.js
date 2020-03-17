import Vue from "nativescript-vue";

//import LoginPage from "./components/LoginPage";
import Home from "./components/Home";
// Uncommment the following to see NativeScript-Vue output logs
// Vue.config.silent = false;

new Vue({
    render: h => h("frame", [h(Home)])
}).$start();
