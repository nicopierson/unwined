import { csrfFetch } from './csrf';

const LOAD = 'wineries/LOAD';
const REMOVE_WINERY = 'wineries/REMOVE_WINERY';
const ADD_ONE = 'wineries/ADD_ONE';

export const loadWinery = (wineries) => ({
  type: LOAD,
  wineries
});

// this does not work - need to fix the associations
export const removeWinery = (id) => ({
  type: REMOVE_WINERY,
  wineryId: id,
});

export const addOneWinery = (winery) => ({
  type: ADD_ONE,
  winery,
});

export const getWinery = () => async dispatch => {
  const res = await fetch(`/api/wineries`);

  const wineries = await res.json();
  if (res.ok) {
    dispatch(loadWinery(wineries));
  }
  return wineries;
};

export const getOneWinery = (id) => async dispatch => {
  const res = await fetch(`/api/wineries/${id}`);

  const winery = await res.json();
  if (res.ok) {
    dispatch(addOneWinery(winery));
  }
  return winery;
};

export const createWinery = (payload) => async dispatch =>{
  const res = await csrfFetch('/api/wineries', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  const newWinery = await res.json();
  if(res.ok){
    dispatch(addOneWinery(newWinery))
  }
 
  return newWinery
};

export const editWinery = (payload) => async dispatch => {
  const res = await csrfFetch(`/api/wineries/${payload.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const editedWinery = await res.json();
  if (res.ok) {
    dispatch(addOneWinery(editedWinery));
  }

  return editedWinery;

};

export const deleteWinery = (id) => async dispatch => {
  const res = await csrfFetch(`/api/wineries/${id}`, {
    method: 'DELETE',
  });

  const deletedWinery = await res.json();
  if (res.ok) {
    dispatch(removeWinery(id));
  }

  return deletedWinery;

};


const sortList = (wineries) => {

  wineries.sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    return 0;
  });

  return wineries.map(wine => wine.id);
};

const initialState = { list: [] };

const wineryReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOAD: {
      const allWinery = {};
      action.wineries.forEach((winery) => {
        allWinery[winery.id] = winery;
      });
      return { 
        ...allWinery, 
        ...state,
        list: sortList(action.wineries) 
      };
    }
    case ADD_ONE: {
      if (!state[action.winery.id]) {
        const newState = {
          ...state,
          [action.winery.id]: action.winery
        };
        const wineryList = newState.list.map(id => newState[id]);
        wineryList.push(action.winery);
        newState.list = sortList(wineryList);
        return newState;
      }
      return {
        ...state,
        [action.winery.id]: {
          ...state[action.winery.id],
          ...action.winery,
        }
      };
    }
    case REMOVE_WINERY: {
      const newState = { 
        ...state
      };
      const wineryList = newState.list.filter(wineryId => wineryId !== action.wineryId);
      newState.list = wineryList;
      delete newState[action.wineryId];

      return newState;
    }
    default:
      return state;
  }
};

export default wineryReducer;