<template>
  <div class="map-page">
    <SearchBar @search="handleSearchResult" />

    <div class="main-content">
      <div class="map-section">
        <KakaoMap :selectedApt="mapStore.selectedApt" />
        <AptDetailCard
          v-if="mapStore.selectedApt"
          :aptSeq="mapStore.selectedApt"
          :key="mapStore.selectedApt"
          @close="mapStore.setSelectedApt(null)"
        />
      </div>

      <Transition name="apt-slide">
        <div class="apt-list-area-overlay" v-if="mapStore.dealList.length > 0">
          <AptList :dealList="mapStore.dealList" @select="handleSelectApt" />
        </div>
      </Transition>
    </div>

    <ReviewSection v-if="mapStore.dongCode" :dongCode="mapStore.dongCode" />
  </div>
</template>

<script setup>
import { useMapStore } from '@/stores/mapStore' // Pinia store import

import SearchBar from './components/SearchBar.vue'
import AptList from './components/AptList.vue'
import KakaoMap from './components/KakaoMap.vue'
import AptDetailCard from './components/AptDetailCard.vue'
import ReviewSection from './components/ReviewSection.vue'

const mapStore = useMapStore()

function handleSearchResult({ list, code }) {
  mapStore.setDealList(list)
  mapStore.setSelectedApt(null)
  mapStore.setDongCode(code)
  console.log('검색 결과:', list)
  console.log('선택된 동 코드:', code)
}

function handleSelectApt(select) {
  mapStore.setSelectedApt(select.aptSeq)
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
