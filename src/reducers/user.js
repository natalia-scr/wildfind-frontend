import * as types from '../actions/types';

const initialState = {
  loading: false,
  user: null,
  error: null
};
export const userReducer = (state = initialState, action) => {
  const newState = {...state};
  switch (action.type) {
    case types.SET_USER:
      newState.user = action.payload;
      break;
    case types.CREATE_USER_REQUEST:
      newState.loading = true;
      break;
    case types.CREATE_USER_ERROR:
      newState.loading = false;
      newState.error = action.error;
      break;
    case types.CREATE_USER_SUCCESS:
      newState.user = action.payload;
      newState.loading = false;
      break;
    default:
      return newState;
  }
  return newState;
};
