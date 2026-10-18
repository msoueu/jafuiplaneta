import { useMemo, useState } from 'react'
import { useCloudState } from './hooks/useCloudState.js'
import { seedMovies, emptyProfile } from './data/seedMovies.js'
import Navbar from './components/Navbar.jsx'
import ProfileHeader from './components/ProfileHeader.jsx'
import HighlightRow from './components/HighlightRow.jsx'
import CommentsFeed from './components/CommentsFeed.jsx'
import NavTabs from './components/NavTabs.jsx'
import MovieGrid from './components/MovieGrid.jsx'
import MovieFormModal from './components/MovieFormModal.jsx'

const initialAppState = {
  movies: seedMovies,
  profile: emptyProfile,
  friendName: 'você',
}

export default function App() {
  const [appState, setAppState, syncStatus] = useCloudState('main', initialAppState)
  const { movies, profile, friendName } = appState

  function setMovies(updater) {
    setAppState((prev) => ({
      ...prev,
      movies: typeof updater === 'function' ? updater(prev.movies) : updater,
    }))
  }

  function setProfile(updater) {
    setAppState((prev) => ({
      ...prev,
      profile: typeof updater === 'function' ? updater(prev.profile) : updater,
    }))
  }

  function setFriendName(updater) {
    setAppState((prev) => ({
      ...prev,
      friendName: typeof updater === 'function' ? updater(prev.friendName) : updater,
    }))
  }

  const [activeTab, setActiveTab] = useState('diario')
  const [query, setQuery] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingMovie, setEditingMovie] = useState(null)
  const [activeList, setActiveList] = useState(null)

  const existingLists = useMemo(() => {
    const names = new Set()
    movies.forEach((m) => (m.lists || []).forEach((l) => names.add(l)))
    return Array.from(names)
  }, [movies])

  const filtered = useMemo(() => {
    if (!query.trim()) return movies
    const q = query.trim().toLowerCase()
    return movies.filter(
      (m) => m.title.toLowerCase().includes(q) || (m.genre || '').toLowerCase().includes(q),
    )
  }, [movies, query])

  const watched = filtered.filter((m) => m.watched)
  const watchlist = filtered.filter((m) => !m.watched)
  const listedMovies = activeList
    ? filtered.filter((m) => (m.lists || []).includes(activeList))
    : []

  const favorites = movies.filter((m) => m.isFavorite)
  const disliked = movies.filter((m) => m.isDisliked)
  const allWatched = movies.filter((m) => m.watched)
  const currentYear = String(new Date().getFullYear())

  const stats = {
    totalWatched: allWatched.length,
    thisYear: allWatched.filter((m) => (m.watchedDate || '').startsWith(currentYear)).length,
    favorites: favorites.length,
    lists: existingLists.length,
  }

  function openAdd() {
    setEditingMovie(null)
    setShowForm(true)
  }

  function openEdit(movie) {
    setEditingMovie(movie)
    setShowForm(true)
  }

  function handleSave(movie) {
    setMovies((prev) => {
      const exists = prev.some((m) => m.id === movie.id)
      return exists ? prev.map((m) => (m.id === movie.id ? movie : m)) : [movie, ...prev]
    })
    setShowForm(false)
  }

  function handleDelete(id) {
    setMovies((prev) => prev.filter((m) => m.id !== id))
    setShowForm(false)
  }

  return (
    <>
      <div className="ambient-bg" style={{ backgroundImage: `url(${profile.background})` }} />
      <div className="ambient-overlay" />

      <div className="app-shell">
        <Navbar
          onAdd={openAdd}
          query={query}
          setQuery={setQuery}
          setProfile={setProfile}
          syncStatus={syncStatus}
        />

        <ProfileHeader
          profile={profile}
          setProfile={setProfile}
          friendName={friendName}
          setFriendName={setFriendName}
          stats={stats}
        />

        <HighlightRow
          title="Favoritos"
          movies={favorites}
          onOpen={openEdit}
          emptyText="Marque até alguns títulos como favoritos (★) ao editá-los — eles aparecem aqui."
        />

        <HighlightRow
          title="Não curti"
          movies={disliked}
          onOpen={openEdit}
          emptyText="O que você assistiu e não gostou aparece aqui, se marcar (✕) ao editar o título."
        />

        <CommentsFeed movies={movies} onOpen={openEdit} />

        <NavTabs active={activeTab} onChange={setActiveTab} />

        {activeTab === 'diario' && (
          <MovieGrid
            movies={watched}
            onOpen={openEdit}
            emptyTitle="Nenhum título assistido ainda"
            emptyText="Tudo que você marcar como 'já assisti' aparece aqui, com folhas e resenha."
            emptyCta={
              <button className="btn btn-primary" onClick={openAdd}>
                + adicionar título
              </button>
            }
          />
        )}

        {activeTab === 'watchlist' && (
          <MovieGrid
            movies={watchlist}
            onOpen={openEdit}
            emptyTitle="Nada na fila"
            emptyText="Guarde aqui o que ainda quer assistir — dá pra marcar como assistido depois."
            emptyCta={
              <button className="btn btn-primary" onClick={openAdd}>
                + adicionar título
              </button>
            }
          />
        )}

        {activeTab === 'listas' && (
          <>
            {existingLists.length === 0 ? (
              <div className="empty-state">
                <h3>Nenhuma lista ainda</h3>
                <p>Crie listas ao adicionar ou editar um título — por tema, maratona ou humor.</p>
              </div>
            ) : (
              <>
                <div className="list-tabs">
                  {existingLists.map((name) => (
                    <button
                      key={name}
                      className={`chip ${activeList === name ? 'is-selected' : ''}`}
                      onClick={() => setActiveList(name === activeList ? null : name)}
                    >
                      {name}
                    </button>
                  ))}
                </div>
                {activeList ? (
                  <MovieGrid
                    movies={listedMovies}
                    onOpen={openEdit}
                    emptyTitle="Lista vazia"
                    emptyText="Nada aqui ainda com esse filtro de busca."
                  />
                ) : (
                  <p style={{ color: 'var(--color-stone)' }}>Escolha uma lista acima para ver os títulos.</p>
                )}
              </>
            )}
          </>
        )}

        {showForm && (
          <MovieFormModal
            initialMovie={editingMovie}
            existingLists={existingLists}
            onSave={handleSave}
            onClose={() => setShowForm(false)}
            onDelete={handleDelete}
          />
        )}
      </div>
    </>
  )
}
