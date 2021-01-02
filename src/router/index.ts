import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

/* Layout */
import { BaseLayout } from '@/layouts'

/* Router modules */
const modulesFiles = require.context('./modules', false, /\.ts$/)

const modules: RouteRecordRaw[] = []

modulesFiles.keys().map(modulePath => {
  // const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules.push(value.default)
})

/**
 * 说明: 只有当路由子菜单长度大于等于1时才会出现 children.length >= 1
 *
 * # 当设置 noredirect 的时候该路由在面包屑导航中不可被点击
 * redirect: noRedirect
 *
 * # 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题(很重要 !!!)
 * name:'router-name'
 *
 * # metadata
 * meta : {
    roles: ['admin']             // 设置该路由进入角色
    title: 'title'               // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'             // 设置该路由的图标
    noCache: true                // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    affix: true                  // 如果为true标签将固定在 tags-view
    breadcrumb: false            // 如果设置为false，则不会在breadcrumb面包屑中显示
    hidden: true                 // 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1  默认： false
    alwaysShow: true             // 可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
                                 // 当一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
                                 // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
                                 // 若不管路由下面的 children 声明的个数都显示根路由

  }
 */

export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/redirect',
    component: BaseLayout,
    meta: { hidden: true },
    children: [
      {
        path: '/redirect/:path*',
        component: () => import(/* webpackChunkName: "redirect" */ '@/components/redirect.vue')
      }
    ]
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "404" */ '@/views/common/404.vue'),
    meta: { hidden: true }
  },
  {
    path: '/',
    component: BaseLayout,
    redirect: '/dashboard',
    meta: {
      title: '测试'
    },
    children: [
      {
        path: 'dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue'),
        name: 'Dashboard',
        meta: {
          title: 'Dashboard'
        }
      },
      {
        path: 'about',
        name: 'About',
        component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
        meta: {
          title: 'About'
        }
      }
    ]
  },
  ...modules,
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    meta: { hidden: true }
  }
]

export const asyncRoutes: Array<RouteRecordRaw> = []

const routes: Array<RouteRecordRaw> = constantRoutes

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
