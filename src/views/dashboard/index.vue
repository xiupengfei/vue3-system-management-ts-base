<template>
  <div class="dashboard">dashboard</div>
</template>

<script lang="ts">
import { useStore } from 'vuex'
// import { defineComponent } from 'vue'
import { IAppState } from '@/store/modules/app'

export default {
  name: 'Dashboard',
  components: {
    // HelloWorld
  },
  setup() {
    const store = useStore<{ app: IAppState }>()
    console.log(store.state.app.sidebar.opened)
    // console.log(store.getters['app/sidebar'].opened)
    return {}
  }
}
</script>
