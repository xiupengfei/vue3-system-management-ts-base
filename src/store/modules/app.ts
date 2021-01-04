import defaultSettings, { componentSize } from '@/settings'
import { StoreOptions, Action, ActionContext } from 'vuex'
import { TOGGLE_SIDE_BAR } from '@/store/types/app'
import { getSidebarStatus, setSidebarStatus } from '@/utils/storage'

export interface IAppState {
  sidebar: {
    opened: boolean
  }
  size: componentSize
}

export default {
  namespaced: true,
  state: (): IAppState => ({
    sidebar: {
      opened: getSidebarStatus() !== 'closed',
    },
    size: componentSize.small
  }),
  mutations: {
    [TOGGLE_SIDE_BAR](state: IAppState) {
      state.sidebar.opened = !state.sidebar.opened
      setSidebarStatus(state.sidebar.opened ? 'opened' : 'closed')
    }
  },
  actions: {
    ToggleSideBar({ commit, state }: ActionContext<IAppState, any>) {
      commit('TOGGLE_SIDE_BAR')
    }
  },
  getters: {
    sidebar: (state: IAppState) => state.sidebar,
    size: (state: IAppState) => state.size,
  }
}
