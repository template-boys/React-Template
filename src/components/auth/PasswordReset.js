import React, { useState } from 'react';

export default function PasswordReset() {
  const [, setEmail] = useState();
  const [emailSent, setEmailSent] = useState(false);

  const sendPasswordResetEmail = async (e) => {
    e.preventDefault();
    try {
      //   const loginUser = { email, password };
      //   const loginRes = await Axios.post(
      //     "http://localhost:5000/api/users/login",
      //     loginUser,
      //     { credentials: "include" }
      //   );
      //   setUser({
      //     token: loginRes.data.token,
      //     user: loginRes.data.user,
      //   });
      //   localStorage.setItem("auth-token", loginRes.data.token);
      //   history.push("/");
      setEmailSent(true);
    } catch (err) {
      //   err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <div>
      {emailSent ? (
        <>
          <h2>Password reset email sent!</h2>
          <p>Check your email for a link to reset your password</p>
          <hr></hr>
          <form className='form' onSubmit={sendPasswordResetEmail}>
            <p>
              If it doesn't appear within a few minutes, check your spam folder
            </p>
            <h4>or</h4>
            <input
              type='submit'
              value='Send email again'
              className='primaryButton'
            />
          </form>
        </>
      ) : (
        <>
          <h2>Reset your password</h2>
          <form className='form' onSubmit={sendPasswordResetEmail}>
            <label htmlFor='login-email'>Your account's verified email</label>
            <input
              id='login-email'
              type='email'
              placeholder='Enter your email address'
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type='submit'
              value='Send password reset email'
              className='primaryButton'
            />
          </form>
        </>
      )}
    </div>
  );
}
