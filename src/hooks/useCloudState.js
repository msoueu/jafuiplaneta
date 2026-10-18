import { useEffect, useRef, useState } from 'react'
import { supabase, isSupabaseConfigured } from '../supabaseClient.js'

const LOCAL_PREFIX = 'jafuiplaneta-state-'
const TABLE = 'app_state'
const SAVE_DELAY = 900

// Guarda o app inteiro (filmes, perfil, nome) sob um único "id" de registro.
// Funciona 100% offline via localStorage; se o Supabase estiver configurado,
// também carrega/salva na nuvem em segundo plano, sem travar a interface.
export function useCloudState(id, initialValue) {
  const [state, setState] = useState(() => {
    try {
      const raw = window.localStorage.getItem(LOCAL_PREFIX + id)
      return raw !== null ? JSON.parse(raw) : initialValue
    } catch (err) {
      console.error('Falha ao ler do localStorage', err)
      return initialValue
    }
  })

  // 'local' | 'syncing' | 'synced' | 'offline' | 'error'
  const [status, setStatus] = useState(isSupabaseConfigured ? 'syncing' : 'local')
  const hasLoadedCloud = useRef(!isSupabaseConfigured)
  const saveTimer = useRef(null)

  // Busca a versão salva na nuvem uma vez, ao abrir o site.
  useEffect(() => {
    if (!isSupabaseConfigured) return
    let cancelled = false

    async function load() {
      const { data, error } = await supabase
        .from(TABLE)
        .select('data')
        .eq('id', id)
        .maybeSingle()

      if (cancelled) return

      if (error) {
        console.error('Erro ao carregar da nuvem', error)
        setStatus('offline')
        hasLoadedCloud.current = true
        return
      }

      if (data?.data) {
        setState(data.data)
      }
      hasLoadedCloud.current = true
      setStatus('synced')
    }

    load()
    return () => {
      cancelled = true
    }
  }, [id])

  // Sempre que o estado muda: salva local na hora, e agenda um salvamento
  // na nuvem (com um pequeno atraso, pra não disparar uma chamada a cada tecla digitada).
  useEffect(() => {
    try {
      window.localStorage.setItem(LOCAL_PREFIX + id, JSON.stringify(state))
    } catch (err) {
      console.error('Falha ao salvar no localStorage', err)
    }

    if (!isSupabaseConfigured || !hasLoadedCloud.current) return

    setStatus('syncing')
    if (saveTimer.current) clearTimeout(saveTimer.current)

    saveTimer.current = setTimeout(async () => {
      const { error } = await supabase
        .from(TABLE)
        .upsert({ id, data: state, updated_at: new Date().toISOString() })

      if (error) {
        console.error('Erro ao salvar na nuvem', error)
        setStatus('error')
      } else {
        setStatus('synced')
      }
    }, SAVE_DELAY)

    return () => clearTimeout(saveTimer.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, id])

  return [state, setState, status]
}
