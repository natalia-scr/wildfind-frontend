/* eslint-env node, mocha */
import {expect} from 'chai';
import {userReducer} from '../reducers/user';
import * as actions from '../actions/user';

describe('userReducer function', () => {
  it('is a function', () => {
    expect(userReducer).to.be.a('function');
  });
  describe('CREATE_USER_REQUEST', () => {
    it('should change loading in state to true', () => {
      const myaction = actions.createUserRequest();
      const initialState = { loading: false };
      let newState = userReducer(initialState, myaction);
      expect(newState.loading).to.be.true;
    });
  });
  describe('CREATE_USER_ERROR', () => {
    it('should change loading in state to false', () => {
      const myaction = actions.createUserError({'error': {'code': 400}});
      const initialState = { loading: true, error: null };
      let newState = userReducer(initialState, myaction);
      expect(newState.loading).to.be.false;
    });
    it('should change error to payload', () => {
      const myaction = actions.createUserError({'error': {'code': 400}});
      const initialState = { loading: true, error: null };
      let newState = userReducer(initialState, myaction);
      expect(newState.error).to.eql({'error': {'code': 400}});
    });
  });
  describe('CREATE_USER_SUCCESS', () => {
    it('should change loading in state to false', () => {
      const myaction = actions.createUserSuccess([{}]);
      const initialState = { loading: true, user: [] };
      let newState = userReducer(initialState, myaction);
      expect(newState.loading).to.be.false;
    });
    it('should change parks to payload', () => {
      const myaction = actions.createUserSuccess([{name: 'user'}]);
      const initialState = { loading: true, user: [] };
      let newState = userReducer(initialState, myaction);
      expect(newState.user).to.eql([{name: 'user'}]);
    });
  });
});
