<template>
  <section class="aboutus-transparent-section2-centered">
    <div class="aboutus-transparent-img1-centered">
      <img
        :src="AboutUsImg1"
        alt="Real estate handshake deal"
      />
    </div>
    <div class="aboutus-transparent-content1-centered">
      <div class="aboutus-transparent-titlebox1">
        <div class="aboutus-transparent-title1-centered">
          투명한 거래 정보
        </div>
        <div class="aboutus-transparent-subtitle1-centered">
          고객 여러분들의 신뢰를 최우선으로 합니다.
        </div>
      </div>
      <div class="aboutus-transparent-desc1-centered">
        저희 APT.ZIP 사이트는 부동산 거래에서 가장 중요한 <br>
        "신뢰"를 최우선으로 합니다.<br>
        투명한 거래 내역과 정확한 실거래가 정보를 신속하게 제공하여,
        사용자가 안심하고 믿을 수 있는 데이터를 전달합니다.
      </div>
    </div>
    <div class="aboutus-transparent-img2-centered">
      <img
        :src="AboutUsImg2"
        alt="Urban real estate cityscape"
        ref="aboutUsImg2"
      />
    </div>
    <div class="aboutus-transparent-content2-centered">
      <div class="aboutus-transparent-titlebox2">
        <div class="aboutus-transparent-title2-centered">
          실시간 데이터, 신뢰의 시작
        </div>
        <div class="aboutus-transparent-subtitle2-centered">
          최신 부동산 실거래가를 한눈에
        </div>
      </div>
      <div class="aboutus-transparent-desc2-centered">
        APT.ZIP은 아파트, 오피스텔, 연립주택 등 다양한 부동산의 실거래 정보를 실시간으로 수집·분석하여 제공합니다.<br>
        <br>
        쉽고 빠르게 원하는 지역의 거래 내역을 확인할 수 있으며,<br>
        투명한 데이터와 직관적인 시각화로 합리적인 의사결정을 지원합니다.<br>
        <br>
      </div>
    </div>
  </section>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import AboutUsImg1 from '@/assets/images/AboutUs/AboutUsImg1.jpg';
import AboutUsImg2 from '@/assets/images/AboutUs/AboutUsImg2.avif';

const aboutUsImg2 = ref(null);

function handleParallax() {
  const img1 = document.querySelector('.aboutus-transparent-img1-centered img');
  const img2 = aboutUsImg2.value;

  const scrollY = window.scrollY || window.pageYOffset;

  if (img1) {
    const rect1 = img1.getBoundingClientRect();
    const img1Top = rect1.top + scrollY;
    const windowHeight = window.innerHeight;
    const img1Height = rect1.height;
    const windowCenter = scrollY + windowHeight / 2;
    const offset1 = (img1Top + img1Height / 2) - windowCenter;
    let base1 = 80;
    let strength1 = 0.08;
    let pos1 = base1 + offset1 * strength1;
    if (pos1 > 100) pos1 = 100;
    if (pos1 < 0) pos1 = 0;
    img1.style.objectPosition = `center ${pos1}%`;
  }

  if (img2) {
    const rect2 = img2.getBoundingClientRect();
    const img2Top = rect2.top + scrollY;
    const windowHeight = window.innerHeight;
    const img2Height = rect2.height;
    const windowCenter = scrollY + windowHeight / 2;
    const offset2 = (img2Top + img2Height / 2) - windowCenter;
    let base2 = 70; 
    let strength2 = 0.05;
    let pos2 = base2 + offset2 * strength2;
    if (pos2 > 100) pos2 = 100;
    if (pos2 < 0) pos2 = 0;
    img2.style.objectPosition = `center ${pos2}%`;
  }
}


onMounted(() => {
  window.addEventListener('scroll', handleParallax, { passive: true });
  window.addEventListener('resize', handleParallax);
  handleParallax();
});
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleParallax);
  window.removeEventListener('resize', handleParallax);
});
</script>
<style scoped>
.aboutus-transparent-section2-centered {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  margin: 64px 0 0 0;
  padding: 0;
}

.aboutus-transparent-img1-centered {
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 15px 0 15px 0;
}
.aboutus-transparent-img1-centered img {
  width: 100%;
  max-width: 100%;
  height: 1050px;
  object-fit: cover;
  display: block;
  margin: 0 auto;
  will-change: transform;
  transition: transform 0.1s;
  margin: 30px 0 30px 0;
}

.aboutus-transparent-content1-centered {
  width: 100%;
  max-width: 1050px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: center;
  background: #fff;
  padding: 30px 20px 30px 20px;
  box-sizing: border-box;
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(31, 31, 17, 0.08);
  border: 1px solid #e5e7eb;
  height: 350px;
}

.aboutus-transparent-titlebox1 {
  min-width: 520px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 56px;
  justify-content: center;
}

.aboutus-transparent-title1-centered {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 18px;
  color: #222;
  letter-spacing: -1px;
}

.aboutus-transparent-subtitle1-centered {
  font-size: 1.25rem;
  color: #a89352;
  margin-bottom: 0;
  font-weight: 600;
  letter-spacing: -0.5px;
}

.aboutus-transparent-desc1-centered {
  flex: 1;
  font-size: 1.15rem;
  color: #333;
  line-height: 1.9;
  text-align: left;
  display: flex;
  align-items: center;
  font-family: 'Lato', 'Open Sans', Arial, sans-serif;
  min-height: 320px;
}

.aboutus-transparent-img2-centered {
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 15px 0 15px 0;
}
.aboutus-transparent-img2-centered img {
  width: 100%;
  max-width: 100%;
  height: 1050px;
  object-fit: cover;
  display: block;
  margin: 0 auto;
  will-change: transform;
  transition: transform 0.1s;
  margin: 30px 0 30px 0;
}

.aboutus-transparent-content2-centered {
  width: 100%;
  max-width: 1050px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: center;
  background: #fff;
  padding: 30px 20px 30px 20px;
  box-sizing: border-box;
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(31, 31, 17, 0.08);
  border: 1px solid #e5e7eb;
  height: 350px;
}

.aboutus-transparent-titlebox2 {
  min-width: 520px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 56px;
  justify-content: center;
}

.aboutus-transparent-title2-centered {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 18px;
  color: #222;
  letter-spacing: -1px;
}

.aboutus-transparent-subtitle2-centered {
  font-size: 1.25rem;
  color: #a89352;
  margin-bottom: 0;
  font-weight: 600;
  letter-spacing: -0.5px;
}

.aboutus-transparent-desc2-centered {
  flex: 1;
  font-size: 1.15rem;
  color: #333;
  line-height: 1.9;
  text-align: left;
  display: flex;
  align-items: center;
  font-family: 'Lato', 'Open Sans', Arial, sans-serif;
  min-height: 320px;
}

@media (max-width: 1200px) {
  .aboutus-transparent-content1-centered {
    max-width: 100%;
    padding: 32px 12px 32px 12px;
  }
  .aboutus-transparent-titlebox1 {
    min-width: 200px;
    margin-right: 24px;
  }
  .aboutus-transparent-title1-centered {
    font-size: 2rem;
  }
  .aboutus-transparent-desc1-centered {
    min-height: 200px;
  }
  .aboutus-transparent-content2-centered {
    max-width: 100%;
    padding: 32px 12px 32px 12px;
  }
  .aboutus-transparent-titlebox2 {
    min-width: 200px;
    margin-right: 24px;
  }
  .aboutus-transparent-title2-centered {
    font-size: 2rem;
  }
  .aboutus-transparent-desc2-centered {
    min-height: 200px;
  }
}

@media (max-width: 900px) {
  .aboutus-transparent-content1-centered {
    flex-direction: column;
    align-items: center;
    padding: 24px 8px;
    border-radius: 16px;
  }
  .aboutus-transparent-titlebox1 {
    margin-right: 0;
    align-items: center;
    margin-bottom: 16px;
    min-width: 0;
    justify-content: flex-start;
  }
  .aboutus-transparent-desc1-centered {
    text-align: center;
    justify-content: center;
    font-size: 1rem;
    min-height: 0;
  }
  .aboutus-transparent-content2-centered {
    flex-direction: column;
    align-items: center;
    padding: 24px 8px;
    border-radius: 16px;
  }
  .aboutus-transparent-titlebox2 {
    margin-right: 0;
    align-items: center;
    margin-bottom: 16px;
    min-width: 0;
    justify-content: flex-start;
  }
  .aboutus-transparent-desc2-centered {
    text-align: center;
    justify-content: center;
    font-size: 1rem;
    min-height: 0;
  }
}
</style>
