<template>
  <div id="map" class="map-container"></div>
</template>

<script setup>
import { onMounted, watch, ref } from 'vue'
import { useKakaoLoader } from '@/composables/useKakaoLoader'
import { useMapStore } from '@/stores/mapStore'

const mapStore = useMapStore()
const mapRef = ref(null)
const markers = ref([])
const overlays = ref([])

function moveMapToAddress(address) {
  const kakao = window.kakao
  if (!kakao || !kakao.maps || !mapRef.value) return
  const geocoder = new kakao.maps.services.Geocoder()
  geocoder.addressSearch(address, function (result, status) {
    if (status === kakao.maps.services.Status.OK && mapRef.value) {
      const coords = new kakao.maps.LatLng(result[0].y, result[0].x)
      mapRef.value.setCenter(coords)
      mapRef.value.setLevel(5)
      new kakao.maps.Marker({ map: mapRef.value, position: coords })
    }
  })
}

function initMap() {
  const kakao = window.kakao
  const container = document.getElementById('map')
  if (!container) return

  const map = new kakao.maps.Map(container, {
    center: new kakao.maps.LatLng(37.5665, 126.978),
    level: 5,
  })
  mapRef.value = map
}

function clearMarkers() {
  markers.value.forEach((marker) => marker.setMap(null))
  markers.value = []
  overlays.value.forEach((overlay) => overlay.setMap(null))
  overlays.value = []
}

async function addAptMarkers(aptList) {
  const kakao = window.kakao
  if (!kakao || !kakao.maps || !mapRef.value) return
  clearMarkers()
  for (const apt of aptList) {
    if (apt.latitude && apt.longitude) {
      const marker = new kakao.maps.Marker({
        map: mapRef.value,
        position: new kakao.maps.LatLng(apt.latitude, apt.longitude),
        title: apt.aptNm,
      })
      marker.addListener('click', () => {
        mapStore.setSelectedApt(apt)
      })
      markers.value.push(marker)

      const overlay = new kakao.maps.CustomOverlay({
        position: marker.getPosition(),
        content: `<div class="apt-label">${apt.aptNm}</div>`,
        yAnchor: 2,
      })
      overlay.setMap(mapRef.value)
      overlays.value.push(overlay)
    } else if (apt.address) {
      await new Promise((resolve) => {
        const geocoder = new kakao.maps.services.Geocoder()
        geocoder.addressSearch(apt.address, function (result, status) {
          if (status === kakao.maps.services.Status.OK) {
            const coords = new kakao.maps.LatLng(result[0].y, result[0].x)
            const marker = new kakao.maps.Marker({
              map: mapRef.value,
              position: coords,
              title: apt.aptNm,
            })
            marker.addListener('click', () => {
              mapStore.setSelectedApt(apt)
            })
            markers.value.push(marker)

            const overlay = new kakao.maps.CustomOverlay({
              position: marker.getPosition(),
              content: `<div class="apt-label">${apt.aptNm}</div>`,
              yAnchor: 1.4,
            })
            overlay.setMap(mapRef.value)
            overlays.value.push(overlay)
          }
          resolve()
        })
      })
    }
  }
}

function moveMapToApt(apt) {
  const kakao = window.kakao
  if (!kakao || !kakao.maps || !mapRef.value) return
  if (apt.latitude && apt.longitude) {
    const coords = new kakao.maps.LatLng(apt.latitude, apt.longitude)
    mapRef.value.setCenter(coords)
  } else if (apt.address) {
    const geocoder = new kakao.maps.services.Geocoder()
    geocoder.addressSearch(apt.address, function (result, status) {
      if (status === kakao.maps.services.Status.OK && mapRef.value) {
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x)
        mapRef.value.setCenter(coords)
      }
    })
  }
}

onMounted(() => {
  useKakaoLoader(() => {
    initMap()

    watch(
      () => mapStore.selectedLocation,
      (loc) => {
        if (loc && loc.sido && loc.gugun && loc.dong && mapRef.value) {
          const address = `${loc.sido} ${loc.gugun} ${loc.dong}`
          moveMapToAddress(address)
        }
      },
      { deep: true },
    )

    watch(
      () => mapStore.dealList,
      (aptList) => {
        if (Array.isArray(aptList) && aptList.length > 0) {
          addAptMarkers(aptList)
        } else {
          clearMarkers()
        }
      },
      { immediate: true },
    )

    watch(
      () => mapStore.selectedApt,
      (apt) => {
        if (apt) {
          moveMapToApt(apt)
        }
      },
    )
  })
})
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 100%;
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
