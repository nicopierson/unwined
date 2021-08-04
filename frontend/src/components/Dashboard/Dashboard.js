import { useEffect, useState } from 'react';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; 
import queryString from 'query-string';

import { getWines } from '../../store/wine';
import { getWineTypes } from '../../store/wineType';
import { getColorTypes } from '../../store/colorType';
// import { getReviews, loadReviews } from '../../store/review';
import { getUsers } from '../../store/user';

import WineCard from '../WineCard';
import styles from './Dashboard.module.css';
import Pagination from '../Pagination';
import SearchInput from '../SearchBar/SearchInput';

const DashBoard = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  let { search: query } = useLocation(); 
  if (query === '') query = '?attribute=name&order=desc&page=1';
  const { search: searchQuery, attribute, order, page } = queryString.parse(query);
  const search = searchQuery ? `&search=${searchQuery}` : '';

  const itemsPerPage = 8;
  const pageLimit = 10;
  const [numberOfResults, setNumberOfResults] = useState(0);


  useEffect(() => {
    (async () => {
      const { count } = await dispatch(getWines(query));
      setNumberOfResults(count);
    })();

    dispatch(getWineTypes());
    dispatch(getColorTypes());
    dispatch(getUsers());
  }, [dispatch, query]);

  useEffect(() => {
    if (attribute && order && page) {
      history.push(`/dashboard?attribute=${attribute}&order=${order}&page=${page}${search}`);
    }
  }, [query]);

  const wines = useSelector((state) => {
    return state.wines.list.map(wineId => state.wines[wineId]);
  });

  // get the wine reviews
  // const wineId = 4;
  // const wineReviews = useSelector((state) => {
  //   const reviewIds = state.wine[wineId].reviews;
  //   return reviewIds.map(id => state.review[id])
  // });

  return (
    <div className={styles.dashboard_background}>
      <div className={styles.dashboard_container}>
        <div className={styles.dashboard_top_container}>
          <div className={styles.header}>
            {/* <h2>Dashboard</h2> */}
            <SearchInput searchValue={searchQuery}/>
          </div>
          <NavLink to={`/wines/add`} className={styles.dashboard_add}>
            <i
              className='fas fa-plus-circle'
            >
            </i>
            <span>Add Wine</span>
          </NavLink>
        </div>

        <div className={styles.dashboard_inner_container}>
          <div className={styles.sort_links}>
            <div className={styles.order_link}>
              <NavLink
                to={{
                  pathname: `/dashboard`,
                  search: (!query.includes(`?attribute=name`)
                    || query === `?attribute=name&order=desc&page=${page}${search}`)
                    ? `?attribute=name&order=asc&page=${page}${search}`
                    : `?attribute=name&order=desc&page=${page}${search}`
                }}
                isActive={(match, location) => {
                  if ( location.search === '') return true;
                  if ( !location.search.includes(`?attribute=name&`) ) {
                    return false;
                  }
                  return true;
                }}
                activeStyle={{
                  borderBottom: '3px solid #501B1D',
                }}
                key={`order_link_name`}
                className={styles.order_link}
              >
                Name
              </NavLink>
            </div>
            { (attribute === 'name' && order === 'desc') ?
              <i className='fas fa-sort-up'></i>
              : <i className='fas fa-sort-down'></i>
            }
            <div className={styles.order_link}>
              <NavLink
                to={{
                  pathname: `/dashboard`,
                  search: (!query.includes(`?attribute=rating`)
                    || query === `?attribute=rating&order=desc&page=1${search}`)
                    ? `?attribute=rating&order=asc&page=1${search}`
                    : `?attribute=rating&order=desc&page=1${search}`
                }}
                isActive={(match, location) => {
                  if ( !location.search.includes(`?attribute=rating&`) ) {
                    return false;
                  }
                  return true;
                }}
                activeStyle={{
                  borderBottom: '3px solid #501B1D',
                }}
                key={`order_link_rating`}
                className={styles.order_link}
              >
                Rating
              </NavLink>     
            </div>   
            { (attribute === 'rating' && order === 'desc') ?
              <i className='fas fa-sort-up'></i>
              : <i className='fas fa-sort-down'></i>
            }
            <div className={styles.order_link}>
              <NavLink
                to={{
                  pathname: `/dashboard`,
                  search: (!query.includes(`?attribute=price`)
                    || query === `?attribute=price&order=desc&page=${page}${search}`)
                    ? `?attribute=price&order=asc&page=${page}${search}`
                    : `?attribute=price&order=desc&page=${page}${search}`
                }}
                isActive={(match, location) => {
                  if ( !location.search.includes(`?attribute=price&`) ) {
                    return false;
                  }
                  return true;
                }}
                activeStyle={{
                  borderBottom: '3px solid #501B1D',
                }}
                key={`order_link_price`}
                className={styles.order_link}
              >
                Price
              </NavLink>
            </div>
            { (attribute === 'price' && order === 'desc') ?
              <i className='fas fa-sort-up'></i>
              : <i className='fas fa-sort-down'></i>
            }
            <div className={styles.order_link}>
              <NavLink
                to={{
                  pathname: `/dashboard`,
                  search: (!query.includes(`?attribute=country`)
                    || query === `?attribute=country&order=desc&page=${page}${search}`)
                    ? `?attribute=country&order=asc&page=${page}${search}`
                    : `?attribute=country&order=desc&page=${page}${search}`
                }}
                isActive={(match, location) => {
                  if ( !location.search.includes(`?attribute=country&`) ) {
                    return false;
                  }
                  return true;
                }}
                activeStyle={{
                  borderBottom: '3px solid #501B1D',
                }}
                key={`order_link_country`}
                
              >
                Country
              </NavLink>
            </div>
            { (attribute === 'country' && order === 'desc') ?
              <i className='fas fa-sort-up'></i>
              : <i className='fas fa-sort-down'></i>
            }
            {/* //TODO Wine Type */}
            {/* //? navlink doesn't start on click event before sending to link */}
            {/* <NavLink
              onClick={() => sortOrder === 'desc' ? setSortOrder('asc') : setSortOrder('desc')}
              to={{
                pathname: `/dashboard`,
                search: `?attribute=${attribute}&order=${sortOrder}&page=${page}`
              }}
              key={`order_link_order`}
              className={styles.order_link}
            >
              Order: {sortOrder}
          </div>
          </NavLink> */}
          </div>
        </div>
        <div className={styles.results_found}>
          <p>{numberOfResults} results found</p>
        </div>
      </div>
      <div className={styles.wine_list}>
        { wines && wines.map(wine => (
          wine &&
          <NavLink key={wine.name} to={`/wines/${wine.id}`}>
            <WineCard wineId={wine.id} />
          </NavLink>
        ))}
      </div>
      <Pagination 
        numberOfResults={numberOfResults} 
        itemsPerPage={itemsPerPage} 
        pageLimit={pageLimit}
      />
    </div>
  );
};

export default DashBoard;