<template>
  <div id="app">
    <Header :isHome="isHomePage" />
    <router-view />
    <Footer />
  </div>
</template>


<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
const route = useRoute()
const isHomePage = computed(() => route.path === '/')
</script>

<style>
html,
body {
  margin: 0 !important;
  padding: 0 !important;
}
</style>
