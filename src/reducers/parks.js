import * as types from '../actions/types';
const initialState = {
  loading: false,
  parks: [],
  currentPark: null
};
export const parksReducer = (state = initialState, { type, payload }) => {
  const newState = Object.assign({}, state);
  switch (type) {
    case types.FETCH_PARKS_REQUEST:
      newState.loading = true;
      break;
    case types.FETCH_PARKS_SUCCESS:
      newState.parks = payload;
      break;
    case types.FETCH_PARKS_ERROR:
      return payload;
    default:
      return newState;
  }
};
