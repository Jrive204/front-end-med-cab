import * as types from "./ActionType";
import { axiosWithAuth } from "../Utils/axiosWithAuth";

const loginApi = "http://localhost:5000/api/auth/login";
const registerApi = "http://localhost:5000/api/auth/register";

//!! User Signup start here

export const UserSignup = (userData, history) => dispatch => {
  console.log("history", history);
  axiosWithAuth()
    .post(registerApi, userData)
    .then(res => {
      console.log("register", res);
      dispatch({ type: types.SIGN_UP });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", userData.email);
      localStorage.setItem("password", userData.password);
      localStorage.setItem("user_id", res.data.id);

      history.push("/dashboard");
    })
    .catch(error => console.log(error));
};
//!! User Signup end here

//!! User Login && Logout start here
export const UserLogin = ({ email, password, history }) => dispatch => {
  // console.log("User Creds", loginData)
  // console.log(`props`, history)
  const userCredentials = {
    username: email,
    password: password
  };
  axiosWithAuth()
    .post(loginApi, userCredentials)
    .then(res => {
      dispatch({ type: types.LOGIN });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", email);
      localStorage.setItem("password", password);
      localStorage.setItem("user_id", res.data.id);
      // history.push("/Dashboard");
    })
    .catch(err => console.log(err));
};

export const Logout = () => {
  localStorage.removeItem("token");
  return { type: types.LOGOUT };
};

// GET strains list
export const FETCH_STRAINS_START = "FETCH_STRAINS_START";
export const FETCH_STRAINS_SUCCESS = "FETCH_STRAINS_SUCCESS";
export const FETCH_STRAINS_FAILURE = "FETCH_STRAINS_FAILURE";
// GET an array of strain data
export const getStrains = () => {
  return dispatch => {
    dispatch({ type: FETCH_STRAINS_START });
    axiosWithAuth()
      .get("/strains")
      .then(res => {
        console.log('actionCreator',res.data);
        dispatch({ type: FETCH_STRAINS_SUCCESS, payload: res.data });
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: FETCH_STRAINS_FAILURE });  // set error to payload laters
      });
  };
};

//!!get Query_Strains SearchForm.js
// export const queryStrains =(input) => dispatch =>{
//   axiosWithAuth()
//   .post("https://medcabinet1.herokuapp.com/api/strains/query", input)
//   .then(response =>{
//     console.log(response.data);
//     dispatch({ type: types.QUERY_STRAINS, payload: response.data });})
//   .catch(err => console.log(err));
// };
//!! end get Query_Strains

// save strain to user's cabinet
// export const saveStrain = strain_id => dispatch => {
//   const user_id = localStorage.getItem('user_id');

//   axiosWithAuth().post(`https://medcabinet1.herokuapp.com/api/cabinet/${user_id}`, strain_id)
//     .then(response => console.log('strain saved'))
//     .catch(error => console.log(error));
// };
export const fetchCurrentCabinetStrain = strain_name => dispatch => {
  axiosWithAuth().get(`https://medcabinet1.herokuapp.com/api/strains/${strain_name}`)
    .then(res => dispatch({ type: types.UPDATE_CURRENT_CABINET_STRAIN, payload: res.data }))
    .catch(err => console.log(err));
};

