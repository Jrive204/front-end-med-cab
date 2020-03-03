import {
  FIND_STRAIN_START,
  FIND_STRAIN_SUCCESS,
  FIND_STRAIN_FAILURE
} from '../Actions/index';
// Initial state setup
const initialState = {
  foundStrain: [],
  error: '',
  isFetching: false
};


export function findStrainReducer(state=initialState, action) {
  switch (action.type) {
    case FIND_STRAIN_START:
      return {
        ...state,
        error: '',
        isFetching: true
      };
    case FIND_STRAIN_SUCCESS:
      return {
        ...state,
        error: '',
        isFetching: false,
        foundStrain: action.payload
      };
    case FIND_STRAIN_FAILURE:
      return {
        ...state,
        error: action.payload,
        isFetching: false
      };
    default:
      return state;
  };
};