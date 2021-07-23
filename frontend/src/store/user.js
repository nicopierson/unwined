const LOAD = 'users/LOAD';
const ADD_ONE = 'users/ADD_ONE';

export const loadUser = (users) => ({
  type: LOAD,
  users,
});

export const addOneUser = (user) => ({
  type: ADD_ONE,
  user,
});

export const getUsers = () => async dispatch => {
  const res = await fetch(`/api/users`);

  const users = await res.json();
  if (res.ok) {
    dispatch(loadUser(users));
  }
  return users;
};

export const getOneUser = (id) => async dispatch => {
  const res = await fetch(`/api/users/${id}`);

  const user = await res.json();
  if (res.ok) {
    dispatch(addOneUser(user));
  }
  return user;
};

const sortList = (users) => {

  users.sort((a, b) => {
    if (a.username > b.username) {
      return 1;
    }
    if (a.username < b.username) {
      return -1;
    }
    return 0;
  });

  return users.map(user => user.id);
};

const initialState = { list: [] };

const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOAD: {
      const allUser = {};
      action.users.forEach((user) => {
        allUser[user.id] = user;
      });
      return { 
        ...allUser, 
        ...state,
        list: sortList(action.users) 
      };
    }
    case ADD_ONE: {
      if (!state[action.user.id]) {
        const newState = {
          ...state,
          [action.user.id]: action.user
        };
        const userList = newState.list.map(id => newState[id]);
        userList.push(action.user);
        newState.list = sortList(userList);
        return newState;
      }
      return {
        ...state,
        [action.user.id]: {
          ...state[action.user.id],
          ...action.user,
        }
      };
    }
    default:
      return state;
  }
};

export default userReducer;