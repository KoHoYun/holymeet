import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { supabase } from './services/'

Vue.prototype.$supabase = supabase
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
