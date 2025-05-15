<template>
  <div id="app">
    <!-- Banner -->
    <section class="banner full">
      <article v-for="(slide, index) in slides" :key="index" :class="{'visible': index === currentSlide}" :style="{'background-image': 'url(' + slide.image + ')'}">
        <div class="inner">
          <p>{{ slide.description }}</p>
          <h2>{{ slide.title }}</h2>
        </div>
      </article>

      <!-- 좌우 버튼 추가 (아이콘을 이미지로 사용) -->
      <button class="prev" @click="changeSlide(currentSlide - 1)">
        <img src="/SlideButtonL.png" alt="Previous" />
      </button>
      <button class="next" @click="changeSlide(currentSlide + 1)">
        <img src="/SlideButtonR.png" alt="Next" />
      </button>

      <ul class="indicators">
        <li v-for="(slide, index) in slides" :key="index" :class="{'visible': index === currentSlide}" @click="changeSlide(index)">
          <span></span>
        </li>
      </ul>
    </section>
    <!-- One Section -->
    <section id="one" class="wrapper style2">
      <div class="inner">
        <header class="align-left">
          <p>오늘의 뉴스</p>
        </header>
        <div class="grid-style">
          <div v-for="(box, index) in displayedBoxes" :key="index">
            <div class="box">
              <div class="image fit">
                <img :src="box.image" alt="" width="600" height="300">
              </div>
              <div class="content">
                <header class="align-center">
                  <p>{{ box.subTitle }}</p>
                  <h2>{{ box.title }}</h2>
                </header>
                <p>{{ box.description }}</p>
                <footer class="align-center">
                  <a href="#" class="button alt">Learn More</a>
                </footer>
              </div>
            </div>
          </div>
        </div>

        <!-- 좌우 버튼 -->
        <button class="prev" @click="changeBoxes(-1)">←</button>
        <button class="next" @click="changeBoxes(1)">→</button>
      </div>
    </section>



    <!-- Two Section -->
    <section id="two" class="wrapper style3">
      <div class="inner">
        <header class="align-center">
          <p>실시간 아파트 시세와 정확한 거래 정보를 통해 내 집 마련을 더 똑똑하게</p>
          <h2>APT.ZIP</h2>
        </header>
      </div>
    </section>

    <!-- Four Section -->
    <section id="four" class="wrapper style2">
      <div class="inner">
        <header class="align-left">
          <p>인기 지역</p>
        </header>
        <!-- FourComponent.vue 불러오기 -->
        <FourComponent />
      </div>
    </section>

  </div>
</template>

<script>
import '@/assets/css/Home.css';
import FourComponent from '@/views/Home/components/FourComponent.vue';


export default {
  name: 'MainSectionComponent',
      currentSlide: 0,
      autoSlideInterval: null, // 자동 슬라이드 간격을 저장할 변수
      isMenuVisible: false,  // 메뉴의 보임 여부를 관리하는 변수
      currentBoxIndex: 0, // 현재 보여지는 박스 인덱스
      components: {
        FourComponent // FourComponent를 컴포넌트로 등록
      },
  data() {
    return {
      currentSlide: 0,
      autoSlideInterval: null, // 자동 슬라이드 간격을 저장할 변수
      isMenuVisible: false,  // 메뉴의 보임 여부를 관리하는 변수
      currentBoxIndex: 0, // 현재 보여지는 박스 인덱스
      isHomePage: true, // home 페이지인지 확인하는 변수
      slides: [
        { image: 'https://econmingle.com/wp-content/uploads/2025/01/Competition-to-differentiate-construction-companies-7-scaled.jpg', alt: 'Slide 1', description: 'A free responsive web site template by TEMPLATED', title: 'Hielo' },
        { image: 'https://www.kharn.kr/data/photos/20201250/art_16078615198495_d8b4e6.jpg', alt: 'Slide 2', description: 'Lorem ipsum dolor sit amet nullam feugiat', title: 'Magna' },
        { image: 'https://img6.yna.co.kr/etc/inner/KR/2025/05/09/AKR20250509060300003_01_i_P4.jpg', alt: 'Slide 3', description: 'Sed cursus aliuam veroeros lorem ipsum nullam', title: 'Tempus' },
        { image: 'https://images.homify.com/v1441045029/p/photo/image/682854/JHA_YNR_201210_023.jpg', alt: 'Slide 4', description: 'Adipiscing lorem ipsum feugiat sed phasellus consequat', title: 'Etiam' },
        { image: 'https://image.fnnews.com/resource/media/image/2024/12/26/202412261201452417_l.jpg', alt: 'Slide 5', description: 'Ipsum dolor sed magna veroeros lorem ipsum', title: 'Adipiscing' }
      ],
      boxes: [
        { image: 'https://i.namu.wiki/i/84Ffh3VN40Cna9o5Wr-f_fJ7MlxCjH2oGHjrVgaAuSaw3O6tvEYTPc8V4lHbwvf-dwKqVx7-nf3TZrClh-LTuVRFojsBzWqapsFVGzw3hHReg7AgI5InLdymfkab8i_TpAik_WbajXSvmfCG0zx6kA.webp', subTitle: '에렌 예거', title: '진격의 거인', description: '자신의 신체보다 큰 거대한 바위를 들어 올리며 무지성 거인들을 물어 던지는 것을 보면 강력한 근력을 가지고 있는 것으로 추정된다.' },
        { image: 'https://i.namu.wiki/i/u8QGGlqrEekgwKhtNuqHH8VJGqWh9odWyDkk57Xd9nU3fZx0n5QA_4t5JJfH416OgQDMubopX2GFn0ty_mdQhI6A_UcKr_MtVB-ru0f9ZQ7_vDwX2jIq2EGnWx_D8DIMDHMzOz1T3VF4B8janvzR6g.webp', subTitle: '라이너 브라운', title: '갑옷 거인', description: '진격보다 더 다부진 체격과 전신 경질화로 이루어진 갑옷 때문에 방어력과 신체 내구도가 높다.' },
        { image: 'https://i.namu.wiki/i/EFuIqA1AyhFAXXNcvt0YhkO16dQqVn_lGzGaffU39QA1V6Gr6ctC6y329If2Y_g4Wb7yeIVCVGOoFrP6dzfkMY1yG2bGBHfTi048YsNWbarso_DS_AEcVwiitzqbZ6Q5M0ZY_OFuICNw5DjJb-73vw.webp', subTitle: '애니 레온하트', title: '여성형 거인', description: '계승자의 성별에 관계없이 여성의 모습을 한 것이 특징이다. 마레 육군 전사대 대장 테오 마가트에 언급에 의하면 뭐든 해낼 수 있는 범용성이 높은 거인이라고 한다. ' },
        { image: 'https://i.namu.wiki/i/215v7niSqcGWoUj0bPshHOy6bE5Fe_-G8x65jBinwxbxvjDbdY6czia0H9n7BvIXs49Nv2BWrSxXKeY-sMtiwUxiU7ihFnmKn3yHyrXqhQzMVSKf5D5LQi6CI9VsQQh42oaKRbLetoNHAy3GnLk0Rw.webp', subTitle: '베르톨트 후버', title: '초대형 거인', description: '최초로 등장한 아홉 거인으로 시간시나 구를 습격한 장면은 전 세계 많은 독자들에게 충공깽을 선사했다. ' },
        { image: 'https://i.namu.wiki/i/3JknAN3Sk7iZbsTzQabYD99rY1alG79x2sPNXyebTj4rjUabUYMZ0u7f5EfBPOc977yL8EzhaAEkEF0PqH-Vh_eswezYevglV8Cvt71dpqAtnopZbCKA15A21FPx3lRKFWFmbfBq66zEVXc22buiiw.webp', subTitle: '지크 예거', title: '짐승 거인', description: '최초로 등장한 아홉 거인으로 시간시나 구를 습격한 장면은 전 세계 많은 독자들에게 충공깽을 선사했다. ' },
        { image: 'https://i.namu.wiki/i/NohZWpvV2rV2C6dKhJjjiR-GiL-qRBQR9OcQW74w-9mQjugCj3ZjhQZ3IO2tu0KLYljmYXb0glDO-6RC26DRZgUJqVRMyg2c-Nvj-YX_AhSi67wQ1DFZP57J1RkeuU3-ZsvyKAtzJPLQAZo3mtKnzA.webp', subTitle: '포르코 갤리어드', title: ' 턱 거인', description: '계승자에 따라 각각 다른 짐승의 형태를 갖추고 있는 특이한 경우이며 사슴, 늑대, 악어, 황소, 뱀, 사자, 오카피, 토끼, 개, 양, 유인원, 새 등의 형태가 그 예시이다.' },
        { image: 'https://i.namu.wiki/i/BhfFw5LCYhNsWlpD0B_ij3CHpHfaio54Za1PPyUu_NKdbyLW6QkhsbCO1RAuUAPD8yCyYRyqb2VQpyqJBzVjme16ZyKWvD-LeUlZa5CVI16nBtL_UCEiq_QmOad94BQsJl_I2BjrGQCeILGk1iMouA.webp', subTitle: '피크 핑거', title: '차력 거인', description: '5m의 작은 크기와 사족 보행을 하는 거인으로, 스피드가 매우 빠르다.' },
        { image: 'https://i.namu.wiki/i/ZbhGEnYUuS4l_pbBlM68aeoPM81UjNSBYStnbu2b9TtEVgGZ7cGh9mHMrmf2xzRQSC05MgZ0zNVye2jHhjYml62qaVWhTdWOqPaVLu0bn7ydmlJcHx21oSv2ZQ6b3s2JUGjrxxHHKIHaTj8cjyU-GA.webp', subTitle: '라라 타이버', title: '전퇴의 거인', description: 'Sample description for another box.' },
        { image: 'https://i.namu.wiki/i/-45k_IxjAM8NqY_hgVHdLugfFmW4xOUX5HOfs9ppe0wgSqV0yBppOR8wOGzqSeH4FlZrtBipyZC07qEYdIfoO1FLOSqUQbjyTDl_9e6gLzoKXT3LiyN0b_PALgn7h5vvr23FuL5m5f4f3iVAUV49Xg.webp', subTitle: '유미르 프리츠', title: '시조 거인', description: 'Sample description for another box.' }
      ],
      galleryImages: [
        '/pic01.jpg',
        '/pic02.jpg',
        '/pic03.jpg',
        '/pic04.jpg'
      ],
       regions: [
        { name: '서울', image: 'https://lh3.googleusercontent.com/gps-cs-s/AC9h4nq0W2HiWl-LKa-RBzkZj9YlJlXuxhCG7WVfDEzPOkZBFvOl3wPugswbq_0KNZPXvPSRhUwNzDa2vauRC6Om1QJG-amgbStfj0PcgTOaKgNeWQd2h7VP4jz6YmKhnijZdeAeMF1J=w540-h312-n-k-no' },
        { name: '부산', image: 'https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcQF7D200MlIaD5wMqpGUQtWIHH0dah91uYhPksmTB8ZVeS_96dbBpFzodjEzW5AQGT2pQGBVxsvEVW8KVuSBoyjUbCSsR5dUoPuAVVy0Q' },
        { name: '울산', image: 'https://lh3.googleusercontent.com/gps-cs-s/AC9h4nprQxPMFCwTqSjo2wbow-FFWbIrOANoxqIHIu7_t2UJPG-B8omJjzXo8ZO4y5DXCSml8Vht1RQCiPwEN6V-Qj5tqtpyApGOytUm4xSLphHZkWphgUYJZ__R93HgFsPfNXBsR_jV=w540-h312-n-k-no' },
        { name: '부산', image: 'https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcQF7D200MlIaD5wMqpGUQtWIHH0dah91uYhPksmTB8ZVeS_96dbBpFzodjEzW5AQGT2pQGBVxsvEVW8KVuSBoyjUbCSsR5dUoPuAVVy0Q' },
        { name: '부산', image: 'https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcQF7D200MlIaD5wMqpGUQtWIHH0dah91uYhPksmTB8ZVeS_96dbBpFzodjEzW5AQGT2pQGBVxsvEVW8KVuSBoyjUbCSsR5dUoPuAVVy0Q' },
        { name: '부산', image: 'https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcQF7D200MlIaD5wMqpGUQtWIHH0dah91uYhPksmTB8ZVeS_96dbBpFzodjEzW5AQGT2pQGBVxsvEVW8KVuSBoyjUbCSsR5dUoPuAVVy0Q' },
        { name: '부산', image: 'https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcQF7D200MlIaD5wMqpGUQtWIHH0dah91uYhPksmTB8ZVeS_96dbBpFzodjEzW5AQGT2pQGBVxsvEVW8KVuSBoyjUbCSsR5dUoPuAVVy0Q' },
      ],

    };
  },
  mounted() {
    this.startSlideShow();
    if (this.isHomePage) {
      document.getElementById('header').style.background = 'none';
    }
  },
  computed: {
    displayedBoxes() {
      return this.boxes.slice(this.currentBoxIndex, this.currentBoxIndex + 2); // 2개씩만 표시
    },
  },
  methods: {
    startSlideShow() {
      this.autoSlideInterval = setInterval(() => {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
      }, 5000);
    },

    resetSlideShow() {
      clearInterval(this.autoSlideInterval);
      this.startSlideShow();
    },

    changeSlide(index) {
      if (index < 0) {
        this.currentSlide = this.slides.length - 1;
      } else if (index >= this.slides.length) {
        this.currentSlide = 0;
      } else {
        this.currentSlide = index;
      }
      this.resetSlideShow(); // 슬라이드 바뀌면 자동 전환도 초기화
    },
    toggleMenu() {
      this.isMenuVisible = !this.isMenuVisible;
    },
    // 박스 슬라이드 변경
     changeBoxes(direction) {
      const totalBoxes = this.boxes.length;
      const itemsToShow = 2; // 한 번에 보여줄 박스 개수

      // 현재 인덱스를 갱신하여, 방향에 맞게 이동
      this.currentBoxIndex = (this.currentBoxIndex + direction + totalBoxes) % totalBoxes;

      // 두 박스가 보여지도록 순환 처리
      if (this.currentBoxIndex + itemsToShow > totalBoxes) {
        this.currentBoxIndex = 0; // 마지막에 도달하면 첫 번째로 돌아가게 처리
      }
    },
  }
};
</script>