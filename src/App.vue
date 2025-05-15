<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<script setup>
import Header from '@/components/layout/Header.vue'
</script>

<style>
html,
body {
  margin: 0 !important;
  padding: 0 !important;
}
</style>
