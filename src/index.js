import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import { remote } from 'electron'

const StreamDeckApi = remote.require('stream-deck-api')
const streamDeck = StreamDeckApi.getStreamDeck()

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV == 'development',

  state: {
    selectedButton: undefined,

    streamDecks: [{
      buttonCount: 15,
      rows: 3,
      columns: 5,
      buttonWidth: 72,
      buttonHeight: 72
    }]
  },

  getters: {
    selectedStreamDeck(state) {
      // TODO: Use this for now until I can lock down what I want the data format to look like.
      let streamDeck = state.streamDecks[0]
      streamDeck.buttons = new Array(streamDeck.buttonCount)

      for (let i = 0; i < streamDeck.buttonCount; i++) {
        streamDeck.buttons[i] = {
          number: i + 1,
          image: {
            sourceFile: undefined,
            sourceBitmap: undefined,
            dataUrl: undefined,
            options: {
              resize: 'fit',
              anchor: {
                horizontal: 'center',
                vertical: 'middle'
              },
              shift: {
                x: 0,
                y: 0
              }
            }
          }
        }
      }

      return streamDeck
    }
  },

  mutations: {
    selectButton(state, button) {
      state.selectedButton = button
    },

    drawImage(state, buffer) {
      if (!state.selectedButton) { return }
      streamDeck.drawImageBuffer(buffer, state.selectedButton.number)
    },

    setImage(state, bitmap) {
      state.selectedButton.image.sourceBitmap = bitmap
    },

    updateImageOptions(state, options) {
      state.selectedButton.image.options = options
    },

    saveDataURL(state, dataUrl) {
      state.selectedButton.image.dataUrl = dataUrl
    }
  },

  actions: {
    loadImage({ commit }, file) {
      createImageBitmap(file).then((bitmap) => {
        commit('setImage', bitmap)
      })
    }
  }
})

new Vue({
  el: '#app',
  store,
  render: (h) => h(App)
})

window.addEventListener('unload', () => {
  streamDeck.reset()
})
