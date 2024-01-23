export interface Movie {
  id: string;
  title: string;
  description: string;
  duration: string;
  releaseDate: string;
  releaseYear: string;
  genres: string[];
  topCast: {name: string, characterName: string}[];
}

export interface MovieListProps {
  movies: Movie[];
}

export interface MovieItemProps {
  movie: Movie;
}
