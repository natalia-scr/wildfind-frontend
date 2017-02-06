/* eslint-env node, mocha */
import {expect} from 'chai';
import {parks} from '../reducers/parks';
import * as actions from '../actions/parks';

describe('parks function', () => {
  it('is a function', () => {
    expect(parks).to.be.a('function');
  });
  describe('FETCH_PARKS_REQUEST', () => {
    it('should change loading in state to true', () => {
      const myaction = actions.fetchParksRequest();
      const initialState = { loading: false };
      let newState = parks(initialState, myaction);
      expect(newState.loading).to.be.true;
    });
  });
  describe('FETCH_PARKS_ERROR', () => {
    it('should change loading in state to false', () => {
      const myaction = actions.fetchParksError({'error': {'code': 400}});
      const initialState = { loading: true, error: null };
      let newState = parks(initialState, myaction);
      expect(newState.loading).to.be.false;
    });
    it('shoudld change error to payload', () => {
      const myaction = actions.fetchParksError({'error': {'code': 400}});
      const initialState = { loading: true, error: null };
      let newState = parks(initialState, myaction);
      expect(newState.error).to.eql({'error': {'code': 400}});
    });
  });
  describe('FETCH_PARKS_SUCCESS', () => {
    it('should change loading in state to false', () => {
      const myaction = actions.fetchParksSuccess([{}]);
      const initialState = { loading: true, parks: [] };
      let newState = parks(initialState, myaction);
      expect(newState.loading).to.be.false;
    });
    it('should change parks to payload', () => {
      const myaction = actions.fetchParksSuccess([{name: 'park'}]);
      const initialState = { loading: true, parks: [] };
      let newState = parks(initialState, myaction);
      expect(newState.list).to.eql([{name: 'park'}]);
    });
  });
  describe('SET_CURRENT_PARK', () => {
    it('should set the currentPark', () => {
      const myaction = actions.setCurrentPark(1);
      const initialState = { currentPark: null, list: [{ name: 'Alexandra', _id: 1 }, { name: 'Platt Fields', _id: 2 }] };
      let newState = parks(initialState, myaction);
      expect(newState.currentPark).to.eql({ name: 'Alexandra', _id: 1 });
    });
  });
});
