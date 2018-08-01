<template lang="pug">
  .stream-deck(:style="{ 'grid-template': gridTemplate }")
    StreamDeckButton(v-for="button in streamDeck.buttons" :button="button" :selected="button == selectedButton" :key="button.number")
</template>

<script>
  import { mapState } from 'vuex'
  import StreamDeckButton from './StreamDeckButton.vue'

  export default {
    components: { StreamDeckButton },
    props: {
      streamDeck: {
        type: Object,
        required: true
      }
    },

    computed: {
      gridTemplate() {
        return `repeat(${this.streamDeck.rows}, 1fr) / repeat(${this.streamDeck.columns}, 1fr)`
      },

      ...mapState(['selectedButton'])
    },

    methods: {
      increment() {
        this.$store.commit('increment')
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .stream-deck
    background: linear-gradient(#101011, #3e3c3f)
    padding: 1em
    border-radius: 0.6em
    display: inline-grid

    .stream-deck-button
      margin: 0.8em
</style>
