import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMapStore = defineStore('mapStore', () => {
  const dealList = ref([])
  const selectedApt = ref(null)
  const dongCode = ref('')

  function setDealList(list) {
    dealList.value = list
  }
  function setSelectedApt(aptSeq) {
    selectedApt.value = aptSeq
  }
  function setDongCode(code) {
    dongCode.value = code
  }

  return {
    dealList,
    selectedApt,
    dongCode,
    setDealList,
    setSelectedApt,
    setDongCode,
  }
})
