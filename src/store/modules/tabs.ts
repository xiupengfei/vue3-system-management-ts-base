import { StoreOptions, Action, ActionContext } from 'vuex'
import { RouteRecord } from 'vue-router'
import {
  ADD_VISITED_VIEW,
  ADD_CACHED_VIEW,
  DEL_VISITED_VIEW,
  DEL_CACHED_VIEW,
  DEL_OTHERS_VISITED_VIEWS,
  DEL_OTHERS_CACHED_VIEWS,
  DEL_ALL_VISITED_VIEWS,
  DEL_ALL_CACHED_VIEWS,
  UPDATE_VISITED_VIEW,
} from '@/store/types/tabs'

export interface ITabView extends Partial<RouteRecord> {
  title?: string
  name?: string | undefined
  fullPath: string
}

export interface ITabsState {
  visitedViews: ITabView[]
  cachedViews: (string | undefined)[]
}

export default {
  namespaced: true,
  state: (): ITabsState => ({
    visitedViews: [],
    cachedViews: [],
  }),
  mutations: {
    [ADD_VISITED_VIEW](state: ITabsState, view: ITabView) {
      if (state.visitedViews.some(v => v.path === view.path)) return
      state.visitedViews.push(
        Object.assign({}, view, {
          title: view.meta?.title || 'no-name'
        })
      )
    },
    [ADD_CACHED_VIEW](state: ITabsState, view: ITabView) {
      if (state.cachedViews.includes(view.name)) return
      if (!view.meta?.noCache) {
        state.cachedViews.push(view.name)
      }
    },
    [DEL_VISITED_VIEW](state: ITabsState, view: ITabView) {
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          state.visitedViews.splice(i, 1)
          break
        }
      }
    },
    [DEL_CACHED_VIEW](state: ITabsState, view: ITabView) {
      const index = state.cachedViews.indexOf(view.name)
      index > -1 && state.cachedViews.splice(index, 1)
    },
    [DEL_OTHERS_VISITED_VIEWS](state: ITabsState, view: ITabView) {
      state.visitedViews = state.visitedViews.filter(v => {
        return v.meta?.affix || v.path === view.path
      })
    },
    [DEL_OTHERS_CACHED_VIEWS](state: ITabsState, view: ITabView) {
      const index = state.cachedViews.indexOf(view.name)
      if (index > -1) {
        state.cachedViews = state.cachedViews.slice(index, index + 1)
      } else {
        // if index === -1, 都不缓存
        state.cachedViews = []
      }
    },
    [DEL_ALL_VISITED_VIEWS](state: ITabsState) {
      state.visitedViews = state.visitedViews.filter(tab => tab.meta?.affix)
    },
    [DEL_ALL_CACHED_VIEWS](state: ITabsState) {
      state.cachedViews = []
    },
    [UPDATE_VISITED_VIEW](state: ITabsState, view: ITabView) {
      for (let v of state.visitedViews) {
        if (v.path === view.path) {
          v = Object.assign(v, view)
          break
        }
      }
    }
  },
  actions: {
    addView({ commit, state }: ActionContext<ITabsState, any>, view: ITabView) {
      commit(ADD_VISITED_VIEW, view)
      commit(ADD_CACHED_VIEW, view)
    },
    addVisitedView({ commit, state }: ActionContext<ITabsState, any>, view: ITabView) {
      commit(ADD_VISITED_VIEW, view)
    },
    delView({ commit, state }: ActionContext<ITabsState, any>, view: ITabView) {
      commit(DEL_VISITED_VIEW, view)
    },
    delCachedView({ commit, state }: ActionContext<ITabsState, any>, view: ITabView) {
      commit(DEL_CACHED_VIEW, view)
    },
    delOthersViews({ commit, state }: ActionContext<ITabsState, any>, view: ITabView) {
      commit(DEL_OTHERS_VISITED_VIEWS, view)
      commit(DEL_OTHERS_CACHED_VIEWS, view)
    },
    delAllViews({ commit, state }: ActionContext<ITabsState, any>) {
      commit(DEL_ALL_VISITED_VIEWS)
      commit(DEL_ALL_CACHED_VIEWS)
    },
    delAllCachedViews({ commit, state }: ActionContext<ITabsState, any>) {
      commit(DEL_ALL_CACHED_VIEWS)
    },
    updateVisitedView({ commit, state }: ActionContext<ITabsState, any>, view: ITabView) {
      commit(UPDATE_VISITED_VIEW, view)
    }
  },
  getters: {
    visitedViews: (state: ITabsState) => state.visitedViews,
    cachedViews: (state: ITabsState) => state.cachedViews,
  }
}
