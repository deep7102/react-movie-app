import { useState } from 'react';
import { SearchBarProps } from '../../typings';
import './SearchBar.css';

function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  return (
    <div className="search-by-title-container">
      <label htmlFor="search-by-title" className="audible">Search by title</label>
      <input type="text" value={searchTerm} onChange={handleChange} placeholder="Search by title" id="search-by-title" />
    </div>
  );
}

export default SearchBar;
