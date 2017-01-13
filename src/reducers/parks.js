import * as types from '../actions/types';
const initialState = {
  loading: false,
  error: null,
  parks: [],
  currentPark: null
};

export const parksReducer = (state = initialState, { type, payload }) => {
  const newState = {...state};
  switch (type) {
    case types.FETCH_PARKS_REQUEST:
      newState.loading = true;
      break;
    case types.FETCH_PARKS_SUCCESS:
      newState.parks = payload;
      newState.loading = false;
      break;
    case types.FETCH_PARKS_ERROR:
      newState.error = payload;
      newState.loading = false;
      break;
    default:
      return newState;
  }
  return newState;
};
