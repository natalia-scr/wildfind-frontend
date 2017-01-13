import * as types from './types';

export const setModalVisibility = (payload) => {
  return {
    type: types.SET_MODAL_VISIBILITY,
    payload
  };
};
