<script>
import { supabase } from '../services/supabase'

export default {
  name: 'ResultPage',
  data() {
    return {
      result: ''
    }
  },
  async mounted() {
    const { data } = await supabase.from('votes').select('choice')

    const countA = data.filter(v => v.choice === 'A').length
    const countB = data.filter(v => v.choice === 'B').length

    this.result = `A: ${countA} / B: ${countB}`
  }
}
</script>

<template>
  <div>
    <h1>결과</h1>
    <p>{{ result }}</p>
  </div>
</template>