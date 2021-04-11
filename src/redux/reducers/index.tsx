import { combineReducers } from 'redux';
import earthquake from './earthquake';
import earthquakesList from './earthquakes-list';

export default combineReducers({ earthquake, earthquakesList });
