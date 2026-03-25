<template>
  <div class="container">
    <!-- 로고 -->
    <div class="logo">@holy_meet_</div>

    <!-- 로그인 카드 -->
    <div class="card">
      <h1 class="title">관리자 로그인</h1>

      <input
        type="email"
        v-model="email"
        placeholder="이메일"
      />

      <input
        type="password"
        v-model="password"
        placeholder="비밀번호"
      />

      <button class="login-btn" @click="login">
        로그인 →
      </button>
    </div>

    <!-- 하단 -->
    <div class="footer">
      관리자 전용 페이지입니다
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async login() {
      console.log('로그인 시도') // 👈 이거 추가

      const { data, error } = await this.$supabase.auth.signInWithPassword({
        email: this.email,
        password: this.password
      })

      console.log('결과:', data, error) // 👈 핵심

      if (error) {
        alert(error.message)
        return
      }

      this.$router.push('/admin/main')
    }
  }
}
</script>

<style scoped>
.container {
  min-height: 100vh;
  background: #fafafa;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 30px 20px;
  font-family: 'Pretendard', sans-serif;
}

/* 로고 */
.logo {
  font-size: 14px;
  color: #999;
}

/* 카드 */
.card {
  background: white;
  padding: 30px 20px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
}

/* 타이틀 */
.title {
  font-size: 20px;
  margin-bottom: 20px;
  text-align: center;
}

/* 입력 */
input {
  width: 100%;
  padding: 14px;
  margin-bottom: 12px;
  border-radius: 10px;
  border: 1px solid #ddd;
  font-size: 14px;
}

/* 버튼 */
.login-btn {
  width: 100%;
  padding: 14px;
  border-radius: 30px;
  border: none;
  background: black;
  color: white;
  font-size: 14px;
  cursor: pointer;
  transition: 0.2s;
}

.login-btn:hover {
  opacity: 0.8;
}

/* 하단 */
.footer {
  text-align: center;
  font-size: 12px;
  color: #aaa;
}
</style>