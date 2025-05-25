<template>
  <div class="aboutus-root">
    <AboutUsHero />
    <AboutUsInfoGrid />
    <AboutUsHeadlineDesc />
    <AboutUsMergeHeadlineSection />
    <AboutUsTransparentSection />
    <AboutUsPartnerSection />
    <div class="aboutus-footer">
      <p>• 2025년 SSAFY 13기 부동산 관통 프로젝트</p>
      <p>• 개발자: 이희산, 김환수</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue';
import AboutUsHero from '@/views/AboutUs/components/AboutUsHero.vue';
import AboutUsInfoGrid from '@/views/AboutUs/components/AboutUsInfoGrid.vue';
import AboutUsHeadlineDesc from '@/views/AboutUs/components/AboutUsHeadlineDesc.vue';
import AboutUsMergeHeadlineSection from '@/views/AboutUs/components/AboutUsMergeHeadlineSection.vue';
import AboutUsTransparentSection from '@/views/AboutUs/components/AboutUsTransparentSection.vue';
import AboutUsPartnerSection from '@/views/AboutUs/components/AboutUsPartnerSection.vue';

// Parallax 효과 처리 함수
function handleParallax() {
  const imgs = [
    ...document.querySelectorAll('.aboutus-transparent-img2-centered img')
  ];
  if (aboutUsImg2.value && !imgs.includes(aboutUsImg2.value)) {
    imgs.push(aboutUsImg2.value);
  }
  const scrollY = window.scrollY || window.pageYOffset;
  imgs.forEach(img => {
    const rect = img.getBoundingClientRect();
    const imgTop = rect.top + scrollY;
    const windowHeight = window.innerHeight;
    const imgHeight = rect.height;
    const windowCenter = scrollY + windowHeight / 2;
    const offset = (imgTop + imgHeight / 2) - windowCenter;
    let base = 80;
    let strength = 0.09;
    let pos = base + offset * strength;
    pos = Math.max(0, Math.min(100, pos));
    img.style.objectPosition = `center ${pos}%`;
  });
}

// 헤드라인 스크롤 애니메이션 처리 함수
const leftHeadline = ref(null);
const rightHeadline = ref(null);
const aboutUsImg2 = ref(null);

function handleMergeHeadlineScroll() {
  const section = document.querySelector('.aboutus-merge-headline-section');
  if (!section) return;
  const rect = section.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  let progress = 0;
  if (rect.top < windowHeight && rect.bottom > 0) {
    progress = Math.min(1, Math.max(0, 1 - rect.top / (windowHeight * 0.6)));
  }
  if (leftHeadline.value && rightHeadline.value) {
    leftHeadline.value.style.left = '30%';
    leftHeadline.value.style.transform = `translate(-100%, -50%) translateX(${progress * 100}%)`;
    rightHeadline.value.style.left = '60%';
    rightHeadline.value.style.transform = `translate(100%, -50%) translateX(-${progress * 100}%)`;
    leftHeadline.value.style.opacity = progress > 0.05 ? 1 : 0;
    rightHeadline.value.style.opacity = progress > 0.05 ? 1 : 0;
  }
}

// 이벤트 리스너 등록 및 해제
onMounted(() => {
  window.addEventListener('scroll', handleParallax, { passive: true });
  window.addEventListener('resize', handleParallax);
  handleParallax();

  window.addEventListener('scroll', handleMergeHeadlineScroll, { passive: true });
  window.addEventListener('resize', handleMergeHeadlineScroll);
  handleMergeHeadlineScroll();
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleParallax);
  window.removeEventListener('resize', handleParallax);

  window.removeEventListener('scroll', handleMergeHeadlineScroll);
  window.removeEventListener('resize', handleMergeHeadlineScroll);
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap');

.aboutus-root {
  width: 100%;
  background: #fff;
  font-family: 'Open Sans', 'Lato', Arial, sans-serif;
  font-size: 16px;
  margin-top: 68px;
}

.aboutus-footer {
  padding: 0 16px 48px 16px;
  font-size: 12px;
  color: #80806b;
}

@media (min-width: 768px) {
  .aboutus-footer {
    padding-left: 48px;
    padding-right: 48px;
  }
}

@media (min-width: 1024px) {
  .aboutus-footer {
    padding-left: 96px;
    padding-right: 96px;
  }
}

.aboutus-footer p {
  margin-bottom: 4px;
}

.aboutus-footer p:last-child {
  margin-bottom: 0;
}
</style>