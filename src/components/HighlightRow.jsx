import MovieCard from './MovieCard.jsx'

export default function HighlightRow({ title, movies, onOpen, emptyText }) {
  return (
    <section className="highlight-row">
      <h2 className="section-heading">{title}</h2>
      {movies.length === 0 ? (
        <p className="highlight-empty">{emptyText}</p>
      ) : (
        <div className="movie-grid movie-grid-compact">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onOpen={onOpen} />
          ))}
        </div>
      )}
    </section>
  )
}
