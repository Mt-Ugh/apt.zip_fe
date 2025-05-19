<template>
  <div class="auth-callback">로그인 처리 중입니다...</div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { onMounted } from 'vue'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

onMounted(() => {
  const accessToken = route.query.accessToken

  if (accessToken) {
    userStore.setUser({ accessToken })
    router.push('/')
  } else {
    router.push('/auth')
  }
})
</script>
