<template lang="pug">
  .stream-deck
    .row(v-for="i in streamDeck.rows" :key="i")
      StreamDeckButton(v-for="j in streamDeck.columns" :key="j")
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

    methods: {
      increment() {
        this.$store.commit('increment')
      }
    }
  }
</script>

<style lang="stylus">
  .stream-deck
    background: linear-gradient(#101011, #3e3c3f)
    width: 400px
    height: 250px
    border-radius: 0.25em
    display: flex
    align-items: center
    justify-content: center
    flex-direction: column

    .row {
      display: flex;
    }

    .stream-deck-button {
      margin: 0.7em
    }
</style>
