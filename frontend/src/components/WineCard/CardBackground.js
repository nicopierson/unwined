import styles from './CardBackground.module.css';
// import { ReactComponent as WineCardImg } from '../../assets/wine_platter.svg';
import redWineBottle from '../../assets/wine-bottle-transparent-red.png';

const CardBackground = () => {
 return (
    <div className={styles.background}>
      <div className={styles.gradients}>
        <div className={styles.gradient} color='gray'></div>
      </div>
      <div className={styles.logo}></div>
      <h2 className={styles.logo_text}></h2>
      <img alt='wine_bottle' src={redWineBottle} className={styles.background_img}/>
      {/* <WineCardImg className={styles.background_img}/> */}
      {/* <div className={styles.flag}>
        <i className={`fa fa-flag`}></i>
      </div> */}
    </div>
 );
};

export default CardBackground;