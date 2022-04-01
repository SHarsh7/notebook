import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
function Signup() {
  const [creds, setCreds] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();
  const handleonChange = e => {
    setCreds({ ...creds, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { name, email, password } = creds;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();
    if(json.success){
      //SAVE AUTH TOKEN & redirect
      localStorage.setItem('auth-token',json.token);
      navigate('/');
    }else{
      alert("Invalid");
    }
  };

  return (
    <div className='container'>
      <form onSubmit={handleSubmit} className='my-3'>
        <div className='mb-3'>
          <label htmlFor='name' className='form-label'>
            Name
          </label>
          <input
            type='text'
            name='name'
            className='form-control'
            onChange={handleonChange}
            id='name'
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='exampleInputEmail1' className='form-label'>
            Email address
          </label>
          <input
            type='email'
            name='email'
            className='form-control'
            onChange={handleonChange}
            id='exampleInputEmail1'
            aria-describedby='emailHelp'
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='exampleInputPassword1' className='form-label'>
            Password
          </label>
          <input
            name='password'
            type='password'
            onChange={handleonChange}
            className='form-control'
            id='exampleInputPassword1'
          />
        </div>

        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Signup;
