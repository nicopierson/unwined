
import styles from './Splash.module.css';
import mainImgUrl from '../../assets/serge-esteve-unsplash.jpg';
import unWinedLogo from '../../assets/unwined_logo_large.png';
import findWineUrl from '../../assets/oscar-nord-unsplash.jpg';
import checkInUrl from '../../assets/oscar-nord-unsplash.jpg';
import reviewUrl from '../../assets/undraw_reviews.png';

const Splash = () => {

  return (
    <div className={styles.splash_background}>
      <div className={styles.splash_main_container}>
        <div className={styles.splash_main}>
          <div className={styles.grid_wrapper}>
            <div className={styles.logo}>
              <img alt='unwined_logo' src={unWinedLogo} />
              <h2>Sit back and share your favorite wine</h2>
            </div>
            <img alt='main_wine_image' className={styles.wine_img} src={mainImgUrl} />
          </div>
        </div>
      </div>
      <div className={styles.grid_wrapper_inline}>
        <div className={styles.find_wine_container}>
          <img alt='find_wine_image' src={findWineUrl} />
          <div className={styles.find_wine_text}>
            <h2>Discover new wines we think you’ll like</h2>
            <p>Join us on the endless pursuit of great wine.</p>
          </div>
        </div>
      </div>
      <div className={styles.grid_wrapper_inline}>
        <div className={styles.check_ins_container}>
          <div className={styles.check_ins_text}>
            <h2>Find recommendations from fellow wine connoisseurs</h2>
            <p>Learn about different types of wines from every part of the world.</p>
          </div>
          <img alt='check_in_image' src={reviewUrl} />
        </div>
      </div>
    </div>
  );
};

export default Splash;