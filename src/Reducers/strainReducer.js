// Command name imports
import {
  FETCH_STRAINS_START,
  FETCH_STRAINS_SUCCESS,
  FETCH_STRAINS_FAILURE
} from '../Actions/index';
// Initial state setup
const initialState = {
  strains: [],
  error: '',
  isFetching: false
};


export function strainReducer(state=initialState, action) {
  switch (action.type) {
    case FETCH_STRAINS_START:
      return {
        ...state,
        error: '',
        isFetching: true
      };
    case FETCH_STRAINS_SUCCESS:
      console.log(state);
      return {
        ...state,
        error: '',
        isFetching: false,
        strains: action.payload
      };
    case FETCH_STRAINS_FAILURE:
      return {
        ...state,
        error: action.payload,
        isFetching: false
      };
    default:
      return state;
  };
};