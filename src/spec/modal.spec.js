/* eslint-env node, mocha */
import {expect} from 'chai';
import {modal} from '../reducers/modal';
import * as actions from '../actions/modal';

describe.only('modal function', () => {
  it('is a function', () => {
    expect(modal).to.be.a('function');
  });
  it('updates the animal info visibility', () => {
    const myaction = actions.setAnimalInfoVisibility(true);
    const initialState = { modalVisible: false };
    let newState = modal(initialState, myaction);
    expect(newState.animalInfoVisible).to.be.true;
  });
  it('updates the sighting info visibility', () => {
    const myaction = actions.setSightingInfoVisibility(true);
    const initialState = { modalVisible: false };
    let newState = modal(initialState, myaction);
    expect(newState.sightingInfoVisible).to.be.true;
  });
  it('updates the confirm save visibility', () => {
    const myaction = actions.setConfirmSaveVisibility(true);
    const initialState = { modalVisible: false };
    let newState = modal(initialState, myaction);
    expect(newState.confirmSaveVisible).to.be.true;
  });
});
