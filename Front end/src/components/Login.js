import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'

function Login(e) {
    const [creds, setCreds] = useState({email:"", password:""})
    const navigate = useNavigate();
    const handleonChange=(e)=>{

        setCreds({...creds,[e.target.name]: e.target.value})
    }
    const handleSubmit= async(e)=>{
        e.preventDefault();
        const {email,password}=creds;
        const response= await fetch("http://localhost:5000/api/auth/login",{
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email,password }),
        })
        const json = await response.json();
        if(json.success){
          //SAVE AUTH TOKEN & redirect
          localStorage.setItem('auth-token',json.token);
          navigate('/');
        }else{
          alert("Invalid");
        }
    }
  return (
    <form onSubmit={handleSubmit} className="my-3">
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label" >Email address</label>
    <input type="email" name="email" className="form-control" onChange={handleonChange} id="exampleInputEmail1" aria-describedby="emailHelp"/>
  
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input name="password"  type="password" onChange={handleonChange} className="form-control" id="exampleInputPassword1"/>
  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
  )
}

export default Login