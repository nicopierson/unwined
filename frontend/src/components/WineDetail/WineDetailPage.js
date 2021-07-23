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

  const winery = useSelector(state => state?.wineries[wine?.wineryId]);
  const wineType = useSelector(state => state?.wineTypes[wine?.wineTypeId]);

  const handleDelete = async (event) => {
    event.preventDefault();
    const deletedWine = await dispatch(deleteWine(wineId));
    console.log('Deleted Wine', deletedWine);
    history.push('/dashboard');
  };

  const handleEdit = (event) => {
    event.preventDefault();
    setToggleForm(true);
  };

  return (
    <div>
      <h2>Wine Detail</h2>
        <div className={styles.info}>
          <div className={styles.name}>
            <div className={styles.name_details}>
              <h1 className={styles.text_big}>{wine?.name}</h1>
            </div>
            <div className={styles.card_sub_info}>
              <h3 className={styles.wine_type}>{wineType?.variety}</h3>
              <h3 className={styles.winery}>{winery?.name}</h3>
              <span className={styles.country}>{wine?.country}</span>
            </div>
          </div>
          <div className={`${styles.description_container}`}>
            <h3 className={`${styles.description_info} ${styles.title_info}`}>Description</h3>
          </div>
          <div className={styles.description}>
            <p className={styles.description_text}>{wine?.description}</p>
          </div>
          <div className={styles.rating_container}>
            <span className={styles.title_info}>Rating</span>
            <div className={styles.rating}>
              <h1 className={styles.rating_text}>{wine?.rating}</h1>
              <i className={`fas fa-star`}></i>
            </div>
          </div>
          <div className={styles.price_container}>
            <span className={styles.favorite}>
              <i className={`fab fa-gratipay`}></i>
              Add to Favorites
            </span>
            <div className={styles.price}>
              <i className={`fas fa-dollar-sign`}></i>
              <h1>{wine?.price}</h1>
            </div>
          </div>
        </div>
        <button
          onClick={handleEdit}
        > 
          Edit 
        </button>
        <button
          onClick={() => history.push('/dashboard')}
        > 
          Back
        </button>
        <button
          onClick={handleDelete}
        > 
          Delete
        </button>
    </div>
  );
});

export default WineDetailPage;