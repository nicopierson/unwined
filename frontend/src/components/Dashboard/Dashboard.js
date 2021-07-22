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

  const testPost = {
    name: "Tester wine",
    imageUrl: null,
    description: "Lorum ipsum tester lorum ipsum",
    province: "Andru Valley",
    country: "Austin Texas",
    price: 20,
    rating: 80,
    designation: "Le mealer",
    region_1: "Herm",
    region_2: null,
    userId: 2,
    wineryId: 2,
    colorTypeId: 1,
    wineTypeId: 2,
};


  const editPost = {
    id: 10001,
    name: "San Fran Wine",
    imageUrl: null,
    description: "Lorum ipsum tester lorum ipsum",
    province: "Bay Area",
    country: "San Francisco",
    price: 50,
    rating: 90,
    designation: "Le mealer",
    region_1: "Herm",
    region_2: null,
    userId: 2,
    wineryId: 2,
    colorTypeId: 1,
    wineTypeId: 2,
};

  useEffect(() => {
    dispatch(getWine());
    dispatch(getWinery());
    dispatch(getWineType());
    dispatch(getColorType());
  }, [dispatch]);

  const wines = useSelector((state) => {
    return state.wine.list.map(wineId => state.wine[wineId]);
  });
  const wineries = useSelector(state => state.winery.list.map(wineId => state.winery[wineId]));

  // const getONE = async (id) => {
  //   const wine = await dispatch(getOneWine(id));
  // }

  const handleDelete = () => {
    dispatch(deleteWine(2));
  };

  const handlePost = () => {
    dispatch(createWine(testPost));
  };

  const handlePut = () => {
    dispatch(editWine(editPost));
  };


  return (
    <>
      <h2>Dashboard</h2>
      <h3>{wines[1]?.name}</h3>
      <div>
        <NavLink to={`/wines/add`}>
      
        </NavLink>
      </div>
      {/* <h3>{oneWine?.name}</h3> */}
      <div>
        <button
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
      <div>
        <button
          onClick={handlePost}
        >
          Post
        </button>
      </div>
      <div>
        <button
          onClick={handlePut}
        >
          Edit
        </button>
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