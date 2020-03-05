import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Background = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgb(126,255,126);
    background: radial-gradient(circle, rgba(126,255,126,1) 0%, rgba(64,204,69,1) 78%, rgba(0,124,8,1) 100%);
`;

const SignUpPanel = styled.div`
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

const SignUp = props => {
    const [newUser, setNewUser] = useState ({
        username: '',
        password: '',
        email: ''
    });
    const [emptyValues, setValueStatus] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();
        let emptyInputs = false;
        Object.values(newUser).forEach(value => {
            if (value === "") {
                emptyInputs = true;
            }
        })

        if (emptyInputs) {
            setValueStatus(true);
        } else {
            axios.post("https://medcabinet1.herokuapp.com/api/auth/register", newUser)
            .then(response =>{
                      localStorage.setItem("token", response.data.token);
                      localStorage.setItem("user_id", response.data.id);
                      localStorage.setItem("email", response.data.email);
                      props.history.push("/dashboard")
                      console.log(response.data)
            // .then(response => {
            //     console.log(response);
            //     localStorage.setItem("token", response.data.token);
            //     setValueStatus(false);
            })

            .catch(error => {
                console.log(error);
                setValueStatus(true);
            })
        }
    }

    const handleChanges = e => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value
        });
        setValueStatus(false);
    };

    return (
        <Background>
            <SignUpPanel>
                <Header>Sign-Up</Header>
               
                <form onSubmit={handleSubmit}>
                    <InputContainer>
                        <Label htmlFor='username'>Username</Label>
                        <Input
                            required
                            id='username'
                            type='text'
                            name='username'
                            style={emptyValues ? {border: "1px solid red"} : {border: "1px solid white"}}
                            onChange={handleChanges}
                            value={newUser.name}
                        />
                    </InputContainer>
                    
                    <InputContainer>
                        <Label htmlFor='password'>Password</Label>
                        <Input
                            required
                            id='password'
                            type='password'
                            name='password'
                            style={emptyValues ? {border: "1px solid red"} : {border: "1px solid white"}}
                            onChange={handleChanges}
                            value={newUser.password}
                        />
                    </InputContainer>
                    
                    <InputContainer>
                        <Label htmlFor='email'>Email</Label>
                        <Input
                            id='email'
                            type='email'
                            name='email'
                            onChange={handleChanges}
                            value={newUser.email}
                        />
                    </InputContainer>
                    
                    <Button type='submit'>Sign Up</Button>
                </form>

                <Link to='/'>Have an account? Sign in here.</Link>
            </SignUpPanel>
        </Background>
    )
}

export default SignUp;



// import React, { useState } from 'react';
// import { connect } from 'react-redux';
// import { UserSignup } from '../Actions/ActionCreator';
// import { axiosWithAuth } from "../Utils/axiosWithAuth";
// import { Link } from 'react-router-dom';
// import styled from 'styled-components';
// // import logo from '../img/logo.png';

// const SignUp = props => {
//     const [values, setValues] = useState({
//       email: '',
//       password: ''
//     });
  
//     const handleSubmit = evt => {
//       evt.preventDefault();
//       const userCredentials = {
//         username: values.email,
//         password: values.password
//       };
  
//       //wasnt able to get props.history to work inside of an action
//       console.log(userCredentials);
//       axiosWithAuth().post('https://medcabinet1.herokuapp.com/api/auth/register', userCredentials)
  
//       .then(response =>{
//         localStorage.setItem("token", response.data.token);
//         localStorage.setItem("user_id", response.data.id);
//         props.history.push("/desktop")
//         console.log(response.data)
//       })
//       .catch(err => console.log(err.response))
//     };
  
//     const handleChange = evt => {
//       evt.preventDefault();
//       setValues({
//         ...values,
//         [evt.target.name]: evt.target.value
//       });
//     };
  
//     return (
//       <div>
//         <div className='sign-up-container'>
  
//           <div className='left'>
//             {/* <img src={logo} alt='bestbud logo'/> */}
//             <div className='brand'>
//               <h2>hollo welcome</h2>
//             </div>
//             <p>Create your free profile</p>
//           </div>
  
//           <div className='right'>
//             <h2>Sign Up</h2>
  
//             <form onSubmit={handleSubmit}>
  
//               <label>Username</label>
//               <input type='text' name='email' placeholder='Enter a username' value={values.email} onChange={handleChange}/>
  
//               <label>Password</label>
//               <input type='password' name='password' placeholder='Enter a password' value={values.password} onChange={handleChange} minLength='4'/>
  
//               <button type='submit'>Sign Up</button>
//             </form>
  
//             <Link to='/'>Already have an account? Sign in here.</Link>
//           </div>
//         </div>
//       </div>
//     );
//   };
  
//   const mapStateToProps = state => {
//     return {}
//   };
  
//   export default connect(mapStateToProps, {UserSignup})(SignUp);