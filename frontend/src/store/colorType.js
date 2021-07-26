const LOAD = 'colorTypes/LOAD';
const ADD_ONE = 'colorTypes/ADD_ONE';

export const loadColorType = (colorTypes) => ({
  type: LOAD,
  colorTypes,
});

export const addOneColorType = (colorType) => ({
  type: ADD_ONE,
  colorType,
});

export const getColorTypes = () => async dispatch => {
  const res = await fetch(`/api/color-types`);

  const colorTypes = await res.json();
  if (res.ok) {
    dispatch(loadColorType(colorTypes));
  }
  return colorTypes;
};

export const getOneColorType = (id) => async dispatch => {
  const res = await fetch(`/api/color-types/${id}`);

  const colorType = await res.json();
  if (res.ok) {
    dispatch(addOneColorType(colorType));
  }
  return colorType;
};

const sortList = (colorTypes) => {

  colorTypes.sort((a, b) => {
    if (a.color > b.color) {
      return 1;
    }
    if (a.color < b.color) {
      return -1;
    }
    return 0;
  });

  return colorTypes.map(colorType => colorType.id);
};

const initialState = { list: [] };

const colorTypeReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOAD: {
      const allColorType = {};
      action.colorTypes.forEach((colorType) => {
        allColorType[colorType.id] = colorType;
      });
      return { 
        ...allColorType, 
        ...state,
        list: sortList(action.colorTypes) 
      };
    }
    case ADD_ONE: {
      if (!state[action.colorType.id]) {
        const newState = {
          ...state,
          [action.colorType.id]: action.colorType
        };
        const colorTypeList = newState.list.map(id => newState[id]);
        colorTypeList.push(action.colorType);
        newState.list = sortList(colorTypeList);
        return newState;
      }
      return {
        ...state,
        [action.colorType.id]: {
          ...state[action.colorType.id],
          ...action.colorType,
        }
      };
    }
    default:
      return state;
  }
};

export default colorTypeReducer;