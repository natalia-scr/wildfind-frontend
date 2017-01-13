import * as types from '../actions/types';
const initialState = {
  loading: false,
  error: null,
  sightings: []
};

export const sightingsReducer = (state = initialState, action) => {
  const newState = {...state};
  switch (action.type) {
    case types.FETCH_SIGHTINGS_REQUEST:
      newState.loading = true;
      break;
    case types.FETCH_SIGHTINGS_SUCCESS:
      newState.sightings = action.payload;
      newState.loading = false;
      break;
    case types.FETCH_SIGHTINGS_ERROR:
      newState.error = action.error;
      newState.loading = false;
      break;
    default:
      return newState;
  }
  return newState;
};
