import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueFire from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'

Vue.use(VueFire)
firebase.initializeApp({
    apiKey: "AIzaSyDfh_1cuMSy2qJ3DlvBmS2hFIH03svF02Y",
    authDomain: "word-guesser-20c9b.firebaseapp.com",
    databaseURL: "https://word-guesser-20c9b.firebaseio.com",
    projectId: "word-guesser-20c9b",
    storageBucket: "word-guesser-20c9b.appspot.com",
    messagingSenderId: "1057208886291"
})

export const db = firebase.firestore()

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
