import { useState } from "react";
import {  message } from 'antd';
import { useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate=useNavigate();

  const handleValue = (e) => {
    
    setFormData({ ...formData, [e.name]: e.value });
  };

  const handleRegister=async(e)=>{
    e.preventDefault();
    try {
      const response= await fetch(`http://localhost:5000/api/auth/register`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(formData)
      })
      if(response.ok){
        const data=await response.json();
        localStorage.setItem("user",JSON.stringify(data));
        message.success("kayıt başarılı")
        navigate("/")
      }else{
        message.success("kayıt başarısız")
      }
      console.log(response);
    } catch (error) {
      console.log("Giriş hatası:",error);
    }
  }


  return (
    <div className="account-column">
      <h2>Register</h2>
      <form  onSubmit={handleRegister}>
        <div>
          <label>
            <span>
              Username <span className="required">*</span>
            </span>
            <input
              name="username"
              value={formData.username}
              onChange={(e) => {
                handleValue(e.target);
              }}
              type="text"
            />
          </label>
        </div>
        <div>
          <label>
            <span>
              Email address <span className="required">*</span>
            </span>
            <input
              name="email"
              value={formData.email}
              onChange={(e) => {
                handleValue(e.target);
              }}
              type="email"
            />
          </label>
        </div>
        <div>
          <label>
            <span>
              Password <span className="required">*</span>
            </span>
            <input
              name="password"
              value={formData.password}
              onChange={(e) => {
                handleValue(e.target);
              }}
              type="password"
            />
          </label>
        </div>
        <div className="privacy-policy-text remember">
          <p>
            Your personal data will be used to support your experience
            throughout this website, to manage access to your account, and for
            other purposes described in our <a href="#">privacy policy.</a>
          </p>
          <button className="btn btn-sm">Register</button>
        </div>
      </form>
    </div>
  );
}

export default Register;
