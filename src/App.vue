<template>
  <div id="app" class="clearfix">
    <router-view />
  </div>
</template>
<script lang="ts">
import { useMessage } from 'element3'
import { useRouter, useRoute } from 'vue-router'

export default {
  name: 'App',
  setup() {
    const message = useMessage()
    const router = useRouter()
    const route = useRoute()
    // console.log('router', router)
    // console.log('route', route.path)
    setTimeout(() => {
      message('sss')
    }, 1000)
  }
}
</script>
<style lang="scss"></style>
