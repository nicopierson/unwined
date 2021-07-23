import { useSelector } from 'react-redux';

import styles from './CardInfo.module.css';

const CardInfo = ({ wineId }) => {
  const wine = useSelector(state => state.wines[wineId])
  const winery = useSelector(state => state.wineries[wine.wineryId]);
  const wineType = useSelector(state => state.wineTypes[wine.wineTypeId]);

  return (
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
          Favorite
        </span>
        <div className={styles.price}>
          <i className={`fas fa-dollar-sign`}></i>
          <h1>{wine?.price}</h1>
        </div>
      </div>
    </div>
  );
};

export default CardInfo;