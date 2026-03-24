import Vue from 'vue'
import Router from 'vue-router'

import Home from '../pages/HomePage.vue'
import Vote from '../pages/VotePage.vue'
import Result from '../pages/Result.vue'

Vue.use(Router)

export default new Router({
  mode: 'history', // URL 깔끔하게 (선택)
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/vote',
      name: 'Vote',
      component: Vote
    },
    {
      path: '/result',
      name: 'Result',
      component: Result
    }
  ]
})