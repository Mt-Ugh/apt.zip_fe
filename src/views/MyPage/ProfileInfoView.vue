<template>
  <div class="profile-content">
    <h2 class="profile-title">회원 정보</h2>
    <div class="profile-title-underline"></div>
    <div class="profile-flex">
      <div class="profile-info">
        <div>
          <label>이름</label>
          <div class="profile-value">{{ user.name }}</div>
        </div>
        <div>
          <label>닉네임</label>
          <div class="profile-value">{{ user.nickname }}</div>
        </div>
        <div>
          <label>이메일</label>
          <div class="profile-value">{{ user.email }}</div>
        </div>
        <div>
          <label>비밀번호</label>
          <div class="profile-value">************</div>
        </div>
        <div>
          <label>전화 번호</label>
          <div class="profile-value">{{ user.phone }}</div>
        </div>
      </div>
      <div class="profile-image-area">
        <img class="profile-image" :src="DefaultProfile" alt="profile" />
      </div>
    </div>
    <div class="profile-bottom">
      <button class="edit-btn" @click="$emit('edit')">
        <span class="edit-icon">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path
              d="M3 17.25V19H4.75L14.81 8.94L13.06 7.19L3 17.25ZM18.71 7.04C19.1 6.65 19.1 6.02 18.71 5.63L16.37 3.29C15.98 2.9 15.35 2.9 14.96 3.29L13.13 5.12L16.88 8.87L18.71 7.04Z"
              fill="#222"
            />
          </svg>
        </span>
        Edit
      </button>
    </div>
  </div>
</template>
<script setup>
import DefaultProfile from '@/assets/images/Common/DefaultProfile.svg'
defineProps({ user: Object })
</script>
<style scoped>
.profile-content {
  width: 900px;
  background: #fff;
  border-radius: 12px;
  padding: 60px 70px 0 70px;
  box-shadow: 0 2px 8px #7a7a7a;
  position: relative;
  min-height: 700px;
  display: flex;
  flex-direction: column;
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
  gap: 40px;
}
.profile-info {
  margin: 20px 0 0 20px;
  flex: 1;
}
.profile-info > div {
  margin-bottom: 24px;
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
.profile-image-area {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  min-width: 120px;
  margin: 10px 30px;
}
.profile-image {
  width: 110px;
  height: 110px;
  display: block;
}
.profile-bottom {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 60px 0 30px 0;
}
.edit-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 auto;
  padding: 8px 26px;
  border-radius: 20px;
  border: 1px solid #222;
  background: #fff;
  color: #222;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.15s;
}
.edit-btn:hover {
  background: #f5f5f5;
}
.edit-icon {
  display: flex;
  align-items: center;
}
</style>
