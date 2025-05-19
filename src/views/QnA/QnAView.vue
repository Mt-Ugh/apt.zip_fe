<template>
  <div class="page-wrapper">
    <h2 class="title">Q&amp;A</h2>

    <SearchBar v-model="searchQuery" />
    <QAList :dataList="dataList" :searchQuery="searchQuery" v-model:selectedId="selectedId" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import SearchBar from '@/views/QnA/components/SearchBar.vue'
import QAList from '@/views/QnA/components/QAList.vue'
import { QnAList } from '@/api/QnA'

const searchQuery = ref('')
const selectedId = ref(null)

const dataList = ref([])

onMounted(async () => {
  dataList.value = await QnAList()
})
</script>

<style scoped>
.page-wrapper {
  max-width: 1100px;
  margin: 0 auto 100px;
  padding: 1rem;
  padding-top: 100px;
  min-height: calc(100vh - 160px);
  overflow-y: auto;
  font-family: 'Noto Sans KR', sans-serif;
  position: relative;
}

@media screen and (max-width: 1545px) {
  .page-wrapper {
    max-width: 1000px;
    padding-top: 100px;
  }
}

.title {
  font-weight: 700;
  font-size: 2.25rem;
  margin-bottom: 3.5rem;
  text-align: center;
}
</style>
