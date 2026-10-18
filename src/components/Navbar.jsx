import { useRef } from 'react'
import { compressImage } from '../utils.js'

const STATUS_LABEL = {
  syncing: 'salvando…',
  synced: 'salvo na nuvem',
  offline: 'sem conexão',
  error: 'erro ao salvar',
}

export default function Navbar({ onAdd, query, setQuery, setProfile, syncStatus }) {
  const bgInputRef = useRef(null)

  async function handleBgPick(e) {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const dataUrl = await compressImage(file, 1800, 0.75)
      setProfile((p) => ({ ...p, background: dataUrl }))
    } catch (err) {
      console.error(err)
    } finally {
      e.target.value = ''
    }
  }

  return (
    <header className="navbar">
      <div className="navbar-brand">
        <span className="brand-dots" aria-hidden="true">
          <i className="dot dot-orange" />
          <i className="dot dot-green" />
          <i className="dot dot-blue" />
        </span>
        <p className="wordmark">jafuiplaneta</p>
      </div>

      <input
        className="search-input navbar-search"
        type="search"
        placeholder="Buscar por título ou gênero…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="navbar-actions">
        {syncStatus && syncStatus !== 'local' && (
          <span className={`sync-pill sync-${syncStatus}`}>{STATUS_LABEL[syncStatus]}</span>
        )}
        <button type="button" className="btn btn-ghost" onClick={() => bgInputRef.current?.click()}>
          trocar fundo
        </button>
        <input ref={bgInputRef} type="file" accept="image/*" hidden onChange={handleBgPick} />
        <button className="btn btn-primary" onClick={onAdd}>
          + adicionar
        </button>
      </div>
    </header>
  )
}
