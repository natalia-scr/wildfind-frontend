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
      newState.currentPark = newState.list.filter((park) => {
        return park._id === action.payload;
      })[0];
      break;
    default:
      return newState;
  }
  return newState;
};
