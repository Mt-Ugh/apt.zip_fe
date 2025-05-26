export function useKakaoLoader(callback) {
  const key = import.meta.env.VITE_KAKAO_API_KEY
  if (!key) {
    return
  }

  if (window.kakao && window.kakao.maps) {
    window.kakao.maps.load(callback)
    return
  }
  const script = document.createElement('script')
  script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${key}&autoload=false&libraries=services,clusterer`
  script.onload = () => {
    window.kakao.maps.load(callback)
  }
  script.onerror = () => {
    // 로드 실패 시 처리
  }
  document.head.appendChild(script)
}
