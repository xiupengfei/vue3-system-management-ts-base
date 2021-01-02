<script lang="ts">
import { useRouter, useRoute } from 'vue-router'
export default {
  name: 'Redirect',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const { params, query, path } = route
    router.replace({ path: '/' + path, query })
  }
}
</script>
