<template>
  <GridLayout colums="200, *">
    <Label col="1" :text="Serie.serie.ville"></Label>
  </GridLayout>
</template>
<script>
export default {
  props: ["Serie"],

  data: function() {
    return {};
  },
  computed: {},
  methods: {}
};
</script>
<style lang="scss" scoped></style>
