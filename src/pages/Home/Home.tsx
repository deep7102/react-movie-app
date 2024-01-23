import { useState, useEffect, useCallback, useRef } from 'react';
import { getMovies } from '../../services/api';
import { debounce } from '../../utils';
import { Movie } from '../../typings';
import MovieList from '../../components/MovieList/MovieList';
import SearchBar from '../../components/SearchBar/SearchBar';
import GenreFilter from '../../components/GenreFilter/GenreFilter';
import Pagination from '../../components/Pagination/Pagination';
import './Home.css';

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    fetchMovies();
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMovies = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    try {
      setIsLoading(true);
      const response = await getMovies(abortController.signal);
      setMovies(response);
      setFilteredMovies(response);
      updateGenres(response);
      setIsLoading(false);
    } catch (error) {
      if ((error as {name: string}).name !== 'AbortError') {
        console.error('Error fetching movies:', error);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    filterMovies(term, selectedGenre);
  };

  const handleSearchDebounced = debounce((term: string | unknown) => {
    handleSearch(term as string);
  }, 300);

  const updateGenres = (moviesList: Movie[]) => {
    const genresList = [... new Set(moviesList.map(m => m.genres).flat())];
    setGenres([...new Set(['All', ...genresList])]);
  };

  const handleGenreChange = (genre: string) => {
    setSelectedGenre(genre);
    filterMovies(searchTerm, genre);
  };

  const filterMovies = (search: string, genre: string) => {
    const filtered = movies.filter((movie: Movie) => {
      const titleMatches = movie.title.toLowerCase().includes(search.toLowerCase());
      const genreMatches = genre === 'All' || movie.genres.includes(genre);
      return titleMatches && genreMatches;
    });
    setFilteredMovies(filtered);
    setCurrentPage(1); // Reset to the first page when applying filters
  };

  const handleItemsPerPageChange = (value: string) => {
    const newItemsPerPage = parseInt(value, 10);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to the first page when changing items per page
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMovies = filteredMovies.slice(indexOfFirstItem, indexOfLastItem);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <section className="home-section">
      <section className="content-top">
        <h1>Movies: Explore your movie information.</h1>
        <SearchBar onSearch={handleSearchDebounced} />
      </section>
      
      <GenreFilter genres={genres} selectedGenre={selectedGenre} onSelectGenre={handleGenreChange} />
      <MovieList movies={currentMovies} />

      <Pagination
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        lastIndex={indexOfLastItem}
        total={filteredMovies.length}
        setCurrentPage={setCurrentPage}
        handleItemsPerPageChange={handleItemsPerPageChange}
      />
    </section>
  );
}

export default Home;