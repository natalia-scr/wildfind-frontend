import * as types from './types';
import request from 'superagent';
import {ROOT} from '../../config';

export const fetchParks = () => {
  return (dispatch) => {
    dispatch(fetchParksRequest());
    request
    .get(`${ROOT}/parks`)
    .end((err, res) => {
      if (err) dispatch(fetchParksError(err));
      else dispatch(fetchParksSuccess(res.body));
    });
  };
};

export const fetchParksRequest = () => {
  return {
    type: types.FETCH_PARKS_REQUEST
  };
};
export const fetchParksSuccess = (payload) => {
  return {
    type: types.FETCH_PARKS_SUCCESS,
    payload
  };
};
export const fetchParksError = (error) => {
  return {
    type: types.FETCH_PARKS_ERROR,
    error
  };
};

export const setCurrentPark = (name, id) => {
  return {
    type: types.SET_CURRENT_PARK,
    name,
    id
  };
};
