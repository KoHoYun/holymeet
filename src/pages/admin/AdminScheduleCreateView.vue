<template>
  <div class="container">
    <h1 class="title">일정 추가</h1>

    <div class="form">
      <!-- 날짜 -->
      <label>날짜</label>
      <input type="date" v-model="date" />

      <!-- 시간 -->
      <label>시간</label>
      <input type="time" v-model="time" />

      <!-- 나이 -->
      <label>나이 범위</label>
      <div class="age-box">
        <input type="number" v-model="start_age" placeholder="시작 나이" />
        <span>~</span>
        <input type="number" v-model="end_age" placeholder="끝 나이" />
      </div>

      <!-- 인원 -->
      <label>정원</label>
      <input type="number" v-model="count" placeholder="인원 수" />

      <!-- 버튼 -->
      <button class="submit" @click="createSchedule">
        일정 추가 →
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      date: '',
      time: '',
      start_age: '',
      end_age: '',
      count: ''
    }
  },
  methods: {
    async createSchedule() {
      // ✅ 유효성 체크
      if (!this.date || !this.time) {
        alert('날짜와 시간을 입력해주세요')
        return
      }

      if (!this.start_age || !this.end_age) {
        alert('나이 범위를 입력해주세요')
        return
      }

      if (!this.count) {
        alert('정원을 입력해주세요')
        return
      }

      // ✅ DB 저장
      const { error } = await this.$supabase
        .from('schedule_info')
        .insert([
          {
            date: this.date,
            time: this.time,
            start_age: this.start_age,
            end_age: this.end_age,
            count: this.count
          }
        ])

      if (error) {
        console.error(error)
        alert('저장 실패')
        return
      }

      alert('일정이 추가되었습니다')

      // 👉 리스트 페이지로 이동
      this.$router.push('/admin/schedule/list')
    }
  }
}
</script>

<style scoped>
.container {
  padding: 20px;
  background: #fafafa;
  min-height: 100vh;
}

.title {
  font-size: 22px;
  margin-bottom: 20px;
}

/* 폼 */
.form {
  background: white;
  padding: 20px;
  border-radius: 14px;
}

label {
  font-size: 13px;
  color: #666;
  margin-top: 10px;
  display: block;
}

/* 입력 */
input {
  width: 100%;
  padding: 12px;
  margin-top: 6px;
  margin-bottom: 10px;
  border-radius: 10px;
  border: 1px solid #ddd;
}

/* 나이 */
.age-box {
  display: flex;
  align-items: center;
  gap: 10px;
}

.age-box input {
  flex: 1;
}

/* 버튼 */
.submit {
  width: 100%;
  margin-top: 20px;
  padding: 14px;
  border-radius: 30px;
  border: none;
  background: black;
  color: white;
  font-size: 14px;
}
</style>