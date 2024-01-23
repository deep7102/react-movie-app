import MovieItem from '../MovieItem/MovieItem';
import { MovieListProps } from '../../typings';
import './MovieList.css';

function MovieList({ movies }: MovieListProps) {
  if (movies.length === 0) {
    return <p>No results found!</p>;
  }

  return (
    <section className="move-list">
      {movies.map((movie, idx) => (
        <MovieItem key={movie.id || idx} movie={movie} />
      ))}
    </section>
  );
}

export default MovieList;
