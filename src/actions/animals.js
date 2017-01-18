import * as types from './types';
import request from 'superagent';
import {ROOT} from '../../config';

export const fetchAnimals = () => {
  return (dispatch) => {
    dispatch(fetchAnimalsRequest());
    request
    .get(`${ROOT}/animals`)
    .end((err, res) => {
      if (err) dispatch(fetchAnimalsError(err));
      else dispatch(fetchAnimalsSuccess(res.body.animals));
    });
  };
};

export const fetchAnimalsRequest = () => {
  return {
    type: types.FETCH_ANIMALS_REQUEST
  };
};
export const fetchAnimalsSuccess = (payload) => {
  return {
    type: types.FETCH_ANIMALS_SUCCESS,
    payload
  };
};
export const fetchAnimalsError = (error) => {
  return {
    type: types.FETCH_ANIMALS_ERROR,
    error
  };
};

export const setCurrentAnimal = (payload) => {
  return {
    type: types.SET_CURRENT_ANIMAL,
    payload
  };
};
