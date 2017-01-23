import { modal } from './modal';
import { parks } from './parks';
import { animals } from './animals';
import { sightings } from './sightings';
import { user } from './user';
import { logBook } from './logBook';
import { combineReducers } from 'redux';

export default combineReducers({
  modal,
  parks,
  sightings,
  user,
  logBook,
  animals
});
