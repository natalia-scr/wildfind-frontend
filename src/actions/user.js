import * as types from './types';
import request from 'superagent';
import {ROOT} from '../../config';

export const setUser = (payload) => {
  return {
    type: types.SET_USER,
    payload
  };
};
export const createUser = (payload, cb) => {
  return (dispatch) => {
    dispatch(createUserRequest());
    request
    .post(`${ROOT}/adduser`)
    .send({name: payload})
    .end((err, res) => {
      if (err) dispatch(createUserError(err));
      else {
        let user = {};
        user.name = res.body.user.name;
        user.id = res.body.user._id;
        dispatch(createUserSuccess(user));
        cb(user);
      }
    });
  };
};

export const createUserRequest = (payload) => {
  return {
    type: types.CREATE_USER_REQUEST,
    payload
  };
};

export const createUserError = (error) => {
  return {
    type: types.CREATE_USER_ERROR,
    error
  };
};

export const createUserSuccess = (payload) => {
  return {
    type: types.CREATE_USER_SUCCESS,
    payload
  };
};
