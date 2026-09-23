import RatingLeaves from './RatingLeaves.jsx'

export default function CommentsFeed({ movies, onOpen }) {
  const reviewed = movies
    .filter((m) => m.watched && m.review?.trim())
    .sort((a, b) => (b.watchedDate || '').localeCompare(a.watchedDate || ''))

  if (reviewed.length === 0) return null

  return (
    <section className="comments-feed">
      <h2 className="section-heading">Comentários</h2>
      <ul className="comments-list">
        {reviewed.map((m) => (
          <li key={m.id} className="comment-item" onClick={() => onOpen(m)}>
            <div className="comment-item-head">
              <span className="comment-item-title">{m.title}</span>
              <RatingLeaves value={m.rating} size={13} readOnly />
            </div>
            <p className="comment-item-text">{m.review}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
