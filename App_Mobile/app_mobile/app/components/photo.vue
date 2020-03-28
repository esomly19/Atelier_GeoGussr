<template>
  <GridLayout colums="200, *" rows="*,*">
    
    <Image row="0":src="lolo.url"></Image>
    <Label row="1" :text="lolo.desc"></Label>
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
