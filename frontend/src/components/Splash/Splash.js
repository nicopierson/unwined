
import styles from './Splash.module.css';
import mainImgUrl from '../../assets/serge-esteve-unsplash.jpg';
import unWinedLogo from '../../assets/unwined_logo_large.png';
import findWineUrl from '../../assets/oscar-nord-unsplash.jpg';
import checkInUrl from '../../assets/oscar-nord-unsplash.jpg';

const Splash = () => {

  return (
    <div className={styles.splash_background}>
      <div className={styles.splash_main_container}>
        <div className={styles.splash_main}>
          <div className={styles.grid_wrapper}>
            <div className={styles.logo}>
              <img alt='unwined_logo' src={unWinedLogo} />
              <h2>Discover and share your favorite wine.</h2>
            </div>
            <img alt='main_wine_image' className={styles.wine_img} src={mainImgUrl} />
          </div>
        </div>
      </div>
      <div className={styles.grid_wrapper_inline}>
        <div className={styles.find_wine_container}>
          <img alt='find_wine_image' src={findWineUrl} />
        </div>
      </div>
      <div className={styles.grid_wrapper_inline}>
        <div className={styles.check_ins_container}>
          <img alt='check_in_image' src={checkInUrl} />
        </div>
      </div>
      <div className={styles.footer_container}>

      </div>
    </div>
  );
};

export default Splash;