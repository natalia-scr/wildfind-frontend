import * as types from './types';
import request from 'superagent';
import {ROOT} from '../config';

export const fetchParks = () => {
  return (dispatch) => {
    dispatch({type: types.FETCH_PARKS_REQUEST});
    request
    .get(`${ROOT}/parks`)
    .end((err, res) => {
      if (err) dispatch({type: types.FETCH_PARKS_ERROR, err});
      else dispatch({type: types.FETCH_PARKS_SUCCESS, data: res.body});
    });
  };
};
