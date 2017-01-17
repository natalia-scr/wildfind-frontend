import React, { Component } from 'react';
import { Loading } from './containers';
import { Provider } from 'react-redux';
import { store } from './store';

export class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <Loading />
      </Provider>
    );
  }
}
