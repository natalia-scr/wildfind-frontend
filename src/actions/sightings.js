import * as types from './types';
import request from 'superagent';
import {ROOT} from '../../config';

export const FETCH_SIGHTINGS_REQUEST = () => {
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
