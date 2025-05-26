import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMapStore = defineStore('mapStore', () => {
  const dealList = ref([])
  const selectedApt = ref(null)
  const dongCode = ref('')
  const selectedLocation = ref({ sido: '', gugun: '', dong: '' })

  function setDealList(list) {
    dealList.value = list
  }
  function setSelectedApt(apt) {
    selectedApt.value = apt
  }
  function setDongCode(code) {
    dongCode.value = code
  }
  function setSelectedLocation(location) {
    selectedLocation.value = location
  }

  return {
    dealList,
    selectedApt,
    dongCode,
    selectedLocation,
    setDealList,
    setSelectedApt,
    setDongCode,
    setSelectedLocation,
  }
})
