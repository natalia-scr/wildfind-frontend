import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import {LoginScreen} from './containers';
import {WelcomeScreen} from './containers';

export class App extends Component {
  constructor () {
    super();
    this.state = {
      user: null
    };
  }
  renderComponent (Component) {
    return (
      <Provider store={store}>
        <Component />
      </Provider>
    );
  }
  render () {
    return this.state.user === null ? this.renderComponent(<LoginScreen />) : this.renderComponent(<WelcomeScreen />);
  }
}
