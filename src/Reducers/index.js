export const DATA_START = 'DATA_START';
export const DATA_SUCCESS = 'DATA_SUCCESS';
export const DATA_FAILURE = 'DATA_FAILURE';
export const FORM_CHANGE = 'FORM_CHANGE';
export const RESET_FORM = 'RESET_FORM';
export const EDIT_CHANGE = 'EDIT_CHANGE';
// const uuidv4 = require("uuid/v4");

const setid = window.localStorage.getItem('userID');

const initialState = {
  currentuser: JSON.parse(setid) ?? { id: 3 },
  users: [],
  loggedin: false,
  strainrec: {
    race: '',
    positive_effects: '',
    negative_effects_avoid: '',
    ailments: '',
    flavors: '',
    additional_desired_effects: '',
    user_id: Number
  },
  isloading: false,
  data: [],
  error: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DATA_START:
      return {
        ...state,
        isloading: true
      };
    case DATA_SUCCESS:
      return {
        ...state,
        isloading: false,
        data: action.payload,
        users: action.users
      };
    case DATA_FAILURE:
      return {
        ...state,
        data: action.payload,
        isloading: false
      };
    case FORM_CHANGE:
      return {
        ...state,
        strainrec: {
          ...state.strainrec,
          [action.name]: action.value
        }
      };
    case 'RATE_CHANGE':
      return {
        ...state,
        strainrec: {
          ...state.strainrec,
          daily_rate: {
            ...state.strainrec.rentalPrice,
            [action.name]: action.value
          }
        }
      };

    case RESET_FORM: {
      return {
        ...state,
        strainrec: {
          strainrec_name: '',
          description: '',
          availability: 1,
          daily_rate: '',
          condition: '',
          location: '',
          imgs: ''
        }
      };
    }
    case 'LOGGED_STATUS':
      return {
        ...state,
        loggedin: action.payload
      };
    case 'CURRENT_USER':
      return {
        ...state,
        currentuser: action.payload
      };
    case EDIT_CHANGE:
      return {
        ...state,
        strainrec: {
          ...state.strainrec,
          strainrec_name: action.strainrec_name,
          description: action.description,
          availability: action.availability,
          daily_rate: action.daily_rate,
          condition: action.condition,
          location: action.location,
          imgs: action.img
        }
      };

    default:
      return state;
  }
};
