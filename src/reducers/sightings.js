import * as types from '../actions/types';
const initialState = {
  loading: false,
  error: null,
  saveError: null,
  saveSuccess: false,
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
      newState.list = newState.list.filter((sighting) => {
        return sighting._id !== action.payload;
      });
      break;
    case types.SAVE_SIGHTING_ERROR:
      newState.saveError = action.error;
      break;
    case types.SAVE_SIGHTING_SUCCESS:
      newState.saveSuccess = true;
      break;
    default:
      return newState;
  }
  return newState;
};
