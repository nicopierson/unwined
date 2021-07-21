import CardBackground from "./CardBackground";
import CardInfo from "./CardInfo";

import styles from './WineCard.module.css';

const WineCard = ({ wine }) => {
  return (
    <div className={styles.card_container}>
      <div className={styles.card}>
        <CardBackground />
        <CardInfo wine={wine}/>
      </div>
    </div>
  );
};

export default WineCard;