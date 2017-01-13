import {expect} from 'chai';
import {modalReducer} from '../reducers/modal';
import * as actions from '../actions/modal';

describe('modalReducer function', () => {
  it('is a function', () => {
    expect(modalReducer).to.be.a('function');
  });
  it('updates the modal visibility', () => {
    const myaction = actions.setModalVisibility(true);
    const initialState = { modalVisible: false };
    let newState = modalReducer(initialState, myaction);
    expect(newState.modalVisible).to.be.true;
  });
});
