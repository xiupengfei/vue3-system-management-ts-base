<template>
  <router-view #default="{ Component }">
    <!-- <keep-alive> -->
    <transition name="fade-transform" mode="out-in">
      <component :is="Component" />
    </transition>
    <!-- </keep-alive> -->
  </router-view>
</template>
<script lang="ts">
import { useRoute } from 'vue-router'

export default {
  name: 'BlankLayout',
  components: {},
  setup() {
    const route = useRoute()
    const path = route.path
    return {
      path
    }
  }
}
</script>
