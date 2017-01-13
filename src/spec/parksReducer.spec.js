import {expect} from 'chai';
import {parksReducer} from '../reducers/parks';
import * as actions from '../actions/parks';

describe('parksReducer function', function () {
  it('is a function', function () {
    expect(parksReducer).to.be.a('function');
  });
  it('handles action fetchParksRequest correctly', function () {
    const myaction = actions.fetchParksRequest();
    const initialState = { loading: false };
    let newState = parksReducer(initialState, myaction);
    expect(newState.loading).to.be.true;
  });
});
