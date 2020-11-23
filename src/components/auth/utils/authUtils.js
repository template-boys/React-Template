import Axios from 'axios';

export async function checkForLogin() {
  let token = localStorage.getItem('auth-token');
  if (token === null) {
    localStorage.setItem('auth-token', '');
    token = '';
  }
  const tokenRes = await Axios.post(
    'http://localhost:5000/api/users/ping',
    null,
    { headers: { 'x-auth-token': token } }
  );
  return tokenRes?.data?.user ?? null;
}
