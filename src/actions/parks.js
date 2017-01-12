import { createAction } from 'redux-actions';
import * as types from './types';
import request from 'superagent';

export const fetchParksRequest = () => (
  createAction(types.FETCH_PARKS_REQUEST)()
);
