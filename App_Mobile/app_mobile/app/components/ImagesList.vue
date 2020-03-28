<template>
  <ListView for="img in Imgli"  >
    <v-template>
      <Images :img="img"></Images>
    </v-template>
  </ListView>
</template>

<script>
import Images from "./Images";
import Detail from "./Detail";

export default {
  components: { Images, Detail },
  props: ["Imgli"],

  methods: {
    onItemTap(args) { 
 console.log(args);
      this.$navigateTo(Detail, {
 
        props: { image: args.item }
      });
    }
  }


};
</script>
  