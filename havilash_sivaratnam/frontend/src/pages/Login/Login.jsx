import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

import './Login.css';
import { readForm } from 'src/services/Utils';
import { login, logout } from 'src/lib/api';
import useTrigger from 'src/hooks/useTrigger';
import Modal from 'src/components/Modal/Modal';

export default function Login({ session }) {
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [modalTrigger, modalTriggerFunc] = useTrigger();
  const navigate = useNavigate();

  useEffect(() => {
    if (!session.accessToken || !session.ready) return;
    logout({token: session.accessToken})
    session.logout()
  }, [])

  
  function validate(data) {
    const errors = {};
  
    // Validate email
    if (!data.email) {
      errors.email = ['Email is required'];
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data.email)) {
      errors.email = ['Email is invalid'];
    }
  
    // Validate password
    if (!data.password) {
      errors.password = ['Password is required'];
    } else if (data.password.length < 8) {
      errors.password = ['Password must be at least 8 characters long'];
    }
  
    return errors;
  }

  async function onSubmit(e) {
    e.preventDefault();
    setIsLoading(true)
    setStatus('loading')
    session.logout()
    const data = readForm(e.target);
    const validationErrors = validate(data);
    if (Object.keys(validationErrors).length > 0) {
      setStatus('failed')
      setIsLoading(false)
      return;
    }

    try {
      const resp = await login(data);
      session.login({ user: resp.user, accessToken: resp.access_token });
      setStatus('success');
    } catch (error) {
      setStatus('failed');
    }
    setIsLoading(false)
  }

  useEffect(() => {
    if (status == 'success') {
      session.user.access == 0 && modalTriggerFunc()
    }
  }, [status])

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
        {status === 'loading' && (
          <div className='loading'>
            <img src="/assets/loader.svg" className={`loader ${!isLoading && 'disabled'}`}/>
            Loading
          </div>
        )}
        <fieldset>
          <label name='email'>E-Mail</label>
          <input name='email' type='text' placeholder='Email' />
        </fieldset>
        <fieldset>
          <label name='password'>Password</label>
          <input name='password' type='password' placeholder='Password' />
        </fieldset>
        <fieldset className='submit'>
          <button type='submit' className='submit button' disabled={isLoading}>
            Log In
          </button>
          <Link to='/registration'>Register</Link>
        </fieldset>
      </form>
      <Modal trigger={modalTrigger}>
        <div>
          <p>Welcome back! We're sorry, but it looks like you don't have access to the secure space at this time.</p>
        </div>
      </Modal>
    </section>
  );
}
