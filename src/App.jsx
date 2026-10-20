import { useEffect, useState } from 'react'
import { supabase, isSupabaseConfigured } from './supabaseClient.js'
import { signOut } from './auth.js'
import LoginScreen from './components/LoginScreen.jsx'
import Diary from './Diary.jsx'

// Porta de entrada: se o Supabase estiver configurado, só mostra o diário
// para quem estiver logado. Sem Supabase (modo só-local), abre direto.
export default function App() {
  const [session, setSession] = useState(null)
  const [checking, setChecking] = useState(isSupabaseConfigured)

  useEffect(() => {
    if (!isSupabaseConfigured) return

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setChecking(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  async function handleLogout() {
    await signOut()
    // Apaga a cópia local para os dados não ficarem guardados neste navegador.
    try {
      window.localStorage.removeItem('jafuiplaneta-state-main')
    } catch (err) {
      console.error(err)
    }
  }

  if (!isSupabaseConfigured) return <Diary />
  if (checking) return <div className="boot-screen" aria-busy="true" />
  if (!session) return <LoginScreen />

  return <Diary onLogout={handleLogout} />
}
