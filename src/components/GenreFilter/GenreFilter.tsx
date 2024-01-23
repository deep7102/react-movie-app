import { GenreFilterProps } from '../../typings';
import './GenreFilter.css';

function GenreFilter({ genres, selectedGenre, onSelectGenre }: GenreFilterProps) {
  return (
    <section className="genre-filter-list">
      <p className="title">Filter by Genre: </p>
      <nav>
        <ul>
          {genres.map((genre) => (
            <li key={genre} value={genre}>
              <button
                onClick={() => onSelectGenre(genre)} className={`btn${selectedGenre === genre ? ' active' : ''}`}>{genre}</button>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}

export default GenreFilter;
