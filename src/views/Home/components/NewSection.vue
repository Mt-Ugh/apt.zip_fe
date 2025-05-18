<template>
  <section id="one" class="wrapper style2">
    <div class="inner">
      <header class="align-left"><p>오늘의 뉴스</p></header>
      <div class="grid-style">
        <div v-for="(box, index) in displayedBoxes" :key="index">
          <div class="box">
            <div class="image fit">
              <img :src="box.image" alt="" width="600" height="300" />
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
      <button class="prev" @click="changeBoxes(-1)">←</button>
      <button class="next" @click="changeBoxes(1)">→</button>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const boxes = ref([
  {
    image: 'https://i.namu.wiki/i/84Ffh3VN40Cna9o5Wr-f_fJ7MlxCjH2oGHjrVgaAuSaw3O6tvEYTPc8V4lHbwvf-dwKqVx7-nf3TZrClh-LTuVRFojsBzWqapsFVGzw3hHReg7AgI5InLdymfkab8i_TpAik_WbajXSvmfCG0zx6kA.webp',
    subTitle: '에렌 예거',
    title: '진격의 거인',
    description: '자신의 신체보다 큰 거대한 바위를 들어 올리며 무지성 거인들을 물어 던지는 것을 보면 강력한 근력을 가지고 있는 것으로 추정된다.'
  },
  {
    image: 'https://i.namu.wiki/i/u8QGGlqrEekgwKhtNuqHH8VJGqWh9odWyDkk57Xd9nU3fZx0n5QA_4t5JJfH416OgQDMubopX2GFn0ty_mdQhI6A_UcKr_MtVB-ru0f9ZQ7_vDwX2jIq2EGnWx_D8DIMDHMzOz1T3VF4B8janvzR6g.webp',
    subTitle: '라이너 브라운',
    title: '갑옷 거인',
    description: '진격보다 더 다부진 체격과 전신 경질화로 이루어진 갑옷 때문에 방어력과 신체 내구도가 높다.'
  },
  {
    image: 'https://i.namu.wiki/i/EFuIqA1AyhFAXXNcvt0YhkO16dQqVn_lGzGaffU39QA1V6Gr6ctC6y329If2Y_g4Wb7yeIVCVGOoFrP6dzfkMY1yG2bGBHfTi048YsNWbarso_DS_AEcVwiitzqbZ6Q5M0ZY_OFuICNw5DjJb-73vw.webp',
    subTitle: '애니 레온하트',
    title: '여성형 거인',
    description: '계승자의 성별에 관계없이 여성의 모습을 한 것이 특징이다. 마레 육군 전사대 대장 테오 마가트에 언급에 의하면 뭐든 해낼 수 있는 범용성이 높은 거인이라고 한다.'
  },
  {
    image: 'https://i.namu.wiki/i/215v7niSqcGWoUj0bPshHOy6bE5Fe_-G8x65jBinwxbxvjDbdY6czia0H9n7BvIXs49Nv2BWrSxXKeY-sMtiwUxiU7ihFnmKn3yHyrXqhQzMVSKf5D5LQi6CI9VsQQh42oaKRbLetoNHAy3GnLk0Rw.webp',
    subTitle: '베르톨트 후버',
    title: '초대형 거인',
    description: '최초로 등장한 아홉 거인으로 시간시나 구를 습격한 장면은 전 세계 많은 독자들에게 충공깽을 선사했다.'
  },
  {
    image: 'https://i.namu.wiki/i/3JknAN3Sk7iZbsTzQabYD99rY1alG79x2sPNXyebTj4rjUabUYMZ0u7f5EfBPOc977yL8EzhaAEkEF0PqH-Vh_eswezYevglV8Cvt71dpqAtnopZbCKA15A21FPx3lRKFWFmbfBq66zEVXc22buiiw.webp',
    subTitle: '지크 예거',
    title: '짐승 거인',
    description: '최초로 등장한 아홉 거인으로 시간시나 구를 습격한 장면은 전 세계 많은 독자들에게 충공깽을 선사했다.'
  },
  {
    image: 'https://i.namu.wiki/i/NohZWpvV2rV2C6dKhJjjiR-GiL-qRBQR9OcQW74w-9mQjugCj3ZjhQZ3IO2tu0KLYljmYXb0glDO-6RC26DRZgUJqVRMyg2c-Nvj-YX_AhSi67wQ1DFZP57J1RkeuU3-ZsvyKAtzJPLQAZo3mtKnzA.webp',
    subTitle: '포르코 갤리어드',
    title: '턱 거인',
    description: '계승자에 따라 각각 다른 짐승의 형태를 갖추고 있는 특이한 경우이며 사슴, 늑대, 악어, 황소, 뱀, 사자, 오카피, 토끼, 개, 양, 유인원, 새 등의 형태가 그 예시이다.'
  },
  {
    image: 'https://i.namu.wiki/i/BhfFw5LCYhNsWlpD0B_ij3CHpHfaio54Za1PPyUu_NKdbyLW6QkhsbCO1RAuUAPD8yCyYRyqb2VQpyqJBzVjme16ZyKWvD-LeUlZa5CVI16nBtL_UCEiq_QmOad94BQsJl_I2BjrGQCeILGk1iMouA.webp',
    subTitle: '피크 핑거',
    title: '차력 거인',
    description: '5m의 작은 크기와 사족 보행을 하는 거인으로, 스피드가 매우 빠르다.'
  },
  {
    image: 'https://i.namu.wiki/i/ZbhGEnYUuS4l_pbBlM68aeoPM81UjNSBYStnbu2b9TtEVgGZ7cGh9mHMrmf2xzRQSC05MgZ0zNVye2jHhjYml62qaVWhTdWOqPaVLu0bn7ydmlJcHx21oSv2ZQ6b3s2JUGjrxxHHKIHaTj8cjyU-GA.webp',
    subTitle: '라라 타이버',
    title: '전퇴의 거인',
    description: 'Sample description for another box.'
  },
  {
    image: 'https://i.namu.wiki/i/-45k_IxjAM8NqY_hgVHdLugfFmW4xOUX5HOfs9ppe0wgSqV0yBppOR8wOGzqSeH4FlZrtBipyZC07qEYdIfoO1FLOSqUQbjyTDl_9e6gLzoKXT3LiyN0b_PALgn7h5vvr23FuL5m5f4f3iVAUV49Xg.webp',
    subTitle: '유미르 프리츠',
    title: '시조 거인',
    description: 'Sample description for another box.'
  }
])

const currentBoxIndex = ref(0)
const displayedBoxes = computed(() => boxes.value.slice(currentBoxIndex.value, currentBoxIndex.value + 2))

const changeBoxes = (direction) => {
  const total = boxes.value.length
  currentBoxIndex.value = (currentBoxIndex.value + direction + total) % total
  if (currentBoxIndex.value + 2 > total) {
    currentBoxIndex.value = 0
  }
}
</script>
