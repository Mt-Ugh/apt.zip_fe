<template>
  <div class="interest-deal-view">
    <div class="content-wrapper">
      <div class="header-section">
        <h2 class="title">관심거래</h2>
        <div v-if="selectedDeals.length > 0" class="delete-button-container">
          <button @click="deleteSelectedDeals" class="delete-button">
            선택 삭제 ({{ selectedDeals.length }})
          </button>
        </div>
      </div>
      <div class="deals-list">
        <div v-for="(deal, index) in deals" :key="index" class="deal-wrapper">
          <div class="deal-item">
            <div class="checkbox-wrapper">
              <input 
                type="checkbox" 
                :value="index"
                v-model="selectedDeals"
                @click.stop
                class="deal-checkbox"
              >
            </div>
            <div class="deal-content" @click="toggleDealDetails(index)">
              <div class="deal-info">
                <div class="deal-left">
                  <span class="deal-type">{{ deal.type }}</span>
                  <span class="deal-address">{{ deal.address }}</span>
                </div>
                <div class="deal-right">
                  <span class="deal-price">{{ deal.price }}만원</span>
                  <div class="toggle-icon" :class="{ 'rotated': openDeals[index] }">
                    <span v-if="openDeals[index]">▲</span>
                    <span v-else>▼</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 지도 컨테이너 -->
          <div v-show="openDeals[index]" class="map-container">
            <div :id="'map-' + index" class="map" ref="mapRefs"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 관심 거래 데이터
const deals = ref([
  {
    type: '삼화고려아파트',
    address: '부산광역시 금사구 중동동 1627-5',
    price: '8,100'
  },
  {
    type: '삼화고려아파트',
    address: '부산광역시 금사구 중동동 1627-5',
    price: '8,100'
  },
  {
    type: '삼화고려아파트',
    address: '부산광역시 금사구 중동동 1627-5',
    price: '8,100'
  }
])

// 선택된 거래 아이템 관리
const selectedDeals = ref([])

// 각 거래 아이템의 열림/닫힘 상태 관리
const openDeals = ref({})

// 거래 상세 정보 토글 함수
const toggleDealDetails = (index) => {
  // Vue의 반응성을 위해 새로운 객체를 생성하여 할당
  const newOpenDeals = { ...openDeals.value }
  newOpenDeals[index] = !newOpenDeals[index]
  openDeals.value = newOpenDeals

  // 지도 초기화 로직
  if (newOpenDeals[index] && window.kakao && window.kakao.maps) {
    setTimeout(() => {
      const mapContainer = document.getElementById(`map-${index}`)
      if (mapContainer) {
        const options = {
          center: new window.kakao.maps.LatLng(35.1795543, 129.0756416),
          level: 3
        }
        new window.kakao.maps.Map(mapContainer, options)
      }
    }, 0)
  }
}

// 선택된 거래 삭제
const deleteSelectedDeals = () => {
  // 선택된 인덱스를 내림차순으로 정렬하여 삭제
  const sortedIndexes = [...selectedDeals.value].sort((a, b) => b - a)
  sortedIndexes.forEach(index => {
    deals.value.splice(index, 1)
  })
  selectedDeals.value = [] // 선택 초기화
  openDeals.value = {} // 열린 상태 초기화
}
</script>

<style scoped>
.interest-deal-view {
  max-width: 1100px;
  margin: 0 auto;
  padding: 140px 0;
  min-height: calc(100vh - 280px); /* header/footer 고려한 최소 높이 */
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.title {
  font-size: 24px;
  font-weight: bold;
}

.deals-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.deal-wrapper {
  display: flex;
  flex-direction: column;
}

.deal-item {
  background-color: #f8f9fa;
  border-radius: 8px;
  display: flex;
  align-items: center;
}

.checkbox-wrapper {
  padding: 0 15px;
}

.deal-checkbox {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.deal-content {
  flex: 1;
  padding: 15px 20px;
  cursor: pointer;
}

.deal-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.deal-left {
  display: flex;
  gap: 15px;
  align-items: center;
}

.deal-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.deal-type {
  font-weight: bold;
}

.deal-address {
  color: #666;
}

.deal-price {
  font-weight: bold;
  color: #1a73e8;
  font-size: 16px;
}

.toggle-icon {
  color: #666;
  width: 20px;
  text-align: center;
  transition: transform 0.3s ease;
}

.toggle-icon.rotated {
  transform: rotate(180deg);
}

.map-container {
  margin-top: 1px;
  background-color: #f8f9fa;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.map {
  width: 100%;
  height: 300px;
}

.delete-button-container {
  display: flex;
  align-items: center;
}

.delete-button {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
}

.delete-button:hover {
  background-color: #c82333;
}
</style> 