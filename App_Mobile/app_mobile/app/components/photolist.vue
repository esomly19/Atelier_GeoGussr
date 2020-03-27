<template>
  <ListView for="lul in Photos" >
    <v-template>
      <photo :lolo="lul"></photo>
    </v-template>
  </ListView>
</template>

<script>
import photo from "./photo";


export default {
  components: { photo },
  props: ["Photos"],

  methods: {
   
  }


};
</script>
  