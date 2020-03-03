import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { UserLogin } from '../Actions/ActionCreator';
import styled from 'styled-components';
// import logo from '../img/logo.png';
import { axiosWithAuth } from "../Utils/axiosWithAuth";


const SignIn = props => {
    const [values, setValues] = useState({
      email:"",
      password: ""
    });
  
    const handleSubmit = evt => {
      evt.preventDefault();
      const userCredentials = {
        username: values.email,
        password: values.password
      };
      //wasnt able to get props.history to work inside of an action
      axiosWithAuth().post('https://medcabinet1.herokuapp.com/api/auth/login', userCredentials)
  
      .then(response =>{
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user_id", response.data.id);
        props.history.push("/dashboard")
        console.log(response.data)
      })
      .catch(err => console.log(err.response))
      
    };
    const handleChange = (evt) => {
      evt.preventDefault();
      setValues({
        ...values,
        [evt.target.name]: evt.target.value
      })
    }
  
    return (
      <div>
        {/* <img src={logo} alt='bestbud logo'/> */}
        <h2>Sign In</h2>
  
        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input type='text' name='email' placeholder='Enter a username' value={values.email} onChange={handleChange}/>
  
          <label>Password</label>
          <input type='password' name='password' placeholder='Enter a password' value={values.password} onChange={handleChange}/>
  
          <button type='submit'>Sign In</button>
        </form>
  
        <Link to='/signup'>Dont have an account? Sign up here.</Link>
      </div>
    );
  };
  
  const mapStateToProps = state => {
    return{
      user: state.email,
      passsword: state.password
    }
  };
  
  export default connect(mapStateToProps, {UserLogin})(SignIn);