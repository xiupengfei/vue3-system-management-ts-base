<template>
  <el-breadcrumb class="app-breadcrumb not-select" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="index">
        <span
          v-if="
            item.redirect === 'noredirect' || index === breadcrumbs.length - 1
          "
          class="no-redirect"
        >
          {{ item.meta.title }}
        </span>
        <a v-else @click.prevent="handleLink(item)">
          {{ item.meta.title }}
        </a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script lang="ts">
import { reactive, toRefs, watch, onBeforeMount } from 'vue'
import { useRoute, useRouter, RouteRecord } from 'vue-router'

interface IReactives {
  breadcrumbs: RouteRecord[]
}

export default {
  name: 'Breadcrumb',
  setup() {
    const route = useRoute()
    const router = useRouter()

    const reactives = reactive<IReactives>({
      breadcrumbs: []
    })

    const getBreadcrumb = () => {
      const matched = route.matched.filter(item => item.meta?.title)
      reactives.breadcrumbs = matched.filter(item => {
        return item.meta?.title && item.meta.breadcrumb !== false
      })
    }

    watch(route, getBreadcrumb)
    onBeforeMount(getBreadcrumb)

    const handleLink = (item: any) => {
      const { redirect, path } = item
      if (redirect) {
        router.push(redirect)
        return
      }
      router.push(path)
    }

    return {
      ...toRefs(reactives),
      handleLink
    }
  }
}
</script>

<style lang="scss" scoped>
.el-breadcrumb__inner,
.el-breadcrumb__inner a {
  font-weight: 400 !important;
}

.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
