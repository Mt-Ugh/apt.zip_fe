<template>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />

  <div class="cotn_principal">
    <div class="cont_centrar">
      <div class="cont_signin">
        <div class="cont_info_log_signup">
          <div class="col_md_signin">
            <div class="cont_ba_opcitiy">
              <h2>SIGN IN</h2>
              <p>
                로그인 이후<br />
                자신의 정보를 조회하세요.
              </p>
              <button class="btn_signin" @click="changeToSignin">SIGN IN</button>
            </div>
          </div>
          <div class="col_md_signup">
            <div class="cont_ba_opcitiy">
              <h2>SIGN UP</h2>
              <p>
                회원가입하고<br />
                더 많은 기능을 사용해보세요.
              </p>
              <button class="btn_signup" @click="changeToSignup">SIGN UP</button>
            </div>
          </div>
        </div>

        <div class="cont_back_info">
          <div class="cont_img_back_grey">
            <img :src="AuthBackground" alt="Background" />
          </div>
        </div>

        <div :class="['cont_forms', formStateClass]">
          <div class="cont_img_back_">
            <img :src="AuthBackground" alt="Background" />
          </div>

          <form
            class="cont_form_signin"
            v-show="formState === 'signin'"
            :style="{ opacity: signinOpacity }"
            @submit.prevent="handleSignin"
          >
            <a href="#" @click.prevent="hideForms"><i class="material-icons">&#xE5C4;</i></a>
            <h2>SIGN IN</h2>
            <input type="email" placeholder="Email" v-model="signinEmail" required />
            <input type="password" placeholder="Password" v-model="signinPassword" required />
            <button class="btn_signin" type="submit">SIGN IN</button>
            <button class="btn_social_login" type="button" @click="handleGoogleLogin">
              <img :src="GoogleSignin" alt="Google 로그인 버튼" />
            </button>
          </form>

          <form
            class="cont_form_signup"
            v-show="formState === 'signup'"
            :style="{ opacity: signupOpacity }"
            @submit.prevent="handleSignup"
          >
            <a href="#" @click.prevent="hideForms"><i class="material-icons">&#xE5C4;</i></a>
            <h2>SIGN UP</h2>
            <input type="email" placeholder="Email" v-model="signupEmail" required />
            <input type="text" placeholder="Name" v-model="name" required />
            <input type="text" placeholder="Nickname" v-model="nickname" required />
            <input
              type="text"
              v-model="phoneNumber"
              @input="handlePhoneNumberInput"
              placeholder="Phone Number"
              maxlength="13"
              required
            />
            <input type="password" placeholder="Password" v-model="signupPassword" required />
            <input
              type="password"
              placeholder="Confirm Password"
              v-model="confirmPassword"
              required
            />
            <p v-if="passwordMismatch" style="color: red; font-size: 13px; margin-top: 5px">
              비밀번호가 일치하지 않습니다.
            </p>
            <button class="btn_signup" type="submit">SIGN UP</button>
          </form>
        </div>
      </div>
    </div>
  </div>

  <CommonModal
    :visible="showModal"
    :title="modalTitle"
    :message="modalMessage"
    @close="showModal = false"
  />
</template>

<script setup>
import { ref, computed } from 'vue'
import { signin, signup, getGoogleLoginUrl } from '@/api/Auth'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import CommonModal from '@/components/common/CommonModal.vue'
import AuthBackground from '@/assets/images/Auth/Authbackground.jpg'
import GoogleSignin from '@/assets/images/Auth/GoogleSignin.svg'

const router = useRouter()
const userStore = useUserStore()

const formState = ref('')
const signinOpacity = ref('0')
const signupOpacity = ref('0')

const signinEmail = ref('')
const signinPassword = ref('')

const signupEmail = ref('')
const name = ref('')
const nickname = ref('')
const phoneNumber = ref('')
const signupPassword = ref('')
const confirmPassword = ref('')

const showModal = ref(false)
const modalTitle = ref('')
const modalMessage = ref('')

const showModalError = (title, message) => {
  modalTitle.value = title
  modalMessage.value = message
  showModal.value = true
}

const handlePhoneNumberInput = (e) => {
  const raw = e.target.value.replace(/\D/g, '').slice(0, 11)

  if (raw.length <= 3) {
    phoneNumber.value = raw
  } else if (raw.length <= 7) {
    phoneNumber.value = `${raw.slice(0, 3)}-${raw.slice(3)}`
  } else {
    phoneNumber.value = `${raw.slice(0, 3)}-${raw.slice(3, 7)}-${raw.slice(7)}`
  }
}

const passwordMismatch = computed(() => {
  return confirmPassword.value && signupPassword.value !== confirmPassword.value
})

const formStateClass = computed(() => {
  if (formState.value === 'signin') return 'cont_forms_active_signin'
  if (formState.value === 'signup') return 'cont_forms_active_signup'
  return ''
})

const changeToSignin = () => {
  formState.value = 'signin'
  signinOpacity.value = '1'
  signupOpacity.value = '0'
}

const changeToSignup = () => {
  formState.value = 'signup'
  signinOpacity.value = '0'
  signupOpacity.value = '1'
}

const hideForms = () => {
  signinEmail.value = ''
  signinPassword.value = ''

  signupEmail.value = ''
  signupPassword.value = ''
  name.value = ''
  nickname.value = ''
  phoneNumber.value = ''
  confirmPassword.value = ''

  formState.value = ''
  signinOpacity.value = '0'
  signupOpacity.value = '0'
}

const handleSignin = async () => {
  try {
    const res = await signin(signinEmail.value, signinPassword.value)
    userStore.setUser(res)
    router.push('/')
  } catch (err) {
    if (err.response?.status === 400) {
      showModalError(
        '로그인 실패',
        err.response?.data?.message || '아이디 또는 비밀번호가 틀렸습니다.',
      )
    } else {
      showModalError('로그인 실패', '오류 발생')
    }
  }
}

const handleGoogleLogin = async () => {
  window.location.href = getGoogleLoginUrl()
}

const handleSignup = async () => {
  if (passwordMismatch.value) {
    showModalError('회원가입 실패', '비밀번호가 일치하지 않습니다.')
    return
  }

  try {
    await signup(
      signupEmail.value,
      signupPassword.value,
      name.value,
      nickname.value,
      phoneNumber.value,
    )
    showModalError('회원가입 성공', '로그인 후 사용해주세요.')
    hideForms()
  } catch (err) {
    if (err.response?.status === 409) {
      showModalError('회원가입 실패', '이미 존재하는 사용자입니다.')
    } else {
      showModalError('회원가입 실패', err.response?.data?.message || err.message)
    }
  }
}
</script>

<style scoped>
* {
  margin: 0px auto;
  padding: 0px;
  text-align: center;
  font-family: 'Open Sans', sans-serif;
}

.cotn_principal {
  position: relative;
  width: 100%;
  display: flex;
  min-height: 100vh;
  background: #cfd8dc; /* Old browsers */
  background: -moz-linear-gradient(-45deg, #cfd8dc 0%, #607d8b 100%, #b0bec5 100%); /* FF3.6-15 */
  background: -webkit-linear-gradient(
    -45deg,
    #cfdcd7 0%,
    #bbbaa8 100%,
    #bfb9ad 100%
  ); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(
    135deg,
    #cfdcd7 0%,
    #bbbaa8 100%,
    #bfb9ad 100%
  ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#cfd8dc', endColorstr='#b0bec5',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
}

.cont_centrar {
  display: flex;
  align-self: center;
  width: 100%;
}

.cont_signin {
  position: relative;
  width: 640px;
}

.cont_back_info {
  position: relative;
  float: left;
  width: 640px;
  height: 280px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 1px 10px 30px -10px rgba(0, 0, 0, 0.5);
}

.cont_forms {
  position: absolute;
  overflow: hidden;
  top: 0px;
  left: 0px;
  width: 320px;
  height: 280px;
  background-color: #eee;
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  -ms-transition: all 0.5s;
  -o-transition: all 0.5s;
  transition: all 0.5s;
}

.cont_forms_active_signin {
  box-shadow: 1px 10px 30px -10px rgba(0, 0, 0, 0.5);
  height: 420px;
  top: -60px;
  left: 0px;
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  -ms-transition: all 0.5s;
  -o-transition: all 0.5s;
  transition: all 0.5s;
}

.cont_forms_active_signup {
  box-shadow: 1px 10px 30px -10px rgba(0, 0, 0, 0.5);
  height: 600px;
  top: -160px;
  left: 320px;
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  -ms-transition: all 0.5s;
  -o-transition: all 0.5s;
  transition: all 0.5s;
}

.cont_img_back_grey {
  position: absolute;
  width: 950px;
  top: -80px;
  left: -116px;
}

.cont_img_back_grey > img {
  width: 100%;
  -webkit-filter: grayscale(100%);
  filter: grayscale(100%);
  opacity: 0.2;
  animation-name: animar_fondo;
  animation-duration: 20s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

.cont_img_back_ {
  position: absolute;
  width: 950px;
  top: -120px;
  left: -116px;
}

.cont_img_back_ > img {
  height: 630px;
  opacity: 0.3;
  animation-name: animar_fondo;
  animation-duration: 20s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

.cont_forms_active_signin > .cont_img_back_ {
  top: -20px;
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  -ms-transition: all 0.5s;
  -o-transition: all 0.5s;
  transition: all 0.5s;
}

.cont_forms_active_signup > .cont_img_back_ {
  top: -20px;
  left: -435px;
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  -ms-transition: all 0.5s;
  -o-transition: all 0.5s;
  transition: all 0.5s;
}

.cont_info_log_signup {
  position: absolute;
  width: 640px;
  height: 280px;
  top: 0px;
  z-index: 1;
}

.col_md_signin {
  position: relative;
  float: left;
  width: 50%;
}

.col_md_signin > h2 {
  font-weight: 400;
  margin-top: 70px;
  color: #757575;
}

.col_md_signin > p {
  font-weight: 400;
  margin-top: 15px;
  width: 80%;
  color: #37474f;
}

.btn_signin {
  background-color: #26c6da;
  border: none;
  padding: 10px;
  width: 200px;
  border-radius: 3px;
  box-shadow: 1px 5px 20px -5px rgba(0, 0, 0, 0.4);
  color: #fff;
  margin-top: 10px;
  cursor: pointer;
}

.col_md_signup {
  position: relative;
  float: left;
  width: 50%;
}

.cont_ba_opcitiy > h2 {
  font-weight: 400;
  color: #fff;
}

.cont_ba_opcitiy > p {
  font-weight: 400;
  margin-top: 15px;
  color: #fff;
}

.cont_ba_opcitiy {
  position: relative;
  background-color: rgba(120, 144, 156, 0.55);
  width: 80%;
  border-radius: 3px;
  margin-top: 55px;
  padding: 15px 0px;
}

.btn_signup {
  background-color: #ef5350;
  border: none;
  padding: 10px;
  width: 200px;
  border-radius: 3px;
  box-shadow: 1px 5px 20px -5px rgba(0, 0, 0, 0.4);
  color: #fff;
  margin-top: 10px;
  cursor: pointer;
}
.cont_forms_active_signup {
  z-index: 2;
}

@keyframes animar_fondo {
  from {
    transform: scale(1) translate(0px);
  }
  to {
    transform: scale(1.5) translate(50px);
  }
}

@-webkit-keyframes animar_fondo {
  from {
    -webkit-transform: scale(1) translate(0px);
    -moz-transform: scale(1) translate(0px);
    -ms-transform: scale(1) translate(0px);
    -o-transform: scale(1) translate(0px);
    transform: scale(1) translate(0px);
  }
  to {
    -webkit-transform: scale(1.5) translate(50px);
    -moz-transform: scale(1.5) translate(50px);
    -ms-transform: scale(1.5) translate(50px);
    -o-transform: scale(1.5) translate(50px);
    transform: scale(1.5) translate(50px);
  }
}
@-o-keyframes identifier {
  from {
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -ms-transform: scale(1);
    -o-transform: scale(1);
    transform: scale(1);
  }
  to {
    -webkit-transform: scale(1.5);
    -moz-transform: scale(1.5);
    -ms-transform: scale(1.5);
    -o-transform: scale(1.5);
    transform: scale(1.5);
  }
}
@-moz-keyframes identifier {
  from {
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -ms-transform: scale(1);
    -o-transform: scale(1);
    transform: scale(1);
  }
  to {
    -webkit-transform: scale(1.5);
    -moz-transform: scale(1.5);
    -ms-transform: scale(1.5);
    -o-transform: scale(1.5);
    transform: scale(1.5);
  }
}
@keyframes identifier {
  from {
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -ms-transform: scale(1);
    -o-transform: scale(1);
    transform: scale(1);
  }
  to {
    -webkit-transform: scale(1.5);
    -moz-transform: scale(1.5);
    -ms-transform: scale(1.5);
    -o-transform: scale(1.5);
    transform: scale(1.5);
  }
}
.cont_form_signin {
  position: absolute;
  opacity: 0;
  width: 320px;
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  -ms-transition: all 0.5s;
  -o-transition: all 0.5s;
  transition: all 0.5s;
}

.cont_forms_active_signin {
  z-index: 2;
}

.cont_form_signup {
  position: absolute;
  width: 320px;
  float: left;
  opacity: 0;
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  -ms-transition: all 0.5s;
  -o-transition: all 0.5s;
  transition: all 0.5s;
}

.cont_form_signup > input {
  text-align: left;
  padding: 15px 5px;
  margin-top: 20px;
  width: 260px;
  border: none;
  color: #757575;
}

.cont_form_signup > h2 {
  margin-top: 50px;
  font-weight: 400;
  color: #757575;
}

.cont_form_signin > input {
  padding: 15px 5px;
  margin-top: 20px;
  width: 260px;
  border: none;
  text-align: left;
  color: #757575;
}

.cont_form_signin > h2 {
  margin-top: 90px;
  font-weight: 400;
  color: #757575;
}

.cont_form_signin > a,
.cont_form_signup > a {
  color: #757575;
  position: relative;
  float: left;
  margin: 10px;
  margin-left: 8px;
}

.btn_social_login {
  background: none;
  border: none;
  padding: 0;
  margin: 16px auto 0;
  display: block;
  cursor: pointer;
}

.btn_social_login img {
  display: block;
  height: 43px;
}
</style>
