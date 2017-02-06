/* eslint-env node, mocha */
import {expect} from 'chai';
import {animals} from '../reducers/animals';
import * as actions from '../actions/animals';

describe('animals function', () => {
  it('is a function', () => {
    expect(animals).to.be.a('function');
  });
  describe('FETCH_ANIMALS_REQUEST', () => {
    it('should change loading in state to true', () => {
      const myaction = actions.fetchAnimalsRequest();
      const initialState = { loading: false };
      let newState = animals(initialState, myaction);
      expect(newState.loading).to.be.true;
    });
  });
  describe('FETCH_ANIMALS_ERROR', () => {
    it('should change loading in state to false', () => {
      const myaction = actions.fetchAnimalsError({'error': {'code': 400}});
      const initialState = { loading: true, error: null };
      let newState = animals(initialState, myaction);
      expect(newState.loading).to.be.false;
    });
    it('shoudld change error to payload', () => {
      const myaction = actions.fetchAnimalsError({'error': {'code': 400}});
      const initialState = { loading: true, error: null };
      let newState = animals(initialState, myaction);
      expect(newState.error).to.eql({'error': {'code': 400}});
    });
  });
  describe('FETCH_ANIMALS_SUCCESS', () => {
    it('should change loading in state to false', () => {
      const myaction = actions.fetchAnimalsSuccess([{}]);
      const initialState = { loading: true, animals: [] };
      let newState = animals(initialState, myaction);
      expect(newState.loading).to.be.false;
    });
    it('should change animals to payload', () => {
      const myaction = actions.fetchAnimalsSuccess([{common_name: 'Blackbird'}]);
      const initialState = { loading: true, animals: [] };
      let newState = animals(initialState, myaction);
      expect(newState.list).to.eql([{common_name: 'Blackbird'}]);
    });
  });
  describe('SET_CURRENT_ANIMAL', () => {
    it('should set the currentAnimal', () => {
      const myaction = actions.setCurrentAnimal(1);
      const initialState = { currentAnimal: null, list: [{common_name: 'Blackbird', _id: 1}, {common_name: 'Bluetit', _id: 2}] };
      let newState = animals(initialState, myaction);
      expect(newState.currentAnimal).to.eql({common_name: 'Blackbird', _id: 1});
    });
  });
});
