import * as types from './types';
import request from 'superagent';
import {ROOT} from '../../config';

export const fetchSightings = (payload) => {
  return (dispatch) => {
    dispatch(fetchSightingsRequest());
    request
    .get(`${ROOT}/sightings?park=${payload}`)
    .end((err, res) => {
      if (err) dispatch(fetchSightingsError(err));
      else dispatch(fetchSightingsSuccess(res.body.sightings));
    });
  };
};

export const fetchSightingsById = (payload) => {
  return (dispatch) => {
    dispatch(fetchSightingsRequest());
    request
    .get(`${ROOT}/animalsightings?animal_id=${payload}`)
    .end((err, res) => {
      if (err) dispatch(fetchSightingsError(err));
      else dispatch(fetchSightingsSuccess(res.body.sightings));
    });
  };
};

export const saveSighting = (payload) => {
  return (dispatch) => {
    dispatch(saveSightingRequest());
    request
    .post(`${ROOT}/addsighting`)
    .send(payload)
    .end((err, res) => {
      if (err) dispatch(saveSightingError(err));
      else dispatch(saveSightingSuccess());
    });
  };
};

export const saveSightingRequest = (payload) => {
  return {
    type: types.SAVE_SIGHTING_REQUEST,
    payload
  };
};

export const saveSightingError = (error) => {
  return {
    type: types.SAVE_SIGHTING_ERROR,
    error
  };
};

export const saveSightingSuccess = () => {
  return {
    type: types.SAVE_SIGHTING_SUCCESS
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
