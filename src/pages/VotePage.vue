<script>
import { supabase } from '../services/supabase'

export default {
  methods: {
    async vote(choice) {
      await supabase.from('votes').insert([{ choice }])
      alert('투표 완료')
    }
  }
}
</script>

<template>
  <div>
    <h1>투표하기</h1>
    <button @click="vote('A')">A</button>
    <button @click="vote('B')">B</button>
  </div>
</template>