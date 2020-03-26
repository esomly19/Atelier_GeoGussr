<template>
  <ListView for="Serie in Series" @itemTap="onItemTap">
    <v-template>
      <Serie :Serie="Serie"></Serie>
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
      this.$navigateTo(Detail, {
        props: { serie: args.Serie }
      });
    }
  }


};
</script>
