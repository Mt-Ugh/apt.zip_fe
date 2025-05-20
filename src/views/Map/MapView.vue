<template>
  <div class="map-page">
    <SearchBar @search="handleSearchResult" />

    <div class="main-content">
      <div class="map-section">
        <KakaoMap :selectedApt="selectedApt" />
        <AptDetailCard
          v-if="selectedApt"
          :aptSeq="selectedApt"
          :key="selectedApt"
          @close="selectedApt = null"
        />
      </div>

      <Transition name="apt-slide">
        <div class="apt-list-area-overlay" v-if="dealList.length > 0">
          <AptList :dealList="dealList" @select="handleSelectApt" />
        </div>
      </Transition>
    </div>

    <ReviewSection v-if="dongCode" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

import SearchBar from './components/SearchBar.vue'
import AptList from './components/AptList.vue'
import KakaoMap from './components/KakaoMap.vue'
import AptDetailCard from './components/AptDetailCard.vue'
import ReviewSection from './components/ReviewSection.vue'

const dealList = ref([])
const selectedApt = ref(null)
const dongCode = ref('')

function handleSearchResult({ list, code }) {
  dealList.value = list
  selectedApt.value = null
  dongCode.value = code
  console.log('검색 결과:', list)
  console.log('선택된 동 코드:', code)
}

function handleSelectApt(select) {
  selectedApt.value = select.aptSeq
  console.log('선택된 아파트:', select.aptSeq)
}
</script>

<style scoped>
.map-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-top: 4.25em;
}

.main-content {
  display: flex;
  flex: none;
  position: relative;
  overflow: hidden;
  min-height: 90vh;
}

.map-section {
  flex: 1;
  position: relative;
  background-color: #f8f8f8;
  min-height: 90vh;
}

.apt-list-area-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 400px;
  height: 100%;
  background: #fff;
  box-shadow: 4px 0 12px rgba(0, 0, 0, 0.1);
  z-index: 5;
  overflow-y: auto;
  transition: transform 0.3s ease;
}

.apt-slide-enter-active,
.apt-slide-leave-active {
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}

.apt-slide-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}

.apt-slide-enter-to {
  transform: translateX(0);
  opacity: 1;
}

.apt-slide-leave-from {
  transform: translateX(0);
  opacity: 1;
}

.apt-slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
