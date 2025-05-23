<template>
  <div :id="mapId" class="map-container">
    <button class="detail-btn" @click="goDetail">상세보기</button>
    <button class="roadview-btn" @click="closeRoadview" v-if="showRoadview">지도보기</button>
    <div v-if="!showRoadview" :id="`${mapId}-map`" style="width: 100%; height: 100%"></div>
    <div v-else :id="`${mapId}-roadview`" style="width: 100%; height: 100%"></div>
  </div>
</template>

<script setup>
import { onMounted, watch, ref, h, render, nextTick } from 'vue'
import { useKakaoLoader } from '@/composables/useKakaoLoader'
import { useRouter } from 'vue-router'
import { useMapStore } from '@/stores/mapStore'
import RoadView from '@/views/InterestDeal/components/RoadView.vue'

const props = defineProps({
  apt: { type: Object, required: true },
  mapId: { type: String, required: true },
})

const router = useRouter()
const mapStore = useMapStore()
const mapRef = ref(null)
const markers = ref([])
const overlays = ref([])
const customOverlays = ref([])
const showRoadview = ref(false)

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
        mapRef.value.setCenter(coords)
      }
    })
  }
}

function initMap() {
  const kakao = window.kakao
  const container = document.getElementById(`${props.mapId}-map`)
  if (!container) return

  const centerLat = props.apt.latitude || 37.5665
  const centerLng = props.apt.longitude || 126.978

  const map = new kakao.maps.Map(container, {
    center: new kakao.maps.LatLng(centerLat, centerLng),
    level: 4,
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

// 오버레이에 로드뷰 버튼을 넣고, 클릭 시 showRoadview를 true로!
function addCustomOverlay({ lat, lng, apt, xAnchor = 0.3, yAnchor = 0.91 }) {
  const kakao = window.kakao
  if (!kakao || !kakao.maps || !mapRef.value) return

  const container = document.createElement('div')
  let customOverlay = null

  render(
    h(RoadView, {
      apt,
      onOpenRoadview: () => {
        if (customOverlay) customOverlay.setMap(null)
        showRoadview.value = true
        nextTick(() => {
          openRoadview()
        })
      },
    }),
    container,
  )

  const position = new kakao.maps.LatLng(lat, lng)
  customOverlay = new kakao.maps.CustomOverlay({
    position,
    content: container,
    xAnchor,
    yAnchor,
  })
  customOverlay.setMap(mapRef.value)
  customOverlays.value.push(customOverlay)
}

// 실제 로드뷰를 띄우는 함수
function openRoadview() {
  const kakao = window.kakao
  const container = document.getElementById(`${props.mapId}-roadview`)
  if (!container) return
  container.innerHTML = '' // 초기화
  const roadview = new kakao.maps.Roadview(container)
  const position = new kakao.maps.LatLng(props.apt.latitude, props.apt.longitude)
  const roadviewClient = new kakao.maps.RoadviewClient()
  roadviewClient.getNearestPanoId(position, 50, function (panoId) {
    if (panoId) {
      roadview.setPanoId(panoId, position)
    } else {
      container.innerHTML = '<div style="padding:40px;text-align:center;">로드뷰가 없습니다.</div>'
    }
  })
}

function closeRoadview() {
  showRoadview.value = false
  nextTick(() => {
    initMap()
    addAptMarker(props.apt)
    addCustomOverlay({
      lat: props.apt.latitude,
      lng: props.apt.longitude,
      apt: props.apt,
    })
  })
}

onMounted(() => {
  useKakaoLoader(() => {
    initMap()
    addAptMarker(props.apt)
    addCustomOverlay({
      lat: props.apt.latitude,
      lng: props.apt.longitude,
      apt: props.apt,
    })
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
  height: 550px;
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
.detail-btn,
.roadview-btn {
  position: absolute;
  right: 18px;
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
.detail-btn:hover,
.roadview-btn:hover {
  background: #1745b0ea;
}

/* 상세보기는 아래, 지도보기는 위에 */
.detail-btn {
  bottom: 18px;
}
.roadview-btn {
  bottom: 60px;
}
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

/* Modern apt balloon style */
.apt-balloon-modern {
  min-width: 110px;
  max-width: 210px;
  background: #fff;
  color: #1745b0;
  border-radius: 14px;
  padding: 10px 16px 8px 16px;
  font-size: 14px;
  box-shadow: 0 4px 16px rgba(30, 40, 60, 0.13);
  position: relative;
  text-align: center;
  font-weight: 500;
  line-height: 1.5;
}
.apt-balloon-modern::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: -12px;
  transform: translateX(-50%);
  border-width: 10px 10px 0 10px;
  border-style: solid;
  border-color: #fff transparent transparent transparent;
  filter: drop-shadow(0 2px 2px rgba(37, 99, 235, 0.12));
  display: block;
  width: 0;
}
.apt-title-modern {
  font-size: 15px;
  font-weight: bold;
  color: #2563eb;
  margin-bottom: 3px;
}
.apt-addr-modern {
  font-size: 12px;
  color: #555;
  word-break: keep-all;
}
</style>
