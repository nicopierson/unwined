import { useState } from 'react';

import styles from './SearchBar.module.css';

const SearchBar = () => {
  const [search, setSearch] = useState('');

  const handleSearch = () => {
    console.log('handling search...')
  };

  return (
    <div
      className={styles.search_container}
    >
      <i className='fas fa-search'></i>
      <input
        value={search}
        placeholder='search'
        name='search'
        id='search'
        type='text'
        onChange={handleSearch}
      >
      </input>
      <label htmlFor='search'></label>
    </div>
  );
};

export default SearchBar;