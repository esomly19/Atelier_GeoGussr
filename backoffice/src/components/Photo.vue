<template>
   <div class="card ">

<img class="card-img-top" :src="lol.url"/>
<p>{{lol.desc}}</p>
</div>
</template>

<script>

export default {
  components: {
   
  },
  props: ["lol"],
  data() {
    return {
   
    };
  },

  methods: {


}, mounted () {
this.ok();
}


  
   
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
