<template lang="pug">
  .stream-deck-button(@mousedown="mouseDown" @mouseleave="mouseUp" @mouseup="mouseUp")
</template>

<script>
  export default {
    props: {
      buttonNumber: {
        type: Number,
        required: true
      }
    },

    methods: {
      mouseDown() {
        this.$store.commit('mouseDown', this.buttonNumber)
      },

      mouseUp() {
        this.$store.commit('mouseUp', this.buttonNumber)
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
    box-shadow: 0 0 0 0.1em #dcdcdc
</style>
