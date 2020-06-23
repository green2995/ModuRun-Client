import types from '../action/User/types';

const initailState = {
  user: {
    isFirstLogin: false,
    username: '',
  },
};

const reducer = (state = initailState, action) => {
  const newState = {
    user: { ...state.user },
  };
  if (action.type === types.SET_USER_INFORMATION) {
    newState.user = action.payload;
  }
  return newState;
};

export default reducer;
