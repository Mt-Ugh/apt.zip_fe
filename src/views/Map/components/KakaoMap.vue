<template>
  <div id="map" class="map-container"></div>
  <CommercialPlace
    ref="commercialPlaceRef"
    class="commacial-palce"
    @show-places="showCommercialPins"
  />
</template>

<script setup>
import { onMounted, watch, ref } from 'vue'
import { useKakaoLoader } from '@/composables/useKakaoLoader'
import { useMapStore } from '@/stores/mapStore'
import CommercialPlace from './CommercialPlace.vue'

const mapStore = useMapStore()
const mapRef = ref(null)
const commercialPlaceRef = ref(null)
const markers = ref([])
const overlays = ref([])
const commercialMarkers = ref([])
const clusterer = ref(null)
const isCommercialMode = ref(false)
const commercialPlaceList = ref([])
const commercialOverlaysToShow = ref([])
const zoomListener = ref(null)
const currentInfoWindow = ref(null)

function closeInfoWindow() {
  if (currentInfoWindow.value) {
    currentInfoWindow.value.setMap(null)
    currentInfoWindow.value = null
  }
}

function moveMapToAddress(address) {
  const kakao = window.kakao

  if (!kakao || !kakao.maps || !mapRef.value) return
  const geocoder = new kakao.maps.services.Geocoder()
  geocoder.addressSearch(address, function (result, status) {
    if (status === kakao.maps.services.Status.OK && mapRef.value) {
      const coords = new kakao.maps.LatLng(result[0].y, result[0].x)
      mapRef.value.setCenter(coords)
      mapRef.value.setLevel(5)
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

  kakao.maps.event.addListener(map, 'click', function () {
    closeInfoWindow()
  })
}

function clearCommercialOverlays() {
  if (window.commercialOverlays && window.commercialOverlays.length) {
    for (let i = 0; i < window.commercialOverlays.length; i++) {
      if (
        window.commercialOverlays[i] &&
        typeof window.commercialOverlays[i].setMap === 'function'
      ) {
        window.commercialOverlays[i].setMap(null)
      }
    }
    window.commercialOverlays.length = 0
  } else {
    window.commercialOverlays = []
  }

  commercialOverlaysToShow.value.forEach((overlay) => {
    if (overlay && typeof overlay.setMap === 'function') {
      overlay.setMap(null)
    }
  })
  commercialOverlaysToShow.value = []
}

function clearMarkers() {
  markers.value.forEach((marker) => {
    if (marker && typeof marker.setMap === 'function') {
      marker.setMap(null)
    }
  })
  markers.value = []

  overlays.value.forEach((overlay) => {
    if (overlay && typeof overlay.setMap === 'function') {
      overlay.setMap(null)
    }
  })
  overlays.value = []

  clearCommercialMarkers()
  clearCommercialOverlays()
}

function clearCommercialMarkers() {
  try {
    if (zoomListener.value && mapRef.value && window.kakao?.maps?.event) {
      window.kakao.maps.event.removeListener(mapRef.value, 'zoom_changed', zoomListener.value)
      zoomListener.value = null
    }

    if (clusterer.value) {
      clusterer.value.clear()
      clusterer.value.setMap(null)
      clusterer.value = null
    }

    commercialMarkers.value.forEach((marker) => {
      if (marker && typeof marker.setMap === 'function') {
        marker.setMap(null)
      }
    })
    commercialMarkers.value = []

    if (window.commercialOverlays && window.commercialOverlays.length) {
      window.commercialOverlays.forEach((overlay) => {
        if (overlay && typeof overlay.setMap === 'function') {
          overlay.setMap(null)
        }
      })
      window.commercialOverlays = []
    }

    commercialOverlaysToShow.value = []
  } catch {
    commercialMarkers.value = []
    commercialOverlaysToShow.value = []
    clusterer.value = null
    zoomListener.value = null
    if (window.commercialOverlays) window.commercialOverlays = []
  }
}

async function addAptMarkers(aptList) {
  const kakao = window.kakao
  if (!kakao || !kakao.maps || !mapRef.value) return

  isCommercialMode.value = false
  commercialPlaceList.value = []

  if (commercialPlaceRef.value && commercialPlaceRef.value.clearCategorySelection) {
    commercialPlaceRef.value.clearCategorySelection()
  }

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

function showCommercialPins(placeList) {
  const kakao = window.kakao

  if (!kakao || !kakao.maps || !mapRef.value) {
    return
  }

  isCommercialMode.value = true
  mapStore.setSelectedApt(null)
  mapStore.setDealList([])

  markers.value.forEach((marker) => {
    if (marker && typeof marker.setMap === 'function') {
      marker.setMap(null)
    }
  })
  markers.value = []

  overlays.value.forEach((overlay) => {
    if (overlay && typeof overlay.setMap === 'function') {
      overlay.setMap(null)
    }
  })
  overlays.value = []

  clearCommercialMarkers()
  clearCommercialOverlays()

  commercialPlaceList.value = Array.isArray(placeList) ? placeList : []

  createCommercialMarkers()
}

function createCommercialMarkers() {
  const kakao = window.kakao
  if (
    !kakao ||
    !kakao.maps ||
    !kakao.maps.Marker ||
    !mapRef.value ||
    !commercialPlaceList.value.length
  ) {
    return
  }

  const markersToCluster = []
  commercialOverlaysToShow.value = []

  for (const place of commercialPlaceList.value) {
    const lat = Number(place.latitude)
    const lng = Number(place.longitude)

    if (!isNaN(lat) && !isNaN(lng) && lat !== 0 && lng !== 0) {
      const marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(lat, lng),
        title: place.placeName,
      })

      kakao.maps.event.addListener(marker, 'click', function () {
        closeInfoWindow()

        const content = `
          <div class="custom-info-window">
            <div class="info-content">
              <div class="close-btn" onclick="window.closeCurrentInfoWindow()">×</div>
              <div class="place-name">${place.placeName || '상업시설'}</div>
              <div class="place-info">
                <div class="info-row">
                  <span class="label">업종:</span>
                  <span class="value">${place.smallCategory || '정보 없음'}</span>
                </div>
                <div class="info-row">
                  <span class="label">주소:</span>
                  <span class="value">${place.jibunAddress || '주소 정보 없음'}</span>
                </div>
              </div>
            </div>
            <div class="info-arrow"></div>
          </div>
        `

        const customOverlay = new kakao.maps.CustomOverlay({
          content: content,
          position: marker.getPosition(),
          yAnchor: 1.3,
          zIndex: 1000,
        })

        customOverlay.setMap(mapRef.value)
        currentInfoWindow.value = customOverlay

        window.closeCurrentInfoWindow = closeInfoWindow
      })

      commercialMarkers.value.push(marker)
      markersToCluster.push(marker)

      const labelText = place.place_name || place.placeName || place.name || '상업시설'
      const overlay = new kakao.maps.CustomOverlay({
        position: marker.getPosition(),
        content: `<div class='commercial-label'>${labelText}</div>`,
        yAnchor: 2.1,
      })

      commercialOverlaysToShow.value.push(overlay)
    }
  }

  const canUseClusterer = markersToCluster.length >= 50 && kakao.maps.MarkerClusterer

  if (canUseClusterer) {
    clusterer.value = new kakao.maps.MarkerClusterer({
      map: mapRef.value,
      averageCenter: true,
      minLevel: 5,
      disableClickZoom: true,
      gridSize: 80,
      minClusterSize: 5,
      calculator: [50, 100, 200],
      styles: [
        {
          width: '40px',
          height: '40px',
          background: 'rgba(255, 128, 0, 0.8)',
          borderRadius: '20px',
          color: '#fff',
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '12px',
          lineHeight: '40px',
        },
      ],
    })

    clusterer.value.addMarkers(markersToCluster)
  }

  if (!zoomListener.value) {
    zoomListener.value = function () {
      const currentLevel = mapRef.value.getLevel()
      updateMarkerDisplay(currentLevel)
    }

    kakao.maps.event.addListener(mapRef.value, 'zoom_changed', zoomListener.value)
  }

  const currentLevel = mapRef.value.getLevel()
  updateMarkerDisplay(currentLevel)
}

function updateMarkerDisplay(zoomLevel) {
  const shouldUseClusterer = clusterer.value && zoomLevel >= 4

  if (shouldUseClusterer) {
    commercialMarkers.value.forEach((marker) => {
      marker.setMap(null)
    })

    if (clusterer.value) {
      clusterer.value.setMap(mapRef.value)
    }

    hideCommercialLabels()
  } else {
    if (clusterer.value) {
      clusterer.value.setMap(null)
    }

    commercialMarkers.value.forEach((marker) => {
      marker.setMap(mapRef.value)
    })

    if (zoomLevel <= 3) {
      showCommercialLabels()
    } else {
      hideCommercialLabels()
    }
  }
}

function showCommercialLabels() {
  commercialOverlaysToShow.value.forEach((overlay) => {
    if (overlay && typeof overlay.setMap === 'function') {
      overlay.setMap(mapRef.value)
      if (!window.commercialOverlays) window.commercialOverlays = []
      window.commercialOverlays.push(overlay)
    }
  })
}

function hideCommercialLabels() {
  if (window.commercialOverlays && window.commercialOverlays.length) {
    window.commercialOverlays.forEach((overlay) => {
      if (overlay && typeof overlay.setMap === 'function') {
        overlay.setMap(null)
      }
    })
    window.commercialOverlays = []
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
          moveMapToApt(aptList[0])
        } else if (!isCommercialMode.value) {
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

.commercial-label {
  background: rgba(255, 255, 255, 0.93);
  border: 1.2px solid #ff8000;
  border-radius: 7px;
  padding: 2.5px 8px;
  font-size: 13px;
  color: #ff8000;
  font-weight: 500;
  box-shadow: 0 1.5px 6px rgba(255, 128, 0, 0.08);
  white-space: nowrap;
  pointer-events: none;
  letter-spacing: 0.01em;
  margin-bottom: 9px;
  opacity: 0.93;
  z-index: 10;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}

.custom-info-window {
  position: relative;
}

.info-content {
  background: white;
  border-radius: 12px;
  padding: 16px 20px;
  min-width: 240px;
  max-width: 320px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 8px;
  right: 12px;
  width: 24px;
  height: 24px;
  background: #f5f5f5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  color: #666;
  transition: all 0.2s;
}

.close-btn:hover {
  background: #e0e0e0;
  color: #333;
}

.place-name {
  font-weight: 600;
  font-size: 16px;
  color: #333;
  margin-bottom: 12px;
  line-height: 1.3;
  word-break: keep-all;
  padding-right: 30px;
}

.place-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.info-row {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.info-row .label {
  font-weight: 500;
  color: #ff8000;
  flex-shrink: 0;
  font-size: 13px;
}

.info-row .value {
  flex: 1;
  color: #666;
  font-size: 13px;
  line-height: 1.4;
  word-break: keep-all;
  overflow-wrap: break-word;
}

.info-arrow {
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 8px solid white;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}
</style>
