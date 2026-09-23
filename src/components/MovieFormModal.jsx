import { useState } from 'react'
import RatingLeaves from './RatingLeaves.jsx'
import { youtubeThumbnail } from '../utils.js'

const emptyMovie = {
  title: '',
  originalTitle: '',
  type: 'filme',
  year: '',
  genre: '',
  poster: '',
  youtubeUrl: '',
  watched: false,
  watchedDate: '',
  rating: 0,
  review: '',
  isFavorite: false,
  isDisliked: false,
  lists: [],
}

export default function MovieFormModal({ initialMovie, existingLists, onSave, onClose, onDelete }) {
  const [movie, setMovie] = useState({ ...emptyMovie, ...initialMovie })
  const [newListName, setNewListName] = useState('')
  const isEditing = Boolean(initialMovie)

  function update(field, val) {
    setMovie((m) => ({ ...m, [field]: val }))
  }

  function toggleList(name) {
    setMovie((m) => ({
      ...m,
      lists: m.lists.includes(name) ? m.lists.filter((l) => l !== name) : [...m.lists, name],
    }))
  }

  function addNewList() {
    const name = newListName.trim()
    if (!name) return
    if (!movie.lists.includes(name)) update('lists', [...movie.lists, name])
    setNewListName('')
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!movie.title.trim()) return
    onSave({
      ...movie,
      id: movie.id || `m-${Date.now().toString(36)}`,
      year: movie.year ? Number(movie.year) : '',
      isFavorite: movie.watched ? movie.isFavorite : false,
      isDisliked: movie.watched ? movie.isDisliked : false,
    })
  }

  const preview = movie.poster || youtubeThumbnail(movie.youtubeUrl)

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <form className="modal modal-form" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
        <div className="modal-header">
          <h2>{isEditing ? 'Editar título' : 'Adicionar filme ou série'}</h2>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Fechar">
            ×
          </button>
        </div>

        <div className="form-grid">
          <label className="field field-wide">
            <span>Título</span>
            <input
              required
              value={movie.title}
              onChange={(e) => update('title', e.target.value)}
              placeholder="Ex: A Origem"
            />
          </label>

          <label className="field">
            <span>Tipo</span>
            <select value={movie.type} onChange={(e) => update('type', e.target.value)}>
              <option value="filme">Filme</option>
              <option value="série">Série</option>
            </select>
          </label>

          <label className="field">
            <span>Ano</span>
            <input
              type="number"
              value={movie.year}
              onChange={(e) => update('year', e.target.value)}
              placeholder="2010"
            />
          </label>

          <label className="field">
            <span>Gênero</span>
            <input
              value={movie.genre}
              onChange={(e) => update('genre', e.target.value)}
              placeholder="Terror, drama…"
            />
          </label>

          <label className="field">
            <span>Imagem (URL do pôster, opcional)</span>
            <input
              value={movie.poster}
              onChange={(e) => update('poster', e.target.value)}
              placeholder="https://…"
            />
          </label>

          <label className="field field-wide">
            <span>Link do YouTube (trailer, opcional — usado como imagem se não houver pôster)</span>
            <input
              value={movie.youtubeUrl}
              onChange={(e) => update('youtubeUrl', e.target.value)}
              placeholder="https://youtube.com/watch?v=…"
            />
          </label>

          {preview && (
            <div className="field field-wide">
              <span>Prévia</span>
              <div
                className="form-preview-thumb"
                style={{ backgroundImage: `url(${preview})` }}
              />
            </div>
          )}

          <label className="field field-checkbox field-wide">
            <input
              type="checkbox"
              checked={movie.watched}
              onChange={(e) => update('watched', e.target.checked)}
            />
            <span>Já assisti</span>
          </label>

          {movie.watched && (
            <>
              <label className="field">
                <span>Data que assistiu</span>
                <input
                  type="date"
                  value={movie.watchedDate}
                  onChange={(e) => update('watchedDate', e.target.value)}
                />
              </label>
              <label className="field">
                <span>Avaliação</span>
                <RatingLeaves value={movie.rating} onChange={(v) => update('rating', v)} size={22} />
              </label>
              <label className="field field-wide">
                <span>Resenha / comentário</span>
                <textarea
                  rows={3}
                  value={movie.review}
                  onChange={(e) => update('review', e.target.value)}
                  placeholder="O que achou?"
                />
              </label>
              <div className="field field-wide field-toggle-row">
                <label className="toggle-pill">
                  <input
                    type="checkbox"
                    checked={movie.isFavorite}
                    onChange={(e) => update('isFavorite', e.target.checked)}
                  />
                  <span>★ marcar como favorito</span>
                </label>
                <label className="toggle-pill toggle-pill-dislike">
                  <input
                    type="checkbox"
                    checked={movie.isDisliked}
                    onChange={(e) => update('isDisliked', e.target.checked)}
                  />
                  <span>✕ não curti</span>
                </label>
              </div>
            </>
          )}

          <div className="field field-wide">
            <span>Listas</span>
            <div className="list-chips">
              {existingLists.map((name) => (
                <button
                  type="button"
                  key={name}
                  className={`chip ${movie.lists.includes(name) ? 'is-selected' : ''}`}
                  onClick={() => toggleList(name)}
                >
                  {name}
                </button>
              ))}
            </div>
            <div className="new-list-row">
              <input
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                placeholder="Criar nova lista…"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    addNewList()
                  }
                }}
              />
              <button type="button" className="link-btn" onClick={addNewList}>
                criar
              </button>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          {isEditing && (
            <button
              type="button"
              className="btn btn-danger-ghost"
              onClick={() => onDelete(movie.id)}
            >
              remover
            </button>
          )}
          <button type="submit" className="btn btn-primary">
            {isEditing ? 'salvar alterações' : 'adicionar'}
          </button>
        </div>
      </form>
    </div>
  )
}
