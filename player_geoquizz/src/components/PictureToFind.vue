<template>
    <div>
        <h3>Localiser cette photo : </h3>
        <img :src="urlPicture" style="width: 45%">
    </div>
  
</template>
<script>

export default {
  name: 'PictureToFind',
  props:['urlPicture'],
  data() {
      return {
      }
    },

    mounted() {
        
    },

    methods: {
        
    },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->

