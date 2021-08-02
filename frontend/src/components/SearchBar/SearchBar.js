import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { showSearchWines } from '../../store/wine';

import styles from './SearchBar.module.css';

const SearchBar = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [wines, setWines] = useState([]);

  const searchOnChange = (e) => setSearch(e.target.value);

  
  useEffect(() => {
    console.log('handling search...');
    
    handleSearch()
  }, [search]);

  const handleSearch = async () => {
    const searchWines = await dispatch(showSearchWines('name', search));
    setWines(searchWines);
  };
  
  console.log(wines);
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
      <ul>
        { wines.length > 0 && wines.map(wine => (
            <li
              className='search_link'
              key={wine.id}
            >{wine.name}</li>
          ))
        }
      </ul>
      {/* <ul>
        <li>
          Hello
        </li>
      </ul> */}
    </div>
  );
};

export default SearchBar;