import { RouteRecordRaw } from 'vue-router'

import { BaseLayout } from '@/layouts'

const dashboardRoutes: RouteRecordRaw = {
  path: '/',
  component: BaseLayout,
  redirect: '/dashboard',
  meta: {
    title: 'Dashboard',
    icon: 'dashboard',
    // alwaysShow: true
  },
  children: [
    {
      path: 'dashboard',
      component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue'),
      name: 'Dashboard',
      meta: {
        title: 'Dashboard',
        icon: 'dashboard'
      }
    }
  ]
}

export default dashboardRoutes
