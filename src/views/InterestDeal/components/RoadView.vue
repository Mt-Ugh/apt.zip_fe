<template>
  <div class="apt-balloon-modern">
    <div class="apt-title-modern">{{ apt.aptNm }}</div>
    <div class="apt-addr-modern">
      {{ apt.sidoName }} {{ apt.gugunName }} {{ apt.dongName }} {{ apt.jibun }}
    </div>
    <button class="overlay-roadview-btn" @click="$emit('openRoadview')">로드뷰</button>
  </div>
</template>

<script setup>
defineProps({ apt: Object })
defineEmits(['openRoadview'])
</script>

<style scoped>
.overlay-roadview-btn {
  margin-top: 8px;
  background: #2563eb;
  color: #fff;
  border: none;
  border-radius: 7px;
  padding: 5px 14px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.18s;
}
.overlay-roadview-btn:hover {
  background: #1745b0;
}
</style>
