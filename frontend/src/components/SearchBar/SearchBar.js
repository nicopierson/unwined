import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';

import { getOneWine } from '../../store/wine';
import { showSearchWines } from '../../store/wine';

import styles from './SearchBar.module.css';

const SearchBar = ({ setShowModal }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [wines, setWines] = useState([]);

  const searchOnChange = async (event) => {
    event.preventDefault();

    setSearch(event.target.value);
  };

  const enterOnSearch = async (event) => {
    event.preventDefault();

    if (event.key === 'Enter') {
      const attribute = 'name';
      const query = `?attribute=${attribute}&order=asc&page=1&search=${search}`;
      
      history.push(`/dashboard${query}`);
      setShowModal(false);
    }
  };

  useEffect(() => {
    handleSearch()
  }, [search]);

  const handleLink = async (e, id, url) => {
    e.preventDefault();

    await dispatch(getOneWine(id));
    history.push(url)
  };

  const handleSearch = async () => {
    const searchWines = await dispatch(showSearchWines(search));
    setWines(searchWines);
  };

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
        onKeyUp={enterOnSearch}
      />
      <label htmlFor='search'></label>
        <ul>
          { wines.length > 0 && wines.map(wine => (
              <li
                onClick={(e) => handleLink(e, wine.id, `/wines/${wine.id}`)}
                key={wine.id}
                className={styles.search_link}
              >
                {wine.name}
              </li>
            ))
          }
        </ul>
    </div>
  );
};

export default SearchBar;