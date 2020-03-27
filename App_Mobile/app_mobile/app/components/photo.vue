<template>
  <GridLayout colums="200, *">
    
    <Image :src="lolo.url"></Image>
  </GridLayout>
</template>
<script>
export default {
  props: ["lolo"],

  data: function() {
    return {};
  },
  computed: {},
  methods: {}
};
</script>
<style lang="scss" scoped></style>
