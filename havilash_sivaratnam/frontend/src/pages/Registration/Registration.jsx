import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

import './Registration.css';
import { readForm } from 'src/services/Utils';
import { register } from 'src/lib/api';

export default function Registration({ session }) {
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();

  function validate(data) {
    const errors = {};
  
    // Validate name
    if (!data.name) {
      errors.name = ['Name is required'];
    }
  
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
  
    // Validate password confirmation
    if (!data.password_confirmation) {
      errors.password_confirmation = ['Password confirmation is required'];
    } else if (data.password !== data.password_confirmation) {
      errors.password_confirmation = ['Passwords do not match'];
    }

    // Validate comment
    if (data.comment && data.comment.length > 500) {
      errors.comment = ['Comment must be less than 500 characters'];
    }
  
    return errors;
  }
  

  async function onSubmit(e) {
    e.preventDefault();
    const data = readForm(e.target);
    const validationErrors = validate(data);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus('failed')
      return;
    }

    try {
      const resp = await register(data);
      setStatus('success');
      setErrors({});
    } catch (error) {
      if (error.response) {
        console.log(error.response)
        setErrors(error.response);
        setStatus('failed');
      }
    }
  }

  return (
    <section className='registration flex justify-center items-center min-h-screen'>
      <form onSubmit={onSubmit} className='form'>
        {status === 'success' && (
          <div className='success'>
            <FaCheckCircle /> Registration Successful
          </div>
        )}
        {status === 'failed' && (
          <div className='error'>
            <FaTimesCircle /> Registration Failed
          </div>
        )}
        <fieldset>
          <label name='name'>Name</label>
          <input name='name' type='text' placeholder='Name' />
          {errors.name && <p className='error-text'>{errors.name[0]}</p>}
        </fieldset>
        <fieldset>
          <label name='email'>E-Mail</label>
          <input name='email' type='text' placeholder='Email' />
          {errors.email && <p className='error-text'>{errors.email[0]}</p>}
        </fieldset>
        <fieldset>
          <label name='password'>Password</label>
          <input name='password' type='password' placeholder='Password' />
          {errors.password && <p className='error-text'>{errors.password[0]}</p>}
        </fieldset>
        <fieldset>
          <label name='password_confirmation'>Password Confirmation</label>
          <input name='password_confirmation' type='password' placeholder='Password Confirmation' />
          {errors.password_confirmation && <p className='error-text'>{errors.password_confirmation[0]}</p>}
        </fieldset>
        <fieldset>
          <label name='comment'>Comment <span className='opacity-50'>(Optional)</span></label>
          <textarea name='comment' type='text' placeholder='Comment' rows='4'/>
          {errors.comment && <p className='error-text'>{errors.comment[0]}</p>}
        </fieldset>
        <button type='submit' className='submit button'>
          Log In
        </button>
      </form>
    </section>
  );
}
