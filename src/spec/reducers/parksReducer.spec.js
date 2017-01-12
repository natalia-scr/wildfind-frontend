import {expect} from 'chai';
import {parksReducer} from '../../reducers/parks';
import * as actions from '../../actions/parks';

describe('parksReducer function', function () {
  it('is a function', function () {
    expect(parksReducer).to.be.a('function');
  });
});
