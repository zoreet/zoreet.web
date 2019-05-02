import Vue from 'vue/dist/vue.js'
import Router from 'vue-router'

Vue.use(Router)

import Tasks from '@/views/Tasks.vue'
import Report from '@/views/Report.vue'
import Settings from '@/views/Settings.vue'

export default new Router({
  routes: [
    {
      path: '/',
      component: Tasks,
    },
    {
      path: '/report',
      component: Report,
    },
    {
      path: '/settings',
      component: Settings,
    },
  ],
})
