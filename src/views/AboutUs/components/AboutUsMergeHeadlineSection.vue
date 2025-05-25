<template>
  <section class="aboutus-merge-headline-section">
    <h2 class="aboutus-merge-headline left" ref="leftHeadline">부동산</h2>
    <h2 class="aboutus-merge-headline right" ref="rightHeadline">AI🤖</h2>
  </section>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const leftHeadline = ref(null);
const rightHeadline = ref(null);

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
    rightHeadline.value.style.right = 'auto';
    rightHeadline.value.style.transform = `translate(100%, -50%) translateX(-${progress * 100}%)`;
    leftHeadline.value.style.opacity = progress > 0.05 ? 1 : 0;
    rightHeadline.value.style.opacity = progress > 0.05 ? 1 : 0;
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleMergeHeadlineScroll, { passive: true });
  window.addEventListener('resize', handleMergeHeadlineScroll);
  handleMergeHeadlineScroll();
});
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleMergeHeadlineScroll);
  window.removeEventListener('resize', handleMergeHeadlineScroll);
});
</script>
<style scoped>
.aboutus-merge-headline-section {
  position: relative;
  width: 100%;
  max-width: 1200px;
  min-height: 80px;
  margin: 32px auto 32px auto;
  overflow: visible;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  z-index: 2;
  margin-bottom: 200px;
}

.aboutus-merge-headline {
  position: absolute;
  top: 50%;
  left: 50%;
  font-family: 'Montserrat', 'Lato', 'Open Sans', Arial, sans-serif;
  font-size: 2.8rem;
  font-weight: 700;
  color: #a89352;
  letter-spacing: 2px;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s, left 0s;
  opacity: 0;
  white-space: nowrap;
  pointer-events: none;
  user-select: none;
}
.aboutus-merge-headline.left {
  text-align: left;
  transform: translate(-100%, -50%);
}
.aboutus-merge-headline.right {
  text-align: right;
  transform: translate(100%, -50%);
}

@media (max-width: 600px) {
  .aboutus-merge-headline {
    font-size: 1.5rem;
  }
  .aboutus-merge-headline-section {
    height: 70px;
  }
}
</style>
