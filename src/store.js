import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    secretWord: "",
    score: 0
  },
  mutations: {
    setProperty(state, payload) {
      state[payload[0]] = payload[1];
    }
  },
  actions: {

  }
})
