import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; 

import { getWines } from '../../store/wine';
import { getWineries } from '../../store/winery';
import { getWineTypes } from '../../store/wineType';
import { getColorTypes } from '../../store/colorType';
// import { getReviews, loadReviews } from '../../store/review';
import { getUsers } from '../../store/user';

import WineCard from '../WineCard';
import styles from './Dashboard.module.css';

const DashBoard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWines());
    dispatch(getWineries());
    dispatch(getWineTypes());
    dispatch(getColorTypes());
    dispatch(getUsers());
  }, [dispatch]);

  const wines = useSelector((state) => {
    return state.wines.list.map(wineId => state.wines[wineId]);
  });

  // get the wine reviews
  // const wineId = 4;
  // const wineReviews = useSelector((state) => {
  //   const reviewIds = state.wine[wineId].reviews;
  //   return reviewIds.map(id => state.review[id])
  // });
  // console.log(wineReviews);

  return (
    <>
      <h2>Dashboard</h2>
      <div>
        <NavLink to={`/wines/add`}>
          Add Wine
        </NavLink>
      </div>
      <div className={styles.wine_list}>
        { wines && wines.map(wine => (
          wine &&
          <NavLink key={wine.name} to={`/wines/${wine.id}`}>
            <WineCard wineId={wine.id} />
          </NavLink>
        ))}
      </div>
    </>
  );
};

export default DashBoard;