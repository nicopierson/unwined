import { useState, useEffect } from 'react';
import { NavLink, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; 

import { getWine, deleteWine, createWine, editWine } from '../../store/wine';
import { getWinery } from '../../store/winery';
import { getWineType } from '../../store/wineType';
import { getColorType } from '../../store/colorType';

import WineCard from '../WineCard';
import styles from './Dashboard.module.css';

const DashBoard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWine());
    dispatch(getWinery());
    dispatch(getWineType());
    dispatch(getColorType());
  }, [dispatch]);

  const wines = useSelector((state) => {
    return state.wine.list.map(wineId => state.wine[wineId]);
  });
  // const wineries = useSelector(state => state.winery.list.map(wineId => state.winery[wineId]));

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