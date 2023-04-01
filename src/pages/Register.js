import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from "react-router-dom";
import { Link } from 'react-router-dom';
const Register = () => {
  const [userData, setUserData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
   
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://infinity-backend-api.onrender.com/api/auth/register', userData);
      console.log(response.data);
      response.data && window.location.replace("/login")
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <div className='register'>
        <h2>Infinity Dashboard Register </h2>
    <form className='register-form' onSubmit={handleSubmit}>
        <div className='boxInpute'>
        
        <input type="text" name="firstname" value={userData.firstname} onChange={handleChange} required />
        <span></span>
        <label>First Name</label>
        </div>

        <div className='boxInpute'>
     
        <input type="text" name="lastname" value={userData.lastname} onChange={handleChange} required />
        <span></span>
        <label>Last Name</label>
      </div>

      <div className='boxInpute'>
      
        <input type="email" name="email" value={userData.email} onChange={handleChange} required />
        <span></span>
        <label>Email</label>
      </div>
      

      <div className='boxInpute'>
     
        <input type="password" name="password" value={userData.password} onChange={handleChange} required />
        <span></span>
        <label>Password</label>
      </div>

      <button className='registerBtn' type="submit">Register</button>
      <span className='registerhere'>If you already have an account login<b Navigate to="/login" ><Link to="/login" className='link'>here</Link></b></span>
    </form>
    </div>
  );
};

export default Register;
