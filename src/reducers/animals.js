import * as types from '../actions/types';
const initialState = {
  loading: false,
  error: null,
  animals: [],
  currentAnimal: null
};
export const animalsReducer = (state = initialState, action) => {
  const newState = {...state};
  switch (action.type) {
    case types.FETCH_ANIMALS_REQUEST:
      newState.loading = true;
      break;
    case types.FETCH_ANIMALS_SUCCESS:
      newState.animals = action.payload;
      newState.loading = false;
      break;
    case types.FETCH_ANIMALS_ERROR:
      newState.error = action.error;
      newState.loading = false;
      break;
    case types.SET_CURRENT_ANIMAL:
      newState.currentAnimal = { id: action.id, name: action.name };
    default:
      return newState;
  }
  return newState;
};
