import * as types from '../actions/types';

const initialState = {
  loading: false,
  name: null,
  error: null,
  userId: null
};
export const user = (state = initialState, action) => {
  const newState = {...state};
  switch (action.type) {
    case types.SET_USER:
      newState.name = action.payload;
      break;
    case types.CREATE_USER_REQUEST:
      newState.loading = true;
      break;
    case types.CREATE_USER_ERROR:
      newState.loading = false;
      newState.error = action.error;
      break;
    case types.CREATE_USER_SUCCESS:
      newState.name = action.payload.name;
      newState.userId = action.payload.id;
      newState.loading = false;
      break;
    default:
      return newState;
  }
  return newState;
};
