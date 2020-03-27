<template>
  <div for="Serie in Series" >
  
      <SerieItem :Serie="Serie"></SerieItem>
</div>
</template>

<script>
import SerieItem from "./SerieItem";


export default {
  components: { SerieItem },
  props: ["Series"],

  methods: {
   
  }


};
</script>
