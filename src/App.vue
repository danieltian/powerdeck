<template lang="pug">
  #app
    StreamDeck(:streamDeck="selectedStreamDeck")
    ImagePicker(v-if="selectedButton" :button="selectedButton")
</template>

<script>
  import { mapGetters, mapState } from 'vuex'
  import StreamDeck from './components/StreamDeck.vue'
  import ImagePicker from './plugins/display/ImagePicker.vue'

  export default {
    components: { StreamDeck, ImagePicker },
    computed: {
      ...mapState(['selectedButton']),
      ...mapGetters(['selectedStreamDeck'])
    }
  }
</script>

<style lang="stylus">
  h1
    color: orange
</style>
