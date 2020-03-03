import React, { useState } from 'react';
import { connect } from 'react-redux';
import { UserSignup } from '../Actions/ActionCreator';
import { axiosWithAuth } from "../Utils/axiosWithAuth";
import { Link } from 'react-router-dom';
import styled from 'styled-components';
// import logo from '../img/logo.png';

const SignUp = props => {
    const [values, setValues] = useState({
      email: '',
      password: ''
    });
  
    const handleSubmit = evt => {
      evt.preventDefault();
      const userCredentials = {
        username: values.email,
        password: values.password
      };
  
      //wasnt able to get props.history to work inside of an action
      console.log(userCredentials);
      axiosWithAuth().post('https://medcabinet1.herokuapp.com/api/auth/register', userCredentials)
  
      .then(response =>{
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user_id", response.data.id);
        props.history.push("/desktop")
        console.log(response.data)
      })
      .catch(err => console.log(err.response))
    };
  
    const handleChange = evt => {
      evt.preventDefault();
      setValues({
        ...values,
        [evt.target.name]: evt.target.value
      });
    };
  
    return (
      <div>
        <div className='sign-up-container'>
  
          <div className='left'>
            {/* <img src={logo} alt='bestbud logo'/> */}
            <div className='brand'>
              <h2>hollo welcome</h2>
            </div>
            <p>Create your free profile</p>
          </div>
  
          <div className='right'>
            <h2>Sign Up</h2>
  
            <form onSubmit={handleSubmit}>
  
              <label>Username</label>
              <input type='text' name='email' placeholder='Enter a username' value={values.email} onChange={handleChange}/>
  
              <label>Password</label>
              <input type='password' name='password' placeholder='Enter a password' value={values.password} onChange={handleChange} minLength='4'/>
  
              <button type='submit'>Sign Up</button>
            </form>
  
            <Link to='/'>Already have an account? Sign in here.</Link>
          </div>
        </div>
      </div>
    );
  };
  
  const mapStateToProps = state => {
    return {}
  };
  
  export default connect(mapStateToProps, {UserSignup})(SignUp);