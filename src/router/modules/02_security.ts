import { RouteRecordRaw } from 'vue-router'

import { BaseLayout } from '@/layouts'

const securityRoutes: RouteRecordRaw = {
  path: '/security',
  name: 'Security',
  component: BaseLayout,
  redirect: '/security/users',
  meta: {
    title: '安全管理',
    icon: 'security'
  },
  children: [
    {
      path: 'users',
      name: 'Users',
      component: () => import(/* webpackChunkName: "security_users" */ '@/views/security/users/index.vue'),
      meta: {
        title: '用户管理',
        icon: 'users'
      },
    },
    {
      path: 'groups',
      name: 'Groups',
      component: () => import(/* webpackChunkName: "security_groups" */ '@/views/security/groups/index.vue'),
      meta: {
        title: '用户组管理',
        icon: 'groups'
      },
    },
    {
      path: 'roles',
      name: 'Roles',
      component: () => import(/* webpackChunkName: "security_roles" */ '@/views/security/roles/index.vue'),
      meta: {
        title: '角色管理',
        icon: 'roles'
      },
    }
  ]
}

export default securityRoutes
