<template>
  <div id="tags-view-container" class="tags-view-container">
    <router-link
      v-for="tag in visitedViews"
      ref="tag"
      :key="tag.path"
      :class="isActive(tag) ? 'active' : ''"
      :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
      tag="span"
      class="tags-view-item pointer"
      @click.middle="!isAffix(tag) ? closeSelectedTag(tag) : ''"
      @contextmenu.prevent="openMenu(tag, $event)"
    >
      {{ tag.meta.title }}
      <span
        v-if="!isAffix(tag)"
        class="close-btn"
        @click.prevent.stop="closeSelectedTag(tag)"
        >×</span
      >
    </router-link>
    <ul
      v-show="visible"
      :style="{ left: left + 'px', top: top + 'px' }"
      class="contextmenu"
    >
      <li @click="refreshSelectedTag(selectedTab)">刷新</li>
      <li v-if="!isAffix(selectedTab)" @click="closeSelectedTag(selectedTab)">
        关闭
      </li>
      <li @click="closeOthersTags">关闭其他</li>
      <li @click="closeAllTags(selectedTab)">关闭所有</li>
    </ul>
  </div>
</template>

<script lang="ts">
import path from 'path'
import { reactive, toRefs, ref, watch, onMounted, nextTick } from 'vue'
import { useRoute, RouteRecord, RouteRecordRaw, useRouter } from 'vue-router'
import { useStore } from 'vuex'
// import { PermissionModule } from '@/store/modules/permission'
import { asyncRoutes, constantRoutes } from '@/router'
import { ITabView, ITabsState } from '@/store/modules/tabs'
// import ScrollPane from './ScrollPane.vue'

interface IReactives {
  top: number
  left: number
  selectedTab: ITabView
  affixTabs: ITabView[]
}

export default {
  name: 'Tabs',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore<{ tabs: ITabsState }>()
    const visible = ref(false)
    const reactives = reactive<IReactives>({
      top: 0,
      left: 0,
      selectedTab: {} as ITabView,
      affixTabs: []
    })
    const routes = constantRoutes
    const isActive = (r: ITabView) => r.path === route.path
    const isAffix = (r: RouteRecordRaw) => r.meta?.affix

    const filterAffixTags = (routes: RouteRecordRaw[], basePath = '/') => {
      let tags: ITabView[] = []
      routes.forEach(route => {
        if (isAffix(route)) {
          const tabPath: string = path.resolve(basePath, route.path)
          tags.push({
            fullPath: tabPath,
            path: tabPath,
            name: route.name as string,
            meta: { ...route.meta }
          })
        }
        if (route.children) {
          const childTags = filterAffixTags(route.children, route.path)
          if (childTags.length >= 1) {
            tags = [...tags, ...childTags]
          }
        }
      })
      return tags
    }

    const initTags = () => {
      reactives.affixTabs = filterAffixTags(routes)
      for (const tab of reactives.affixTabs) {
        // Must have tab name
        if (tab.name) {
          store.dispatch('tabs/addVisitedView', tab)
        }
      }
    }

    const addTags = () => {
      const { name } = route
      if (name) {
        store.dispatch('tabs/addView', route)
      }
      return false
    }

    const moveToCurrentTag = () => {
      // const tags = this.$refs.tag as any[]
      // this.$nextTick(() => {
      //   for (const tag of tags) {
      //     if ((tag.to as ITabView).path === this.$route.path) {
      //       ;(this.$refs.scrollPane as ScrollPane).moveToTarget(tag as any)
      //       // 如果查询不同，则更新
      //       if ((tag.to as ITabView).fullPath !== this.$route.fullPath) {
      //         TagsViewModule.updateVisitedView(this.$route as ITabView)
      //       }
      //       break
      //     }
      //   }
      // })
    }

    const refreshSelectedTag = (view: ITabView) => {
      store.dispatch('tabs/delCachedView', view)
      const { fullPath } = view
      nextTick(() => {
        router.replace({
          path: '/redirect' + fullPath
        })
      })
    }

    const toLastView = (visitedViews: ITabView[], view: ITabView) => {
      const latestView = visitedViews.slice(-1)[0]
      if (latestView) {
        router.push(latestView)
      } else {
        // 默认重定向到主页如果没有"标记"
        if (view.name === 'Dashboard') {
          // 重新加载首页
          router.replace({ path: '/redirect' + view.fullPath })
        } else {
          router.push('/')
        }
      }
    }
    const closeSelectedTag = (view: ITabView) => {
      store.dispatch('tabs/delView', view)
      if (isActive(view)) {
        toLastView(store.state.tabs.visitedViews, view)
      }
    }

    const closeOthersTags = () => {
      router.push(reactives.selectedTab)
      store.dispatch('tabs/delOthersViews', reactives.selectedTab)
      moveToCurrentTag()
    }

    const closeAllTags = (view: ITabView) => {
      store.dispatch('tabs/delAllViews')
      if (reactives.affixTabs.some(tab => tab.path === route.path)) {
        return
      }
      toLastView(store.state.tabs.visitedViews, view)
    }

    const openMenu = (tab: ITabView, e: MouseEvent) => {
      console.log(e)
      const menuMinWidth = 105
      const offsetLeft = (e.target as HTMLElement).getBoundingClientRect().left // container margin left
      const offsetWidth = (e.target as HTMLElement).offsetWidth // container width
      const maxLeft = offsetWidth - menuMinWidth // left boundary
      const left = offsetLeft + 15 // 15: margin right
      if (left > maxLeft) {
        reactives.left = maxLeft
      } else {
        reactives.left = left
      }
      reactives.top = 15
      reactives.selectedTab = tab
      visible.value = true
    }

    const closeMenu = () => {
      visible.value = false
    }

    watch(route, () => {
      addTags()
      moveToCurrentTag()
    })

    watch(visible, (value: boolean) => {
      if (value) {
        document.body.addEventListener('click', closeMenu)
      } else {
        document.body.removeEventListener('click', closeMenu)
      }
    })

    onMounted(() => {
      initTags()
      addTags()
    })

    return {
      visible,
      visitedViews: store.state.tabs.visitedViews,
      ...toRefs(reactives),
      openMenu,
      closeAllTags,
      closeSelectedTag,
      closeOthersTags,
      refreshSelectedTag,
      isAffix,
      isActive
    }
  }
}
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  padding-top: 4px;
  position: relative;
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background-color: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;

      &:first-of-type {
        margin-left: 15px;
      }

      &:last-of-type {
        margin-right: 15px;
      }

      &.active {
        background-color: $tagViewActiveBg;
        color: $tagViewActiveTextColor;
        border-color: $tagViewActiveBg;

        &::before {
          content: '';
          background-color: $themeColor;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
      .close-btn {
        display: inline-block;
        width: 16px;
        height: 16px;
        transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
        border-radius: 50%;
        line-height: 14px;
        text-align: center;
        &:hover {
          background-color: $--color-danger;
          color: #fff;
        }
      }
    }
  }

  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);

    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;

      &:hover {
        background: #eee;
        color: $themeColor;
      }
    }
  }
}
</style>
