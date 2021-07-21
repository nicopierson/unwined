import CardBackground from "./CardBackground";
import CardInfo from "./CardInfo";

import styles from './WineCard.module.css';

const WineCard = () => {
  return (
    <div className={styles.card_container}>
      <div className={styles.card}>
        <CardBackground />
        <CardInfo />
      </div>
    </div>
  );
};

export default WineCard;