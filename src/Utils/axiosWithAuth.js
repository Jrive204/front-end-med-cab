import axios from 'axios';

export const axiosWithAuth = () => {
  const token = localStorage.getItem("token",);
  const email = localStorage.getItem('email');
  const password = localStorage.getItem('password');
  return axios.create({
    baseUrl: 'https://medcabinet1.herokuapp.com/api/',
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
      email: email,
      password: password,
     
    }
  });
};