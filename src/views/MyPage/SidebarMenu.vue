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
  width: 400px;
  background: #f8fafc;
  padding: 100px 10px 0 30px;
  border-right: 1px solid #eee;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.menu {
  width: auto;
  min-width: 340px;
  max-width: 90%;
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
</style>
