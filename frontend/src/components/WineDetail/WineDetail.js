import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { getOneWine } from '../../store/wine';

import styles from './WineDetail.module.css';

const WineDetail = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { wineId } = useParams();
  const wine = useSelector(state => state.wine[wineId]);

  if (!wine) {
    history.push('/dashboard');
  }


  const winery = useSelector(state => state.winery[wine.wineryId]);
  const wineType = useSelector(state => state.wineType[wine.wineTypeId]);
  

  
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
    </div>

  );
};

export default WineDetail;