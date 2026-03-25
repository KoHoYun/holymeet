<template>
  <div class="container">
    <h1 class="title">일정 목록</h1>
    <button class="add-btn" @click="$router.push('/admin/schedule/create')">
    + 일정 추가
    </button>
    <!-- 로딩 -->
    <div v-if="loading" class="loading">
      불러오는 중...
    </div>

    <!-- 리스트 -->
    <div v-else>
      <div
        v-for="item in schedules"
        :key="item.id"
        class="card"
      >
        <!-- 날짜 -->
        <div class="date">
          {{ formatDate(item.date) }} {{ formatTime(item.time) }}
        </div>

        <!-- 나이 조건 -->
        <div class="age">
          {{ item.start_age }}세 ~ {{ item.end_age }}세
        </div>

        <!-- 인원 -->
        <div class="count">
          정원: {{ item.count }}명
        </div>
      </div>

      <!-- 데이터 없을 때 -->
      <div v-if="schedules.length === 0" class="empty">
        등록된 일정이 없습니다
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      schedules: [],
      loading: true
    }
  },
  async created() {
    await this.fetchSchedules()
  },
  methods: {
    async fetchSchedules() {
      const { data, error } = await this.$supabase
        .from('schedule_info')
        .select('*')
        .order('date', { ascending: true })

      if (error) {
        console.error(error)
        alert('데이터 불러오기 실패')
        return
      }

      this.schedules = data
      this.loading = false
    },

    formatDate(date) {
      if (!date) return ''
      return date.replaceAll('-', '.')
    },

    formatTime(time) {
      if (!time) return ''
      return time.slice(0, 5) // HH:mm
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

/* 카드 */
.card {
  background: white;
  padding: 16px;
  border-radius: 14px;
  margin-bottom: 12px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.05);
}

/* 날짜 */
.date {
  font-size: 14px;
  color: #666;
  margin-bottom: 6px;
}

/* 나이 */
.age {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 6px;
}

/* 인원 */
.count {
  font-size: 13px;
  color: #888;
}

/* 로딩 */
.loading {
  text-align: center;
  margin-top: 50px;
  color: #888;
}

/* 빈 상태 */
.empty {
  text-align: center;
  margin-top: 50px;
  color: #bbb;
}
.add-btn {
  margin-bottom: 20px;
  padding: 10px 16px;
  border-radius: 20px;
  border: none;
  background: black;
  color: white;
}
</style>