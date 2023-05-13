import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

import './Login.css';
import { readForm } from 'src/services/Utils';
import { login } from 'src/lib/api';

export default function Login({ session }) {
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    session.logout()
    const data = readForm(e.target);

    try {
      const resp = await login(data);
      session.login({user: resp.user, accessToken: resp.access_token});
      setStatus('success');
    } catch (error) {
      if (error.response) {
        setStatus('failed');
      }
    }
  }

  return (
    <section className='login flex justify-center items-center min-h-screen'>
      <form onSubmit={onSubmit} className='form'>
        {status === 'success' && (
          <div className='success'>
            <FaCheckCircle /> Login Successful
          </div>
        )}
        {status === 'failed' && (
          <div className='error'>
            <FaTimesCircle /> Login Failed
          </div>
        )}
        <fieldset>
          <label name='email'>Email</label>
          <input name='email' type='text' placeholder='Email' />
        </fieldset>
        <fieldset>
          <label name='password'>Password</label>
          <input name='password' type='password' placeholder='Password' />
        </fieldset>
        <button type='submit' className='submit button'>
          Log In
        </button>
      </form>
    </section>
  );
}
