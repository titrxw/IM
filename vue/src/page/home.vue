<template>
  <div class="home">
    
  </div>
</template>
<script>
import auth from '@/api/auth'
export default {
  data () {
    return {
    }
  },
  mounted: async function () {
    auth.login()
    auth.login()
  }
}
</script>