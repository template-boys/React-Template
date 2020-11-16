import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function UserVerified() {
  const [userVerified, setUserVerified] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
    console.log(slug);
    const verifyUser = async () => {
      const verifyRes = await Axios.post(
        "http://localhost:5000/api/users/verify_user",
        { token: slug }
      );
      setUserVerified(!!verifyRes?.data?.verified);
    };
    verifyUser();
  }, [slug]);

  return (
    <>{userVerified ? <h2>Verified!</h2> : <h2>Verification failed!</h2>}</>
  );
}
