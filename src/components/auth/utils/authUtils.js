import Axios from 'axios';

export async function checkForLogin() {
  let token = localStorage.getItem('auth-token');
  let tokenResponse;
  if (token === null) {
    localStorage.setItem('auth-token', '');
    token = '';
  } else {
    tokenResponse = await Axios.post(
      'http://localhost:5000/api/users/ping',
      null,
      { headers: { 'x-auth-token': token } }
    );
  }
  return tokenResponse?.data?.user;
}
