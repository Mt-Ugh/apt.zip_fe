<template>
  <footer id="footer">
    <div class="footer-content">
      <div class="footer-top">
        <div class="footer-brand">
          <img src="/APT.ZIP_text.svg" alt="APT.ZIP Logo" />
        </div>

        <div class="footer-contact">
          <p>(46754)부산광역시 강서구 송정동 녹산산업중로 333</p>
          <p><strong>대표전화</strong> 02-3429-5100</p>
          <p><strong>이메일</strong> ssafy@ssafy.com</p>
        </div>

        <div class="footer-info-group">
          <div class="footer-links">
            <a href="https://naver.me/Gn0P65vg" target="_blank" rel="noopener noreferrer"
              >찾아오시는 길 &gt;</a
            >
          </div>
          <div class="footer-sns">
            <a href="https://www.instagram.com/hellossafy" target="_blank" rel="noopener noreferrer"
              ><i class="fab fa-instagram"></i
            ></a>
            <a
              href="https://www.youtube.com/channel/UC_XI3ByFO1uZIIH-g-zJZiw/featured"
              target="_blank"
              rel="noopener noreferrer"
              ><i class="fab fa-youtube"></i
            ></a>
          </div>
        </div>
      </div>

      <div class="copyright">© APT.ZIP. All rights reserved.</div>
    </div>
  </footer>
</template>

<script setup>
defineOptions({ name: 'AppFooter' })
</script>

<style scoped>
#footer {
  background: #d3cfc3;
  font-size: 0.9rem;
  color: #333;
  padding: 2rem 0;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-top {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #a8a8a8;
}

.footer-brand {
  flex: 1 1 200px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.footer-brand img {
  width: 230px;
  height: auto;
}

.footer-contact {
  flex: 2 1 300px;
}

.footer-info-group {
  flex: 1 1 150px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  margin-right: 10px;
  gap: 0.75rem;
}

.footer-links a {
  color: #333;
  text-decoration: none;
  font-size: 0.9rem;
}

.footer-links a:hover {
  text-decoration: underline;
}

.footer-sns {
  display: flex;
  gap: 0.75rem;
}

.footer-sns i {
  font-size: 1.25rem;
  color: #000;
}

footer strong {
  font-weight: 600;
}

footer p {
  margin: 0.25rem 0;
}

footer .copyright {
  text-align: center;
  color: #777;
  font-size: 0.8rem;
  margin-top: 1.5rem;
}
</style>
