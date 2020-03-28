<template>
  <GridLayout colums="200, *">
    <Label col="1" :text="lolo.ville"></Label>
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
