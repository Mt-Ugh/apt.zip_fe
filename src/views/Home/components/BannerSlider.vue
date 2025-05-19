<template>
  <section class="banner full">
    <article
      v-for="(slide, index) in slides"
      :key="index"
      :class="{ visible: index === currentSlide }"
      :style="{ backgroundImage: 'url(' + slide.image + ')' }"
    >
      <div class="inner">
        <p>{{ slide.description }}</p>
        <h2>{{ slide.title }}</h2>
      </div>
    </article>
    <button class="prev" @click="changeSlide(currentSlide - 1)">
      <img :src="SlideButtonL" alt="Previous" />
    </button>
    <button class="next" @click="changeSlide(currentSlide + 1)">
      <img :src="SlideButtonR" alt="Next" />
    </button>
    <ul class="indicators">
      <li
        v-for="(slide, index) in slides"
        :key="index"
        :class="{ visible: index === currentSlide }"
        @click="changeSlide(index)"
      >
        <span></span>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import SlideButtonL from '@/assets/images/Home/SlideButtonL.png'
import SlideButtonR from '@/assets/images/Home/SlideButtonR.png'
import Banner1 from '@/assets/images/Home/Banner1.jpg'
import Banner2 from '@/assets/images/Home/Banner2.jpg'
import Banner3 from '@/assets/images/Home/Banner3.jpg'
import Banner4 from '@/assets/images/Home/Banner4.webp'
import Banner5 from '@/assets/images/Home/Banner5.jpg'

const slides = ref([
  {
    image: Banner1,
    description: '신뢰받는 실거래가 정보 제공',
    title: 'Reliable',
  },
  {
    image: Banner2,
    description: '지역별 시세 분석',
    title: 'Analysis',
  },
  {
    image: Banner3,
    description: '실시간 거래 현황 업데이트',
    title: 'Live',
  },
  {
    image: Banner4,
    description: '투자 맞춤형 정보',
    title: 'Investment',
  },
  {
    image: Banner5,
    description: '쉽고 빠른 시장 이해',
    title: 'Insights',
  },
])

const currentSlide = ref(0)
let autoSlideInterval

const startSlideShow = () => {
  autoSlideInterval = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % slides.value.length
  }, 5000)
}

const resetSlideShow = () => {
  clearInterval(autoSlideInterval)
  startSlideShow()
}

const changeSlide = (index) => {
  if (index < 0) currentSlide.value = slides.value.length - 1
  else if (index >= slides.value.length) currentSlide.value = 0
  else currentSlide.value = index
  resetSlideShow()
}

onMounted(() => {
  startSlideShow()
})
</script>
