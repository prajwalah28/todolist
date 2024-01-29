import React, { useState } from 'react';
 import './login.css';
import {styled} from 'styled-components';
import Tcontent from './Todocontent';
import NotSubmit from './NotSubmit'; // Check the correct path and file name for NotSubmit

 const Head = styled.h1`
color: white;
    margin-top: 200px;
    
    font-size: 60px
`

// const Input = styled.input`
// color: ${({invalid})=> invalid ? '#ea8989' : '#7ea8e7'};
// `
export default function Login() {
  const [email, setEmail] = useState('@gmail.com');
  const [emailNotValid, setEmailNotValid] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailNotValid(!value.includes('@appxbuild.com' || '@gmail.com'));
  };

  const handleSubmit = () => {
    if (emailNotValid) {
      setSubmitted(false);
      console.log('Email is not valid:', email);
    } else {
      setSubmitted(true);
      console.log('Submitted:', email);
    }
  };

  return (
    <>
      <Head className="heading">Login</Head>
      {/* <Input
        type='email'
        invalid ={emailNotValid}
        value={email}
        onChange={handleChange}
      /> */}
      <input
        type='email'
        style={{
          backgroundColor: emailNotValid ? '#ea8989' : '#7ea8e7'
        }}
        value={email}
        onChange={handleChange}
      />
      <button onClick={handleSubmit}>Submit</button>
      {submitted ? <Tcontent /> : <NotSubmit />}
    </>
  );
}
