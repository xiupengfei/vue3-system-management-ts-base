import { createApp } from 'vue'

import Element3 from 'element3'
import { VueSvgIconPlugin } from '@yzfe/vue3-svgicon'
import '@yzfe/svgicon/lib/svgicon.css'
// import VueI18n from 'vue-i18n'
import router from '@/router'
import store from '@/store'
// import 'normalize.css'
// import 'element3/lib/theme-chalk/index.css'
import '@/styles/index.scss'
import App from '@/App.vue'
import Icon from '@/icons/index.vue'

// console.log(store.getters['app/doubleCount'])

// 注册全局组件
// Object.keys(components).forEach(key => {
//   Vue.component(key, (components as { [key: string ]: Function })[key])
// })

createApp(App)
  .use(store)
  .use(router)
  // .use(VueI18n)
  .use(Element3, {
    size: 'small',
    zIndex: 3000
  })
  .use(VueSvgIconPlugin, { tagName: 'icon' })
  .component('svg-icon', Icon)
  .mount('#root')
