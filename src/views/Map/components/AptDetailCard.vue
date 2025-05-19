<template>
  <div class="detail-card">
    <!-- 아파트명 -->
    <h2 class="apt-name">{{ apt.name }}</h2>
    <p class="apt-address">{{ apt.address }}</p>

    <!-- 최근 거래 요약 -->
    <div class="summary">
      <div class="summary-item">
        <span class="label">최근 거래가</span>
        <strong class="value">{{ formatPrice(apt.recentPrice) }}</strong>
      </div>
      <div class="summary-item">
        <span class="label">총 거래 건수</span>
        <strong class="value">{{ apt.totalCount.toLocaleString() }} 건</strong>
      </div>
      <div class="summary-item">
        <span class="label">조합 설립인가</span>
        <strong class="value">{{ apt.approveDate }}</strong>
      </div>
    </div>

    <!-- 최고/최저 실거래가 -->
    <div class="price-extremes">
      <div class="high">
        <span>최고 실거래가</span>
        <strong>{{ formatPrice(apt.maxPrice) }}</strong>
      </div>
      <div class="low">
        <span>최저 실거래가</span>
        <strong>{{ formatPrice(apt.minPrice) }}</strong>
      </div>
    </div>

    <!-- 거래 내역 테이블 -->
    <div class="table-section">
      <h4>거래 내역</h4>
      <table>
        <thead>
          <tr>
            <th>거래일</th>
            <th>동</th>
            <th>층</th>
            <th>면적</th>
            <th>거래금액</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, idx) in apt.dealHistory" :key="idx">
            <td>{{ item.date }}</td>
            <td>{{ item.dong }}</td>
            <td>{{ item.floor }}</td>
            <td>{{ item.area }}㎡</td>
            <td>{{ formatPrice(item.price) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
defineProps({
  aptSeq: Object,
})

/** 금액 포맷 함수 */
function formatPrice(amountStr) {
  const amount = parseInt(amountStr.replace(/,/g, ''), 10)

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
</script>

<style scoped>
.detail-card {
  position: absolute;
  bottom: 20px;
  left: 20px;
  width: 420px;
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  font-family: 'Pretendard', sans-serif;
  z-index: 10;
}

.apt-name {
  font-size: 20px;
  margin-bottom: 4px;
  font-weight: bold;
}

.apt-address {
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.summary {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 20px;
}

.summary-item {
  flex: 1;
  min-width: 120px;
}

.summary-item .label {
  font-size: 12px;
  color: #777;
}

.summary-item .value {
  display: block;
  font-size: 16px;
  margin-top: 4px;
  font-weight: 600;
}

.price-extremes {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.price-extremes .high,
.price-extremes .low {
  flex: 1;
  text-align: center;
  border-radius: 8px;
  padding: 12px;
  font-size: 14px;
  font-weight: 500;
  background: #f9f9f9;
}

.price-extremes .high {
  border: 1px solid #e53935;
  color: #e53935;
}

.price-extremes .low {
  border: 1px solid #1e88e5;
  color: #1e88e5;
  margin-left: 10px;
}

.table-section h4 {
  font-size: 15px;
  margin-bottom: 10px;
  color: #333;
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
}

.table-section th {
  background-color: #f5f5f5;
  font-weight: bold;
}
</style>
