import React from 'react';
import { Link } from 'react-router-dom';
import AuthOptions from '../../auth/AuthOptions';
import logo from '../../../logo.png';
import { useSelector } from 'react-redux';

export default function Header() {
  const user = useSelector((state) => state.userReducer.user);
  return !!user ? (
    <header id='header'>
      <Link to='/'>
        <h1 className='title'>
          peppi <img src={logo} width={25} />
        </h1>
      </Link>
      <AuthOptions />
    </header>
  ) : null;
}
