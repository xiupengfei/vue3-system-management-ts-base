<template>
  <div class="dashboard">dashboard</div>
</template>

<script lang="ts">
import { useStore } from 'vuex'
// import { defineComponent } from 'vue'

export default {
  name: 'Dashboard',
  components: {
    // HelloWorld
  },
  setup() {
    const store = useStore()

    // console.log(store.getters['app/sidebar'].opened)
    return {}
  }
}
</script>
