// import { axiosWithAuth } from "../Utils/axiosWithAuth";
import * as types from "../Actions/ActionType";

// const user = JSON.parse(localStorage.getItem("user"));
//todo add password to localStorage

const initialState = {
  email: "joey@test.com", //todo get from local storage here
  password: "password",
  
};

const combinedReducer = (state = initialState, action) => {
  // console.log(`Reducer state ${state}, action ${action.type}`)s
  // console.log(action.type)
  switch (action.type) {

    case types.SIGN_UP:
      console.log(`Reducer SIGN_UP, ${action.type}`);
      return state;

    case types.LOGIN:
      console.log(`Reducer LOGIN, ${action.type}`);
      return initialState;
      
    case types.GET_CABINET_STRAINS:
        console.log("GET_CABINET_STRAINS");
        return {
          ...state,
          strains: action.payload
        };
    
    // add search, save, delete
    default:
      return state;
  }
};

export default combinedReducer;
