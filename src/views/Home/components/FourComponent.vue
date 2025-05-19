<template>
  <section id="four" class="wrapper style2">
    <div class="inner">
      <header class="align-left"><p>인기 지역</p></header>

      <swiper
        ref="swiperRef"
        :effect="'coverflow'"
        :grabCursor="true"
        :centeredSlides="true"
        :slidesPerView="'auto'"
        :coverflowEffect="{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }"
        :pagination="true"
        :modules="modules"
        class="mySwiper"
      >
        <swiper-slide v-for="(slide, index) in slides" :key="index" class="slide-container">
          <div class="image-container">
            <img :src="slide.areaUrl" alt="지역 이미지" class="swiper-image" />
            <div class="star-rating" @click="confirmFavorite(slide)">
              <span :class="{ 'star-filled': slide.isInterest, star: !slide.isInterest }">★</span>
            </div>
          </div>
          <div class="text-container">
            <p>{{ slide.name }}</p>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import { EffectCoverflow, Pagination } from 'swiper/modules'
import { fameAreaList, registerInterestArea, deleteInterestArea } from '@/api/InterestArea'

const slides = ref([])
const swiperRef = ref(null)
const modules = [EffectCoverflow, Pagination]

onMounted(async () => {
  slides.value = await fameAreaList()
})

async function confirmFavorite(slide) {
  const message = slide.isInterest ? '관심을 해제하시겠습니까?' : '관심을 등록하시겠습니까?'
  if (!confirm(message)) return

  try {
    if (slide.isInterest) {
      await deleteInterestArea(slide.areaUuid)
      slide.isInterest = false
      alert(`${slide.name} 관심이 해제되었습니다.`)
    } else {
      // 관심 등록 API 호출
      await registerInterestArea(slide.areaUuid)
      slide.isInterest = true
      alert(`${slide.name} 관심이 등록되었습니다.`)
    }
  } catch (error) {
    alert('처리 중 오류가 발생했습니다. 다시 시도해주세요.')
    console.error(error)
  }
}
</script>

<style scoped>
.swiper {
  width: 100%;
  padding-top: 50px;
  padding-bottom: 50px;
}

.swiper-slide {
  background-position: center;
  background-size: cover;
  width: 300px;
  height: 300px;
}

.swiper-slide img {
  display: block;
  width: 100%;
  min-height: 250px;
}

@media screen and (max-width: 700px) {
  .swiper-slide img {
    min-height: 150px;
  }
}

.slide-container {
  margin-bottom: 70px;
  position: relative;
}

.image-container {
  position: relative;
}

.swiper-image {
  width: 100%;
  border-radius: 10px;
}

.star-rating {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 30px;
  color: #ddd;
  cursor: pointer;
  z-index: 1;
}

.star {
  font-size: 30px;
  color: #ddd;
}

.star-filled {
  color: #ffd700;
}

.text-container {
  margin-top: 15px;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  color: #333;
}
</style>
