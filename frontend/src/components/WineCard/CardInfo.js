import styles from './CardInfo.module.css';

const CardInfo = () => {
  return (
    <div className={styles.info}>
      <div className={styles.name}>
        <div>
          <h1>{`Stag's Leap Wine Cellars 1998 SLV Cabernet Sauvignon (Napa Valley)`}</h1>
          <span className={styles.country}>US</span>
        </div>
        <h3 className={styles.wine_type}>Cabernet Sauvignon</h3>
        <h3 className={styles.winery}>Stag's Leap Wine Cellars</h3>
      </div>
      <div className={styles.description}>
        <h3 className={styles.description_info}>Description</h3>
        <p className={styles.description_text}>{'Certainly one of the successes of the vintage. Packed with cassis, sage, plum, tobacco, earth and smoky oak, and perfectly dry and balanced. Sheer joy in the mouth, like liquid velvet. It changes every second, offering up tiers of flavors through the spicy finish.'}</p>
      </div>
      <div className={styles.points_container}>
        <h1 className={styles.points}>90</h1>
      </div>
      <div className={styles.price}>
        <i className={`fas fa-dollar-sign`}></i>
        <h1>100</h1>.
      </div>
    </div>
  );
};

export default CardInfo;