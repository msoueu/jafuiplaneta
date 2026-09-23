import MovieCard from './MovieCard.jsx'
import EmptyState from './EmptyState.jsx'

export default function MovieGrid({ movies, onOpen, emptyTitle, emptyText, emptyCta }) {
  if (movies.length === 0) {
    return <EmptyState title={emptyTitle} text={emptyText} cta={emptyCta} />
  }
  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onOpen={onOpen} />
      ))}
    </div>
  )
}
