import * as types from '../actions/types';
const initialState = {
  loading: false,
  error: null,
  list: [],
  currentAnimal: null
};
export const animals = (state = initialState, action) => {
  const newState = {...state};
  switch (action.type) {
    case types.FETCH_ANIMALS_REQUEST:
      newState.loading = true;
      break;
    case types.FETCH_ANIMALS_SUCCESS:
      newState.list = action.payload;
      newState.loading = false;
      break;
    case types.FETCH_ANIMALS_ERROR:
      newState.error = action.error;
      newState.loading = false;
      break;
    case types.SET_CURRENT_ANIMAL:
      newState.currentAnimal = newState.list.filter((animal) => {
        return animal._id === action.payload;
      })[0];
      break;
    default:
      return newState;
  }
  return newState;
};
