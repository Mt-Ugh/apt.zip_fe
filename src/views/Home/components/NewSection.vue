<template>
  <section id="one" class="wrapper style2">
    <div class="inner">
      <header class="align-left"><p>오늘의 뉴스</p></header>
      <div class="grid-style">
        <div v-for="(news, index) in displayedBoxes" :key="index">
          <div class="box">
            <div class="image fit">
              <img :src="news.thumbnail" alt="" width="600" height="300" />
            </div>
            <div class="content">
              <header class="align-center">
                <h2>{{ news.title }}</h2>
              </header>
              <p>{{ news.description }}</p>
              <footer class="align-center">
                <a :href="news.link" class="button alt" target="_blank">Learn More</a>
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
import { ref, computed, onMounted } from 'vue'
import { NewsList } from '@/api/InterestArea'
const realEstatenews = ref([])

const currentBoxIndex = ref(0)
const displayedBoxes = computed(() =>
  realEstatenews.value.slice(currentBoxIndex.value, currentBoxIndex.value + 2),
)

const changeBoxes = (direction) => {
  const total = realEstatenews.value.length
  let newIndex = currentBoxIndex.value + direction

  if (newIndex < 0) {
    newIndex = total - 2
  }

  if (newIndex > total - 2) {
    newIndex = 0
  }

  currentBoxIndex.value = newIndex
}

onMounted(async () => {
  realEstatenews.value = await NewsList()
})
</script>
<style></style>
