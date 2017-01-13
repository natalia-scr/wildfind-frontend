import * as types from '../actions/types';
const initialState = {
  loading: false,
  userLog: [],
  error: null
};
export const userLogReducer = (state = initialState, action) => {
  const newState = {...state};
  switch (action.type) {
    case types.FETCH_USER_LOG_REQUEST:
      newState.loading = true;
      break;
    case types.FETCH_USER_LOG_ERROR:
      newState.loading = false;
      newState.error = action.error;
      break;
    case types.FETCH_USER_LOG_SUCCESS:
      newState.userLog = action.payload;
      newState.loading = false;
      break;
    default:
      return newState;
  }
  return newState;
};
