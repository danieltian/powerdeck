<template lang="pug">
  .anchor-point(:class="{ selected: isSelected }" @click="sendPosition") {{ icon }}
</template>

<script>
  export default {
    props: {
      position: {
        type: Object,
        required: true
      },

      selected: {
        type: Object,
        required: true
      },

      icon: {
        type: String,
        required: true
      }
    },

    computed: {
      isSelected() {
        return (this.selected.horizontal == this.position.horizontal) && (this.selected.vertical == this.position.vertical)
      }
    },

    methods: {
      sendPosition(e) {
        e.position = this.position
        this.$emit('click', e)
      }
    }
  }
</script>
