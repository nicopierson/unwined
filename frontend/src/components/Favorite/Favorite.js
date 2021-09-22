import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import AddFavorite from './AddFavorite';
import RemoveFavorite from './RemoveFavorite';
import { loadFavorites, resetFavorites } from '../../store/favorite';

import './Favorite.css';

const Favorite = ({ wineId }) => {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.session.user?.id);

    /* isFavorite Boolean to check if current user favorites wine */
    const favorite = useSelector(state => state?.favorites[+wineId]);
    const [isFavorite, setIsFavorite] = useState(!!favorite);

    useEffect(() => {
        if (+wineId) {
            setIsFavorite(!!favorite);
        }
    }, [favorite, wineId]);

    useEffect(() => {
        if (userId) {
            dispatch(resetFavorites());
            dispatch(loadFavorites(userId));
        }
    }, [dispatch]);

    
    return (
        <button className={`wine-util__btn`}>
            {isFavorite &&
                <AddFavorite 
                    setIsFavorite={setIsFavorite}
                    favorite={favorite}
                />
            }
            {!isFavorite &&
                <RemoveFavorite 
                    setIsFavorite={setIsFavorite}
                    wineId={+wineId}
                    userId={userId}
                />
            }
        </button>
    )
};

export default Favorite;