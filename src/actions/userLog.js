import * as types from './types';
import request from 'superagent';
import {ROOT} from '../../config';

export const fetchUserLog = (payload) => {
    return (dispatch) => {
    dispatch(fetchUserLogRequest());
    request
    .get(`${ROOT}/userlog?user_id=${payload}`)
    .end((err, res) => {
      if (err) dispatch(fetchUserLogError(err));
      else dispatch(fetchUserLogSuccess(res.body.sightings));
    });
  };
};

export const fetchUserLogRequest = () => {
  return {
    type: types.FETCH_USER_LOG_REQUEST
  };
};

export const fetchUserLogError = (error) => {
  return {
    type: types.FETCH_USER_LOG_ERROR,
    error
  };
};

export const fetchUserLogSuccess = (payload) => {
  return {
    type: types.FETCH_USER_LOG_SUCCESS,
    payload
  };
};
