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
      newState.sightings = newState.sightings.concat(action.payload);
      newState.loading = false;
      break;
    case types.FETCH_SIGHTINGS_ERROR:
      newState.error = action.error;
      newState.loading = false;
      break;
    case types.CLEAR_SIGHTINGS:
      newState.sightings = [];
      break;
    case types.REMOVE_SIGHTING:
      const index = newState.sightings.findIndex(function (sighting) {
        return sighting.id === action.payload;
      });
      newState.sightings = newState.sightings.slice(0, index).concat(newState.sightings.slice(index + 1));
      break;
    default:
      return newState;
  }
  return newState;
};
