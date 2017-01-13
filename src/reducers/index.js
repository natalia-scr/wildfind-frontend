import { modalsReducer } from './modals';
import { parksReducer } from './parks';
import { animalsReducer } from './animals';
import { sightingsReducer } from './sightings';
import { userReducer } from './user';
import { combineReducers } from 'redux';

export default combineReducers({
  modalsReducer,
  parksReducer,
  sightingsReducer,
  userReducer,
  animalsReducer
});
