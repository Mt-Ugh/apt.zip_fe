<template>
  <div class="detail-card" v-if="aptDetail.aptNm">
    <button class="close-button" @click="closeDetail">×</button>

    <h2 class="apt-name">{{ aptDetail.aptNm }}</h2>

    <hr class="divider" />

    <div class="info-grid">
      <div class="info-columns">
        <div class="info-block with-icon">
          <img :src="Pin" alt="주소" class="Pin" />
          <div>
            <div class="info-label">주소</div>
            <div class="info-value">
              {{ aptDetail.sidoName }} {{ aptDetail.gugunName }} {{ aptDetail.dongName }}
              {{ aptDetail.jibun }}
            </div>
          </div>
        </div>
      </div>

      <div class="info-columns horizontal">
        <div class="info-block with-icon">
          <img :src="Won" alt="최근 거래가" class="Won" />
          <div>
            <div class="info-label">최근 거래가</div>
            <div class="info-value">{{ formatPrice(aptDetail.dealList[0]?.dealAmount) }}</div>
          </div>
        </div>
        <div class="info-block with-icon">
          <img :src="Total" alt="총 거래 건수" class="Total" />
          <div>
            <div class="info-label">총 거래 건수</div>
            <div class="info-value">{{ aptDetail.totalDeal.toLocaleString() }} 건</div>
          </div>
        </div>
      </div>

      <div class="info-columns">
        <div class="info-block with-icon">
          <img :src="Tool" alt="준공 년도" class="Tool" />
          <div>
            <div class="info-label">준공 년도</div>
            <div class="info-value">{{ aptDetail.buildYear }}년</div>
          </div>
        </div>
      </div>
    </div>

    <div class="extreme-prices">
      <div class="price-box high">
        <div class="label">최고 실거래가</div>
        <div class="value">{{ formatPrice(aptDetail.maxAmount) }}</div>
      </div>
      <div class="price-box low">
        <div class="label">최저 실거래가</div>
        <div class="value">{{ formatPrice(aptDetail.minAmount) }}</div>
      </div>
    </div>

    <div class="chart-container">
      <canvas id="dealChart"></canvas>
    </div>

    <hr class="divider" />
    <h4>거래 내역</h4>
    <div class="table-section">
      <table>
        <thead>
          <tr>
            <th>거래일</th>
            <th>동</th>
            <th>층</th>
            <th>면적</th>
            <th>거래금액</th>
            <th>관심거래</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, idx) in aptDetail.dealList" :key="idx">
            <td>{{ formatDate(item.dealYear, item.dealMonth, item.dealDay) }}</td>
            <td>{{ item.aptDong }}</td>
            <td>{{ item.floor }}</td>
            <td>{{ item.excluUseAr }}㎡</td>
            <td>{{ formatPrice(item.dealAmount) }}</td>
            <td>
              <button class="interest-btn" @click="addInterestDeal(item)">등록</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <CommonModal
    :visible="showModal"
    :title="modalTitle"
    :message="modalMessage"
    @close="showModal = false"
  />
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { fetchAptDetail } from '@/api/DealMap'
import Pin from '@/assets/images/Map/Pin.svg'
import Tool from '@/assets/images/Map/Tool.svg'
import Total from '@/assets/images/Map/Total.svg'
import Won from '@/assets/images/Map/Won.svg'
import CommonModal from '@/components/common/CommonModal.vue'
import { useMapStore } from '@/stores/mapStore'
import { useUserStore } from '@/stores/user'
import { registInterestDeal } from '@/api/DealMap'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

const props = defineProps({
  aptSeq: [String, Object],
})

const emits = defineEmits(['close'])

const mapStore = useMapStore()
const userStore = useUserStore()
const aptDetail = ref({
  aptNm: '',
  sidoName: '',
  gugunName: '',
  dongName: '',
  jibun: '',
  maxAmount: 0,
  minAmount: 0,
  totalDeal: 0,
  buildYear: 0,
  dealList: [],
})

const showModal = ref(false)
const modalTitle = ref('')
const modalMessage = ref('')

const showModalError = (title, message) => {
  modalTitle.value = title
  modalMessage.value = message
  showModal.value = true
}

watch(
  () => mapStore.selectedApt,
  async (apt) => {
    if (apt && apt.aptSeq) {
      const result = await fetchAptDetail(apt.aptSeq)
      result.dealList.sort(
        (a, b) =>
          new Date(b.dealYear, b.dealMonth - 1, b.dealDay) -
          new Date(a.dealYear, a.dealMonth - 1, a.dealDay),
      )
      aptDetail.value = result
    }
  },
  { immediate: true },
)

function closeDetail() {
  mapStore.setSelectedApt(null)
}

function formatPrice(amount) {
  if (isNaN(amount)) return '정보 없음'
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

async function addInterestDeal(item) {
  const selectedApt = mapStore.selectedApt
  const interestDeal = {
    no: item.no,
    dongCode: mapStore.dongCode,
    aptNm: selectedApt.aptNm,
    sidoName: selectedApt.sidoName,
    gugunName: selectedApt.gugunName,
    dongName: selectedApt.dongName,
    jibun: selectedApt.jibun,
    latitude: selectedApt.latitude,
    longitude: selectedApt.longitude,
  }

  if (userStore.isLoggedIn) {
    try {
      const result = await registInterestDeal(interestDeal)
      if (result.status === 409) {
        showModalError('등록 실패', '이미 등록된 거래입니다')
      } else {
        showModalError('등록 성공', '관심 거래가 등록되었습니다')
      }
    } catch {
      showModalError('등록 실패', '관심거래 등록 중 오류가 발생했습니다')
    }
  } else {
    showModalError('등록 실패', '로그인을 해주세요')
  }
}

let dealChart = null

onMounted(() => {
  if (mapStore.selectedApt && mapStore.selectedApt.aptSeq) {
    fetchAptDetail(mapStore.selectedApt.aptSeq).then((result) => {
      result.dealList.sort(
        (a, b) =>
          new Date(a.dealYear, a.dealMonth - 1, a.dealDay) -
          new Date(b.dealYear, b.dealMonth - 1, b.dealDay),
      )
      aptDetail.value = result
    })
  }
})

watch(
  () => aptDetail.value.dealList,
  (newDealList) => {
    if (newDealList && newDealList.length > 0) {
      if (!dealChart) {
        createChart()
      } else {
        updateChart(newDealList)
      }
    }
  },
)

function createChart() {
  const canvas = document.getElementById('dealChart')
  if (!canvas) {
    return
  }

  const ctx = canvas.getContext('2d')
  const monthlyData = aggregateMonthlyData(aptDetail.value.dealList)

  dealChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: monthlyData.map((item) => item.label),
      datasets: [
        {
          label: '월별 평균 거래 금액',
          data: monthlyData.map((item) => item.averageAmount),
          borderColor: '#bbb8e2',
          backgroundColor: 'rgba(187, 184, 226, 0.2)',
          borderWidth: 2,
          pointRadius: 0,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          labels: {
            font: {
              size: 14,
            },
          },
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          callbacks: {
            label: (context) => `₩${context.raw.toLocaleString()}만원`,
          },
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: '월',
            font: {
              size: 14,
            },
          },
          ticks: {
            font: {
              size: 12,
            },
          },
        },
        y: {
          title: {
            display: true,
            text: '평균 거래 금액 (만원)',
            font: {
              size: 14,
            },
          },
          ticks: {
            font: {
              size: 12,
            },
          },
        },
      },
    },
  })
}

function updateChart(newDealList) {
  const monthlyData = aggregateMonthlyData(newDealList)
  dealChart.data.labels = monthlyData.map((item) => item.label)
  dealChart.data.datasets[0].data = monthlyData.map((item) => item.averageAmount)
  dealChart.update()
}

function aggregateMonthlyData(dealList) {
  const monthlyMap = {}

  dealList.forEach((item) => {
    const monthKey = `${item.dealYear}-${String(item.dealMonth).padStart(2, '0')}`
    if (!monthlyMap[monthKey]) {
      monthlyMap[monthKey] = { totalAmount: 0, count: 0 }
    }
    monthlyMap[monthKey].totalAmount += item.dealAmount
    monthlyMap[monthKey].count += 1
  })

  // 날짜 빠른 순(오래된 순)으로 정렬
  return Object.entries(monthlyMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, data]) => ({
      label: month,
      averageAmount: Math.round(data.totalAmount / data.count),
    }))
}
</script>

<style scoped>
.chart-container {
  width: 100%;
  max-width: 600px;
  margin: 0 auto 24px;
}

.detail-card {
  position: fixed;
  top: 53.5%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 640px;
  max-height: 90vh;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  padding: 24px;
  font-family: 'Pretendard', sans-serif;
  overflow-y: auto;
  z-index: 1;
}

.close-button {
  position: absolute;
  top: 16px;
  right: 24px;
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
  color: #888;
}

.apt-name {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 4px;
}

.apt-type {
  font-size: 16px;
  font-weight: normal;
  margin-left: 4px;
  color: #666;
}

.divider {
  border: none;
  border-top: 1px solid #ccc;
  margin: 12px 0 24px;
}

.info-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
}

.info-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #777;
}

.info-row.column {
  flex-direction: column;
  align-items: flex-start;
}

.info-columns {
  display: flex;
  justify-content: space-between;
  text-align: flex-start;
  gap: 12px;
}

.info-columns.horizontal {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 12px;
}

.info-block {
  display: flex;
  flex: 1;
  padding: 20px 8px;
  align-items: flex-start;
  gap: 10px;
}

.info-block > img {
  height: 35px;
}

.info-label {
  font-size: 12px;
  color: #999;
  margin-bottom: 4px;
}

.info-value {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.extreme-prices {
  display: flex;
  justify-content: space-between;
  margin: 0 auto 24px;
  gap: 10%;
  height: 90px;
  width: 90%;
}

.price-box {
  flex: 1;
  border-radius: 12px;
  padding: 16px;
  background: #f5f5f5;
  text-align: center;
  font-size: 15px;
  font-weight: bold;
  line-height: 1.8;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.price-box.high {
  border: 1px solid #e53935;
  color: #e53935;
}

.price-box.low {
  border: 1px solid #1e88e5;
  color: #1e88e5;
}

.table-section {
  max-height: 200px;
  overflow-y: auto;
  position: relative;
}

.table-section table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.table-section th,
.table-section td {
  padding: 8px;
  text-align: center;
  border-bottom: 1px solid #eee;
  white-space: nowrap;
}

.table-section th {
  background-color: #f9f9f9;
  font-weight: bold;
  position: sticky;
  top: 0;
  z-index: 1;
}

.interest-btn {
  width: 32px;
  min-width: 28px;
  background: #bbb8e2;
  border: none;
  cursor: pointer;
  color: #ffffff;
  border-radius: 10px;
  font-size: smaller;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 18px;
  margin: 0 auto;
}
</style>