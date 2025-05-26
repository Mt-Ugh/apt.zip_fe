<template>
  <div class="apt-list">
    <div v-for="apt in dealList" :key="apt.aptSeq" class="apt-item" @click="selectApt(apt)">
      <div class="apt-main">
        <div class="apt-info">
          <div class="apt-name">{{ apt.aptNm }}</div>
          <div class="apt-address">
            {{ apt.sidoName }} {{ apt.gugunName }} {{ apt.dongName }} {{ apt.jibun }}
          </div>
        </div>
        <div class="apt-price">
          {{ formatPrice(apt.dealAmount) }}
        </div>
      </div>

      <div class="apt-sub">
        <div class="apt-date">
          최근 거래일 {{ formatDate(apt.dealYear, apt.dealMonth, apt.dealDay) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useMapStore } from '@/stores/mapStore'
import { storeToRefs } from 'pinia'
const mapStore = useMapStore()
const { dealList } = storeToRefs(mapStore)

function selectApt(apt) {
  mapStore.setSelectedApt(apt)
}

function formatPrice(amount) {
  const hundredMillions = Math.floor(amount / 10000)
  const tenThousands = amount % 10000

  if (hundredMillions > 0 && tenThousands > 0) {
    return `${hundredMillions}억 ${tenThousands.toLocaleString()}만원`
  } else if (hundredMillions > 0 && tenThousands === 0) {
    return `${hundredMillions}억`
  } else {
    return `${tenThousands.toLocaleString()}만원`
  }
}

function formatDate(year, month, day) {
  const mm = String(month).padStart(2, '0')
  const dd = String(day).padStart(2, '0')
  return `${String(year).slice(2)}.${mm}.${dd}`
}
</script>

<style scoped>
.apt-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px;
}

.apt-item {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 12px 16px;
  cursor: pointer;
  transition: 0.2s;
}

.apt-item:hover {
  background-color: #f9f9f9;
}

.apt-main {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.apt-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.apt-name {
  font-weight: bold;
  font-size: 16px;
  color: #222;
}

.apt-address {
  color: #666;
  font-size: 13px;
}

.apt-price {
  font-size: 16px;
  font-weight: bold;
  color: #4c94eb;
  white-space: nowrap;
}

.apt-sub {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  font-size: 12px;
  color: #999;
}

.apt-date {
  margin-left: auto;
}
</style>
