import * as types from '../actions/types';

const initialState = {
  loading: false,
  name: null,
  error: null,
  randomSearchMode: false,
  mapNavMode: false,
  lat_lng: null
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
      newState.name = action.payload;
      newState.loading = false;
      break;
    case types.SELECT_RANDOM_SEARCH_MODE:
      newState.randomSearchMode = action.payload;
      break;
    case types.SELECT_MAP_NAV_MODE:
      newState.mapNavMode = action.payload;
      break;
    case types.SET_USER_LOCATION:
      newState.lat_lng = action.payload;
      break;
    default:
      return newState;
  }
  return newState;
};
