<template lang="pug">
  #app
    StreamDeck(:streamDeck="selectedStreamDeck")
    ImagePicker
</template>

<script>
  import { mapGetters } from 'vuex'
  import StreamDeck from './components/StreamDeck.vue'
  import ImagePicker from './plugins/display/ImagePicker.vue'

  export default {
    components: { StreamDeck, ImagePicker },
    computed: mapGetters(['selectedStreamDeck'])
  }
</script>

<style lang="stylus">
  h1
    color: orange
</style>
