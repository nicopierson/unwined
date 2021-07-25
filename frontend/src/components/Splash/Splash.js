
import styles from './Splash.module.css';
import mainImgUrl from '../../assets/serge-esteve-unsplash.jpg'

const Splash = () => {

  return (
    <div className={styles.splash_background}>
      <div className={styles.splash_main_container}>
        <div className={styles.splash_main}>
          <div className={styles.splash_left}>
            <img alt='main_wine_image' src={mainImgUrl} />
          </div>
          <div className={styles.splash_right}>

          </div>
        </div>
      </div>
      <div className={styles.find_wine_container}>

      </div>
      <div className={styles.check_ins_container}>

      </div>
      <div className={styles.footer_container}>

      </div>
    </div>
  );
};

export default Splash;