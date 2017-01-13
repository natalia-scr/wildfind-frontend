import {expect} from 'chai';
import {animalsReducer} from '../reducers/animals';
import * as actions from '../actions/animals';

describe('animalsReducer function', () => {
  it('is a function', () => {
    expect(animalsReducer).to.be.a('function');
  });
  describe('FETCH_ANIMALS_REQUEST', () => {
    it('should change loading in state to true', () => {
      const myaction = actions.fetchAnimalsRequest();
      const initialState = { loading: false };
      let newState = animalsReducer(initialState, myaction);
      expect(newState.loading).to.be.true;
    });
  });
  describe('FETCH_ANIMALS_ERROR', () => {
    it('should change loading in state to false', () => {
      const myaction = actions.fetchAnimalsError({'error': {'code': 400}});
      const initialState = { loading: true, error: null };
      let newState = animalsReducer(initialState, myaction);
      expect(newState.loading).to.be.false;
    });
    it('shoudld change error to payload', () => {
      const myaction = actions.fetchAnimalsError({'error': {'code': 400}});
      const initialState = { loading: true, error: null };
      let newState = animalsReducer(initialState, myaction);
      expect(newState.error).to.eql({'error': {'code': 400}});
    });
  });
  describe('FETCH_ANIMALS_SUCCESS', () => {
    it('should change loading in state to false', () => {
      const myaction = actions.fetchAnimalsSuccess([{}]);
      const initialState = { loading: true, animals: [] };
      let newState = animalsReducer(initialState, myaction);
      expect(newState.loading).to.be.false;
    });
    it('should change animals to payload', () => {
      const myaction = actions.fetchAnimalsSuccess([{name: 'bird'}]);
      const initialState = { loading: true, animals: [] };
      let newState = animalsReducer(initialState, myaction);
      expect(newState.animals).to.eql([{name: 'bird'}]);
    });
  });
  describe('SET_CURRENT_ANIMAL', () => {
    it('should set the currentAnimal', () => {
      const myaction = actions.setCurrentAnimal('bird', 1);
      const initialState = { currentAnimal: null };
      let newState = animalsReducer(initialState, myaction);
      expect(newState.currentAnimal).to.eql({name: 'bird', id: 1});
    });
  });
});
