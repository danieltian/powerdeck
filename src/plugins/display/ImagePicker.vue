<template lang="pug">
  .image-picker
    input(type="file" @change="onChange")
    canvas.canvas(ref="canvas" width="72" height="72")
</template>

<script>
  export default {
    computed: {
      context() {
        let context = this.$refs.canvas.getContext('2d')
        return context
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
            this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height)
            this.context.save()
            this.context.scale(-1, 1)
            this.context.drawImage(image, 0, 0, -72, 72)
            this.context.restore()

            let imageData = this.context.getImageData(0, 0, 72, 72)

            this.$store.commit('drawImage', {
              buffer: imageData.data,
              buttonNumber: 1
            })
          })

          image.src = reader.result
        })

        reader.readAsDataURL(file)
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>
