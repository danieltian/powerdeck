import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import { remote } from 'electron'

const StreamDeckApi = remote.require('stream-deck-api')
const streamDeck = StreamDeckApi.getStreamDeck()

// TODO: Use this for now until we need a more custom index.html page.
// NOTE: Leading semi-colon is needed, otherwise it acts like a function call for the previous line.
;(function () {
  var div = document.createElement('div')
  div.id = 'app'
  document.body.appendChild(div)
})()

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
        streamDeck.buttons[i] = { number: i + 1 }
      }

      return streamDeck
    }
  },

  mutations: {
    mouseDown(state, button) {
      streamDeck.drawColor(0xFFFFFF, button.number)
      state.selectedButton = button
    },

    mouseUp(state, button) {
      streamDeck.drawColor(0x000000, button.number)
    }
  }
})

new Vue({
  el: '#app',
  store,
  render: (h) => h(App)
})
