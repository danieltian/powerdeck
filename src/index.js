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
    streamDecks: [{
      buttonCount: 15,
      rows: 3,
      columns: 5
    }]
  },

  getters: {
    selectedStreamDeck(state) {
      return state.streamDecks[0]
    }
  },

  mutations: {
    increment(state) {
      state.count++
    },

    mouseDown(state, buttonNumber) {
      streamDeck.drawColor(0xFFFFFF, buttonNumber)
    },

    mouseUp(state, buttonNumber) {
      streamDeck.drawColor(0x000000, buttonNumber)
    }
  }
})

new Vue({
  el: '#app',
  store,
  render: (h) => h(App)
})
