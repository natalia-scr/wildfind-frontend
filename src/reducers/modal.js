import * as types from '../actions/types';

const initialState = {
  modalVisible: false
};
export const modalsReducer = (state = initialState, action) => {
  const newState = {...state};
  switch (action.type) {
    case types.SET_MODAL_VISIBILITY:
      newState.modalVisible = action.payload;
      break;
    default:
      return newState;
  }
  return newState;
};
