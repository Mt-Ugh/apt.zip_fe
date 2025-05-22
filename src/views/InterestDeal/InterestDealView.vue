<template>
  <div class="interest-deal-view">
    <div class="content-wrapper">
      <div class="header-section">
        <h2 class="title">관심거래</h2>
        <div v-if="selectedDeals.length > 0" class="delete-button-container">
          <button @click="deleteSelectedDeals" class="delete-button">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              style="vertical-align: middle; margin-right: 6px"
            >
              <polyline
                points="4,10 8,15 15,4"
                fill="none"
                stroke="#fff"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            {{ selectedDeals.length }}개 삭제
          </button>
        </div>
      </div>
      <div class="deals-list">
        <div v-for="(deal, index) in deals" :key="deal.saleUuid" class="deal-wrapper">
          <div class="deal-item" :class="{ selected: selectedDeals.includes(index) }">
            <div class="checkbox-wrapper" @click.stop>
              <label class="custom-checkbox-label">
                <input
                  type="checkbox"
                  :value="index"
                  v-model="selectedDeals"
                  class="custom-checkbox"
                />
                <span class="custom-checkbox-box">
                  <svg
                    v-if="selectedDeals.includes(index)"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                  >
                    <polyline
                      points="3,9 7,13 13,4"
                      fill="none"
                      stroke="#27ae60"
                      stroke-width="2.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
              </label>
            </div>
            <div class="deal-content" @click="toggleDealDetails(index)">
              <div class="deal-info">
                <div class="deal-left">
                  <span class="deal-type">{{ deal.aptNm }}</span>
                  <span class="deal-address">
                    {{ deal.sidoName }} {{ deal.gugunName }} {{ deal.dongName }} {{ deal.jibun }}
                  </span>
                </div>
                <div class="deal-right">
                  <span class="deal-price">{{ formatAmount(deal.dealAmount) }}</span>
                  <div class="toggle-icon" :class="{ rotated: openDeals[index] }">
                    <svg v-if="openDeals[index]" width="18" height="18" viewBox="0 0 18 18">
                      <polyline
                        points="4,11 9,6 14,11"
                        fill="none"
                        stroke="#222"
                        stroke-width="2.2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <svg v-else width="18" height="18" viewBox="0 0 18 18">
                      <polyline
                        points="4,7 9,12 14,7"
                        fill="none"
                        stroke="#222"
                        stroke-width="2.2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <KakaoMap v-if="openDeals[index]" :apt="deal" :mapId="'map-' + index" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { IterestDealList, deleteInterestDeals } from '@/api/InterestDeal'
import KakaoMap from '@/views/InterestDeal/components/KakaoMap.vue'

const deals = ref([])
const openDeals = ref({})
const selectedDeals = ref([])

function formatAmount(amount) {
  if (typeof amount !== 'number') return ''
  if (amount >= 10000) {
    const eok = Math.floor(amount / 10000)
    const man = amount % 10000
    if (man === 0) {
      return `${eok}억`
    }
    return `${eok}억 ${man.toLocaleString('ko-KR')} 만원`
  }
  return amount.toLocaleString('ko-KR') + ' 만원'
}

const toggleDealDetails = async (index) => {
  const newOpenDeals = { ...openDeals.value }
  newOpenDeals[index] = !newOpenDeals[index]
  openDeals.value = newOpenDeals
}

const deleteSelectedDeals = async () => {
  const saleUuids = selectedDeals.value.map((idx) => deals.value[idx].saleUuid)
  if (saleUuids.length === 0) return
  try {
    await deleteInterestDeals(saleUuids)
    deals.value = deals.value.filter((deal, idx) => !selectedDeals.value.includes(idx))
    selectedDeals.value = []
    openDeals.value = {}
  } catch (e) {
    alert('삭제 실패: ' + (e.message || ''))
  }
}

const fetchDeals = async () => {
  const res = await IterestDealList()
  deals.value = res
}

onMounted(() => {
  fetchDeals()
})
</script>

<style scoped>
.interest-deal-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 100px 0;
  min-height: 1090px;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
}

.title {
  font-size: 26px;
  font-weight: bold;
  color: #333;
}

.deals-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.deal-wrapper {
  display: flex;
  flex-direction: column;
}

.deal-item {
  background: #f6f4ef;
  /* border 제거 */
  border: none;
  border-radius: 14px;
  display: flex;
  align-items: center;
  min-height: 72px;
  box-shadow: 0 2px 8px 0 rgba(30, 40, 60, 0.03);
  transition:
    box-shadow 0.2s,
    background 0.2s;
  margin-bottom: 2px;
  position: relative;
}

.deal-item.selected {
  box-shadow: 0 6px 24px 0 rgba(30, 40, 60, 0.13);
  background: #e3e0d9;
}

.deal-item:hover {
  background: #edeae3;
  box-shadow: 0 6px 24px 0 rgba(30, 40, 60, 0.1);
}

.checkbox-wrapper {
  padding: 0 12px;
  display: flex;
  align-items: center;
}

.custom-checkbox-label {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.custom-checkbox {
  display: none;
}

.custom-checkbox-box {
  width: 18px;
  height: 18px;
  border: 2px solid transparent;
  border-radius: 5px;
  background: #edeae3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    border-color 0.2s,
    background 0.2s;
}

.custom-checkbox:checked + .custom-checkbox-box {
  border-color: #bdb8a9;
  background: #d3cfc3;
}

.custom-checkbox-box svg {
  display: block;
  stroke: #bdb8a9;
}

.deal-content {
  flex: 1;
  padding: 16px 22px;
  cursor: pointer;
  position: relative;
}

.deal-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.deal-left {
  display: flex;
  gap: 12px;
  align-items: center;
}

.deal-type {
  font-weight: bold;
  color: #333;
  font-size: 18px;
}

.deal-address {
  color: #555;
  font-size: 14px;
}

.deal-saleuuid {
  color: #888;
  font-size: 12px;
}

.deal-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.deal-price {
  font-weight: bold;
  color: #222;
  font-size: 16px;
}

.toggle-icon {
  width: 20px;
  height: 20px;
  text-align: center;
  transition: transform 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.toggle-icon.rotated {
  transform: rotate(180deg);
}

.map-container {
  margin-top: 1px;
  background-color: #d3cfc3;
  border-radius: 0 0 14px 14px;
  overflow: visible;
  transition: all 0.3s ease;
  border-top: 1px solid #bdb8a9;
}

.map {
  width: 100%;
  min-height: 200px;
  height: 200px;
  background: #e6eaf3;
  border-radius: 0 0 14px 14px;
  z-index: 1;
}

.delete-button-container {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
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
  font-size: 16px;
  display: flex;
  align-items: center;
}

.delete-button svg {
  margin-right: 4px;
}

.delete-button svg polyline {
  stroke: #fff;
}

.delete-button:hover {
  background-color: #c82333;
}
</style>
