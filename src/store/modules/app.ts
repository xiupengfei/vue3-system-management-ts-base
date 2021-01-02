import defaultSettings, { componentSize } from '@/settings'

export interface IAppState {
  sidebar: {
    opened: boolean
    withoutAnimation: boolean
  }
  size: componentSize
}

export default {
  namespaced: true,
  state: (): IAppState => ({
    sidebar: {
      opened: true,
      withoutAnimation: false
    },
    size: componentSize.small
  }),
  mutations: {
    increment(state: IAppState) {
      state.sidebar
    }
  },
  getters: {
    sidebar: (state: IAppState) => state.sidebar,
    size: (state: IAppState) => state.size,
  }
}
