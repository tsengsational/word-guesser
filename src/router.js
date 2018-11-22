import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Session from './views/Session.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/start',
      name: 'session',
      component: Session
    }
  ]
})
