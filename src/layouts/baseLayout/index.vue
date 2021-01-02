<template>
  <sidebar class="sidebar-container fl" test="1" />
  <router-view v-slot="{ Component }">
    <!-- <keep-alive> -->
    <transition name="fade-transform" mode="out-in">
      <component :is="Component" class="page-container fl" />
    </transition>
    <!-- </keep-alive> -->
  </router-view>
</template>
<script lang="ts">
import { useMessage } from 'element3'
import { useRoute } from 'vue-router'

import { Sidebar } from './components'

export default {
  name: 'BaseLayout',
  components: {
    Sidebar
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
.sidebar-container,
.page-container {
  height: inherit;
}
.page-container {
  width: calc(100% - #{$sideBarWidth});
}
.sidebar-container {
  background-color: $menuBg;
}
</style>
