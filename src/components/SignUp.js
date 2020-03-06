import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
<<<<<<< HEAD
import { Link, useHistory } from 'react-router-dom';
=======
import { Link } from 'react-router-dom';
// import { ReactSVG } from 'react-svg';
>>>>>>> parent of f884e11... props

const Background = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
<<<<<<< HEAD
    background: rgb(126,255,126);
    background: radial-gradient(circle, rgba(126,255,126,1) 0%, rgba(64,204,69,1) 78%, rgba(0,124,8,1) 100%);
=======
    background-color:#98FB98;
>>>>>>> parent of f884e11... props
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

<<<<<<< HEAD
const SignUp = ({setHeaderDisplay}) => {
=======
const SignUp = props => {
>>>>>>> parent of f884e11... props
    const [newUser, setNewUser] = useState ({
        username: '',
        password: '',
        email: ''
    });
    const [emptyValues, setValueStatus] = useState(false);
<<<<<<< HEAD
    const { push } = useHistory();

    useEffect(() => {
        setHeaderDisplay(false);
    }, [setHeaderDisplay])
=======
>>>>>>> parent of f884e11... props

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
<<<<<<< HEAD
                      localStorage.setItem("userID", response.data.id);
                      push("/dashboard")
                      console.log(response.data)
                      setHeaderDisplay(true);
            })
=======
                      localStorage.setItem("user_id", response.data.id);
                      localStorage.setItem("email", response.data.email);
                      props.history.push("/dashboard")
                      console.log(response.data)
            })

>>>>>>> parent of f884e11... props
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
<<<<<<< HEAD
                <Header>Sign-Up</Header>
=======
                <Header>
                    {/* <ReactSVG src="flask.svg"/> */}
                    Sign-Up
                </Header>
>>>>>>> parent of f884e11... props
               
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