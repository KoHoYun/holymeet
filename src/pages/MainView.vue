<template>
  <div>
    <h1>메인</h1>
    <router-link to="/vote">투표하러 가기</router-link>
    <br />
    <router-link to="/result">결과 보기</router-link>
  </div>
  
</template>
<script>
export default {
  name: 'HomePage'
}
</script>