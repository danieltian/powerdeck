<template lang="pug">
  #app
    StreamDeck(:streamDeck="selectedStreamDeck")
</template>

<script>
  import { mapGetters } from 'vuex'
  import StreamDeck from './components/StreamDeck.vue'

  export default {
    components: { StreamDeck },

    computed: mapGetters(['selectedStreamDeck'])
  }
</script>

<style lang="stylus">
  h1
    color: orange
</style>
