import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { WFNavigator } from './WFNavigator';

export class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <WFNavigator />
      </Provider>
    );
  }
}
