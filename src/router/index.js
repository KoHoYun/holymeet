import Vue from 'vue'
import Router from 'vue-router'

import Main from '../pages/MainView.vue'
import Vote from '../pages/VoteView.vue'
import Result from '../pages/ResultView.vue'
import VoteAdmin from '../pages/VoteAdminView.vue'

Vue.use(Router)

export default new Router({
  mode: 'history', // URL 깔끔하게 (선택)
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Main
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
    },
    {
      path: '/admin/vote',
      name: 'VoteAdmin',
      component: VoteAdmin
    }
  ]
})