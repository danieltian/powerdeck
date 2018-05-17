<template lang="pug">
  #app
    h1 {{ message }}
    input(type="text" v-model="message")

    StreamDeck
</template>

<script>
  import StreamDeck from './components/StreamDeck.vue'

  export default {
    components: { StreamDeck },

    data() {
      return {
        message: 'Hi from app'
      }
    }
  }
</script>

<style lang="stylus">
  h1
    color: orange
</style>
