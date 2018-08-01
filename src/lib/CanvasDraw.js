class CanvasDraw {
  constructor(element, width = 72, height = 72) {
    if (element instanceof HTMLElement && element.tagName == 'CANVAS') {
      this.context = element.getContext('2d')
    }
    else if (element instanceof CanvasRenderingContext2D) {
      this.context = element
    }
    else {
      throw new Error('element must either be a canvas element or a canvas 2d context, got: `${element}`')
    }

    this.width = width
    this.height = height
  }

  clear() {
    this.context.clearRect(0, 0, this.width, this.height)
  }

  drawImage(image) {
    console.log('draw image in canvas', image)
    switch (image.options.resize) {
      case 'fit':
        this.drawImageFit(image.sourceBitmap, image.options.anchor, image.options.shift)
        break
      case 'cover':
        this.drawImageCover(image.sourceBitmap, image.options.anchor, image.options.shift)
        break
      case 'squeeze':
      default:
        this.context.drawImage(image.sourceBitmap, image.options.shift.x, image.options.shift.y, this.width, this.height)
    }
  }

  drawImageFit(image, anchor, shift) {
    let scale = (image.width > image.height) ? (this.width / image.width) : (this.height / image.height)
    this.drawImageScaled(image, scale, anchor, shift)
  }

  drawImageCover(image, anchor, shift) {
    let scale = (image.width < image.height) ? (this.width / image.width) : (this.height / image.height)
    this.drawImageScaled(image, scale, anchor, shift)
  }

  drawImageScaled(image, scale, anchor, shift) {
    let newWidth = Math.round(image.width * scale)
    let newHeight = Math.round(image.height * scale)
    let position = this.getCanvasStartPosition(newWidth, newHeight, anchor, shift)

    this.context.drawImage(image, position.x, position.y, newWidth, newHeight)
  }

  getCanvasStartPosition(imageWidth, imageHeight, anchor, shift) {
    let x = 0
    let y = 0

    if (anchor.horizontal == 'center') {
      x = Math.round((this.width / 2) - (imageWidth / 2))
    }
    else if (anchor.horizontal == 'right') {
      x = this.width - imageWidth
    }

    if (anchor.vertical == 'middle') {
      y = Math.round((this.height / 2) - (imageHeight / 2))
    }
    else if (anchor.vertical == 'bottom') {
      y = this.height - imageHeight
    }

    x = x + shift.x
    y = y + shift.y

    return { x, y }
  }

  getImageData() {
    return this.context.getImageData(0, 0, this.width, this.height).data
  }

  toDataURL() {
    return this.context.canvas.toDataURL()
  }
}

export default CanvasDraw
