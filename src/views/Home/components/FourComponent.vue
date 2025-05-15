<template>
  <swiper
    ref="mySwiper"
    :effect="'coverflow'"
    :grabCursor="true"
    :centeredSlides="true"
    :slidesPerView="'auto'"
    :coverflowEffect="{
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true
    }"
    :pagination="true"
    :modules="modules"
    class="mySwiper"
  >
    <swiper-slide
      v-for="(slide, index) in slides"
      :key="index"
      class="slide-container"
    >
      <div class="image-container">
        <img :src="slide.image" alt="nature image" class="swiper-image" />
        <!-- 별 아이콘 -->
        <div class="star-rating" @click="confirmFavorite(slide)">
          <span :class="{'star-filled': slide.favorite, 'star': !slide.favorite}">★</span>
        </div>
      </div>
      <div class="text-container">
        <p>{{ slide.name }}</p>
      </div>
    </swiper-slide>
  </swiper>
</template>

<script>
  // Import Swiper Vue.js components
  import { Swiper, SwiperSlide } from 'swiper/vue';

  // Import Swiper styles
  import 'swiper/css';
  import 'swiper/css/effect-coverflow';
  import 'swiper/css/pagination';

  // import required modules
  import { EffectCoverflow, Pagination } from 'swiper/modules';
  import { ref } from 'vue';

  export default {
    components: {
      Swiper,
      SwiperSlide,
    },
    setup() {
      // 슬라이드 데이터
      const slides = ref([
        { image: 'https://swiperjs.com/demos/images/nature-1.jpg', name: '서울', favorite: false },
        { image: 'https://swiperjs.com/demos/images/nature-2.jpg', name: '부산', favorite: false },
        { image: 'https://swiperjs.com/demos/images/nature-3.jpg', name: '울산', favorite: false },
        { image: 'https://swiperjs.com/demos/images/nature-4.jpg', name: '대구', favorite: false },
        { image: 'https://swiperjs.com/demos/images/nature-5.jpg', name: '대전', favorite: false },
        { image: 'https://swiperjs.com/demos/images/nature-6.jpg', name: '제주', favorite: false },
        { image: 'https://swiperjs.com/demos/images/nature-7.jpg', name: '인천', favorite: false },
        { image: 'https://swiperjs.com/demos/images/nature-8.jpg', name: '광주', favorite: false },
      ]);

      // Swiper 슬라이드 참조
      const swiperRef = ref(null);

      // 관심 등록 여부를 확인하는 함수
      const confirmFavorite = (slide) => {
        const message = slide.favorite ? "관심을 해제하시겠습니까?" : "관심을 등록하시겠습니까?";

        // confirm() 메시지를 띄운 후 OK 클릭 시
        if (confirm(message)) {
          // 상태 변경
          slide.favorite = !slide.favorite;
          console.log(`${slide.name} 관심 ${slide.favorite ? '등록됨' : '취소됨'}`);

          // 별 표시가 바로 바뀌도록
          // 상태 변경이 즉시 반영되도록 하기 위해서 Vue의 reactivity를 활용
        }
      };

      return {
        slides,
        confirmFavorite,
        modules: [EffectCoverflow, Pagination],
        swiperRef
      };
    },
  };
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
  position: relative;
}

.text-container p {
  margin: 5px 0;
}
</style>
