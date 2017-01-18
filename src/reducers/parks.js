import * as types from '../actions/types';
const initialState = {
  loading: false,
  error: null,
  list: [],
  currentPark: null
};

export const parks = (state = initialState, action) => {
  const newState = {...state};
  switch (action.type) {
    case types.FETCH_PARKS_REQUEST:
      newState.loading = true;
      break;
    case types.FETCH_PARKS_SUCCESS:
      newState.list = action.payload;
      newState.loading = false;
      break;
    case types.FETCH_PARKS_ERROR:
      newState.error = action.error;
      newState.loading = false;
      break;
    case types.SET_CURRENT_PARK:
      newState.currentPark = { id: action.id, name: action.name, lat_lng: action.lat_lng };
      break;
    default:
      return newState;
  }
  return newState;
};
