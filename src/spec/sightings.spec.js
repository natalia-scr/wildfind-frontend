/* eslint-env node, mocha */
import {expect} from 'chai';
import {sightings} from '../reducers/sightings';
import * as actions from '../actions/sightings';

describe.only('sightings function', () => {
  it('is a function', () => {
    expect(sightings).to.be.a('function');
  });
  describe('FETCH_SIGHTINGS_REQUEST', () => {
    it('should change loading in state to true', () => {
      const myaction = actions.fetchSightingsRequest();
      const initialState = { loading: false };
      let newState = sightings(initialState, myaction);
      expect(newState.loading).to.be.true;
    });
  });
  describe('FETCH_SIGHTINGS_ERROR', () => {
    it('should change loading in state to false', () => {
      const myaction = actions.fetchSightingsError({'error': {'code': 400}});
      const initialState = { loading: true, error: null };
      let newState = sightings(initialState, myaction);
      expect(newState.loading).to.be.false;
    });
    it('should change error to payload', () => {
      const myaction = actions.fetchSightingsError({'error': {'code': 400}});
      const initialState = { loading: true, error: null };
      let newState = sightings(initialState, myaction);
      expect(newState.error).to.eql({'error': {'code': 400}});
    });
  });
  describe('FETCH_SIGHTINGS_SUCCESS', () => {
    it('should change loading in state to false', () => {
      const myaction = actions.fetchSightingsSuccess([]);
      const initialState = { loading: true, list: [] };
      let newState = sightings(initialState, myaction);
      expect(newState.loading).to.be.false;
    });
    it('should change sightings to payload', () => {
      const myaction = actions.fetchSightingsSuccess([{name: 'sightings'}]);
      const initialState = { loading: true, list: [] };
      let newState = sightings(initialState, myaction);
      expect(newState.list).to.eql([{name: 'sightings'}]);
    });
  });
  describe('CLEAR_SIGHTINGS action', () => {
    it('should clear the sightings', () => {
      const action = actions.clearSightings();
      const initialState = { list: [{name: 'sighting'}] };
      let newState = sightings(initialState, action);
      expect(newState.list.length).to.eql(0);
    });
  });
  describe('REMOVE_SIGHTING', () => {
    it('should remove 1 sighting from the sightings array by the given Id', () => {
      const action = actions.removeSighting('22');
      const initialState = { list: [{name: 'sighting1', _id: '11'}, {name: 'sighting2', _id: '22'}] };
      let newState = sightings(initialState, action);
      expect(newState.list).to.eql([{name: 'sighting1', _id: '11'}]);
    });
  });
  describe('SAVE_SIGHTING', () => {
    it('should update the state when saveSighting returns an error', () => {
      const action = actions.saveSightingError({'error': {'code': 400}});
      const initialState = { saveError: false };
      let newState = sightings(initialState, action);
      expect(newState.saveError).to.eql({'error': {'code': 400}});
    });
  });
});
