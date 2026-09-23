import { useRef, useState } from 'react'
import { compressImage } from '../utils.js'

export default function ProfileHeader({
  profile,
  setProfile,
  friendName,
  setFriendName,
  stats,
}) {
  const avatarInputRef = useRef(null)
  const [editingName, setEditingName] = useState(false)
  const [nameDraft, setNameDraft] = useState(friendName)
  const [editingStatus, setEditingStatus] = useState(false)
  const [statusDraft, setStatusDraft] = useState(profile.status)

  async function handleAvatarPick(e) {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const dataUrl = await compressImage(file, 500)
      setProfile((p) => ({ ...p, avatar: dataUrl }))
    } catch (err) {
      console.error(err)
    } finally {
      e.target.value = ''
    }
  }

  function saveName() {
    setFriendName(nameDraft.trim() || 'você')
    setEditingName(false)
  }

  function saveStatus() {
    setProfile((p) => ({ ...p, status: statusDraft.trim() }))
    setEditingStatus(false)
  }

  return (
    <section className="profile-header">
      <img className="profile-sticker" src="/img/sticker.jpg" alt="" aria-hidden="true" />
      <div className="profile-main">
        <div className="profile-avatar-wrap">
          <div
            className="profile-avatar"
            style={profile.avatar ? { backgroundImage: `url(${profile.avatar})` } : undefined}
          >
            {!profile.avatar && <span>{friendName.charAt(0).toUpperCase()}</span>}
          </div>
          <button
            type="button"
            className="edit-overlay-btn avatar-edit-btn"
            onClick={() => avatarInputRef.current?.click()}
          >
            editar foto
          </button>
          <input
            ref={avatarInputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handleAvatarPick}
          />
        </div>

        <div className="profile-info">
          {editingName ? (
            <div className="name-edit">
              <input
                autoFocus
                value={nameDraft}
                onChange={(e) => setNameDraft(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && saveName()}
              />
              <button type="button" className="link-btn" onClick={saveName}>
                salvar
              </button>
            </div>
          ) : (
            <div className="profile-name-row">
              <h1 className="profile-name">{friendName}</h1>
              <button type="button" className="btn btn-ghost btn-small" onClick={() => setEditingName(true)}>
                editar perfil
              </button>
            </div>
          )}

          {editingStatus ? (
            <div className="status-edit">
              <input
                autoFocus
                value={statusDraft}
                onChange={(e) => setStatusDraft(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && saveStatus()}
                placeholder="Escreva um status…"
              />
              <button type="button" className="link-btn" onClick={saveStatus}>
                salvar
              </button>
            </div>
          ) : (
            <p className="profile-status" onClick={() => setEditingStatus(true)}>
              {profile.status || 'clique para escrever um status'}
            </p>
          )}
        </div>

        <div className="profile-stats">
          <div className="profile-stat">
            <span className="profile-stat-value">{stats.totalWatched}</span>
            <span className="profile-stat-label">assistidos</span>
          </div>
          <div className="profile-stat">
            <span className="profile-stat-value">{stats.thisYear}</span>
            <span className="profile-stat-label">este ano</span>
          </div>
          <div className="profile-stat">
            <span className="profile-stat-value">{stats.favorites}</span>
            <span className="profile-stat-label">favoritos</span>
          </div>
          <div className="profile-stat">
            <span className="profile-stat-value">{stats.lists}</span>
            <span className="profile-stat-label">listas</span>
          </div>
        </div>
      </div>
    </section>
  )
}
