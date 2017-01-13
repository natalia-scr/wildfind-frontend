import {expect} from 'chai';
import {sightingsReducer} from '../reducers/sightings';
import * as actions from '../actions/sightings';

describe('sightingsReducer function', () => {
  it('is a function', () => {
    expect(sightingsReducer).to.be.a('function');
  });
  describe('FETCH_SIGHTINGS_REQUEST', () => {
    it('should change loading in state to true', () => {
      const myaction = actions.fetchSightingsRequest();
      const initialState = { loading: false };
      let newState = sightingsReducer(initialState, myaction);
      expect(newState.loading).to.be.true;
    });
  });
  describe('FETCH_SIGHTINGS_ERROR', () => {
    it('should change loading in state to false', () => {
      const myaction = actions.fetchSightingsError({'error': {'code': 400}});
      const initialState = { loading: true, error: null };
      let newState = sightingsReducer(initialState, myaction);
      expect(newState.loading).to.be.false;
    });
    it('should change error to payload', () => {
      const myaction = actions.fetchSightingsError({'error': {'code': 400}});
      const initialState = { loading: true, error: null };
      let newState = sightingsReducer(initialState, myaction);
      expect(newState.error).to.eql({'error': {'code': 400}});
    });
  });
  describe('FETCH_SIGHTINGS_SUCCESS', () => {
    it('should change loading in state to false', () => {
      const myaction = actions.fetchSightingsSuccess([{}]);
      const initialState = { loading: true, sightings: [] };
      let newState = sightingsReducer(initialState, myaction);
      expect(newState.loading).to.be.false;
    });
    it('should change parks to payload', () => {
      const myaction = actions.fetchSightingsSuccess([{name: 'sightings'}]);
      const initialState = { loading: true, sightings: [] };
      let newState = sightingsReducer(initialState, myaction);
      expect(newState.sightings).to.eql([{name: 'sightings'}]);
    });
  });
  describe('CLEAR_SIGHTINGS action', () => {
    it('should clear the sightings', () => {
      const action = actions.clearSightings();
      const initialState = { sightings: [{name: 'sighting'}] };
      let newState = sightingsReducer(initialState, action);
      expect(newState.sightings.length).to.eql(0);
    });
  });
  describe('REMOVE_SIGHTING', () => {
    it('should remove 1 sighting from the sightings array by the given Id', () => {
      const action = actions.removeSighting('22');
      const initialState = { sightings: [{name: 'sighting1', id: '11'}, {name: 'sighting2', id: '22'}] };
      let newState = sightingsReducer(initialState, action);
      expect(newState.sightings).to.eql([{name: 'sighting1', id: '11'}]);
    });
  });
});
