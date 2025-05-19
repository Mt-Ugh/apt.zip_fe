<template>
  <header id="header" :class="['alt', { 'home-header': isHome }]">
    <div class="logo">
      <RouterLink to="/">
        <img src="/APT.ZIP_text.svg" alt="logo" />
      </RouterLink>
    </div>
    <a href="#menu" @click.prevent="toggleMenu">Menu</a>
  </header>

  <nav id="menu" :class="{ visible: isMenuVisible }">
    <ul class="links">
      <li><RouterLink to="/" @click="toggleMenu">홈</RouterLink></li>
      <li><RouterLink to="/about" @click="toggleMenu">About Us</RouterLink></li>
      <li><RouterLink to="/search" @click="toggleMenu">실거래 검색</RouterLink></li>
      <li><RouterLink to="/news" @click="toggleMenu">부동산 뉴스</RouterLink></li>
      <li><RouterLink to="/qna" @click="toggleMenu">QnA</RouterLink></li>
      <li><RouterLink to="/mypage" @click="toggleMenu">MyPage</RouterLink></li>
      <li v-if="userStore.isLoggedIn">
        <a href="#" @click.prevent="handleLogout">로그아웃</a>
      </li>
      <li v-else>
        <RouterLink to="/auth" @click="toggleMenu">로그인</RouterLink>
      </li>
    </ul>
    <button class="close" @click="toggleMenu"></button>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()

defineOptions({ name: 'AppHeader' })

defineProps({
  isHome: Boolean,
})

const isMenuVisible = ref(false)

const toggleMenu = () => {
  isMenuVisible.value = !isMenuVisible.value
}

const handleLogout = () => {
  userStore.logout()
  toggleMenu()
  router.push('/')
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');

#header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 4.25em;
  background: rgba(0, 0, 0, 0.975);
  color: #fff;
  line-height: 3.25em;
  z-index: 10001;
  text-align: right;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

#header > .logo {
  position: absolute;
  top: 3.5px;
  left: 0.8em;
  display: flex;
  align-items: center;
}

#header .logo img {
  height: 4.25rem;
  max-height: 100%;
  object-fit: contain;
}

#header > .logo a {
  color: #fff;
  text-decoration: none;
  font-size: 1.25em;
}

#header > .logo a:hover {
  color: rgba(255, 255, 255, 0.65);
}

#header > a {
  display: inline-block;
  padding: 0 0.75em;
  color: #fff;
  text-decoration: none;
  transition: color 0.2s ease-in-out;
}

#header > a:hover {
  color: #f2f2f2;
}

#header > a[href='#menu']:before {
  content: '';
  font-family: FontAwesome;
  margin-right: 0.5em;
}

#header > a + a[href='#menu']:last-child {
  border-left: 1px solid rgba(0, 0, 0, 0.15);
  padding-left: 1.25em;
  margin-left: 0.5em;
}

#header > a:last-child {
  padding-right: 1.25em;
}

#header.home-header {
  background: none;
}

#menu {
  position: fixed;
  top: 0;
  right: 0;
  width: 20rem;
  max-width: 80%;
  height: 100%;
  background: #bbb7ac;
  color: #000;
  padding: 3rem 2rem;
  overflow-y: auto;
  z-index: 10002;
  transform: translateX(20rem);
  transition:
    transform 0.5s ease,
    box-shadow 0.5s ease,
    visibility 0.5s;
  visibility: hidden;
  -webkit-overflow-scrolling: touch;
}

#menu.visible {
  transform: translateX(0);
  box-shadow: 0 0 1.5rem rgba(0, 0, 0, 0.2);
  visibility: visible;
}

#menu > ul.links {
  list-style: none;
  margin: 0 0 1rem 0;
  padding: 0;
}

#menu > ul.links > li {
  padding: 0;
}

#menu > ul.links > li > a {
  display: block;
  line-height: 3.5rem;
  text-decoration: none;
  color: black;
  border-top: 1px solid black;
  text-transform: uppercase;
}

#menu > ul.links > li:first-child > a {
  border-top: none !important;
}

#menu > ul.links > li > a:hover {
  color: #fff;
}

#menu .close {
  position: absolute;
  top: 10px;
  right: 10px;
  height: 3rem;
  width: 3rem;
  font-size: 1.5rem;
  line-height: 3rem;
  text-align: center;
  background: #bbb7ac;
  color: #fff;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

#menu .close:hover {
  color: #000;
}

#menu .close:before {
  content: '\f00d';
  font-family: FontAwesome;
}

@media screen and (max-width: 736px) {
  #header > a {
    padding: 0 0.5em;
  }

  #header > a + a[href='#menu']:last-child {
    padding-left: 1em;
    margin-left: 0.25em;
  }

  #header > a:last-child {
    padding-right: 1em;
  }

  #menu {
    padding: 2.5rem 1.75rem;
  }

  #menu .close {
    height: 4rem;
    line-height: 4rem;
  }
}
</style>
