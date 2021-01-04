<template>
  <div :class="[{ 'is-active': isActive }]" @click="toggleClick">
    <svg-icon name="hamburger" width="20" height="20" />
  </div>
</template>

<script lang="ts">
import { reactive, SetupContext } from 'vue'
interface IProps {
  isActive: boolean
}

export default {
  name: 'Hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  setup(props: IProps, { emit }: SetupContext) {
    const toggleClick = () => {
      emit('toggleClick')
    }
    return { props, toggleClick }
  }
}
</script>

<style lang="scss" scoped>
.svg-icon {
  vertical-align: middle;
}

.is-active {
  transform: rotate(180deg);
}
</style>
