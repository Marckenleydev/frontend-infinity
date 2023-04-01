import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { loginFailure, loginStart , loginSuccess} from '../reduxx/userRedux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';



const Register = () => {
    const [email, setEmail]=useState("")
    const [password, setPassword]=useState("")
    const { isFetching} = useSelector((state) => state.user);
 

  const dispatch = useDispatch()

  const navigate = useNavigate(); 
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(loginStart());
    axios
      .post("https://infinity-backend-api.onrender.com/api/auth/login", { email, password })
      .then((response) => {
        dispatch(loginSuccess(response.data));
        navigate('/course');
      })
      .catch((error) => {
        dispatch(loginFailure());
      });
  }
 
  
  return (
    <div>

    <div>
    
   <div className='register'>
       <h2>Infinity Login</h2>
      

       <form className='register-form'>
           <div className='boxInpute'>
           <span></span>
           
           <input  
             onChange={(e)=> setEmail(e.target.value)}
           />
            <label>Email</label>

           </div>
          
           <div className='boxInpute'>
          <span></span>
           <input  type="password"
             onChange={(e)=> setPassword(e.target.value)}
           />
            <label>Password</label>
            </div>

          
           
          <button className='registerBtn' onClick={handleClick} disabled={isFetching}>LOGIN</button>
          <p  className='registerhere'>Back to register Page<b ><Link to="/" className='link'>here</Link></b></p>
       </form>
   </div>

    </div>
   
    </div>
  );
};

export default Register;
