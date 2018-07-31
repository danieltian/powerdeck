<template lang="pug">
  .image-picker
    input(type="file" @change="onChange" accept=".png, .jpg, .jpeg, .bmp")
    canvas.canvas(ref="canvas" width="72" height="72")

    .resize
        .resize-option
          input(type="radio" id="fit" value="fit" v-model="selectedResize")
          label(for="fit") Fit entire image within button (preserves aspect ratio)
        .resize-option
          input(type="radio" id="cover" value="cover" v-model="selectedResize")
          label(for="cover") Fill entire button with image (preserves aspect ratio)
        .resize-option
          input(type="radio" id="contain" value="contain" v-model="selectedResize")
          label(for="contain") Squeeze image into button size (aspect ratio not preserved)
        .resize-option
          input(type="radio" id="resize" value="resize" v-model="selectedResize")
          label(for="resize") Resize image

    .anchor(@click="setAnchorPoint")
      .anchor-row
        AnchorPoint(position="top left" :selected="selectedAnchor" icon="🡬")
        AnchorPoint(position="top center" :selected="selectedAnchor" icon="🡩")
        AnchorPoint(position="top right" :selected="selectedAnchor" icon="🡭")
      .anchor-row
        AnchorPoint(position="middle left" :selected="selectedAnchor" icon="🡨")
        AnchorPoint(position="middle center" :selected="selectedAnchor" icon="⏺")
        AnchorPoint(position="middle right" :selected="selectedAnchor" icon="🡪")
      .anchor-row
        AnchorPoint(position="bottom left" :selected="selectedAnchor" icon="🡯")
        AnchorPoint(position="bottom center" :selected="selectedAnchor" icon="🡫")
        AnchorPoint(position="bottom right" :selected="selectedAnchor" icon="🡮")
</template>

<script>
  import AnchorPoint from './AnchorPoint.vue'
  import CanvasDraw from '../../lib/CanvasDraw'

  export default {
    components: { AnchorPoint },

    data() {
      return {
        selectedAnchor: 'middle center',
        selectedResize: 'fit'
      }
    },

    computed: {
      anchor() {
        let parts = this.selectedAnchor.split(' ')
        return {
          vertical: parts[0],
          horizontal: parts[1]
        }
      }
    },

    methods: {
      onChange(e) {
        let file = e.target.files[0]
        if (!file) { return }

        let reader = new FileReader()
        let image = new Image()

        reader.addEventListener('load', () => {
          image.addEventListener('load', () => {
            var canvas = new CanvasDraw(this.$refs.canvas)
            canvas.clear()
            canvas.drawImage(image, {
              resize: this.selectedResize,
              anchor: this.anchor
            })

            let imageData = canvas.getImageData()

            this.$store.commit('drawImage', {
              buffer: imageData,
              buttonNumber: 1
            })
          })

          e.target.value = null
          image.src = reader.result
        })

        reader.readAsDataURL(file)
      },

      setAnchorPoint(e) {
        this.selectedAnchor = e.target.getAttribute('position')
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
