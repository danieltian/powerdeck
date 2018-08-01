<template lang="pug">
  .stream-deck-button(:class="{ selected }" @click="selectButton")
    img.image(:src="button.image.dataUrl")
</template>

<script>
  export default {
    props: {
      button: {
        type: Object,
        required: true
      },
      selected: {
        type: Boolean,
        required: false,
        default: false
      }
    },

    methods: {
      selectButton() {
        this.$store.commit('selectButton', this.button)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .stream-deck-button
    width: 50px
    height: 50px
    background-color: black
    border-radius: 0.25em
    border: 0.1em #dcdcdc solid
    cursor: pointer

    &.selected
      box-shadow: 0 0 5px 5px #639FFF

    .image
      width: 100%
      height: 100%
</style>
