import {expect} from 'chai';
import {parksReducer} from '../reducers/parks';
import * as actions from '../actions/parks';

describe('parksReducer function', () => {
  it('is a function', () => {
    expect(parksReducer).to.be.a('function');
  });
  describe('FETCH_PARKS_REQUEST', () => {
    it('should change loading in state to true', () => {
      const myaction = actions.fetchParksRequest();
      const initialState = { loading: false };
      let newState = parksReducer(initialState, myaction);
      expect(newState.loading).to.be.true;
    });
  });
  describe('FETCH_PARKS_ERROR', () => {
    it('should change loading in state to false', () => {
      const myaction = actions.fetchParksError({"error": {"code": 400}});
      const initialState = { loading: true, error: null };
      let newState = parksReducer(initialState, myaction);
      expect(newState.loading).to.be.false;
    });
    it('shoudld change error to payload', () => {
      const myaction = actions.fetchParksError({"error": {"code": 400}});
      const initialState = { loading: true, error: null };
      let newState = parksReducer(initialState, myaction);
      expect(newState.error).to.eql({"error": {"code": 400}});
    });
  });
  describe('FETCH_PARKS_SUCCESS', () => {
    it('should change loading in state to false', () => {
      const myaction = actions.fetchParksSuccess([{}]);
      const initialState = { loading: true, parks: [] };
      let newState = parksReducer(initialState, myaction);
      expect(newState.loading).to.be.false;
    });
    it('shoudld change parks to payload', () => {
      const myaction = actions.fetchParksSuccess([{name: 'park'}]);
      const initialState = { loading: true, parks: [] };
      let newState = parksReducer(initialState, myaction);
      expect(newState.parks).to.eql([{name: 'park'}]);
    });
  });
});
