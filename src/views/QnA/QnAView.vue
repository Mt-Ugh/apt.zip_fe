<template>
  <div class="page-wrapper">
   <h2 class="title">
    <img :src="QnALogo" alt="Q&A" class="title-image" />
  </h2>

    <SearchBar v-model="searchQuery" v-model:modelCategory="selectedCategory" />

    <div class="content-wrapper">
      <QAList :dataList="dataList" :searchQuery="searchQuery" :category="selectedCategory" v-model:selectedId="selectedId" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import SearchBar from '@/views/QnA/components/SearchBar.vue'
import QAList from '@/views/QnA/components/QAList.vue'
import { QnAList } from '@/api/QnA'
import QnALogo from '@/assets/images/QnA/QnALogo.png'

const searchQuery = ref('')
const selectedId = ref(null)
const selectedCategory = ref('')
const dataList = ref([])



onMounted(async () => {
  dataList.value = await QnAList()
})
</script>

<style scoped>

.page-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh; 
  padding-top: 100px;
  max-width: 1200px;
  margin: 0 auto;
  font-family: 'Noto Sans KR', sans-serif;
}

@media screen and (max-width: 1545px) {
  .page-wrapper {
    max-width: 1200px;
    padding-top: 100px;

  }
}

.content-wrapper {
  flex: 1; 
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 0; 
}

.qa-list {
  flex: 1; 
  overflow-y: auto;
}

.title-image {
  max-width: 230px;
  height: auto;
  display: block;
  margin: 0 auto;
}

</style>
