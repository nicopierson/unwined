import { useDispatch } from 'react-redux';
import { removeFavorite } from '../../store/favorite';

import styles from './Favorite.module.css';

const AddFavorite = ({ setIsFavorite, favorite }) => {
    const dispatch = useDispatch();

    const handleUnfavorite = (e) => {
        e.preventDefault();

        dispatch(removeFavorite(favorite.id));
        setIsFavorite(true);
    };
    
    return (
        <i 
            className={`fas fa-heart ${styles.favorite}`}
            onClick={handleUnfavorite}
        ></i>
    )
};

export default AddFavorite;