import axios from 'axios';
import { getCookies } from './getUserFromCookie';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

const { user, refreshToken } = getCookies();

if (user)
  instance.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${user?.accessToken}`;
if (refreshToken)
  instance.defaults.headers.common['x-ref-token'] = refreshToken;

export default instance;
