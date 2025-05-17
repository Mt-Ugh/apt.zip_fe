<template>
  <div id="app">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'

const userStore = useUserStore()

onMounted(() => {
  userStore.initUserFromStorage()
})
</script>

<style>
html,
body {
  margin: 0 !important;
  padding: 0 !important;
}
</style>
