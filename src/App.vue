<template>
  <div id="app">

    <!-- 1. 몇 대 몇 물어보기 패널 -->
    <section class="panel">
      
      <h1>홀리밋</h1>
      <h2 class="panel-title">• 몇 대 몇 소개팅인가요?</h2>
      <form @submit.prevent="generateList" class="count-form">
        <label>
          인원 수:
          <input type="number" v-model.number="count" min="1" :disabled="isGenerated" />
        </label>
        <button type="submit" :disabled="isGenerated">목록 생성하기</button>
      </form>
      <p v-if="isGenerated" class="refresh-warning">
        소개팅 인원 수는 목록 생성 후 변경할 수 없습니다.<br />
        새로 입력하려면 페이지를 새로고침하세요.
      </p>
    </section>

    <!-- 2. 남여 정보 입력하기 패널 -->
    <section v-if="isGenerated" class="panel">
      <h2 class="panel-title">• 남자 / 여자 정보 입력하기</h2>

      <div class="table-container">
        <h3>💙 남자 목록</h3>
        <table class="male-table">
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
              <td data-label="번호">{{ male.number }}</td>
              <td data-label="이름"><input type="text" v-model="male.name" placeholder="이름 입력" /></td>
              <td data-label="전화번호"><input type="text" v-model="male.phone" placeholder="전화번호 입력" /></td>
              <td data-label="카톡 ID"><input type="text" v-model="male.kakao" placeholder="카톡 아이디 입력" /></td>
              <td data-label="여자 선택">
                <div v-for="female in females" :key="'chk-f'+female.number" class="checkbox-item">
                  <label>
                    <input type="checkbox" :value="female.number" v-model="male.selected" />
                    여자 {{ female.number }}번<br>{{ female.name? '(' + female.name + ')' : '' }}
                  </label>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="table-container" style="margin-top:30px;">
        <h3>❤️ 여자 목록</h3>
        <table class="female-table">
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
              <td data-label="번호">{{ female.number }}</td>
              <td data-label="이름"><input type="text" v-model="female.name" placeholder="이름 입력" /></td>
              <td data-label="전화번호"><input type="text" v-model="female.phone" placeholder="전화번호 입력" /></td>
              <td data-label="카톡 ID"><input type="text" v-model="female.kakao" placeholder="카톡 아이디 입력" /></td>
              <td data-label="남자 선택">
                <div v-for="male in males" :key="'chk-m'+male.number" class="checkbox-item">
                  <label>
                    <input type="checkbox" :value="male.number" v-model="female.selected" />
                    남자 {{ male.number }}번<br>{{ male.name? '(' + male.name + ')' : '' }}
                  </label>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      

      <button v-if="isGenerated" @click="showMutualSelections" class="submit-btn">
        매칭 결과 보기
      </button>
    </section>

    <!-- 3. 매칭결과 알려주기 패널 -->
    <section v-if="showMutual" class="panel">
      <h2 class="panel-title">• 매칭 결과</h2>

      <div class="table-container">
        <div
          v-for="(pair, index) in mutualPairs"
          :key="'pair-'+index"
          class="pair-table-wrapper"
        >
          <div class="pair-title">매칭 {{ index + 1 }}</div>
          <div style="margin-bottom:10px;">
            안녕하세요. 홀리밋입니다^^
            <br>매칭되셔서 채팅방 만들어드립니다. 편하게 대화하시고 주님 안에서 좋은 만남되시길 소망합니다.
            <br>커플이 되신 경우에 인스타그램 홀리밋(@holy_meet_)이나 카톡으로 후기 남겨주시면
            소정의 상품 드리오니 많은 연락바랍니다^^
          </div>
          <table class="pair-table">
            <thead>
              <tr>
                <th></th>
                <th class="male-col">
                  남자 {{ pair.male.number }}번
                  <br>({{ pair.male.name }})
                </th>
                <th class="female-col">
                  여자 {{ pair.female.number }}번
                  <br>({{ pair.female.name }})
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>전화번호</td>
                <td class="male-col">{{ pair.male.phone || '-' }}</td>
                <td class="female-col">{{ pair.female.phone || '-' }}</td>
              </tr>
              <tr>
                <td>카톡 아이디</td>
                <td class="male-col">{{ pair.male.kakao || '-' }}</td>
                <td class="female-col">{{ pair.female.kakao || '-' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-if="mutualPairs.length === 0" class="no-pairs">매칭된 쌍이 없습니다.</div>
      </div>
    </section>

    <!-- 4. 분석결과 -->
    <section v-if="showMutual" class="panel">
      <h2 class="panel-title">• 분석 결과</h2>

      <div class="table-container analysis-table-container">
        <table class="analysis-table">
          <colgroup>
            <col style="width: 20%" />
            <col style="width: 20%" />
            <col style="width: 20%" />
            <col />
          </colgroup>
          <thead>
            <tr>
              <th>대상</th>
              <th>내가 선택한 사람</th>
              <th>나를 선택한 사람</th>
              <th>추가 매칭 메시지</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="male in males" :key="'analysis-male-'+male.number" class="male-row">
              <td class="male-row">남자 {{ male.number }}번({{ male.name || '' }})<br>- {{ male.kakao }}</td>
              <td class="male-row">
                <template>
                  <div
                    v-for="num in male.selected"
                    :key="'chosen-by-m-'+male.number+'-'+num"
                    class="chosen-by-item"
                    :title="getPersonName('female', num)"
                  >
                    여자 {{ num }}번({{ getPersonName('female', num) }})
                  </div>
                </template>
              </td>
              <td class="male-row">
                <template v-if="male.chosenBy.length">
                  <div
                    v-for="num in male.chosenBy"
                    :key="'chosen-by-m-'+male.number+'-'+num"
                    class="chosen-by-item"
                    :title="getPersonName('female', num)"
                  >
                    여자 {{ num }}번({{ getPersonName('female', num) }})<br>- {{ getPersonKaKao('female', num) }}
                </div>
                </template>
                <template v-else>
                  -
                </template>
              </td>
              <td class="male-row">
                <div v-if="male.chosenBy.filter(f => !male.selected.includes(f)).length!==0">
                  안녕하세요, 홀리밋입니다^^<br>
                  <span v-if="male.selected.filter(f => male.chosenBy.includes(f)).length > 0">
                    {{male.name}}님과 
                    <template>
                      <span v-for="(num, idx) in male.chosenBy.filter(f => male.selected.includes(f))" :key="num">
                        <span v-if="idx==0">여자 {{ num }}번({{ getPersonName('female', num) }})님</span>
                        <span v-else>, 여자 {{ num }}번({{ getPersonName('female', num) }})님</span>
                      </span>의 채팅방을 개설해드렸습니다.
                    </template>
                    <span><br>추가로 </span>
                  </span>
                  <div v-else></div>
                  <span>
                    <span v-for="(num, idx) in male.chosenBy.filter(f => !male.selected.includes(f))" :key="num">
                      <span v-if="idx==0">여자 {{ num }}번({{ getPersonName('female', num) }})님</span>
                      <span v-else>, 여자 {{ num }}번({{ getPersonName('female', num) }})님</span>
                    </span>의 호감 표시가 들어와, 채팅방 개설 의사를 여쭙고자 연락드립니다.
                  </span>
                  <br>어떻게 진행해드릴까요?
                </div>
                <div v-else>X</div>
              </td>
            </tr>

            <tr v-for="female in females" :key="'analysis-female-'+female.number" class="female-row">
              <td class="female-row">여자 {{ female.number }}번({{ female.name || '' }})
              <br>- {{ female.kakao }}
              </td>
              <td class="female-row">
                <template>
                  <div
                    v-for="num in female.selected"
                    :key="'chosen-by-f-'+female.number+'-'+num"
                    class="chosen-by-item"
                    :title="getPersonName('male', num)"
                  >
                    남자 {{ num }}번({{ getPersonName('male', num) }})
                  </div>
                </template>
              </td>
              <td class="female-row">
                <template v-if="female.chosenBy.length">
                  <div
                    v-for="num in female.chosenBy"
                    :key="'chosen-by-f-'+female.number+'-'+num"
                    class="chosen-by-item"
                    :title="getPersonName('male', num)"
                  >
                    남자 {{ num }}번({{ getPersonName('male', num) }})
                    <br>- {{ getPersonKaKao('male', num) }}
                </div>
                </template>
                <template v-else>
                  -
                </template>
              </td>
              <td class="female-row">
                <div v-if="female.chosenBy.filter(f => !female.selected.includes(f)).length!==0">
                  안녕하세요, 홀리밋입니다^^<br>
                  <span v-if="female.selected.filter(f => female.chosenBy.includes(f)).length > 0">
                    {{female.name}}님과 
                    <template>
                      <span v-for="(num, idx) in female.chosenBy.filter(f => female.selected.includes(f))" :key="num">
                        <span v-if="idx==0">남자 {{ num }}번({{ getPersonName('male', num) }})님</span>
                        <span v-else>, 남자 {{ num }}번({{ getPersonName('male', num) }})님</span>
                      </span>의 채팅방을 개설해드렸습니다.
                      <span><br>추가로 </span>
                    </template>
                  </span>
                  <div v-else></div>
                  <span>
                    <span v-for="(num, idx) in female.chosenBy.filter(f => !female.selected.includes(f))" :key="num">
                      <span v-if="idx==0">남자 {{ num }}번({{ getPersonName('male', num) }})님</span>
                      <span v-else>, 남자 {{ num }}번({{ getPersonName('male', num) }})님</span>
                    </span>의 호감 표시가 들어와, 채팅방 개설 의사를 여쭙고자 연락드립니다.
                  </span>
                  <br>어떻게 진행해드릴까요?
                </div>
                <div v-else>X</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

  </div>
</template>

<script>
class Person {
  constructor(number) {
    this.number = number
    this.name = ''
    this.phone = ''
    this.kakao = ''
    this.selected = []   // 내가 선택한 상대 번호 목록
    this.chosenBy = []   // 나를 선택한 상대 번호 목록
  }
}

export default {
  data() {
    return {
      count: 5,
      males: [],
      females: [],
      isGenerated: false,
      showMutual: false,
      mutualPairs: []
    }
  },
  created() {
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
      this.isGenerated = true
    },
    showMutualSelections() {
      const pairs = []

      // 초기화: 모든 사람의 chosenBy 빈 배열로 초기화
      this.males.forEach(m => m.chosenBy = [])
      this.females.forEach(f => f.chosenBy = [])

      // 서로 선택한 쌍 찾기 및 chosenBy 업데이트
      this.males.forEach(male => {
        male.selected.forEach(femaleNum => {
          const female = this.females.find(f => f.number === femaleNum)
          if (female) {
            // female이 male을 선택했으면 pair 추가
            if (female.selected.includes(male.number)) {
              pairs.push({ male, female })
            }
            // female이 male을 선택했든 안했든, female이 male을 선택한 걸로 표시하지는 않음
            // 단지 female이 male을 선택했으면 male의 chosenBy에 female 번호 추가
            female.chosenBy.push(male.number)  // 이건 반대? female을 male이 선택한 경우가 male.chosenBy?
          }
        })
      })

      // 하지만 위 코드는 chosenBy가 반대 관계로 잘못 들어감. 제대로 넣으려면 아래처럼.

      // 모든 남자에 대해 그를 선택한 여자 번호를 chosenBy에 넣기
      this.males.forEach(male => {
        male.chosenBy = this.females
          .filter(female => female.selected.includes(male.number))
          .map(female => female.number)
      })

      // 모든 여자에 대해 그를 선택한 남자 번호를 chosenBy에 넣기
      this.females.forEach(female => {
        female.chosenBy = this.males
          .filter(male => male.selected.includes(female.number))
          .map(male => male.number)
      })

      this.mutualPairs = pairs
      this.showMutual = true
    },
    getPersonName(gender, number) {
      if (gender === 'male') {
        const person = this.males.find(m => m.number === number)
        return person ? person.name || '이름없음' : '알수없음'
      } else if (gender === 'female') {
        const person = this.females.find(f => f.number === number)
        return person ? person.name || '이름없음' : '알수없음'
      }
      return '알수없음'
    },
    getPersonKaKao(gender, number) {
      if (gender === 'male') {
        const person = this.males.find(m => m.number === number)
        return person ? person.kakao || '카톡없음' : '알수없음'
      } else if (gender === 'female') {
        const person = this.females.find(f => f.number === number)
        return person ? person.kakao || '카톡없음' : '알수없음'
      }
      return '알수없음'
    },
    getPersonHp(gender, number) {
      if (gender === 'male') {
        const person = this.males.find(m => m.number === number)
        return person ? person.hp || '번호없음' : '알수없음'
      } else if (gender === 'female') {
        const person = this.females.find(f => f.number === number)
        return person ? person.hp || '번호없음' : '알수없음'
      }
      return '알수없음'
    },
  }
}
</script>

<style>
#app {
  max-width: 1000px;
  margin: 30px auto;
  font-family: Arial, sans-serif;
  padding: 20px;
  color: #222;
}

/* 제목 스타일 */
h1 {
  font-weight: 900;
  font-size: 2.8rem;
  margin-bottom: 30px;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
}

/* 각 패널 기본 스타일 */
.panel {
  margin-bottom: 20px;
  background: white;
  padding: 20px 24px;
  border-radius: 8px;
  box-shadow: 0 0 8px rgba(0,0,0,0.07);
}

/* 패널 타이틀은 검정색, 볼드, 약간 크기 */
.panel-title {
  color: black;
  font-weight: 700;
  font-size: 1.6rem;
  margin-bottom: 20px;
  border-bottom: 2px solid #ddd;
  padding-bottom: 6px;
}

/* 몇 대 몇 입력 폼 */
.count-form label {
  font-weight: 600;
  font-size: 1.1rem;
  margin-right: 16px;
}

.count-form input[type="number"] {
  width: 80px;
  padding: 6px;
  margin-left: 8px;
  font-size: 1.1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}

/* 버튼 */
button {
  margin-top: 15px;
  padding: 12px 28px;
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  background-color: black;
  border: none;
  color: white;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

button:hover:not(:disabled) {
  background-color: black;
}

button:disabled {
  background-color: #b0b8c1;
  cursor: not-allowed;
}

/* 기본 텍스트 입력 */
input[type="text"] {
  padding: 8px;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 4px;
}

/* 체크박스 */
.checkbox-item {
  margin-bottom: 10px;
  font-size: 1rem;
}
.checkbox-item label {
  display: flex;
  align-items: flex-start;
  gap: 8px; /* 체크박스와 텍스트 사이 간격 */
  cursor: pointer;
}

.checkbox-item input[type="checkbox"] {
  margin-top: 3px; /* 체크박스가 텍스트 위쪽과 맞게 조금 아래로 조정 */
  width: 22px;
  height: 22px;
  cursor: pointer;
  margin-right: 10px;
}

/* 테이블 기본 스타일 */
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 30px;
  table-layout: fixed;
}

thead {
  background-color: #007bff;
  color: white;
}

th, td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;
  vertical-align: top;
  word-break: break-word;
  font-size: 1rem;
}

/* 남자/여자 컬러 */
.male-table thead {
  background-color: #d4edff;
  color: #003e80;
}

.male-table tbody {
  background-color: #f3faff;
}
.female-table thead {
  background-color: #ffe1e8;
  color: #7e0023;
}

.female-table tbody {
  background-color: #fff6f8;
}

/* 번호 열 너비 좁게 */
.male-table td:nth-child(1),
.male-table th:nth-child(1),
.female-table td:nth-child(1),
.female-table th:nth-child(1) {
  width: 50px;
  max-width: 50px;
  padding-left: 8px;
  padding-right: 8px;
  white-space: nowrap;
  font-weight: 700;
}

/* 반응형 지원 */
@media (max-width: 768px) {
  table,
  thead,
  tbody,
  th,
  td,
  tr {
    display: block;
  }

  thead {
    display: none;
  }

  tr {
    margin-bottom: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
  }

  td {
    text-align: left;
    padding: 10px 14px;
    border: none;
    border-bottom: 1px solid #eee;
    position: relative;
  }

  td::before {
    content: attr(data-label);
    font-weight: 700;
    display: block;
    margin-bottom: 4px;
    color: #555;
  }

  .checkbox-item label {
    display: block;
    margin-bottom: 4px;
  }
}
.pair-title {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 10px;
  padding: 6px 12px;
  background-color: #f1ecff; /* 연보라 배경 */
  color: #4b3f72;            /* 진한 보라 텍스트 */
  border-left: 4px solid #a28cff; /* 포인트 바 */
  border-radius: 4px;
}

/* 변경된 상호 선택된 쌍 테이블 스타일 */
.pair-table-wrapper {
  margin-bottom: 30px;
  overflow-x: auto;
}

.pair-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

.pair-table th,
.pair-table td {
  border: 1px solid #ddd;
  padding: 12px 16px;
  text-align: center;
  vertical-align: middle;
  font-size: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 헤더에서 각 컬럼 배경색 (항목, 남자, 여자) - 조금 더 진한색 */
.pair-table thead th:nth-child(1) {
  background-color: #f7f7f7;
}
.pair-table thead th:nth-child(2) {
  background-color: #d4edff;
  color: #003e80;
}
.pair-table thead th:nth-child(3) {
  background-color: #ffe1e8;
  color: #7e0023;
}

.pair-table tbody td:first-child {
  font-weight: 700;
  background-color: #f7f7f7;
}

/* 남자 컬럼 색상 */
.male-col {
  background-color: #f3faff;
  color: #003e80;
}

/* 여자 컬럼 색상 */
.female-col {
  background-color: #fff6f8;
  color: #7e0023;
}

/* '상호 선택된 쌍이 없습니다' 메시지 스타일 */
.no-pairs {
  font-size: 1.1rem;
  color: #666;
  margin-top: 30px;
}

/* 모바일 대응: 가로 스크롤 허용 */
.pair-table-wrapper {
  overflow-x: auto;
}

/* 매칭률 텍스트 */
.match-rate {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 20px;
  color: #222;
}

/* 안내 문구 스타일 */
.refresh-warning {
  margin-top: 12px;
  font-size: 1rem;
  color: #c0392b;
  font-weight: 700;
}
.analysis-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
  font-size: 1rem;
  table-layout: fixed;
}

.analysis-table thead {
  background-color: #555555; /* 헤더 배경, 좀 더 진한 회색 */
  color: white;
  font-weight: 700;
}

.analysis-table th,
.analysis-table td {
  border: 1px solid #ddd;
  padding: 10px 12px;
  text-align: center;
  vertical-align: middle;
  word-break: break-word;
}

.male-row {
  background-color: #d4edff; /* 남자 배경 연한 파란색 */
}

.female-row {
  background-color: #ffe1e8; /* 여자 배경 연한 분홍색 */
}

.analysis-table td:first-child {
  font-weight: 700;
}

.chosen-by-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: center;
}

.chosen-by-item {
  padding: 4px 8px;
  white-space: nowrap;
  cursor: default;
  user-select: none;
}

</style>
