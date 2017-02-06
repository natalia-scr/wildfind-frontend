/* eslint-env node, mocha */
import {expect} from 'chai';
import {logBook} from '../reducers/logBook';
import * as actions from '../actions/userLog';

describe('logBook function', () => {
  it('is a function', () => {
    expect(logBook).to.be.a('function');
  });
  describe('FETCH_USER_LOG_REQUEST', () => {
    it('should change loading in state to true', () => {
      const myaction = actions.fetchUserLogRequest();
      const initialState = { loading: false };
      let newState = logBook(initialState, myaction);
      expect(newState.loading).to.be.true;
    });
  });
  describe('FETCH_USER_LOG_ERROR', () => {
    it('should change loading in state to false', () => {
      const myaction = actions.fetchUserLogError({'error': {'code': 400}});
      const initialState = { loading: true, error: null };
      let newState = logBook(initialState, myaction);
      expect(newState.loading).to.be.false;
    });
    it('should change error to payload', () => {
      const myaction = actions.fetchUserLogError({'error': {'code': 400}});
      const initialState = { loading: true, error: null };
      let newState = logBook(initialState, myaction);
      expect(newState.error).to.eql({'error': {'code': 400}});
    });
  });
  describe('FETCH_USER_LOG_SUCCESS', () => {
    it('should change loading in state to false', () => {
      const myaction = actions.fetchUserLogSuccess([{}]);
      const initialState = { loading: true, userLog: [] };
      let newState = logBook(initialState, myaction);
      expect(newState.loading).to.be.false;
    });
    it('should change parks to payload', () => {
      const myaction = actions.fetchUserLogSuccess([{name: 'userLog'}]);
      const initialState = { loading: true, userLog: [] };
      let newState = logBook(initialState, myaction);
      expect(newState.userLog).to.eql([{name: 'userLog'}]);
    });
  });
});
