<template>
  <div class="review">
    <textarea v-model="content" placeholder="거래 후기를 남겨보세요" />
    <button @click="submit">등록</button>
    <ul>
      <li v-for="(r, i) in reviews" :key="i">{{ r }}</li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const content = ref('')
const reviews = ref([])

function submit() {
  if (content.value.trim()) {
    reviews.value.unshift(content.value)
    content.value = ''
  }
}
</script>

<style scoped>
.review {
  border-top: 1px solid #ddd;
  padding: 16px;
}
textarea {
  width: 100%;
  height: 60px;
  margin-bottom: 8px;
}
</style>
