<template>
  <div
    v-if="!item.meta || !item.meta.hidden"
    :class="[
      isCollapse ? 'simple-mode' : 'full-mode',
      { 'first-level': isFirstLevel }
    ]"
  >
    <template
      v-if="!alwaysShowRootMenu && theOnlyOneChild && !theOnlyOneChild.children"
    >
      <router-link
        v-if="theOnlyOneChild.meta"
        :to="resolvePath(theOnlyOneChild.path)"
      >
        <el-menu-item
          :index="resolvePath(theOnlyOneChild.path)"
          :class="{ 'submenu-title-noDropdown': isFirstLevel }"
        >
          <svg-icon
            v-if="theOnlyOneChild.meta.icon"
            :name="theOnlyOneChild.meta.icon"
          />
          <span v-if="theOnlyOneChild.meta.title">
            {{ theOnlyOneChild.meta.title }}
          </span>
        </el-menu-item>
      </router-link>
    </template>
    <el-submenu v-else :index="resolvePath(item.path)" popper-append-to-body>
      <template #title>
        <svg-icon v-if="item.meta && item.meta.icon" :name="item.meta.icon" />
        <span v-if="item.meta && item.meta.title">{{ item.meta.title }}</span>
      </template>
      <template v-if="item.children">
        <side-bar-item
          v-for="child in item.children"
          :key="child.path"
          :item="child"
          :is-collapse="isCollapse"
          :is-first-level="false"
          :base-path="resolvePath(child.path)"
          class="nest-menu"
        />
      </template>
    </el-submenu>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
// import { useMessage } from 'element3'
// import { useRoute } from 'vue-router'
import { RouteRecordRaw, RouteMeta } from 'vue-router'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

export interface IProp {
  item: RouteMeta
  isCollapse?: boolean
  isFirstLevel?: boolean
  basePath?: string
}

export default defineComponent({
  name: 'SideBarItem',
  components: {},
  props: {
    item: {
      type: Object as PropType<RouteMeta>,
      required: true
    },
    isCollapse: {
      type: Boolean,
      default: false
    },
    isFirstLevel: {
      type: Boolean,
      default: true
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  setup(props: IProp) {
    // const { item, isCollapse, isFirstLevel, basePath } = props
    // const route = useRoute()
    const resolvePath = (routePath: string) => {
      return path.resolve(props.basePath, routePath)
    }

    const alwaysShowRootMenu = () => {
      if (props.item.meta && props.item.meta.alwaysShow) {
        return true
      }
      return false
    }

    const showingChildNumber = () => {
      if (props.item.children) {
        const showingChildren = props.item.children.filter(
          (i: RouteRecordRaw) => {
            if (i.meta && i.meta.hidden) {
              return false
            } else {
              return true
            }
          }
        )
        return showingChildren.length
      }
      return 0
    }

    const theOnlyOneChild = () => {
      if (showingChildNumber() > 1) {
        return null
      }
      if (props.item.children) {
        for (const child of props.item.children) {
          if (!child.meta || !child.meta.hidden) {
            return child
          }
        }
      }
      // 如果没有子菜单，则返回本身并移除路径, 因为basePath已经包含了菜单的路径信息
      return { ...props.item, path: '' }
    }

    return {
      props,
      resolvePath,
      alwaysShowRootMenu: alwaysShowRootMenu(),
      showingChildNumber: showingChildNumber(),
      theOnlyOneChild: theOnlyOneChild()
    }
  }
})
</script>
<style lang="scss">
.el-submenu.is-active > .el-submenu__title {
  color: $subMenuActiveText !important;
}

.full-mode {
  .nest-menu .el-submenu > .el-submenu__title,
  .el-submenu .el-menu-item {
    min-width: $sideBarWidth !important;
    background-color: $subMenuBg !important;

    &:hover {
      background-color: $subMenuHoverBg !important;
    }
  }
}

.simple-mode {
  &.first-level {
    .submenu-title-noDropdown {
      padding: 0 !important;
      position: relative;

      .el-tooltip {
        padding: 0 !important;
      }
    }

    .el-submenu {
      overflow: hidden;

      & > .el-submenu__title {
        padding: 0px !important;

        .el-submenu__icon-arrow {
          display: none;
        }

        & > span {
          visibility: hidden;
        }
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.svg-icon {
  margin-right: 16px;
}

.simple-mode {
  .svg-icon {
    margin-left: 20px;
  }
}
</style>
