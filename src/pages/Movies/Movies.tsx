import { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMovieById } from '../../services/api';
import { formatDate, formatDuration } from "../../utils";
import { Movie } from '../../typings';
import './Movies.css';

type ImgErrorEvent = React.SyntheticEvent<HTMLImageElement, Event> & { target: {src: string}};

const imagePaths = {
  hero: '/images/movieHeroImages/',
  poster: '/images/moviePosterImages/',
};

const defaultImages = {
  hero: `${imagePaths.hero}defaultImage.jpeg`,
  poster: `${imagePaths.poster}defaultImage.jpeg`,
};

function Movies() {
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);

  const fetchMovie = useCallback(async (signal: AbortSignal) => {
    try {
      setIsLoading(true);
      const response = await getMovieById(id as string, signal);
      setMovie(response);
      setIsLoading(false);
    } catch (error) {
      if ((error as {name: string}).name !== 'AbortError') {
        console.error('Error fetching movie details:', error);
      }
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    fetchMovie(signal);

    return () => {
      abortController.abort();
    };
  }, [id, fetchMovie]);

  if (!id) {
    return <p className="error">Error: Missing movie ID</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!movie) {
    return <p>No results found!</p>;
  }

  return (
    <>
      <section
        className="hero-section"
        style={{
          backgroundImage: `url(${imagePaths.hero}${movie.id}.jpeg), url(${defaultImages.hero})`,
        }}
      >
        <div className="hero-content">
          <h1>{movie.title}</h1>
        </div>
      </section>

      <section className="movie-info-container">
        <figure className="poster">
          <img
            src={`${imagePaths.poster}${movie.id}.jpeg`}
            onError={(e: ImgErrorEvent) =>
              (e.target.src = defaultImages.poster)
            }
            alt={movie.title}
          />
        </figure>
        <div className="content">
          <h2>{movie.title}</h2>
          <p>
            <strong>Genre:</strong> {movie.genres.join(', ')}
          </p>
          <p>{movie.description}</p>
          <p><strong>Duration:</strong> {formatDuration(movie.duration)}</p>
          <p><strong>Release Date:</strong> {formatDate(movie.releaseDate)}</p>

          <figure>
            <figcaption>
              <strong>Top Cast</strong>
            </figcaption>
            <ul>
              {movie.topCast.map((cast, i) => (
                <li key={i}>{cast.name}{cast.characterName && ` (as ${cast.characterName})`}</li>
              ))}
            </ul>
          </figure>
  
          <Link to="/" className="btn">
            Go back to movies list
          </Link>
        </div>
      </section>
    </>
  );
}

export default Movies;
