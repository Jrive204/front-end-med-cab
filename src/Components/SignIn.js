import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { UserLogin } from '../Actions/ActionCreator';
import styled from 'styled-components';
import { axiosWithAuth } from "../Utils/axiosWithAuth";


const Background = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgb(126,255,126);
    background: radial-gradient(circle, rgba(126,255,126,1) 0%, rgba(64,204,69,1) 78%, rgba(0,124,8,1) 100%);
`;

const SignInPanel = styled.div`
    border: 1px solid #F5F5F5;
    border-radius: 5px;
    width: 25%;
    min-width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    padding: 20px;
    & form {
        width: 100%;
    }
`;

const Header = styled.h1`
    display: flex;
    justify-content: center;
    align-items: baseline; 
    font-size: 400%;
    font-weight: bold;
    `;

const InputContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin: 10px 0;
`;

const Label = styled.label`
    width: 30%;
`;

const Input = styled.input`
    width: 70%;
    background-color: #F5F5F5;
    border-radius: 8px;
    padding: 8px;
    outline: none;
    font-size: 80%;
    font-family: inherit;
    border: 1px solid white;
    &: hover {
        border: 1px solid cornflowerblue;
    }
`;

const Button = styled.button`
width:100%;
    font-size: 110%;
    margin-top: 20px;
    padding: 8px;
    background-color: #3CB371;
    border: 1px solid white;
    color: white;
    border-radius: 5px;
    &: hover {
        cursor: pointer;
        border: 1px solid #98FB98;
        color: #98FB98;
    }
    &: active {
        background-color: #2E8B57;
        outline: none;
    }
    &: focus {
        outline: none;
    }
`;

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
      <Background>
        <SignInPanel>
          {/* <img src={logo} alt='bestbud logo'/> */}
          <Header>Sign In</Header>
    
          <form onSubmit={handleSubmit}>
            <InputContainer>
              <Label>Username</Label>
              <Input 
                type='text' 
                name='email' 
                placeholder='Enter a username' 
                value={values.email} 
                onChange={handleChange}
              />
            </InputContainer>

            <InputContainer>
              <Label>Password</Label>
              <Input 
                type='password' 
                name='password' 
                placeholder='Enter a password' 
                value={values.password} 
                onChange={handleChange}
              />
            </InputContainer>
            
            <Button type='submit'>Sign In</Button>
          </form>
    
          <Link to='/signup'> Dont have an account? Sign up here. </Link>
        </SignInPanel>
      </Background>
    );
  };
  
  const mapStateToProps = state => {
    return{
      user: state.email,
      passsword: state.password
    }
  };
  
  export default connect(mapStateToProps, {UserLogin})(SignIn);