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
      <img src="/SlideButtonL.png" alt="Previous" />
    </button>
    <button class="next" @click="changeSlide(currentSlide + 1)">
      <img src="/SlideButtonR.png" alt="Next" />
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

const slides = ref([
  {
    image: 'https://econmingle.com/wp-content/uploads/2025/01/Competition-to-differentiate-construction-companies-7-scaled.jpg',
    description: 'A free responsive web site template by TEMPLATED',
    title: 'Hielo'
  },
  {
    image: 'https://www.kharn.kr/data/photos/20201250/art_16078615198495_d8b4e6.jpg',
    description: 'Lorem ipsum dolor sit amet nullam feugiat',
    title: 'Magna'
  },
  {
    image: 'https://img6.yna.co.kr/etc/inner/KR/2025/05/09/AKR20250509060300003_01_i_P4.jpg',
    description: 'Sed cursus aliuam veroeros lorem ipsum nullam',
    title: 'Tempus'
  },
  {
    image: 'https://images.homify.com/v1441045029/p/photo/image/682854/JHA_YNR_201210_023.jpg',
    description: 'Adipiscing lorem ipsum feugiat sed phasellus consequat',
    title: 'Etiam'
  },
  {
    image: 'https://image.fnnews.com/resource/media/image/2024/12/26/202412261201452417_l.jpg',
    description: 'Ipsum dolor sed magna veroeros lorem ipsum',
    title: 'Adipiscing'
  }
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
