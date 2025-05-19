<template>
  <div id="app">
    <Header :isHome="isHomePage" />
    <router-view />
    <Footer />
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'

const route = useRoute()
const isHomePage = computed(() => route.path === '/')
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
