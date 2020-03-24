import Vue from "nativescript-vue";

import Login from "./components/LoginPage";
// Uncommment the following to see NativeScript-Vue output logs
// Vue.config.silent = false;

new Vue({
    render: h => h("frame", [h(Login)])
}).$start();
