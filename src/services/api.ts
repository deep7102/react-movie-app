import { Movie } from '../typings/movie.d';

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

// Get all movies
export async function getMovies(signal: AbortSignal): Promise<Movie[]> {
  try {
    const response = await fetch(API_URL, {
      signal,
      headers: { Authorization: API_KEY }
    });
    const data = await response.json();
    return data.data;
  } catch (error) {
    throw new Error('Error fetching movies' + error);
  }
}

// Get single movie by ID
export async function getMovieById(id: string, signal: AbortSignal): Promise<Movie> {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      signal,
      headers: { Authorization: API_KEY }
    });
    const data = await response.json();
    return data.data;
  } catch (error) {
    throw new Error('Error fetching movie details');
  }
}
