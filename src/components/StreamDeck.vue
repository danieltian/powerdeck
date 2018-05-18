<template lang="pug">
  .stream-deck
    | Count: {{ count }}
    button(@click="increment") Increment
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    computed: mapState(['count']),

    methods: {
      increment() {
        this.$store.commit('increment')
      }
    }
  }
</script>

<style lang="stylus">
  .stream-deck
    background: linear-gradient(#dcdcdc, #fefefe)
    width: 500px
    height: 500px
    border-radius: 0.5em
</style>
