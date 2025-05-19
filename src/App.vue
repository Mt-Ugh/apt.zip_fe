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
@charset "UTF-8";
@import url('https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');
html,
body {
  margin: 0 !important;
  padding: 0 !important;
}
</style>
