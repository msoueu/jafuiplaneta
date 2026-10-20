import { supabase } from './supabaseClient.js'

// O Supabase exige e-mail para login. Para o usuário só digitar um nome
// (ex: "jafuiplaneta"), o site transforma esse nome num e-mail "de mentira"
// com este domínio. Ele nunca é usado para enviar mensagens.
const EMAIL_DOMAIN = 'jafuiplaneta.app'

export function usernameToEmail(username) {
  const clean = username.trim().toLowerCase().replace(/[^a-z0-9._-]/g, '')
  return `${clean}@${EMAIL_DOMAIN}`
}

export function signInWithUsername(username, password) {
  return supabase.auth.signInWithPassword({
    email: usernameToEmail(username),
    password,
  })
}

export async function signOut() {
  await supabase.auth.signOut()
}
