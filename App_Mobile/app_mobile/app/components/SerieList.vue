<template>
  <ListView for="lul in Series" @itemTap="onItemTap">
    <v-template>
      <Serie :lolo="lul"></Serie>
    </v-template>
  </ListView>
</template>

<script>
import Serie from "./Serie";
import Detail from "./Detail";

export default {
  components: { Serie, Detail },
  props: ["Series"],

  methods: {
    onItemTap(args) { 
 console.log(args);
      this.$navigateTo(Detail, {
 
        props: { soro: args.item }
      });
    }
  }


};
</script>
  