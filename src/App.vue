<template>
  <div id="app">
    <h1>홀리밋</h1>
    <form @submit.prevent="generateList">
      <label>
        몇대몇:
        <input type="number" v-model.number="count" min="1" />
      </label>
      <button type="submit">생성하기</button>
    </form>

    <div v-if="males.length || females.length" class="result">
      <h2>남자 목록</h2>
      <table>
        <thead>
          <tr>
            <th>번호</th>
            <th>이름</th>
            <th>전화번호</th>
            <th>카카오톡 아이디</th>
            <th>여자 선택</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(male, index) in males" :key="'m'+index">
            <td>{{ male.number }}</td>
            <td><input type="text" v-model="male.name" placeholder="이름 입력" /></td>
            <td><input type="text" v-model="male.phone" placeholder="전화번호 입력" /></td>
            <td><input type="text" v-model="male.kakao" placeholder="카톡 아이디 입력" /></td>
            <td>
              <div v-for="female in females" :key="'chk-f'+female.number" class="checkbox-item">
                <label>
                  <input
                    type="checkbox"
                    :value="female.number"
                    v-model="male.selected"
                  />
                  {{ female.number }}번 {{ female.name || '이름없음' }}
                </label>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <h2>여자 목록</h2>
      <table>
        <thead>
          <tr>
            <th>번호</th>
            <th>이름</th>
            <th>전화번호</th>
            <th>카카오톡 아이디</th>
            <th>남자 선택</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(female, index) in females" :key="'f'+index">
            <td>{{ female.number }}</td>
            <td><input type="text" v-model="female.name" placeholder="이름 입력" /></td>
            <td><input type="text" v-model="female.phone" placeholder="전화번호 입력" /></td>
            <td><input type="text" v-model="female.kakao" placeholder="카톡 아이디 입력" /></td>
            <td>
              <div v-for="male in males" :key="'chk-m'+male.number" class="checkbox-item">
                <label>
                  <input
                    type="checkbox"
                    :value="male.number"
                    v-model="female.selected"
                  />
                  {{ male.number }}번 {{ male.name || '이름없음' }}
                </label>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <button @click="showMutualSelections" class="submit-btn">상호 선택 관계 보기</button>
    </div>

    <div v-if="showMutual" class="relations">
      <h2>상호 선택된 남자-여자 쌍</h2>
      <table>
        <thead>
          <tr>
            <th>남자 번호</th>
            <th>남자 이름</th>
            <th>남자 전화번호</th>
            <th>남자 카톡 아이디</th>
            <th>여자 번호</th>
            <th>여자 이름</th>
            <th>여자 전화번호</th>
            <th>여자 카톡 아이디</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(pair, index) in mutualPairs" :key="'pair-'+index">
            <td>{{ pair.male.number }}</td>
            <td>{{ pair.male.name || '이름없음' }}</td>
            <td>{{ pair.male.phone || '-' }}</td>
            <td>{{ pair.male.kakao || '-' }}</td>
            <td>{{ pair.female.number }}</td>
            <td>{{ pair.female.name || '이름없음' }}</td>
            <td>{{ pair.female.phone || '-' }}</td>
            <td>{{ pair.female.kakao || '-' }}</td>
          </tr>
          <tr v-if="mutualPairs.length === 0">
            <td colspan="8" style="text-align:center;">상호 선택된 쌍이 없습니다.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
class Person {
  constructor(number) {
    this.number = number
    this.name = ''
    this.phone = ''
    this.kakao = ''
    this.selected = []  // 상대 성별 번호 저장
  }
}

export default {
  name: 'App',
  data() {
    return {
      count: 1,
      males: [],
      females: [],
      showMutual: false,
      mutualPairs: []
    }
  },
  methods: {
    generateList() {
      if (this.count < 1) {
        alert('1 이상의 숫자를 입력하세요.')
        return
      }
      this.males = []
      this.females = []
      this.showMutual = false
      this.mutualPairs = []

      for (let i = 1; i <= this.count; i++) {
        this.males.push(new Person(i))
        this.females.push(new Person(i))
      }
    },
    showMutualSelections() {
      const pairs = []

      this.males.forEach(male => {
        male.selected.forEach(femaleNum => {
          const female = this.females.find(f => f.number === femaleNum)
          if (female && female.selected.includes(male.number)) {
            // 서로 선택한 경우만 추가
            pairs.push({ male, female })
          }
        })
      })

      this.mutualPairs = pairs
      this.showMutual = true
      alert('상호 선택 관계가 아래에 표시됩니다.')
    }
  }
}
</script>

<style>
#app {
  max-width: 900px;
  margin: 30px auto;
  font-family: Arial, sans-serif;
  padding: 20px;
  background: #fafafa;
  border-radius: 6px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

form label {
  display: block;
  margin: 10px 0;
}

input[type="number"],
input[type="text"] {
  padding: 6px;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
}

input[type="number"] {
  width: 80px;
  margin-left: 8px;
}

button {
  margin-top: 15px;
  padding: 8px 20px;
  font-weight: bold;
  cursor: pointer;
}

.result {
  margin-top: 30px;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 30px;
}

thead {
  background-color: #007bff;
  color: white;
}

th, td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
  vertical-align: top;
}

input[type="text"] {
  border: 1px solid #ccc;
  border-radius: 4px;
}

.submit-btn {
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
}

.submit-btn:hover {
  background-color: #218838;
}

.checkbox-item {
  margin-bottom: 4px;
  font-size: 13px;
}

.relations {
  margin-top: 40px;
  overflow-x: auto;
}
</style>
