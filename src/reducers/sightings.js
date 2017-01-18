import * as types from '../actions/types';
const initialState = {
  loading: false,
  error: null,
  saveError: null,
  list: []
};

export const sightings = (state = initialState, action) => {
  const newState = {...state};
  switch (action.type) {
    case types.FETCH_SIGHTINGS_REQUEST:
      newState.loading = true;
      break;
    case types.FETCH_SIGHTINGS_SUCCESS:
      newState.list = newState.list.concat(action.payload);
      newState.loading = false;
      break;
    case types.FETCH_SIGHTINGS_ERROR:
      newState.error = action.error;
      newState.loading = false;
      break;
    case types.CLEAR_SIGHTINGS:
      newState.list = [];
      break;
    case types.REMOVE_SIGHTING:
      const index = newState.list.findIndex(function (sighting) {
        return sighting.id === action.payload;
      });
      newState.list = newState.list.slice(0, index).concat(newState.list.slice(index + 1));
      break;
    case types.SAVE_SIGHTING_ERROR:
      newState.saveError = action.error;
      break;
    default:
      return newState;
  }
  return newState;
};
