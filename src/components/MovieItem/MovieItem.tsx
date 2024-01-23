import { Link } from 'react-router-dom';
import { MovieItemProps } from '../../typings';
import './MovieItem.css';

type ImgErrorEvent = React.SyntheticEvent<HTMLImageElement, Event> & { target: {src: string}};
const imagePath = '/images/moviePosterImages/';
const defaultImage = `${imagePath}defaultImage.jpeg`

function MovieItem({ movie }: MovieItemProps) {
  return (
    <div className="movie-card">
      <Link to={`/movies/${movie.id}`} className="poster">
        <figure>
          <img
            src={`${imagePath}${movie.id}.jpeg`}
            onError={(e:ImgErrorEvent) => (e.target.src = defaultImage)}
            alt={movie.title}
          />
        </figure>
      </Link>
      <div className="content">
        <Link to={`/movies/id=${movie.id}`} className="title">{movie.title}</Link>
        <p className="genre">{movie.genres.join(', ')}</p>
      </div>
    </div>
  );
}

export default MovieItem;
