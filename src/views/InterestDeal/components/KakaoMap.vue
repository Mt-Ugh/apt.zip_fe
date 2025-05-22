<template>
  <div :id="mapId" class="map-container">
    <button class="detail-btn" @click="goDetail">상세보기</button>
  </div>
</template>

<script setup>
import { onMounted, watch, ref } from 'vue'
import { useKakaoLoader } from '@/composables/useKakaoLoader'
import { useRouter } from 'vue-router'
import { useMapStore } from '@/stores/mapStore'

const props = defineProps({
  apt: {
    type: Object,
    required: true,
  },
  mapId: {
    type: String,
    required: true,
  },
})

const router = useRouter()
const mapStore = useMapStore()
const mapRef = ref(null)
const markers = ref([])
const overlays = ref([])

function clearMarkers() {
  markers.value.forEach((marker) => marker.setMap(null))
  markers.value = []
  overlays.value.forEach((overlay) => overlay.setMap(null))
  overlays.value = []
}

function addAptMarker(apt) {
  const kakao = window.kakao
  if (!kakao || !kakao.maps || !mapRef.value) return
  clearMarkers()
  if (apt.latitude && apt.longitude) {
    const marker = new kakao.maps.Marker({
      map: mapRef.value,
      position: new kakao.maps.LatLng(apt.latitude, apt.longitude),
      title: apt.aptNm,
    })
    markers.value.push(marker)
    const overlay = new kakao.maps.CustomOverlay({
      position: marker.getPosition(),
      content: `<div class="apt-label">${apt.aptNm}</div>`,
      yAnchor: 2,
    })
    overlay.setMap(mapRef.value)
    overlays.value.push(overlay)
    mapRef.value.setCenter(marker.getPosition())
  } else if (apt.address) {
    const geocoder = new kakao.maps.services.Geocoder()
    geocoder.addressSearch(apt.address, function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x)
        const marker = new kakao.maps.Marker({
          map: mapRef.value,
          position: coords,
          title: apt.aptNm,
        })
        markers.value.push(marker)
        const overlay = new kakao.maps.CustomOverlay({
          position: marker.getPosition(),
          content: `<div class="apt-label">${apt.aptNm}</div>`,
          yAnchor: 1.4,
        })
        overlay.setMap(mapRef.value)
        overlays.value.push(overlay)
        mapRef.value.setCenter(coords)
      }
    })
  }
}

function initMap() {
  const kakao = window.kakao
  const container = document.getElementById(props.mapId)
  if (!container) return

  const centerLat = props.apt.latitude || 37.5665
  const centerLng = props.apt.longitude || 126.978

  const map = new kakao.maps.Map(container, {
    center: new kakao.maps.LatLng(centerLat, centerLng),
    level: 5,
  })
  mapRef.value = map
}

function goDetail() {
  const list = [props.apt]
  mapStore.setDealList(list)
  mapStore.setSelectedLocation({
    sido: props.apt.sidoName,
    gugun: props.apt.gugunName,
    dong: props.apt.dongName,
  })
  mapStore.setDongCode(props.apt.dongCode)
  if (props.apt) {
    router.push(`/map`)
  }
}

onMounted(() => {
  useKakaoLoader(() => {
    initMap()
    addAptMarker(props.apt)
  })
})

watch(
  () => props.apt,
  (apt) => {
    if (mapRef.value && apt && apt.latitude && apt.longitude) {
      addAptMarker(apt)
      mapRef.value.setCenter(new window.kakao.maps.LatLng(apt.latitude, apt.longitude))
    }
  },
  { immediate: true, deep: true },
)
</script>

<style scoped>
.map-container {
  width: 100%;
  min-height: 400px;
  height: 400px;
  background: #e6eaf3;
  border-radius: 0 0 14px 14px;
  z-index: 1;
  position: relative;
}

.detail-btn {
  position: absolute;
  right: 18px;
  bottom: 18px;
  background: #2564eba9;
  color: #fff;
  border: none;
  border-radius: 7px;
  padding: 9px 18px;
  font-size: 15px;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(30, 40, 60, 0.1);
  cursor: pointer;
  transition: background 0.18s;
  z-index: 20;
}
.detail-btn:hover {
  background: #1745b0ea;
}
</style>

<style>
.apt-label {
  background: rgba(255, 255, 255, 0.85);
  border: 1.2px solid #4c94eb;
  border-radius: 7px;
  padding: 2.5px 8px;
  font-size: 13px;
  color: #2563eb;
  font-weight: 500;
  box-shadow: 0 1.5px 6px rgba(76, 148, 235, 0.08);
  white-space: nowrap;
  pointer-events: none;
  letter-spacing: 0.01em;
  text-shadow: none;
  margin-bottom: 9px;
  filter: none;
  opacity: 0.93;
  transition:
    box-shadow 0.2s,
    background 0.2s;
  z-index: 10;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}
</style>
