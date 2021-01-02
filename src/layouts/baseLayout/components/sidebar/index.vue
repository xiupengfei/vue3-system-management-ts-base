<template>
  <div class="sidebar-container">
    <el-scrollbar wrap-class="scrollbar-wrapper" style="height: 100%">
      <el-menu
        class="side-bar"
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText"
        :unique-opened="false"
        :collapse-transition="true"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
          :is-collapse="isCollapse"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script lang="ts">
import { ref, SetupContext } from 'vue'
import { useMessage } from 'element3'
import { useRoute } from 'vue-router'

import { asyncRoutes, constantRoutes } from '@/router'
import variables from '@/styles/_variables.scss'
import SidebarItem from './item.vue'

export default {
  name: 'SideBar',
  components: { SidebarItem },
  props: ['test'],
  setup(props: any, context: SetupContext) {
    const route = useRoute()
    const isCollapse = ref(false)
    const { meta, path } = route
    const activeMenu = meta.activeMenu ? meta.activeMenu : path

    return {
      isCollapse,
      routes: constantRoutes,
      activeMenu,
      variables
    }
  }
}
</script>
<style lang="scss">
.sidebar-container {
  .scrollbar-wrapper {
    overflow-x: hidden !important;
  }
  .el-scrollbar__view {
    height: 100%;
  }

  .el-scrollbar__bar {
    &.is-vertical {
      right: 0px;
    }

    &.is-horizontal {
      display: none;
    }
  }
}
</style>
<style lang="scss" scoped>
.side-bar {
  width: $sideBarWidth;
  border: none;
}
</style>
