<template>
<form class="profile-content profile-content-fixed-height" @submit.prevent="submit">
    <h2 class="profile-title">회원 정보 수정</h2>
    <div class="profile-title-underline"></div>
    <div class="profile-flex">
      <div class="profile-info">
        <div>
          <label>이름</label>
          <input type="text" :value="form.name" readonly />
        </div>
        <div>
          <label>닉네임</label>
          <input type="text" v-model="form.nickname" />
        </div>
        <div>
          <label>이메일</label>
          <input type="text" v-model="form.email" />
        </div>
        <div>
          <label>비밀번호</label>
          <input type="password" v-model="form.password" />
        </div>
        <div>
          <label>비밀번호 확인</label>
          <input type="password" v-model="form.passwordCheck" />
        </div>
        <div>
          <label>전화 번호</label>
          <input type="text" :value="form.phoneNumber" readonly />
        </div>
      </div>
      <div class="profile-image-area">
        <img
          class="profile-image"
          :class="{ 'has-profile': !!form.profileUrl }"
          :src="form.profileUrl ? form.profileUrl : DefaultProfile"
          alt="profile"
        />
      </div>
    </div>
<div class="profile-actions">
  <button type="submit" class="confirm-btn">확인</button>
</div>
<button type="button" class="withdraw-btn fixed-withdraw" @click="$emit('withdraw')">회원탈퇴</button>
  </form>
</template>
<script setup>
import { reactive, watch } from 'vue'
import DefaultProfile from '@/assets/images/Common/DefaultProfile.svg'
const { user } = defineProps({ user: Object })
const emit = defineEmits(['withdraw', 'cancel', 'update'])
const form = reactive({ ...user })

watch(
  () => user,
  (val) => Object.assign(form, val),
)

function submit() {
  emit('update', { ...form })
}
</script>
<style scoped>
.profile-content {
  width: 700px;
  background: #fff;
  border-radius: 12px;
  padding: 40px 36px 0 36px;
  box-shadow: 0 2px 8px #7a7a7a;
  position: relative;
  min-height: 700px;
  display: flex;
  flex-direction: column;
  transition: width 0.2s, padding 0.2s;
}
.profile-content-fixed-height {
  min-height: 800px;
  height: 800px;
  box-sizing: border-box;
}
.profile-title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 0;
  padding-bottom: 0;
}
.profile-title-underline {
  width: 100%;
  height: 2px;
  background: #ddddddfd;
  margin-bottom: 32px;
  margin-top: 8px;
  border-radius: 2px;
}
.profile-flex {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24px;
  padding-left: 10px;
}
.profile-info {
  margin: 10px 0 10px 10px;
  flex: 1;
}
.profile-info > div {
  margin-bottom: 16px;
}
.profile-info label {
  font-size: 14px;
  color: #666;
  margin-bottom: 2px;
  display: block;
}
.profile-value {
  font-size: 16px;
  color: #222;
  margin-top: 4px;
  margin-bottom: 2px;
}
.profile-info input {
  width: 95%;
  padding: 8px 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  margin-top: 4px;
  font-size: 15px;
  background: #f5f5f5;
}
.profile-info input[readonly] {
  background: #f5f5f5;
  color: #888;
}
.profile-image {
  width: 163px;
  height: 160px;
  object-fit: cover;
  display: block;
  /* 기본(DefaultProfile) 스타일 */
  background: none;
  border: none;
  border-radius: 0;
  box-shadow: none;
  transition: border 0.2s, box-shadow 0.2s, background 0.2s, border-radius 0.2s;
}
/* 프로필 이미지가 있을 때만 강조 스타일 */
.profile-image.has-profile {
  border: 4px solid #fff;
  box-shadow: 0 2px 12px rgba(30,40,60,0.13);
  background: linear-gradient(135deg, #eaf6ff 0%, #f5f7fa 100%);
  border-radius: 24px;
}
/* profile-image-area는 항상 동일하게 유지 */
.profile-image-area {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 130px;
  margin: 20px 0 0 0;
  height: 180px;
  background: none;
  border-radius: 0;
  box-shadow: none;
}
.profile-actions {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin: 32px 0 10px 0;
}
.fixed-withdraw {
  position: absolute;
  right: 78px;
  bottom: 85px;
  background: #fff0f0;
  color: #e00;
  border: 1px solid #e00;
  border-radius: 8px;
  padding: 7px 14px;
  font-size: 13px;
  cursor: pointer;
  z-index: 2;
}
.confirm-btn {
  padding: 8px 22px;
  border-radius: 18px;
  border: none;
  background: #222;
  color: #fff;
  cursor: pointer;
  font-size: 15px;
}
.withdraw-btn {
  background: #fff0f0;
  color: #e00;
  border: 1px solid #e00;
  border-radius: 8px;
  padding: 7px 14px;
  font-size: 13px;
  cursor: pointer;
}

@media (max-width: 2000px) {
  .profile-content {
    width: 520px;
    padding: 28px 18px 0 18px;
    min-height: 600px;
  }
  .profile-content-fixed-height {
    min-height: 650px;
    height: 650px;
  }
  .profile-title {
    font-size: 22px;
  }
  .profile-title-underline {
    margin-bottom: 18px;
    margin-top: 6px;
  }
  .profile-flex {
    gap: 12px;
    padding-left: 10px;
  }
  .profile-info {
    margin: 6px 0 0 4px;
  }
  .profile-info > div {
    margin-bottom: 14px;
  }
  .profile-info label {
    font-size: 12px;
  }
  .profile-info input {
    font-size: 13px;
    padding: 6px 8px;
  }
  .profile-value {
    font-size: 13px;
    padding-top: 6px;
    padding-left: 6px;
  }
  .profile-image {
    width: 150px;
    height: 160px;
    border-radius: 80%;
  }
  .profile-actions {
    margin: 18px 0 6px 0;
  }
  .fixed-withdraw {
    right: 62px;
    bottom: 113px;
    font-size: 11px;
    padding: 5px 10px;
  }
  .confirm-btn {
    font-size: 13px;
    padding: 6px 16px;
    border-radius: 14px;
  }
  .withdraw-btn {
    font-size: 11px;
    padding: 5px 10px;
    border-radius: 6px;
  }
}
@media (max-width: 1600px) {
  .profile-content {
    width: 420px;
    padding: 22px 10px 0 10px;
    min-height: 500px;
  }
  .profile-content-fixed-height {
    min-height: 520px;
    height: 520px;
  }
  .profile-title {
    font-size: 20px;
  }
  .profile-title-underline {
    margin-bottom: 28px;
    margin-top: 5px;
  }
  .profile-flex {
    gap: 8px;
    padding-left: 0;
  }
  .profile-info {
    margin: 4px 0 0 2px;
  }
  .profile-info > div {
    margin-bottom: 12px;
  }
  .profile-info label {
    font-size: 13px;
  }
  .profile-info input {
    font-size: 14px;
    padding: 7px 9px;
  }
  .profile-image {
    width: 150px;
    height: 160px;
    border-radius: 80%;
  }
  .profile-image-area {
    min-width: 120px;
    margin: 17px 60px;
  }
    .profile-image {
    width: 150px;
    height: 160px;
    border-radius: 80%;
  }
  .profile-actions {
    margin: 18px 0 6px 0;
  }
  .fixed-withdraw {
    right: 50px;
    bottom: 23px;
    font-size: 12px;
    padding: 5px 10px;
  }
  .confirm-btn {
    font-size: 14px;
    padding: 6px 16px;
    border-radius: 12px;
  }
  .withdraw-btn {
    font-size: 12px;
    padding: 5px 10px;
    border-radius: 5px;
  }
}
</style>
