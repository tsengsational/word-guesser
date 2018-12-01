import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    secretWord: "",
    score: {
      wins: 0,
      losses: 0
    },
    difficulty: 1,
    name: "",
    bank: 3,
    menuOpen: false,
    hints: {}
  },
  mutations: {
    setProperty(state, payload) {
      state[payload[0]] = payload[1];
    },
    addToBank(state, payload) {
      state.bank += payload
    },
    decrementBank(state, payload) {
      state.bank -= payload
    },
    toggleMenu(state) {
      state.menuOpen = !state.menuOpen;
    }
  },
  actions: {

  }
})
