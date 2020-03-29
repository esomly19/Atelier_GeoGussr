<script>
import axios from "axios";
export default {
  name: "modal",

  methods: {
    close() {
      this.$emit("close");
    },
    add() {
      axios({
        method: "post",
        url: "http://docketu.iutnc.univ-lorraine.fr:19502/serie",
        headers: {
          "Access-Control-Allow-Origin": "*"
        },
        data: {
          "ville": "Salut totor",
          "map_refs": "kkkkkkkkkkkk",
          "dist": 150
        }
      })
        .then(result => {
          this.Reponse = result;
          console.log(result);
        })
        .catch(err => {
          console.error(err.message);
        })
        .finally(() => {});
    }
  }
};
</script>

<template>
  <div class="modal-backdrop">
    <h1>Création d'une série</h1>

  <input type="text" hint="nom de la série">
    <button  v-on:click="add">AJOUT SERIE</button>
  </div>
</template>

<style>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
}
</style>
