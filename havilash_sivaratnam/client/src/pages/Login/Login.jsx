import React from 'react'

import './Login.css'
import { readForm } from 'src/services/Utils'

export default function Login() {

    function onSubmit(e) {
        e.preventDefault()
        const data = readForm(e.target)
        console.log(data)
    }

  return (
    <section className='login flex justify-center items-center h-screen'>
        <form onSubmit={onSubmit} className='login__form'>
            <fieldset>
                <label name='username'>Username</label>
                <input name='username' type="text" placeholder='Username' />
            </fieldset>
            <fieldset>
                <label name='password'>Password</label>
                <input  name='password' type="password" placeholder='Password' />
            </fieldset>
            <button type='submit' className='submit button'>Log In</button>
        </form>
    </section>
  )
}
