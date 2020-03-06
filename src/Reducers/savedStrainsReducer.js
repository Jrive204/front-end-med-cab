import {
  FETCH_SAVED_STRAINS_START,
  FETCH_SAVED_STRAINS_SUCCESS,
  FETCH_SAVED_STRAINS_FAILURE
} from '../Actions/index';
// Initial state setup
const initialState = {
  savedStrains: [],
  error: '',
  isFetching: false
};


export function savedStrainsReducer(state=initialState, action) {
  switch (action.type) {
    case FETCH_SAVED_STRAINS_START:
      return {
        ...state,
        error: '',
        isFetching: true
      };
    case FETCH_SAVED_STRAINS_SUCCESS:
      console.log(state);
      return {
        ...state,
        error: '',
        isFetching: false,
        savedStrains: action.payload
      };
    case FETCH_SAVED_STRAINS_FAILURE:
      return {
        ...state,
        error: action.payload,
        isFetching: false
      };
    default:
      return state;
  };
};