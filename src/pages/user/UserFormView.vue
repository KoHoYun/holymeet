<template>
  <div class="container">
    <h1 class="title">참여하기</h1>

    <div class="form">
      <input v-model="name" placeholder="이름" />

      <input v-model="phone" placeholder="전화번호" />

      <div class="gender">
        <button
          :class="{ active: gender === 'male' }"
          @click="gender = 'male'"
        >
          남자
        </button>
        <button
          :class="{ active: gender === 'female' }"
          @click="gender = 'female'"
        >
          여자
        </button>
      </div>

      <button class="submit" @click="submit">
        시작하기 →
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      phone: '',
      gender: ''
    }
  },
  methods: {
    submit() {
      if (!this.name || !this.phone || !this.gender) {
        alert('모든 정보를 입력해주세요')
        return
      }

      // 👉 저장
      localStorage.setItem('user', JSON.stringify({
        name: this.name,
        phone: this.phone,
        gender: this.gender
      }))

      // 👉 이동
      this.$router.push('/vote')
    }
  }
}
</script>

<style scoped>
.container {
  padding: 30px;
  background: #fafafa;
  height: 100vh;
}

.title {
  font-size: 24px;
  margin-bottom: 30px;
}

/* 입력 */
.form input {
  width: 100%;
  padding: 14px;
  margin-bottom: 15px;
  border-radius: 10px;
  border: 1px solid #ddd;
}

/* 성별 */
.gender {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.gender button {
  flex: 1;
  padding: 14px;
  border-radius: 10px;
  border: none;
  background: #eee;
}

.gender .active {
  background: black;
  color: white;
}

/* 버튼 */
.submit {
  width: 100%;
  padding: 14px;
  border-radius: 30px;
  border: none;
  background: black;
  color: white;
}
</style>