import * as types from './types';

export const setAnimalInfoVisibility = (payload) => {
  return {
    type: types.SET_ANIMALINFO_VISIBILITY,
    payload
  };
};
export const setSightingInfoVisibility = (payload) => {
  return {
    type: types.SET_SIGHTINGINFO_VISIBILITY,
    payload
  };
};
export const setConfirmSaveVisibility = (payload) => {
  return {
    type: types.SET_CONFIRMSAVE_VISIBILITY,
    payload
  };
};
