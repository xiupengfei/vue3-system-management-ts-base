<template>
  <div class="header-bar">
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    <!-- <div class="right-menu">
      <template v-if="device !== 'mobile'">
        <lang-select class="right-menu-item pointer hover-effect" />
      </template>
      <el-dropdown
        class="avatar-container right-menu-item hover-effect pointer not-select"
        trigger="click"
      >
        <div class="avatar-wrapper">
          <img :src="avatar + '?imageView2/1/w/80/h/80'" class="user-avatar" />
          <i class="el-icon-caret-bottom" />
          <span class="username">admin</span>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <router-link to="/baseinfo">
            <el-dropdown-item>
              个人信息
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            退出
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div> -->
  </div>
</template>

<script lang="ts">
import { reactive } from 'vue'
import { useStore } from 'vuex'
import { IAppState } from '@/store/modules/app'
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import Hamburger from '@/components/Hamburger/index.vue'
// import LangSelect from '@/components/LangSelect/index.vue'

export default {
  name: 'HeaderBar',
  components: {
    Breadcrumb,
    Hamburger
    // LangSelect
  },
  setup() {
    // const reactives = reactive()
    // store.getters['app/sidebar'].opened
    const store = useStore<{ app: IAppState }>()
    const toggleSideBar = () => {
      store.dispatch('app/ToggleSideBar')
    }
    return { toggleSideBar, sidebar: store.state.app.sidebar }
  }
}
</script>

<style lang="scss" scoped>
.header-bar {
  height: $navBarHeight;
  overflow: hidden;
  position: relative;
  background: $navBarBg;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: $navBarHeight * 0.92;
    height: 100%;
    float: left;
    padding: 0 15px;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: $navBarHeight;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;
      &.hover-effect {
        transition: background-color 0.3s;
        &:hover {
          background: rgba(0, 0, 0, 0.1);
        }
      }
    }

    .avatar-container {
      margin-right: 20px;

      .avatar-wrapper {
        .user-avatar {
          width: 25px;
          height: 25px;
          // border-radius: 10px;
          vertical-align: middle;
        }

        .el-icon-caret-bottom {
          font-size: 12px;
          vertical-align: middle;
        }
      }
    }
  }
}
</style>
