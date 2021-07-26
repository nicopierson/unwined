import { csrfFetch } from './csrf';

const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';

export const setUser = (user) => ({
  type: SET_USER,
  user,
});

export const removeUser = () => ({
  type: REMOVE_USER,
});

export const login = (user) => async dispatch => {

  const { credential, password } = user;

  const res = await csrfFetch('/api/session', {
    method: 'POST',
    // headers: { 'Content-Type': 'application/json' }, // why do we not need this?
    body: JSON.stringify({ credential, password }),
  });

  const data = await res.json();

  if (res.ok) {
    dispatch(setUser(data.user));
  }

  // data will hold the errors
  return data;
};

export const logout = () => async dispatch => {
  const res = await csrfFetch('/api/session', {
    method: 'DELETE',
  });
  dispatch(removeUser());
  return res;
};

export const signup = (user) => async dispatch => {
  const { username, email, password } = user;
  const res = await csrfFetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });

  const data = await res.json();
  if (res.ok) {
    dispatch(setUser(data.user));
  }
  return data;
};

export const restoreUser = () => async dispatch => {
  const res = await csrfFetch('/api/session');
  const data = await res.json();
  dispatch(setUser(data.user));
  return res;
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_USER:
      const newState = { ...state, user: action.user };
      return newState;
    case REMOVE_USER:
      return { ...state, user: null };
    default:
      return state;
  }
};


export default sessionReducer;