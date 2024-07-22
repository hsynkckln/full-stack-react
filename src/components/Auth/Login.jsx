import React, { useState } from 'react'
import {  message } from 'antd';
import { useNavigate } from "react-router-dom";
function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate=useNavigate();

  
  const handleLogin=(e)=>{
    const{name,value}=e;
    setFormData({...formData,[name]:value})
    console.log(formData);
  }

  
  const handleLoginForm=async(e)=>{
    e.preventDefault()
    try {
      const response= await fetch(`http://localhost:5000/api/auth/login`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(formData)
      })
      const data=await response.json();
      if(response.ok){
        
        localStorage.setItem("user",JSON.stringify(data));
        message.success("giriş başarılı")
        
        if(data.role=="admin"){
          window.location.href="/admin"
        }else{
          navigate("/")
        }
        
      }
      else{
        message.success("giriş başarısız")
      }
      console.log(response);
    } catch (error) {
      console.log("Giriş hatası:",error);
    }
  }

  return (
    <div className="account-column">
      <h2>Login</h2>
      <form onSubmit={handleLoginForm}>
        <div>
          <label>
            <span>
              Email address <span className="required">*</span>
            </span>
            <input name="email" value={formData.email} onChange={(e)=>handleLogin(e.target)}  type="text" />
          </label>
        </div>
        <div>
          <label>
            <span>
              Password <span className="required">*</span>
            </span>
            <input name="password" value={formData.password} onChange={(e)=>handleLogin(e.target)} type="password" />
          </label>
        </div>
        <p className="remember">
          <label>
            <input type="checkbox" />
            <span>Remember me</span>
          </label>
          <button className="btn btn-sm">Login</button>
        </p>
        <a href="#" className="form-link">
          Lost your password?
        </a>
      </form>
    </div>
  )
}

export default Login