import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(url && key)

// Se as variáveis de ambiente não estiverem configuradas, o app continua
// funcionando 100% no localStorage — o Supabase é só um "upgrade" opcional.
export const supabase = isSupabaseConfigured ? createClient(url, key) : null
