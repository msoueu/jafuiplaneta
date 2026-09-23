import RatingLeaves from './RatingLeaves.jsx'
import { titleToHue, youtubeThumbnail } from '../utils.js'

export default function MovieCard({ movie, onOpen }) {
  const hue = titleToHue(movie.title)
  const thumb = movie.poster || youtubeThumbnail(movie.youtubeUrl)

  return (
    <button className="movie-card" onClick={() => onOpen(movie)}>
      <div
        className="movie-poster"
        style={
          thumb
            ? { backgroundImage: `url(${thumb})` }
            : {
                background: `linear-gradient(160deg, hsl(${hue} 30% 22%), hsl(${hue} 40% 12%))`,
              }
        }
      >
        {!thumb && <span className="movie-poster-initial">{movie.title.charAt(0)}</span>}
        <span className={`movie-type-tag ${movie.type === 'série' ? 'is-serie' : ''}`}>
          {movie.type}
        </span>
        {!movie.poster && movie.youtubeUrl && <span className="yt-badge">▶</span>}
        {movie.isFavorite && <span className="fav-badge" title="Favorito">★</span>}
        {movie.isDisliked && <span className="dislike-badge" title="Não curtiu">✕</span>}
      </div>
      <div className="movie-card-body">
        <p className="movie-card-title">{movie.title}</p>
        <p className="movie-card-meta">{movie.year || '—'}</p>
        {movie.watched ? (
          <RatingLeaves value={movie.rating} size={14} readOnly />
        ) : (
          <span className="pill pill-watchlist">quero assistir</span>
        )}
      </div>
    </button>
  )
}
