<template>
  <div class="aboutus-info-grid">
    <div class="aboutus-info-card">
      <div class="aboutus-icon">
        <span class="material-symbols-outlined">apartment</span>
      </div>
      <p class="aboutus-label">개발 기간</p>
      <p class="aboutus-value">2025.05</p>
    </div>
    <div class="aboutus-info-card">
      <div class="aboutus-icon">
        <img :src="SsafyLogo" alt="ssafy logo">
      </div>
      <p class="aboutus-label">운영</p>
      <p class="aboutus-value">SSAFY</p>
    </div>
    <div class="aboutus-info-card">
      <div class="aboutus-icon">
        <span class="material-symbols-outlined">trending_up</span>
      </div>
      <p class="aboutus-label">총 데이터 건수</p>
      <p class="aboutus-value">9,356,026건</p>
    </div>
    <div class="aboutus-info-card">
      <div class="aboutus-icon">
        <span class="material-symbols-outlined">groups</span>
      </div>
      <p class="aboutus-label">개발자 수</p>
      <p class="aboutus-value">2명</p>
    </div>
  </div>
</template>
<script setup>
import SsafyLogo from '@/assets/images/AboutUs/SsafyLogo.png';
</script>

<style scoped>
.aboutus-info-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 16px;
  padding: 32px 16px 100px;
  box-shadow: 0 8px 24px -8px rgba(0, 0, 0, 0.1);
  border-radius: 0 0 24px 24px;
  margin-bottom: 200px;
}

@media (min-width: 768px) {
  .aboutus-info-grid {
    grid-template-columns: repeat(2, 1fr);
    padding-left: 48px;
    padding-right: 48px;
  }
}
@media (min-width: 1024px) {
  .aboutus-info-grid {
    grid-template-columns: repeat(4, 1fr);
    padding-left: 96px;
    padding-right: 96px;
  }
}

.aboutus-info-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  border: 1px solid #e5e7eb;
  border-radius: 24px;
  background: #fff;
  transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1);
}
.aboutus-info-card:hover {
  transform: scale(1.05);
}

.aboutus-icon {
  margin-bottom: 16px;
}
.aboutus-icon .material-symbols-outlined {
  font-size: 36px;
  color: #575550;
}
.aboutus-icon img {
  width: 100px;
  height: 60px;
  object-fit: contain;
  display: block;
}

.aboutus-label {
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 0;
}

.aboutus-value {
  font-weight: 700;
  font-size: 18px;
  margin: 0;
}
</style>
