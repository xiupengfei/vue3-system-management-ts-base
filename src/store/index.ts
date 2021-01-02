import { createStore, Module } from 'vuex'

const modulesFiles = require.context('./modules', false, /\.ts$/)
const modules: { [key: string]: Module<any, any> } = {}
modulesFiles.keys().map(mp => modules[mp.replace(/^\.\/(.*)\.\w+$/, '$1')] = modulesFiles(mp).default)

export default createStore({
  // state: {
  // },
  // mutations: {
  // },
  // actions: {
  // },
  modules
})
