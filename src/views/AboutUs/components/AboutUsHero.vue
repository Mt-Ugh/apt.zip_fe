<template>
  <div class="aboutus-hero">
    <img
      :src="AboutUsHeadLine"
      alt="APT.ZIP 실거래가 정보 서비스 배경 이미지"
      class="aboutus-hero-img"
    />
    <div class="aboutus-hero-card">
      <h2 class="aboutus-title">APT.ZIP 실거래가 정보 서비스</h2>
    </div>
  </div>
</template>
<script setup>
import AboutUsHeadLine from '@/assets/images/AboutUs/AboutUsHeadLine.avif'; 
</script>
<style scoped>
.aboutus-hero {
  position: relative;
  width: 100%;
}

.aboutus-hero-img {
  width: 100%;
  height: 40vh; 
  object-fit: cover;
  object-position: center;
  display: block;
}

.aboutus-hero-card {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 91.666667%;
  max-width: 700px;
  background: #fff;
  padding: 16px 24px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
}

.aboutus-title {
  text-align: center;
  font-size: 24px;
  font-weight: 600; 
  margin: 0;
}
</style>
