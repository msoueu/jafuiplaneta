const TABS = [
  { key: 'perfil', label: 'Perfil' },
  { key: 'diario', label: 'Diário' },
  { key: 'watchlist', label: 'Quero assistir' },
  { key: 'listas', label: 'Listas' },
]

export default function NavTabs({ active, onChange }) {
  return (
    <nav className="nav-tabs" aria-label="Navegação do perfil">
      {TABS.map((tab) => (
        <button
          key={tab.key}
          className={`nav-tab ${active === tab.key ? 'is-active' : ''}`}
          onClick={() => onChange(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  )
}
