import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';

import styles from './SearchBar.module.css';
import stylesInput from './SearchInput.module.css';

const SearchInput = () => {
  const { search: query } = useLocation(); 
  const { search: searchValue } = queryString.parse(query);
  const history = useHistory();
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (searchValue) setSearch(searchValue)
  }, [searchValue]);

  const handleSearchInput = (e) => setSearch(e.target.value);

  const enterOnSearch = async (event) => {
    event.preventDefault();

    if (event.key === 'Enter') {
      const attribute = 'name';
      const query = `?attribute=${attribute}&order=asc&page=1&search=${search}`;
      
      history.push(`/dashboard${query}`);
    }
  };

  return (
    <div
      className={`${styles.search_container} ${stylesInput.search_field}`}
    >
      <i className='fas fa-search'></i>
      <input
        value={search}
        type='text'
        placeholder='Search for a Wine'
        name='search'
        id='search'
        onKeyUp={enterOnSearch}
        onChange={handleSearchInput}
        autoComplete='off'
      />
      <label htmlFor='search'></label>
    </div>
  );
};

export default SearchInput;