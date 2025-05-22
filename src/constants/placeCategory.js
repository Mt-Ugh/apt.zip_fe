// src/constants/categories.js
export const PLACE_CATEGORIES = [
  {
    type: '음식',
    label: '음식점',
    icon: new URL('@/assets/images/Map/Food.svg', import.meta.url).href,
  },
  {
    type: '교육',
    label: '교육',
    icon: new URL('@/assets/images/Map/School.svg', import.meta.url).href,
  },
  {
    type: '보건의료',
    label: '병원',
    icon: new URL('@/assets/images/Map/Hospital.svg', import.meta.url).href,
  },
  {
    type: '소매',
    label: '쇼핑',
    icon: new URL('@/assets/images/Map/Shopping.svg', import.meta.url).href,
  },
  {
    type: '예술·스포츠',
    label: '예술/스포츠',
    icon: new URL('@/assets/images/Map/Sports.svg', import.meta.url).href,
  },
  {
    type: '과학·기술, 부동산, 수리·개인, 시설관리·임대, 숙박',
    label: '기타',
    icon: new URL('@/assets/images/Map/ETC.svg', import.meta.url).href,
  },
]
