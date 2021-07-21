import { csrfFetch } from './csrf';

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

export const getWine = () => async dispatch => {
  const res = await fetch(`/api/wines`);

  const wines = await res.json();
  if (res.ok) {
    console.log(wines);
    dispatch(loadWine(wines));
  }
  return wines;
};

export const getOneWine = (id) => async dispatch => {
  const res = await fetch(`/api/wines/${id}`);

  const wine = await res.json();
  if (res.ok) {
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

  const deletedWine = await res.json();
  if (res.ok) {
    dispatch(removeWine(id));
  }

  return deletedWine;

};


const sortList = (wines) => {
  return wines.sort((a, b) => {
    return a.name > b.name;
  }).map((wine) => wine.id);
};

const initialState = { list: [] };

const wineReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOAD: {
      const allWine = {};
      action.wines.forEach((wine) => {
        allWine[wine.id] = wine;
      });
      return { 
        ...allWine, 
        ...state,
        list: sortList(action.wines) 
      };
    }
    case ADD_ONE: {
      if (!state[action.wine.id]) {
        const newState = {
          ...state,
          [action.wine.id]: action.wine
        };
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
    default:
      return state;
  }
};

export default wineReducer;