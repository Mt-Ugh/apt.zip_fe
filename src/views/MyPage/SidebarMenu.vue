<template>
  <aside class="sidebar">
    <div class="menu selected">회원 정보</div>
    <div class="menu">관심 지역</div>
    <br />
    <br />
    <br />
    <div class="menu">리뷰 관리</div>
    <div class="menu">Q&A 관리</div>
  </aside>
</template>
<style scoped>
.sidebar {
  width: 420px;
  background: #f8fafc;
  padding: 100px 10px 0 30px;
  border-right: 1px solid #eee;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  z-index: 10;
}
.menu {
  width: auto;
  min-width: 350px;
  max-width: 95%;
  padding: 18px 0 18px 30px;
  font-size: 16px;
  color: #6b6b6b;
  cursor: pointer;
  border-bottom: 1px solid #eee;
  text-align: left;
  margin-left: 0;
}
.menu.selected {
  background: #eaf6ff;
  color: #222;
  border-radius: 8px;
}

@media (max-width: 1600px) {
  .sidebar {
    width: 300px;
    padding-left: 10px;
  }
  .menu {
    min-width: 270px;
    font-size: 14px;
    margin-left: 3px;
  }
}
</style>
