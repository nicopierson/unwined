import { csrfFetch } from './csrf';

const SET_ALL_FAVORITES = 'favorites/SET_FAVORITES';
const SET_FAVORITE = 'favorites/ADD_FAVORITE';
const DELETE_FAVORITE = 'favorites/DELETE_FAVORITE';
const UNLOAD_FAVORITES = 'favorites/UNLOAD_FAVORITES';

const setFavorites = (favorites) => ({
    type: SET_ALL_FAVORITES,
    favorites,
});

const addFavorite = (favorite) => ({
    type: SET_FAVORITE,
    favorite,
});

const deleteFavorite = (id) => ({
    type: DELETE_FAVORITE,
    wineId: id,
});

const unloadFavorites = () => ({
    type: UNLOAD_FAVORITES,
});

export const loadFavorite = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/favorites/${id}`);
    
    if (response.ok) {
        const favorite = await response.json();
        dispatch(addFavorite(favorite));
        return favorite;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
};

export const loadFavorites = (userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/favorites/users/${userId}`);
    
    if (response.ok) {
        const { favorites } = await response.json();
        dispatch(setFavorites(favorites))
        return favorites;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
};

export const getAllFavorites = () => async (dispatch) => {
    const response = await csrfFetch('/api/favorites')
    
    if (response.ok) {
        const { favorites } = await response.json();
        return favorites;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
};

export const removeFavorite = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/favorites/${id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        const favorite = await response.json();

        await dispatch(deleteFavorite(favorite.wineId))
        return favorite;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
};

export const createFavorite = (payload) => async (dispatch) => {
    const response = await csrfFetch(`/api/favorites`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });

    if (response.ok) {
        const favorite = await response.json();

        await dispatch(addFavorite(favorite));
        return favorite;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
};

export const resetFavorites = () => async (dispatch) => {
    await dispatch(unloadFavorites());
};


export default function reducer(state = {}, action) {
    let newState = { ...state };
    switch (action.type) {
        case SET_ALL_FAVORITES:
            action.favorites.forEach(favorite => {
                newState[favorite.wineId] = favorite;
            });
            return newState;
        case SET_FAVORITE:
            newState[action.favorite.wineId] = action.favorite;
            return newState;
        case DELETE_FAVORITE:
            delete newState[action.wineId];
            return newState;
        case UNLOAD_FAVORITES:
            newState = {}
            return newState;
        default:
            return newState;
    }
}