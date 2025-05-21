<template>
  <div id="map" class="map-container"></div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useKakaoLoader } from '@/composables/useKakaoLoader'
import { useMapStore } from '@/stores/mapStore'

const mapStore = useMapStore()
// selectedApt prop 제거

function initMap() {
  console.log('✅ initMap 실행됨')
  const container = document.getElementById('map')
  if (!container) {
    console.error('❌ map DOM이 없음')
    return
  }

  const map = new kakao.maps.Map(container, {
    center: new kakao.maps.LatLng(37.5665, 126.978),
    level: 5,
  })

  new kakao.maps.Marker({
    map,
    position: new kakao.maps.LatLng(37.5665, 126.978),
  })
}

onMounted(() => {
  console.log('📌 onMounted 실행됨')
  useKakaoLoader(initMap) // ✅ 이게 load 이후 호출됨
})
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 100%;
}
</style>
