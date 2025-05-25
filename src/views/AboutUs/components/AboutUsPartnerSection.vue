<template>
  <div class="aboutus-partner-section">
    <div class="aboutus-partner-inner">
      <h2 class="aboutus-partner-title">APT ZIP 와 함께하는 파트너</h2>
      <div class="aboutus-partner-grid">
        <div class="aboutus-partner-card">
          <div class="aboutus-partner-icon">
            <span class="material-symbols-outlined">blur_circular</span>
          </div>
          <div class="aboutus-partner-name">부동산 거래 플랫폼</div>
          <div class="aboutus-partner-desc">
            정확하고 신뢰할 수 있는 <br> 
            실거래 정보를 제공하여<br>
            부동산 거래의 투명성을 높이고,<br>
            사용자들에게 올바른 <br>
            의사결정을 지원합니다.
          </div>
        </div>
        <div class="aboutus-partner-card">
          <div class="aboutus-partner-icon">
            <span class="material-symbols-outlined">blur_on</span>
          </div>
          <div class="aboutus-partner-name">지역별 거래 분석</div>
          <div class="aboutus-partner-desc">
            지역별 실거래 데이터를 기반으로<br>
            시장 동향을 분석하여 사용자들에게<br>
            유용한 정보를 제공합니다.
          </div>
        </div>
        <div class="aboutus-partner-card">
          <div class="aboutus-partner-icon">
            <span class="material-symbols-outlined">apartment</span>
          </div>
          <div class="aboutus-partner-name">전문가 네트워크</div>
          <div class="aboutus-partner-desc">
            부동산 전문가와의 협력을 통해<br>
            신뢰할 수 있는 정보를 제공하며,<br>
            거래의 안전성을 보장합니다.
          </div>
        </div>
        <div class="aboutus-partner-card">
          <div class="aboutus-partner-icon">
            <span class="material-symbols-outlined">check_box</span>
          </div>
          <div class="aboutus-partner-name">맞춤형 서비스</div>
          <div class="aboutus-partner-desc">
            사용자 맞춤형 데이터를 제공하여<br>
            부동산 거래 편리함을 극대화하며,<br>
            효율적인 거래를 지원합니다.
          </div>
        </div>
      </div>
      <div class="aboutus-partner-divider-img">
        <img :src="AboutUsImg3" alt="Real estate transactions" class="aboutus-partner-img-transparent">
        <div class="aboutus-partner-bottomtext">
          <p>
            <span>신뢰할 수 있는 </span>
            <span class="aboutus-partner-highlight">실거래 정보를 제공</span>
            <span>하여,</span>
          </p>
          <p>
            <span class="aboutus-partner-highlight">부동산 거래의 투명성</span>
            <span>을 높입니다.</span>
          </p>
        </div>
      </div>
      <div class="aboutus-partner-wavy" style="background-color: #d3cfc3">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,40 C480,120 960,-40 1440,40 V120 H0 Z" fill="#e4e4e2"/>
        </svg>
      </div>
    </div>
  </div>
</template>
<script setup>
import AboutUsImg3 from '@/assets/images/AboutUs/AboutUsImg3.avif';
</script>
<style scoped>
.aboutus-partner-section {
  background: #d3cfc3;
  padding: 0 0 0 0;
  margin-bottom: 0;
  position: relative;
  overflow: hidden;
  margin-top: 60px;
  margin-bottom: 150px;
}
.aboutus-partner-wavy {
  width: 100%;
  height: 120px;
  background: transparent;
  position: absolute;
  top: 530px; /* Adjusted to prevent overlap */
  left: 0;
  z-index: 2;
  pointer-events: none;
}
.aboutus-partner-inner {
  position: relative;
  z-index: 3;
  padding-top: 60px;
}
.aboutus-partner-title {
  text-align: center;
  font-size: 2.2rem;
  font-weight: 800;
  color: #73752f;
  margin-bottom: 36px;
  letter-spacing: -1px;
}
.aboutus-partner-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 32px;
  margin: 0 auto 32px auto;
  padding: 0 12px;
  max-width: 1200px;
}
@media (min-width: 768px) {
  .aboutus-partner-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 1024px) {
  .aboutus-partner-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
.aboutus-partner-card {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 16px 0 rgba(44, 93, 52, 0.08);
  padding: 32px 18px 24px 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 280px;
  transition: transform 0.2s;
}
.aboutus-partner-card:hover {
  transform: translateY(-5px) scale(1.03);
  box-shadow: 0 8px 32px 0 rgba(90, 93, 44, 0.13);
}
.aboutus-partner-icon {
  margin-bottom: 18px;
  font-size: 48px;
  color: #5b5d2c;
}
.aboutus-partner-name {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 10px;
  color: #222;
  text-align: center;
}
.aboutus-partner-desc {
  font-size: 1rem;
  color: #444;
  text-align: center;
  line-height: 1.7;
}
.aboutus-partner-divider-img {
  width: 100%;
  height: 500px; 
  margin: 32px 0 0 0;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 180px
}
.aboutus-partner-img-transparent {
  width: 100%;
  height: 500px; 
  object-fit: cover;
  object-position: center 45%;
  display: block;
  opacity: 0.6;
  filter: brightness(0.95) blur(0.5px);
}
.aboutus-partner-bottomtext {
  position: absolute;
  left: 50%; 
  top: 50%;
  transform: translate(-50%, -50%); 
  text-align: center;
  font-size: 1.6rem;
  color: #fff;
  font-weight: 700;
  z-index: 3;
  text-shadow: 0 2px 12px rgba(40, 40, 40, 0.25);
  width: 100%;
  pointer-events: none;
}
.aboutus-partner-bottomtext .aboutus-partner-highlight {
  color: #474642;
  font-weight: 800;
  background: none;
  padding: 0 2px;
  border-radius: 4px;
}
@media (max-width: 900px) {
  .aboutus-partner-grid {
    gap: 18px;
  }
  .aboutus-partner-card {
    padding: 24px 8px 18px 8px;
    min-height: 220px;
  }
  .aboutus-partner-divider-img {
    height: 120px;
  }
  .aboutus-partner-img-transparent {
    height: 120px;
  }
  .aboutus-partner-bottomtext {
    font-size: 1rem;
    padding: 0;
    bottom: 10px;
  }
}
</style>
