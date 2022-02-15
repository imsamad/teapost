import axios from 'axios';
import Cookies from 'universal-cookie';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

const cookies = new Cookies();
const userAuthCookie = process.env.NEXT_PUBLIC_AUTH_SESSION as string;
const refreshTokenCookie = process.env
  .NEXT_PUBLIC_REFRESH_AUTH_SESSION as string;

const user = cookies.get(userAuthCookie);
const refreshToken = cookies.get(refreshTokenCookie);

instance.defaults.headers.common[
  'Authorization'
] = `Bearer ${user?.accessToken}`;
instance.defaults.headers.common['x-ref-Token'] = refreshToken;

export default instance;
