import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Layout from '../../components/Layout'

const Login = () => {

  const dispatch = useDispatch();

  const navigate = useNavigate();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const submitHandler =  async (e) => {
        e.preventDefault();

        dispatch({type: 'LOADING', payload: true});

        try {

            const {data} = await axios.post("https://onlinecarrenting.azurewebsites.net/api/v1/Accounts/Login", {
                email,
                password
            });
            localStorage.setItem("userInfo", JSON.stringify(data));
            toast.success('Login Successfull!');
            dispatch({type: 'LOADING', payload: false});
            navigate('/');

        } catch(error) {
            console.log(error);
            toast.error('Invalid password or email!');
            dispatch({type: 'LOADING', payload: false});
        }
    }

    useEffect(() => {
      if(localStorage.getItem("userInfo")) {
        localStorage.getItem("userInfo");
        navigate('/');
      }
    })

  return (
    <Layout>
      <div className="form-container">
        <div className="form-groups">
          <form className="form" onSubmit={submitHandler} >
            <h3 className='form-title'>Login</h3>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="text" onChange={(e) => setEmail(e.target.value)} className='input' id='email' required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" onChange={(e) => setPassword(e.target.value)} className='input' id='password' required />
            </div>
            <div className="form-group">
              <button className='rent-now'>Login</button>
            </div>
            <div className="form-group">
              <p>Don't have an account? <a href="/register" className='form-link'>Here for Register</a></p>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default Login