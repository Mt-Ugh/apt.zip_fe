<template>
<div class="profile-content profile-content-fixed-height">
    <h2 class="profile-title">회원 정보</h2>
    <div class="profile-title-underline"></div>
    <div class="profile-flex">
      <div class="profile-info">
        <div>
          <label>이름</label>
          <div class="profile-value">{{ props.user?.name }}</div>
        </div>
        <div>
          <label>닉네임</label>
          <div class="profile-value">{{ props.user?.nickname }}</div>
        </div>
        <div>
          <label>이메일</label>
          <div class="profile-value">{{ props.user?.email }}</div>
        </div>
        <div>
          <label>비밀번호</label>
          <div class="profile-value">************</div>
        </div>
        <div>
          <label>전화 번호</label>
          <div class="profile-value">{{ props.user?.phoneNumber ?? props.user?.phoneNumber }}</div>
        </div>
      </div>
      <div class="profile-image-area">
        <img
          class="profile-image"
          :class="{ 'has-profile': !!props.user?.profileUrl }"
          :src="props.user?.profileUrl ? props.user.profileUrl : DefaultProfile"
          alt="profile"
        />
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
const props = defineProps({ user: Object })
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
  margin: 10px 0 0 10px;
  flex: 1;
}
.profile-info > div {
  margin-bottom: 23px;
}
.profile-info label {
  font-size: 14px;
  color: #666;
  margin-bottom: 2px;
  display: block;
}
.profile-value {
  font-size: 15px;
  color: #222;
  margin-top: 4px;
  padding-bottom: 10px;
  padding-top: 9px;
  padding-left: 9px;
  border-bottom: 0.5px solid #ddd;
}
.profile-image-area {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 120px;
  margin: 20px 0 0 0;
  height: 180px;
  border-radius: 24px;
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
.profile-image.has-profile {
  border: 4px solid #fff;
  box-shadow: 0 2px 12px rgba(30,40,60,0.13);
  background: linear-gradient(135deg, #eaf6ff 0%, #f5f7fa 100%);
  border-radius: 24px;
}
.profile-bottom {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 32px 0 10px 0;
  padding-top: 38px;
}
.edit-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 22px;
  border-radius: 18px;
  border: 1px solid #222;
  background: #fff;
  color: #222;
  font-size: 15px;
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
    padding-left: 15px;
  }
  .profile-info {
    margin: 6px 0 0 4px;
  }
  .profile-info > div {
    margin-bottom: 20px;
  }
  .profile-info label {
    font-size: 12px;
  }
  .profile-value {
    font-size: 13px;
    padding-top: 6px;
    padding-left: 8px;
  }
  .profile-image-area {
    min-width: 60px;
    margin: 6px 6px;
  }
  .profile-image {
    width: 150px;
    height: 160px;
    border-radius: 80%;
  }
  .profile-bottom {
    margin: 18px 0 6px 0;
    padding-top: 60px;
  }
  .edit-btn {
    font-size: 13px;
    padding: 4px 16px;
    border-radius: 14px;
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
    margin-bottom: 14px;
    margin-top: 5px;
  }
  .profile-flex {
    gap: 120px;
    padding-left: 0;
  }
  .profile-info {
    margin: 17px 0 0 2px;
  }
  .profile-info > div {
    margin-bottom: 20px;
  }
  .profile-info label {
    font-size: 13px;
  }
  .profile-value {
    font-size: 14px;
    padding-top: 7px;
    padding-left: 9px;
  }
  .profile-image-area {
    min-width: 120px;
    margin: 30px 60px;
  }
  .profile-image {
    width: 150px;
    height: 160px;
    border-radius: 80%;
  }
  .profile-bottom {
    margin: 12px 0 4px 0;
    padding-top: 20px;
  }
  .edit-btn {
    font-size: 14px;
    padding: 6px 16px;
    border-radius: 13px;
  }
}
</style>
