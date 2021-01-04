<script lang="ts">
import { useRouter, useRoute } from 'vue-router'

export default {
  name: 'Redirect',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const { params, query } = route
    let path = ''
    if (Array.isArray(params.path)) {
      path = params.path.join('/')
    } else {
      path = params.path
    }
    router.replace({ path: '/' + path, query })
  }
}
</script>
