<template>
  <div class="interest-area-root">
    <h2 class="interest-area-title">관심 지역</h2>
    <div v-if="mainLocation" class="interest-area-grid">
      <div class="main-location">
        <div class="main-location-img-wrap">
          <img
            :src="mainLocation.areaUrl"
            alt="area image"
            class="main-location-img"
          />
          <div class="main-location-star" @click="confirmUnstar(mainLocation)">
            <span class="material-symbols-outlined star-icon star-filled">star</span>          
          </div>
        </div>
        <div class="main-location-desc">
          <h3 class="main-location-name">{{ mainLocation.areaName }}</h3>
          <p class="main-location-text" v-html="mainLocation.explain"></p>
          <button class="main-location-map-btn">지도 보기</button>
        </div>
      </div>
      <div class="other-locations">
        <div
          class="other-location group"
          v-for="(loc, idx) in otherLocations"
          :key="loc.areaUuid"
          @click="swapLocation(idx)"
        >
          <div class="other-location-img-wrap">
            <img
              :src="loc.areaUrl"
              alt="area image"
              class="other-location-img"
            />
            <div class="other-location-star" @click.stop="confirmUnstar(loc, idx)">
              <span class="material-symbols-outlined star-icon star-filled">star</span>   
            </div>
          </div>
          <h3 class="other-location-name">{{ loc.areaName }}</h3>
        </div>
      </div>
    </div>
    <div v-else style="padding: 48px 0; text-align: center; color: #aaa;">
      등록된 관심 지역이 없습니다.
    </div>
    <ConfirmModal
      :visible="showConfirmModal"
      title="관심 해제 확인"
      message="관심을 해제하시겠습니까?"
      @confirm="onConfirmUnstar"
      @cancel="onCancelUnstar"
    />
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { deleteInterestArea } from '@/api/InterestArea'
import { UserAreaList } from '@/api/MyPage'
import ConfirmModal from '@/components/common/ConfirmModal.vue'

const mainLocation = ref(null)
const otherLocations = ref([])

const showConfirmModal = ref(false)
const pendingUnstar = ref({ location: null, idx: null })

async function fetchInterestAreas() {
  const res = await UserAreaList()
  if (res && res.length > 0) {
    mainLocation.value = { ...res[0] }
    otherLocations.value = res.slice(1)
  } else {
    mainLocation.value = null
    otherLocations.value = []
  }
}

function confirmUnstar(location, idx = null) {
  pendingUnstar.value = { location, idx }
  showConfirmModal.value = true
}

async function onConfirmUnstar() {
  const { location, idx } = pendingUnstar.value
  if (!location) return
  await deleteInterestArea(location.areaUuid)
  if (mainLocation.value && location.areaUuid === mainLocation.value.areaUuid) {
    if (otherLocations.value.length > 0) {
      mainLocation.value = { ...otherLocations.value[0] }
      otherLocations.value.splice(0, 1)
    } else {
      mainLocation.value = null
    }
  } else if (idx !== null) {
    otherLocations.value.splice(idx, 1)
  }
  showConfirmModal.value = false
  pendingUnstar.value = { location: null, idx: null }
}

function onCancelUnstar() {
  showConfirmModal.value = false
  pendingUnstar.value = { location: null, idx: null }
}

function swapLocation(idx) {
  const temp = { ...mainLocation.value }
  mainLocation.value = { ...otherLocations.value[idx] }
  otherLocations.value[idx] = temp
}

onMounted(fetchInterestAreas)
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');
.interest-area-root {
  max-width: 82rem;
  margin: 0 auto;
  padding: 16px;
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  box-shadow: 0 4px 24px 0 rgba(30,40,60,0.10), 0 1.5px 4px 0 rgba(30,40,60,0.04);
  border-radius: 18px;
}
.interest-area-title {
  font-size: 24px;
  font-weight: bold;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 8px;
  margin-bottom: 24px;
}
.interest-area-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}
@media (min-width: 1024px) {
  .interest-area-grid {
    grid-template-columns: repeat(12, 1fr);
  }
}
.main-location {
  grid-column: span 12;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 16px rgba(30,40,60,0.06);
  padding: 0 0 24px 0;
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
  min-height: 680px; 
  min-width: 40rem;
}
@media (min-width: 1024px) {
  .main-location {
    grid-column: span 6;
    margin-bottom: 0;
  }
}
.main-location-img-wrap {
  position: relative;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(30,40,60,0.10);
}
.main-location-img {
  width: 100%;
  height: 350px;
  min-height: 256px;
  object-fit: cover;
  border-radius: 18px;
  transition: filter 0.3s;
}
.main-location-star {
  position: absolute;
  top: 8px;
  right: 8px;
  color: #facc15;
  background: rgba(255,255,255,0.7);
  border-radius: 50%;
  padding: 4px;
  cursor: pointer;
  transition: color 0.2s, background 0.2s, transform 0.2s;
}
.main-location-star:hover {
  color: #fde047;
  background: #fff;
  transform: scale(1.1);
}
.star-icon {
  font-size: 28px;
  vertical-align: middle;
}
.star-filled {
  font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}
.main-location-desc {
  margin-top: 16px;
  padding: 0 8px;
  min-height: 180px; 
}
.main-location-name {
  font-size: 20px;
  font-weight: bold;
}
.main-location-text {
  font-size: 14px;
  margin-top: 8px;
  color: #374151;
  line-height: 1.625;
}
.main-location-map-btn {
  margin-top: 16px;
  background: #222;
  color: #fff;
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  font-weight: 500;
  transition: background 0.2s;
  cursor: pointer;
}
.main-location-map-btn:hover {
  background: #444;
}
.other-locations {
  grid-column: span 12;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  position: relative;
  align-items: center;
}
@media (min-width: 1024px) {
  .other-locations {
    grid-column: span 6;
    grid-template-columns: repeat(3, 1fr);
  }
}
.other-location {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 8px rgba(30,40,60,0.08);
  overflow: hidden;
  transition: box-shadow 0.2s, transform 0.2s;
  cursor: pointer;
}
.other-location:hover {
  box-shadow: 0 6px 24px rgba(30,40,60,0.13);
  transform: translateY(-2px) scale(1.03);
}
.other-location-img-wrap {
  position: relative;
  border-radius: 18px;
  overflow: hidden;
}
.other-location-img {
  width: 100%;
  height: 144px;
  min-height: 144px;
  object-fit: cover;
  transition: transform 0.3s;
}
.other-location-star {
  position: absolute;
  top: 8px;
  right: 8px;
  color: #facc15;
  background: rgba(255,255,255,0.7);
  border-radius: 50%;
  padding: 4px;
  cursor: pointer;
  transition: color 0.2s, background 0.2s, transform 0.2s;
}
.other-location-star:hover {
  color: #fde047;
  background: #fff;
  transform: scale(1.1);
}
.other-location-name {
  text-align: center;
  font-weight: bold;
  margin-top: 8px;
  font-size: 16px;
}
.arrow-btn {
  display: none;
}
</style>
