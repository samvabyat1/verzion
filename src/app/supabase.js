
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://cebbvkeyapzlohwgvnyh.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlYmJ2a2V5YXB6bG9od2d2bnloIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNzc4NjQ5MiwiZXhwIjoyMDUzMzYyNDkyfQ.l12H0Ox1YXgBexPnGFU1k3gCfAVwZEhFdEPwFtJq_jk'
export const supabase = createClient(supabaseUrl, supabaseKey)
