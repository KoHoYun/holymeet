<template>
  <div class="container">
    <h1 class="title">투표하기</h1>

    <p class="desc">최대 3명까지 선택해주세요</p>

    <!-- 사람 리스트 -->
    <div class="list">
      <div
        v-for="person in people"
        :key="person.id"
        class="item"
        :class="{ selected: selectedIds.includes(person.id) }"
        @click="toggleSelect(person.id)"
      >
        <div class="left">
          <span class="num">{{ person.id }}</span>
          <span class="name">{{ person.name }}</span>
        </div>

        <div class="check">
          <input
            type="checkbox"
            :checked="selectedIds.includes(person.id)"
            readonly
          />
        </div>
      </div>
    </div>

    <!-- 선택 개수 -->
    <div class="count">
      {{ selectedIds.length }} / 3 선택됨
    </div>

    <!-- 제출 -->
    <button class="submit" @click="submit">
      제출하기
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      people: [
        { id: 1, name: '김철수' },
        { id: 2, name: '이영희' },
        { id: 3, name: '박민수' },
        { id: 4, name: '최지은' },
        { id: 5, name: '정우성' }
      ],
      selectedIds: []
    }
  },
  methods: {
    toggleSelect(id) {
      const index = this.selectedIds.indexOf(id)

      // 이미 선택된 경우 → 제거
      if (index > -1) {
        this.selectedIds.splice(index, 1)
      } else {
        // 최대 3명 제한
        if (this.selectedIds.length >= 3) {
          alert('최대 3명까지 선택 가능합니다')
          return
        }
        this.selectedIds.push(id)
      }
    },

    submit() {
      if (this.selectedIds.length === 0) {
        alert('최소 1명 선택해주세요')
        return
      }

      console.log('선택된 사람:', this.selectedIds)

      // 👉 나중에 Supabase 저장
      // 👉 결과 페이지 이동
      this.$router.push('/result')
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
  font-size: 24px;
  margin-bottom: 10px;
}

.desc {
  font-size: 14px;
  color: #888;
  margin-bottom: 20px;
}

/* 리스트 */
.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px;
  margin-bottom: 10px;
  background: white;
  border-radius: 12px;
  cursor: pointer;
  transition: 0.2s;
}

.item:hover {
  background: #f1f1f1;
}

/* 선택된 상태 */
.selected {
  background: #000;
  color: white;
}

/* 왼쪽 */
.left {
  display: flex;
  gap: 10px;
}

.num {
  font-weight: bold;
}

.name {
  font-size: 16px;
}

/* 체크 */
.check input {
  width: 18px;
  height: 18px;
}

/* 카운트 */
.count {
  margin-top: 10px;
  font-size: 14px;
  color: #666;
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
}
</style>