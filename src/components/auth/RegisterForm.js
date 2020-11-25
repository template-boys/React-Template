import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';

import { setUser } from '../../redux/User/user.actions';

export default function Register() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [displayName, setDisplayName] = useState();

  const dispatch = useDispatch();
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const newUser = { email, password, name: displayName };
      await Axios.post('http://localhost:5000/api/users/register', newUser);
      const loginRes = await Axios.post(
        'http://localhost:5000/api/users/login',
        {
          email,
          password,
        }
      );
      dispatch(setUser(loginRes?.data?.user));
      localStorage.setItem('auth-token', loginRes.data.token);
      history.push('/');
    } catch (err) {
      //   const errorMessage =
      //     err?.response?.data?.msg ??
      //     'Sorry, something went wrong. Please try again later.';
      //   setError(errorMessage);
    }
  };

  return (
    <form className='form' onSubmit={submit}>
      <label htmlFor='register-email'>Email</label>
      <input
        id='register-email'
        type='email'
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor='register-password'>Password</label>
      <input
        id='register-password'
        type='password'
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type='password'
        placeholder='Verify password'
        // onChange={(e) => setPasswordCheck(e.target.value)}
      />

      <label htmlFor='register-display-name'>Display name</label>
      <input
        id='register-display-name'
        type='text'
        onChange={(e) => setDisplayName(e.target.value)}
      />

      <input type='submit' value='Register' className='primaryButton' />
    </form>
  );
}
