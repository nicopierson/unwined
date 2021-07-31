import { csrfFetch } from './csrf';
import { LOAD_REVIEW, REMOVE_REVIEW, ADD_REVIEW } from './review';
import { loadWinery, getOneWinery } from './winery';

const LOAD = 'wines/LOAD';
const REMOVE_WINE = 'wines/REMOVE_WINE';
const ADD_ONE = 'wines/ADD_ONE';

export const loadWine = (wines) => ({
  type: LOAD,
  wines
});

export const removeWine = (id) => ({
  type: REMOVE_WINE,
  wineId: id,
});

export const addOneWine = (wine) => ({
  type: ADD_ONE,
  wine,
});

export const showSearchWines = (attribute, string) => async dispatch => {
  const res = await fetch(`/api/wines/search/${attribute}/${string}`);

  const wines = await res.json();
  if (res.ok) {
    // dispatch(loadWine(wines)); // to show, don't need to dispatch
  }
  return wines;
};

export const getSortedWines = (attribute, order) => async dispatch => {
  const res = await fetch(`/api/wines/search-order/${attribute}/${order}`);

  const wines = await res.json();
  if (res.ok) {
    dispatch(loadWinery({}));
    wines.forEach(wine => {
      //? is there a better way to reset winery state in the store
      dispatch(getOneWinery(wine.wineryId));
    });
    dispatch(loadWine(wines));
  }
  return wines;
};

export const getWines = () => async dispatch => {
  const res = await fetch(`/api/wines`);

  const { rows: wines, count } = await res.json();
  if (res.ok) {
    //TODO need to dynamically add wineries when getting wines
    // reset wineries state
    dispatch(loadWinery({}));

    // get all wineries
    wines.map(async (wine) => {
      dispatch(getOneWinery(wine.wineryId));
    });

    dispatch(loadWine(wines));
  }
  return { ...wines, count };
};

export const getOneWine = (id) => async dispatch => {
  const res = await fetch(`/api/wines/${id}`);

  const wine = await res.json();
  if (res.ok) {
    dispatch(getOneWinery(wine.wineryId));
    dispatch(addOneWine(wine));
  }
  return wine;
};

export const createWine = (payload) => async dispatch =>{
  const res = await csrfFetch('/api/wines', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  const newWine = await res.json();
  if(res.ok){
    dispatch(addOneWine(newWine))
  }
 
  return newWine
};

export const editWine = (payload) => async dispatch => {
  const res = await csrfFetch(`/api/wines/${payload.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const editedWine = await res.json();
  if (res.ok) {
    dispatch(addOneWine(editedWine));
  }

  return editedWine;

};

export const deleteWine = (id) => async dispatch => {
  const res = await csrfFetch(`/api/wines/${id}`, {
    method: 'DELETE',
  });

  // can test delete when there is no oncascade delete for reviews
  // same for wines
  const deletedWine = await res.json();
  if (res.ok) {
    dispatch(removeWine(id));
  }

  return deletedWine;

};


const sortList = (wines) => {

  wines.sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    return 0;
  });

  return wines.map(wine => wine.id);
};

const initialState = { list: [] };
// STATE:
// list - array of keys to order
// object - key of id and the values are your objects

const wineReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOAD: {
      const allWine = {};
      action.wines.forEach((wine) => {
        allWine[wine.id] = wine;
      });
      return { 
        ...allWine, 
        //? removed state to reset store for every load
        //...state, // need to reload other instances?
        list: sortList(action.wines),
      };
    }
    case ADD_ONE: {
      if (!state[action.wine.id]) {
        const newState = {
          ...state,
          [action.wine.id]: action.wine
        };
        // Takes care of list
        const wineList = newState.list.map(id => newState[id]);
        wineList.push(action.wine);
        newState.list = sortList(wineList);
        return newState;
      }
      return {
        ...state,
        [action.wine.id]: {
          ...state[action.wine.id],
          ...action.wine,
        }
      };
    }
    case REMOVE_WINE: {
      const newState = { 
        ...state
      };
      const wineList = newState.list.filter(wineId => wineId !== action.wineId);
      newState.list = wineList;
      delete newState[action.wineId];

      return newState;
    }
    case LOAD_REVIEW: {
      return {
        ...state,
        [action.wineId]: {
          ...state[action.wineId],
          reviews: action.reviews.map(review => review.id),
        }
      };
    }
    case REMOVE_REVIEW: {
      return {
        ...state,
        [action.wineId]: {
          ...state[action.wineId],
          reviews: state[action.wineId].reviews.filter(
            (id) => id !== action.reviewId
          ),
        },
      };
    }
    case ADD_REVIEW: {
      //const reviewsList = [...state[action.review.wineId].reviews];
      //reviewsList.push(action.review.id); // push will always add, so edit won't work

      //TODO set the action.review.wineId into another variable to understand the code

      // if exists add new reviewId to array
      if (!state[action.review.wineId].reviews.includes(action.review.id)) {
        return {
          ...state,
          [action.review.wineId]: {
            ...state[action.review.wineId],
            // reviews: reviewsList,
            reviews: [...state[action.review.wineId].reviews, action.review.id],
          },
        };
      }
      // make a copy of state and return
      return {
        ...state,
        [action.review.wineId]: {
          ...state[action.review.wineId],
          reviews: [...state[action.review.wineId].reviews],
        },
      };
    }
    default:
      return state;
  }
};

export default wineReducer;