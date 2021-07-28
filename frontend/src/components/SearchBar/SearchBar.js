import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { showSearchWines } from '../../store/wine';

import styles from './SearchBar.module.css';

const SearchBar = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');

  const searchOnChange = (e) => setSearch(e.target.value);

  const handleSearch = async () => {
    const wines = await dispatch(showSearchWines('name', search));
    console.log(wines);
  };

  useEffect(() => {
    console.log('handling search...');

    if (search) handleSearch();
  }, [search]);

  return (
    <div
      className={styles.search_container}
    >
      <i className='fas fa-search'></i>
      <input
        value={search}
        type='text'
        placeholder='search'
        name='search'
        id='search'
        onChange={searchOnChange}
      />
      <label htmlFor='search'></label>
    </div>
  );
};

export default SearchBar;