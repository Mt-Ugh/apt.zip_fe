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
          <div v-if="showPasswordMismatch" style="color: red; font-size: 13px; margin-top: 4px">
            비밀번호가 일치하지 않습니다
          </div>
        </div>
        <div>
          <label>전화 번호</label>
          <input type="text" :value="form.phoneNumber" readonly />
        </div>
      </div>
      <div class="profile-image-area">
        <div class="profile-image-wrapper">
          <img
            class="profile-image"
            :class="{ 'has-profile': !!form.profileUrl }"
            :src="form.profileUrl ? form.profileUrl : DefaultProfile"
            alt="profile"
          />
          <label class="profile-image-edit-btn-fixed">
            <input
              type="file"
              accept="image/*"
              class="profile-image-input"
              @change="onProfileChange"
              style="display: none"
            />
            <img :src="EditButton" alt="Edit" />
          </label>
        </div>
      </div>
    </div>
    <div class="profile-actions">
      <button type="submit" class="confirm-btn">확인</button>
    </div>
    <button type="button" class="withdraw-btn fixed-withdraw" @click="$emit('withdraw')">
      회원탈퇴
    </button>
  </form>
  <CommonModal
    :visible="showModal"
    :title="modalTitle"
    :message="modalMessage"
    @close="showModal = false"
  />
</template>
<script setup>
import { ref, reactive, watch, computed } from 'vue'
import DefaultProfile from '@/assets/images/Common/DefaultProfile.svg'
import EditButton from '@/assets/images/MyPage/EditButton.svg'
import { UpdateProfile } from '@/api/MyPage'
//UpdateImage 추가 해야함
import CommonModal from '@/components/common/CommonModal.vue'

const { user } = defineProps({ user: Object })
const emit = defineEmits(['withdraw', 'cancel', 'update'])
const form = reactive({ ...user })
const showModal = ref(false)
const modalTitle = ref('')
const modalMessage = ref('')
const selectedImageFile = ref(null)

const showModalError = (title, message) => {
  modalTitle.value = title
  modalMessage.value = message
  showModal.value = true
}

const showPasswordMismatch = computed(
  () => form.password && form.passwordCheck && form.password !== form.passwordCheck,
)

watch(
  () => user,
  (val) => Object.assign(form, val),
)

function onProfileChange(e) {
  const file = e.target.files[0]
  if (file) {
    selectedImageFile.value = file
    form.profileUrl = URL.createObjectURL(file)
  }
}

async function submit() {
  try {
    if (
      form.nickname === undefined ||
      form.email === undefined ||
      form.password === undefined ||
      form.passwordCheck === undefined
    ) {
      showModalError('입력 오류', '닉네임, 이메일, 비밀번호를 모두 입력해주세요.')
      return
    }

    if (form.password !== form.passwordCheck) {
      showModalError('입력 오류', '비밀번호 체크를 다시 확인해주세요.')
      return
    }
    await UpdateProfile({
      nickname: form.nickname,
      email: form.email,
      password: form.password,
    })
    // 이미지 파일이 선택된 경우에만 UpdateImage 호출
    // if (selectedImageFile.value) {
    //   console.log('업데이트할 이미지 파일:', selectedImageFile.value)
    //   await UpdateImage(selectedImageFile.value)
    // }
    emit('update', { ...form })
  } catch (e) {
    if (e?.response?.status === 409) {
      showModalError('오류', '프로필 업데이트 중 오류가 발생했습니다.')
    }
  }
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
  transition:
    width 0.2s,
    padding 0.2s;
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
.profile-image-area {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 130px;
  margin: 6px 6px 0 0;
  height: 180px;
  background: none;
  border-radius: 0;
  box-shadow: none;
  position: relative;
}
.profile-image-wrapper {
  position: relative;
  width: 163px;
  height: 160px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
}
.profile-image {
  width: 163px;
  height: 160px;
  object-fit: cover;
  display: block;
  background: none;
  border: none;
  border-radius: 0;
  box-shadow: none;
  transition:
    border 0.2s,
    box-shadow 0.2s,
    background 0.2s,
    border-radius 0.2s;
}
/* 프로필 이미지가 있을 때만 강조 스타일 및 크기 */
.profile-image.has-profile {
  width: 150px;
  height: 160px;
  border: 4px solid #fff;
  box-shadow: 0 2px 12px rgba(30, 40, 60, 0.13);
  background: linear-gradient(135deg, #eaf6ff 0%, #f5f7fa 100%);
  border-radius: 24px;
}
/* 기본(DefaultProfile)일 때는 크기 없음 */
.profile-image:not(.has-profile) {
  width: 100%;
  border: none;
  box-shadow: none;
  background: none;
  border-radius: 0;
}
.profile-image-edit-btn-fixed {
  position: absolute;
  right: 0;
  bottom: 0;
  /* 스타일 최소화: 배경, 테두리, 색상 등 제거 */
  background: none;
  border: none;
  border-radius: 0;
  padding: 0;
  font-size: 13px;
  color: inherit;
  cursor: pointer;
  transition: none;
  display: inline-block;
  z-index: 3;
}
.profile-image-edit-btn-fixed:hover {
  background: none;
}
.profile-image-input {
  display: none;
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
    width: 1100px;
    background: #fff;
    border-radius: 12px;
    padding: 60px 70px 0 70px;
    box-shadow: 0 2px 8px #7a7a7a;
    position: relative;
    min-height: 700px;
    display: flex;
    flex-direction: column;
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
    margin: 30px 0 6px 0;
  }
  .fixed-withdraw {
    right: 82px;
    bottom: 78px;
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
