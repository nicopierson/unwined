import styles from './CardBackground.module.css';
import { ReactComponent as WineCardImg } from '../../assets/wine_platter.svg';

const CardBackground = () => {
 return (
    <div className={styles.background}>
      <div className={styles.gradients}>
        <div className={styles.gradient}></div>
      </div>
      <h2 className={styles.logo}>Logo</h2>
      <WineCardImg className={styles.background_img}/>
    </div>
 );
};

export default CardBackground;