import * as types from '../actions/types';

const initialState = {
  animalInfoVisible: false,
  sightingInfoVisible: false,
  confirmSaveVisible: false
};
export const modal = (state = initialState, action) => {
  const newState = {...state};
  switch (action.type) {
    case types.SET_SIGHTINGINFO_VISIBILITY:
      newState.sightingInfoVisible = action.payload;
      break;
    case types.SET_ANIMALINFO_VISIBILITY:
      newState.animalInfoVisible = action.payload;
      break;
    case types.SET_CONFIRMSAVE_VISIBILITY:
      newState.confirmSaveVisible = action.payload;
      break;
    default:
      return newState;
  }
  return newState;
};
