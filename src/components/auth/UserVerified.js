import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function UserVerified() {
  const [userVerified, setUserVerified] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
    localStorage.setItem('auth-token', '');
    const verifyUser = async () => {
      try {
        const verifyRes = await Axios.post(
          'http://localhost:5000/api/users/verify_user',
          null,
          { headers: { 'x-auth-token': slug } }
        );
        setUserVerified(!!verifyRes?.data?.verified);
      } catch (e) {
        console.log(JSON.stringify(e));
      }
    };
    verifyUser();

    return;
  }, [slug]);

  return (
    <>{userVerified ? <h2>Verified!</h2> : <h2>Verification failed!</h2>}</>
  );
}
