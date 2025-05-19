export function useKakaoLoader(callback) {
  const key = import.meta.env.VITE_KAKAO_API_KEY
  if (!key) {
    console.error('❌ API 키가 설정되지 않았습니다. .env 확인 필요')
    return
  }

  if (window.kakao && window.kakao.maps) {
    window.kakao.maps.load(callback)
    return
  }

  const script = document.createElement('script')
  script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${key}&autoload=false&libraries=services`
  script.onload = () => {
    console.log('✅ Kakao SDK 로드 성공')
    window.kakao.maps.load(callback)
  }
  script.onerror = () => {
    console.error('❌ Kakao SDK 로드 실패. key 또는 도메인 문제 가능성 높음')
  }
  document.head.appendChild(script)
}
