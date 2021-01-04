<template>
  <el-scrollbar
    class="side-bar-scroll"
    wrap-class="scrollbar-wrapper"
    style="height: 100%"
  >
    <el-menu
      class="side-bar"
      :default-active="activeMenu"
      :collapse="!sidebar.opened"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :active-text-color="variables.menuActiveText"
      :unique-opened="false"
      :collapse-transition="false"
      mode="vertical"
    >
      <sidebar-item
        v-for="route in routes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
        :is-collapse="!sidebar.opened"
      />
    </el-menu>
  </el-scrollbar>
</template>
<script lang="ts">
// import { ref, SetupContext } from 'vue'
import { useMessage } from 'element3'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

import { asyncRoutes, constantRoutes } from '@/router'
import { IAppState } from '@/store/modules/app'
import variables from '@/styles/_variables.scss'
import SidebarItem from './item.vue'

export default {
  name: 'SideBar',
  components: { SidebarItem },
  setup() {
    const route = useRoute()
    const store = useStore<{ app: IAppState }>()
    const { meta, path } = route
    const activeMenu = meta.activeMenu ? meta.activeMenu : path
    // console.log('store.state.app.sidebar', store.state.app.sidebar)
    return {
      sidebar: store.state.app.sidebar,
      routes: constantRoutes,
      activeMenu,
      variables
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .scrollbar-wrapper {
  overflow-x: hidden !important;
}
::v-deep .el-scrollbar__view {
  height: 100%;
}

::v-deep .el-scrollbar__bar {
  &.is-vertical {
    right: 0px;
  }

  &.is-horizontal {
    display: none;
  }
}
.side-bar {
  border: none;
  transition: 0.2s;
  &:not(.el-menu--collapse) {
    width: $sideBarWidth;
  }
}
</style>
