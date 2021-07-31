import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; 

import { getWines, getSortedWines } from '../../store/wine';
import { getWineTypes } from '../../store/wineType';
import { getColorTypes } from '../../store/colorType';
// import { getReviews, loadReviews } from '../../store/review';
import { getUsers } from '../../store/user';

import WineCard from '../WineCard';
import SearchBar from '../SearchBar';
import styles from './Dashboard.module.css';
import Pagination from '../Pagination';

const DashBoard = () => {
  const { search: queryString } = useLocation(); 
  const dispatch = useDispatch();
  const itemsPerPage = 8;
  const pageLimit = 10;
  
  const [numberOfResults, setNumberOfResults] = useState(0);

  useEffect(() => {
    (async () => {
      const { count } = await dispatch(getWines(queryString));
      setNumberOfResults(count);
    })();

    dispatch(getWineTypes());
    dispatch(getColorTypes());
    dispatch(getUsers());
  }, [dispatch, queryString]);

  const wines = useSelector((state) => {
    return state.wines.list.map(wineId => state.wines[wineId]);
  });

  // get the wine reviews
  // const wineId = 4;
  // const wineReviews = useSelector((state) => {
  //   const reviewIds = state.wine[wineId].reviews;
  //   return reviewIds.map(id => state.review[id])
  // });

  const sortDashboard = (e, attribute, order) => {
    e.preventDefault();

    dispatch(getSortedWines(attribute, order))
  };

  return (
    <div className={styles.dashboard_background}>
      <div className={styles.dashboard_container}>
        <div className={styles.dashboard_inner_container}>
          <div className={styles.header}>
            <h2>Dashboard</h2>
          </div>
          <NavLink to={`/wines/add`} className={styles.dashboard_add}>
            <i
              className='fas fa-plus-circle'
            >
            </i>
          </NavLink>
        </div>
        <div className={styles.dashboard_inner_container}>
          <SearchBar />
        </div>
        <div className={`${styles.sort_links} ${styles.dashboard_inner_container}`}>
          <span>Sort By:</span>
          <span
            onClick={(e) => sortDashboard(e, 'name', 'asc')}
          >
            All
          </span>
          <span
            onClick={(e) => sortDashboard(e, 'rating', 'desc')}
          >
            Rating
          </span>
          <span
            onClick={(e) => sortDashboard(e, 'price', 'asc')}
          >
            Price
          </span>
          <span
            onClick={(e) => sortDashboard(e, 'wineType')}
          >
            Wine Type
          </span>
          <span
            onClick={(e) => sortDashboard(e, 'country', 'asc')}
          >
            Country
          </span>
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