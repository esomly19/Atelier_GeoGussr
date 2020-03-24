<template>
  <Page>
    <GridLayout colums="200, *">
      <Label col="1" :text="serie.ville"></Label>
      <!-- <Label col="1" :text="Serie.name"></Label>-->
      <Button text="Go back" @tap="onBackTap"></Button>
    </GridLayout>
  </Page>
</template>
<script>
export default {
  props: ["Serie"],

  data: function() {
    return {};
  },
  computed: {},
  methods: {
    onBackTap() {
      this.$navigateBack();
    }
  }
};
</script>
