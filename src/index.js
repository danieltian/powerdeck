import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'

// TODO: Use this for now until we need a more custom index.html page.
(function () {
  var div = document.createElement('div')
  div.id = 'app'
  document.body.appendChild(div)
})()

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment(state) {
      state.count++
    }
  }
})

new Vue({
  el: '#app',
  store,
  render: (h) => h(App)
})
