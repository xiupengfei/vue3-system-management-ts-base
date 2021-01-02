<template>
  <icon :data="svgs.icons[name]" :color="color" />
</template>

<script lang="ts">
import { reactive } from 'vue'

import icons from './icons'

interface IProps {
  name: string
  color?: string
}

export default {
  name: 'Users',
  props: {
    name: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: ''
    }
  },
  setup(props: IProps) {
    const svgs = reactive({
      icons
    })
    return { props, svgs }
  }
}
</script>
