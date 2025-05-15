<template>
  <div id="app">
    <Header />
    <Home />
    <router-view />
    <Footer />
  </div>
</template>

<script setup>
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
import Home from '@/views/Home/Home.vue'
</script>

<style>
html,
body {
  margin: 0 !important;
  padding: 0 !important;
}
</style>
