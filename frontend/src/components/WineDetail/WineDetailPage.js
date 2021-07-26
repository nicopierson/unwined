import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { deleteWine } from '../../store/wine';

import styles from './WineDetailPage.module.css';

const WineDetailPage = React.forwardRef(({ setToggleForm }, ref) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { wineId } = useParams();
  const wine = useSelector(state => state.wines[wineId]);

  if (!wine) {
    history.push('/dashboard');
  } 

  const winery = useSelector(state => state.wineries[wine.wineryId] ? state.wineries[wine.wineryId] : 'unknown');
  const wineType = useSelector(state => state.wineTypes[wine.wineTypeId]);

  const handleDelete = async (event) => {
    event.preventDefault();
    const deletedWine = await dispatch(deleteWine(wineId));

    history.push('/dashboard');
  };

  const handleEdit = (event) => {
    event.preventDefault();
    setToggleForm(true);
  };

  return (
    <div className={styles.details_container}>
      <div className={styles.info}>
        <div className={styles.navigation}>
          <i
            onClick={handleEdit}
            className={`fas fa-edit ${styles.edit}`}
          > 
          </i>
          {/* <span
            className={styles.back}
            onClick={() => history.push('/dashboard')}
          > 
            Back
          </span> */}
          <i
            className={`fas fa-minus-circle ${styles.delete}`}
            onClick={handleDelete}
          > 
          </i>
        </div>
        <div className={styles.name}>
          <div className={styles.name_details}>
            <h1 className={styles.wine_name}>{wine.name}</h1>
          </div>
          <div className={styles.card_sub_info}>
            <h3 className={styles.winery}>{winery.name ? winery.name : winery}</h3>
            <h3 className={styles.wine_type}>{wineType.variety}</h3>
            <div className={styles.country}>
              <i className={`fas fa-globe-europe`}></i>
              <span className={styles.country}>{wine.country}</span>
            </div>
          </div>
        </div>
        <div className={`${styles.description_container}`}>
          <h3 className={`${styles.description_info} ${styles.title_info}`}>Description</h3>
          <div className={styles.description}>
            <p className={styles.description_text}>{wine?.description}</p>
          </div>
        </div>
        <div className={styles.details_wrapper}>
          <div className={styles.favorite_container}>
            <i className={`far fa-heart`}></i>
            <span className={styles.favorite}>
              Favorite
            </span>
          </div>
          <div className={styles.rating_container}>
            <div className={styles.rating}>
              <i className={`fas fa-star`}></i>
              <h1 className={styles.rating_text}>{wine.rating}</h1>
              <span className={styles.title_info}>Rating</span>
            </div>
          </div>
          <div className={styles.price_container}>
            <div className={styles.price}>
              <i className={`fas fa-dollar-sign`}></i>
              <h1>{wine.price}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default WineDetailPage;