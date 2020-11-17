import React, { useContext } from 'react';
import UserContext from '../../context/userContext';

export default function Home() {
  const { user } = useContext(UserContext);
  return (
    <div className='page'>
      <h1>Welcome {user?.name ?? ''}</h1>
    </div>
  );
}
