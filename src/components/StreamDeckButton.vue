<template lang="pug">
  .stream-deck-button(:class="{ selected: isSelected }" @mousedown="mouseDown" @mouseleave="mouseUp" @mouseup="mouseUp")
</template>

<script>
  export default {
    props: {
      button: {
        type: Object,
        required: true
      },
      isSelected: {
        type: Boolean,
        required: false,
        default: false
      }
    },

    methods: {
      mouseDown() {
        this.$store.commit('mouseDown', this.button)
      },

      mouseUp() {
        this.$store.commit('mouseUp', this.button)
      }
    }
  }
</script>

<style lang="stylus">
  .stream-deck-button
    width: 50px
    height: 50px
    background-color: black
    border-radius: 0.25em
    border: 0.1em #dcdcdc solid
    cursor: pointer

    &.selected
      box-shadow: 0 0 5px 5px #639FFF
</style>
