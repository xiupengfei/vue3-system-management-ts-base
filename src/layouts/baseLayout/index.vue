<template>
  <section class="base-layout" ref="test">
    <side-bar class="sidebar-container" />
    <section class="page-container">
      <header-bar />
      <tabs />
      <section class="main-container">
        <router-view #default="{ Component }">
          <!-- <keep-alive> -->
          <transition name="fade-transform" mode="out-in">
            <component :is="Component" class="page" />
          </transition>
          <!-- </keep-alive> -->
        </router-view>
      </section>
    </section>
  </section>
</template>
<script lang="ts">
// import { useMessage } from 'element3'
// import { SetupContext } from 'vue'
import { useRoute } from 'vue-router'

import { SideBar, HeaderBar, Tabs } from './components'

export default {
  name: 'BaseLayout',
  components: {
    SideBar,
    HeaderBar,
    Tabs
  },
  setup() {
    const route = useRoute()
    const path = route.path
    return {
      path
    }
  }
}
</script>
<style lang="scss" scoped>
.base-layout {
  height: 100%;
  display: flex;
  .sidebar-container {
    background-color: $menuBg;
    height: inherit;
  }
  .page-container {
    height: inherit;
    flex: 1;
    display: flex;
    flex-direction: column;
    .main-container {
      flex: 1;
      padding: 16px;
      & > .page {
        height: 100%;
      }
    }
  }
}
</style>
