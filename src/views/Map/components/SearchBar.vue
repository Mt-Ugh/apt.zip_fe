<template>
  <div class="search-bar">
    <select v-model="sido" @change="handleSidoChange">
      <option disabled value="">시/도</option>
      <option v-for="sidoItem in sidoList" :key="sidoItem.sidoName" :value="sidoItem.sidoName">
        {{ sidoItem.sidoName }}
      </option>
    </select>

    <select v-model="gugun" @change="handleGugunChange" :disabled="!gugunList.length">
      <option disabled value="">구/군</option>
      <option
        v-for="gugunItem in gugunList"
        :key="gugunItem.gugunName"
        :value="gugunItem.gugunName"
      >
        {{ gugunItem.gugunName }}
      </option>
    </select>

    <select v-model="dong" :disabled="!dongList.length">
      <option disabled value="">동</option>
      <option v-for="dongItem in dongList" :key="dongItem.dongCode" :value="dongItem.dongCode">
        {{ dongItem.dongName }}
      </option>
    </select>

    <div class="search-input-wrapper">
      <input v-model="keyword" placeholder="아파트명을 검색하세요" @keydown.enter="searchAptList" />
      <button class="search-icon-button" @click="searchAptList">
        <img :src="SearchIcon" alt="검색" />
      </button>
    </div>

    <button @click="resetAll">초기화</button>

    <CommonModal
      :visible="showModal"
      :title="modalTitle"
      :message="modalMessage"
      @close="showModal = false"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { fetchSidoList, fetchGugunList, fetchDongList, fetchAptList } from '@/api/DealMap'
import CommonModal from '@/components/common/CommonModal.vue'
import SearchIcon from '@/assets/images/Common/SearchIcon.svg'
import { useMapStore } from '@/stores/mapStore'

const mapStore = useMapStore()

const showModal = ref(false)
const modalTitle = ref('')
const modalMessage = ref('')

const sido = ref('')
const gugun = ref('')
const dong = ref('')
const keyword = ref('')

const sidoList = ref([])
const gugunList = ref([])
const dongList = ref([])

onMounted(async () => {
  sidoList.value = await fetchSidoList()
})

function openModal(title, message) {
  modalTitle.value = title
  modalMessage.value = message
  showModal.value = true
}

async function handleSidoChange() {
  gugun.value = ''
  dong.value = ''
  dongList.value = []
  gugunList.value = await fetchGugunList(sido.value)
}

async function handleGugunChange() {
  dong.value = ''
  dongList.value = await fetchDongList(sido.value, gugun.value)
}

async function searchAptList() {
  if (!sido.value || !gugun.value || !dong.value) {
    openModal('검색 조건 부족', '시/도, 구/군, 동을 모두 선택해주세요.')
    return
  }

  const result = await fetchAptList(dong.value, keyword.value)
  if (!result || result.length === 0) {
    openModal('검색 결과 없음', '해당 지역에 아파트 검색 결과가 없습니다.')
  } else {
    mapStore.setDealList(result)
    mapStore.setDongCode(dong.value)
    mapStore.setSelectedApt(null)
    mapStore.setSelectedLocation({
      sido: sido.value,
      gugun: gugun.value,
      dong: dongList.value.find((d) => d.dongCode === dong.value)?.dongName || '',
    })
  }
}

function resetAll() {
  sido.value = ''
  gugun.value = ''
  dong.value = ''
  keyword.value = ''
  gugunList.value = []
  dongList.value = []
  mapStore.setDealList([])
  mapStore.setDongCode(null)
  mapStore.setSelectedApt(null)
}
</script>

<style scoped>
.search-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 10px;
  align-items: center;
  margin: 0 auto;
}

select,
input {
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 6px;
  min-width: 120px;
  height: 30px;
}

input {
  min-width: 200px;
}

.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.search-input-wrapper input {
  padding-right: 36px;
  height: 30px;
}

.search-icon-button {
  position: absolute;
  right: 3px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  height: 24px;
  width: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s ease;
}

.search-icon-button:hover {
  background-color: orange;
}

.search-icon-button img {
  width: 16px;
  height: 16px;
  transition: filter 0.2s ease;
}

.search-icon-button:hover img {
  filter: brightness(0) invert(1);
}

button {
  border: 1px solid orange;
  background: white;
  color: orange;
  border-radius: 6px;
  padding: 6px 12px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;
  height: 30px;
}

button:hover {
  background-color: orange;
  color: white;
}
</style>
