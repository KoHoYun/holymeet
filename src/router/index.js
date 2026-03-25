import Vue from 'vue'
import Router from 'vue-router'
import { supabase } from '@/services/supabase'

// user
import Main from '../pages/MainView.vue'
import Vote from '../pages/user/VoteView.vue'
import Result from '../pages/ResultView.vue'
import UserForm from '../pages/user/UserFormView.vue'

// admin
import AdminLogin from '../pages/admin/AdminLoginView.vue'
import AdminMain from '../pages/admin/AdminMainView.vue'
import AdminVote from '../pages/admin/AdminVoteView.vue'
import AdminSchedule from '../pages/admin/AdminScheduleView.vue'
import AdminScheduleCreate from '../pages/admin/AdminScheduleCreateView.vue'

Vue.use(Router)

const router = new Router({
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
      path: '/user',
      name: 'UserForm',
      component: UserForm
    },
    {
      path: '/admin',
      redirect: '/admin/login'
    },
    {
      path: '/admin/login',
      component: AdminLogin
    },
    {
      path: '/admin/main',
      name: 'AdminMain',
      component: AdminMain
    },
    {
      path: '/admin/vote',
      name: 'VoteAdmin',
      component: AdminVote
    },
    {
      path: '/admin/schedule/list',
      name: 'ScheduleAdmin',
      component: AdminSchedule
    },
    {
      path: '/admin/schedule/create',
      name: 'ScheduleCreateAdmin',
      component: AdminScheduleCreate
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (to.path.startsWith('/admin')) {
    if (to.path !== '/admin/login' && !user) {
      return next('/admin/login')
    }
  }

  next()
})

export default router