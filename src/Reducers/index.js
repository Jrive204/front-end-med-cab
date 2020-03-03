import { combineReducers } from 'redux';
import { strainReducer } from '../Reducers/strainReducer';
import { savedStrainsReducer } from '../Reducers/savedStrainsReducer';
import { findStrainReducer } from '../Reducers/findStrainReducer';

export const rootReducer = combineReducers({
  strainReducer,
  savedStrainsReducer,
  findStrainReducer
});