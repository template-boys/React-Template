import React from 'react';
import { useSelector } from 'react-redux';

export default function Home() {
  const user = useSelector((state) => state.userReducer.user);
  return (
    <div className='page'>
      <h1>Welcome {user?.name ?? ''}</h1>
    </div>
  );
}
