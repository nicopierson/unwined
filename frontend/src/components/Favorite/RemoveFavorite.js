import { useDispatch } from 'react-redux';
import { createFavorite } from '../../store/favorite';

import styles from './Favorite.module.css';

const RemoveFavorite = ({ wineId, userId, setIsFavorite }) => {
    const dispatch = useDispatch();

    const handleFavorite = (e) => {
        e.preventDefault();

        const payload = {
            userId,
            wineId,
        };

        dispatch(createFavorite(payload));
        setIsFavorite(false);
    };

    return (
        <i 
            className={`far fa-heart ${styles.unfavorite}`}
            onClick={handleFavorite}
        ></i>
    )
};

export default RemoveFavorite;