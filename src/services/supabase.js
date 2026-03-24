import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VUE_APP_SUPABASE_URL || ''
const supabaseKey = process.env.VUE_APP_SUPABASE_KEY || ''

if (!supabaseUrl || !supabaseKey) {
  console.warn('Supabase environment variables not set')
}

export const supabase = createClient(supabaseUrl, supabaseKey)