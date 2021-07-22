const LOAD = 'wineTypes/LOAD';
const ADD_ONE = 'wineTypes/ADD_ONE';

export const loadWineType = (wineTypes) => ({
  type: LOAD,
  wineTypes,
});

export const addOneWineType = (wineType) => ({
  type: ADD_ONE,
  wineType,
});

export const getWineType = () => async dispatch => {
  const res = await fetch(`/api/wine-types`);

  const wineTypes = await res.json();
  if (res.ok) {
    dispatch(loadWineType(wineTypes));
  }
  return wineTypes;
};

export const getOneWineType = (id) => async dispatch => {
  const res = await fetch(`/api/wine-types/${id}`);

  const wineType = await res.json();
  if (res.ok) {
    dispatch(addOneWineType(wineType));
  }
  return wineType;
};

const sortList = (wineTypes) => {

  wineTypes.sort((a, b) => {
    if (a.variety > b.variety) {
      return 1;
    }
    if (a.variety < b.variety) {
      return -1;
    }
    return 0;
  });

  return wineTypes.map(wineType => wineType.id);
};

const initialState = { list: [] };

const wineTypeReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOAD: {
      const allWineType = {};
      action.wineTypes.forEach((wineType) => {
        allWineType[wineType.id] = wineType;
      });
      return { 
        ...allWineType, 
        ...state,
        list: sortList(action.wineTypes) 
      };
    }
    case ADD_ONE: {
      if (!state[action.wineType.id]) {
        const newState = {
          ...state,
          [action.wineType.id]: action.wineType
        };
        const wineTypeList = newState.list.map(id => newState[id]);
        wineTypeList.push(action.wineType);
        newState.list = sortList(wineTypeList);
        return newState;
      }
      return {
        ...state,
        [action.wineType.id]: {
          ...state[action.wineType.id],
          ...action.wineType,
        }
      };
    }
    default:
      return state;
  }
};

export default wineTypeReducer;