<template lang="pug">
  .image-picker
    input(type="file" @change="onChange" accept=".png, .jpg, .jpeg, .bmp")
    canvas.canvas(ref="canvas" width="72" height="72")

    .resize
      .resize-option
        input(type="radio" id="fit" value="fit" v-model="resize")
        label(for="fit") Fit entire image within button (preserves aspect ratio)
      .resize-option
        input(type="radio" id="cover" value="cover" v-model="resize")
        label(for="cover") Fill entire button with image (preserves aspect ratio)
      .resize-option
        input(type="radio" id="contain" value="contain" v-model="resize")
        label(for="contain") Squeeze image into button size (aspect ratio not preserved)
      .resize-option
        input(type="radio" id="resize" value="resize" v-model="resize")
        label(for="resize") Resize image

    .anchor(@click="setAnchorPoint")
      .anchor-row
        AnchorPoint(:position="{ vertical: 'top', horizontal: 'left' }" :selected="options.anchor" icon="🡬")
        AnchorPoint(:position="{ vertical: 'top', horizontal: 'center' }" :selected="options.anchor" icon="🡩")
        AnchorPoint(:position="{ vertical: 'top', horizontal: 'right' }" :selected="options.anchor" icon="🡭")
      .anchor-row
        AnchorPoint(:position="{ vertical: 'middle', horizontal: 'left' }" :selected="options.anchor" icon="🡨")
        AnchorPoint(:position="{ vertical: 'middle', horizontal: 'center' }" :selected="options.anchor" icon="⏺")
        AnchorPoint(:position="{ vertical: 'middle', horizontal: 'right' }" :selected="options.anchor" icon="🡪")
      .anchor-row
        AnchorPoint(:position="{ vertical: 'bottom', horizontal: 'left' }" :selected="options.anchor" icon="🡯")
        AnchorPoint(:position="{ vertical: 'bottom', horizontal: 'center' }" :selected="options.anchor" icon="🡫")
        AnchorPoint(:position="{ vertical: 'bottom', horizontal: 'right' }" :selected="options.anchor" icon="🡮")

    .shift
      label X:
      input(type="number" v-model.number="shiftX")
      label Y:
      input(type="number" v-model.number="shiftY")
</template>

<script>
  import AnchorPoint from './AnchorPoint.vue'
  import CanvasDraw from '../../lib/CanvasDraw'

  export default {
    components: { AnchorPoint },

    props: {
      button: {
        type: Object,
        required: true
      }
    },

    computed: {
      canvas() {
        let canvas = new CanvasDraw(this.$refs.canvas)
        return canvas
      },

      options() {
        return this.button.image.options
      },

      resize: {
        get() {
          return this.options.resize
        },
        set(value) {
          let options = Object.assign({}, this.options)
          options.resize = value
          this.$store.commit('updateImageOptions', options)
        }
      },

      shiftX: {
        get() {
          return this.options.shift.x
        },
        set(value) {
          let options = Object.assign({}, this.options)
          options.shift.x = value
          this.$store.commit('updateImageOptions', options)
        }
      },

      shiftY: {
        get() {
          return this.options.shift.y
        },
        set(value) {
          let options = Object.assign({}, this.options)
          options.shift.y = value
          this.$store.commit('updateImageOptions', options)
        }
      }
    },

    watch: {
      'button.image.sourceBitmap'() {
        this.canvas.clear()
        this.canvas.drawImage(this.button.image)
        this.$store.commit('saveDataURL', this.canvas.toDataURL())
        this.$store.commit('drawImage', this.canvas.getImageData())
      },

      'button.image.options'() {
        this.canvas.clear()
        this.canvas.drawImage(this.button.image)
        this.$store.commit('saveDataURL', this.canvas.toDataURL())
        this.$store.commit('drawImage', this.canvas.getImageData())
      }
    },

    methods: {
      onChange(e) {
        this.$store.dispatch('loadImage', e.target.files[0])
      },

      setAnchorPoint(e) {
        let options = Object.assign({}, this.button.image.options)
        options.anchor = e.position
        console.log('set anchor point', options)
        this.$store.commit('updateImageOptions', options)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .canvas
    border: 1px solid black
    border-radius: 0.5em

  .anchor
    display: inline-block
    border: 1px solid #A3A3A3

  .anchor-row
    display: flex

    &:last-of-type .anchor-point
      border-bottom: none

  .anchor-point
    width: 1.5em
    height: 1.5em
    border-bottom: 1px solid #DCDCDC
    border-right: 1px solid #DCDCDC
    display: flex
    align-items: center
    justify-content: center
    cursor: pointer

    &.selected
      background-color: #90C3D4

    &:last-of-type
      border-right: none
</style>
