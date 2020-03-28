<template>
  <Page>
    <StackLayout>
      <Label text="Créer une nouvelle série"></Label>
      <TextField v-model="name" hint="Nom de la série"></TextField>
      <Button text="Créer" @tap="onSaveTap"></Button>
    </StackLayout>
  </Page>
</template>
<script>
import * as Geolocation from "nativescript-geolocation";
import axios from "axios";
export default {
  props: ["id"],
  data: function() {
    return {
      name: " ",
   
    };
  },
  methods: {
    onSaveTap() {
Geolocation.enableLocationRequest(true).then(() => {
        Geolocation.isEnabled().then(isLocationEnabled => {
          if (!isLocationEnabled) {
            // potentially do more then just end here...
            return;
          }

          // MUST pass empty object!!
          Geolocation.getCurrentLocation({})
            .then(result => {
            this.location=result;
const myObj = {
 'positionX':48.6850,'positionY':6.1638,'zoom':12
};

const myObjStr = JSON.stringify(myObj);
      axios({
        method: "post",
        url: "https://geogatotor.pagekite.me/serie",
        data: {
          "ville": this.name,
          "map_refs": myObjStr,
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
      const newItem = {
        id: this.id,
        name: this.name,
        images: []
      };              
           this.$modal.close(newItem);   })
            .catch(e => {
              console.log("loc error", e);
            });
        });
      });
     }
  }
};
</script>
