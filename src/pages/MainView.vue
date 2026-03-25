<template>
  <div class="home">
    <!-- 상단 -->
    <div class="header">@holy_meet_</div>

    <!-- 메인 -->
    <div class="main">
      <p class="label">오늘의 질문</p>

      <h1 class="title">
        당신의 생각을<br />
        선택으로 남겨보세요
      </h1>

      <router-link to="/user" class="cta">
        투표하러 가기 →
      </router-link>
    </div>

    <!-- 하단 -->
    <div class="footer">
      사람들의 선택이 모여<br />
      하나의 결과가 됩니다
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage'
}
</script>

<style scoped>
.home {
  height: 100vh;
  background: #fafafa;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 30px 20px;
  font-family: 'Pretendard', sans-serif;
}

/* 상단 */
.header {
  font-size: 14px;
  color: #999;
}

/* 메인 */
.main {
  text-align: center;
  margin-top: 100px;
}

.label {
  font-size: 13px;
  color: #bbb;
  margin-bottom: 10px;
}

.title {
  font-size: 28px;
  line-height: 1.4;
  font-weight: 600;
}

/* 버튼 */
.cta {
  display: inline-block;
  margin-top: 30px;
  padding: 14px 28px;
  border-radius: 30px;
  background: black;
  color: white;
  text-decoration: none;
  font-size: 14px;
  transition: 0.2s;
}

.cta:hover {
  opacity: 0.8;
  transform: scale(1.05);
}
/* 하단 */
.footer {
  font-size: 12px;
  color: #aaa;
  text-align: center;
}
</style>