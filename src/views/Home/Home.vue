<template>
  <div id="app">
    <BannerSlider />
    <NewsSection />
    <TwoSection />
    <FourSection />
  </div>
</template>

<script setup>
  import BannerSlider from '@/views/Home/components/BannerSlider.vue'
  import NewsSection from '@/views/Home/components/NewSection.vue'
  import TwoSection from '@/views/Home/components/TwoSection.vue'
  import FourSection from '@/views/Home/components/FourComponent.vue'
  import '@/assets/css/Home.css'
</script>
