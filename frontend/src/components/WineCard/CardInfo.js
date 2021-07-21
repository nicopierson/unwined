import styles from './CardInfo.module.css';

const CardInfo = (props) => {

  if (!props.wine) {
    return null;
  }

  const { name, description, wineTypeId, country, rating, price, wineryId } = props.wine;

  return (
    <div className={styles.info}>
      <div className={styles.name}>
        <div className={styles.name_details}>
          <h1 className={styles.text_big}>{name}</h1>
        </div>
        <div className={styles.card_sub_info}>
          <h3 className={styles.wine_type}>Cabernet Sauvignon</h3>
          <h3 className={styles.winery}>Herb Lamb Vineyard</h3>
          <span className={styles.country}>{country}</span>
        </div>
      </div>
      <div className={`${styles.description_container}`}>
        <h3 className={`${styles.description_info} ${styles.title_info}`}>Description</h3>
      </div>
      <div className={styles.description}>
        <p className={styles.description_text}>{description}</p>
      </div>
      <div className={styles.rating_container}>
        <span className={styles.title_info}>Rating</span>
        <div className={styles.rating}>
          <h1 className={styles.rating_text}>{rating}</h1>
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
          <h1>{price}</h1>
        </div>
      </div>
    </div>
  );
};

export default CardInfo;