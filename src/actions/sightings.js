import * as types from './types';
import request from 'superagent';
import {ROOT} from '../../config';

export const fetchSightings = () => {
  return (dispatch) => {
    dispatch(fetchSightingsRequest());
    request
    .get(`${ROOT}/sightings`)
    .end((err, res) => {
      if (err) dispatch(fetchSightingsError(err));
      else dispatch(fetchSightingsSuccess(res.body));
    });
  };
};

export const fetchSightingsById = (payload) => {
  return (dispatch) => {
    dispatch(fetchSightingsRequest());
    request
    .get(`${ROOT}/sightings?userId=${payload}`)
    .end((err, res) => {
      if (err) dispatch(fetchSightingsError(err));
      else dispatch(fetchSightingsSuccess(res.body));
    });
  };
};

export const fetchSightingsRequest = () => {
  return {
    type: types.FETCH_SIGHTINGS_REQUEST
  };
};
export const fetchSightingsSuccess = (payload) => {
  return {
    type: types.FETCH_SIGHTINGS_SUCCESS,
    payload
  };
};
export const fetchSightingsError = (error) => {
  return {
    type: types.FETCH_SIGHTINGS_ERROR,
    error
  };
};

export const clearSightings = () => {
  return {
    type: types.CLEAR_SIGHTINGS
  };
};

export const removeSighting = (payload) => {
  return {
    type: types.REMOVE_SIGHTING,
    payload
  };
};
