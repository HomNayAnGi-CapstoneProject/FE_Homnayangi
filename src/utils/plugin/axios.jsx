import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { toast } from 'react-toastify';

const Message = () => {
  return (
    <>
      <p>Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại để tiếp tục !</p>
      <div
        onClick={() => (window.location = '/login')}
        className="cursor-pointer bg-red-500 text-white font-inter font-medium text-center rounded mt-3"
      >
        Đăng nhập lại
      </div>
    </>
  );
};
const notify = () =>
  toast.error(<Message />, {
    position: 'top-center',
    pauseOnHover: false,
    autoClose: 4000,
  });

//base url to make requests to the database
const instances = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

instances.interceptors.request.use(
  (config) => {
    // ** Get token from localStorage
    const accessToken = localStorage.getItem('accessToken');

    // ** If token is present add it to request's Authorization Header
    if (accessToken) {
      // localStorage.setItem('EXPIRED_TOKEN', false)
      // ** eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

instances.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      let currenDate = new Date();
      const decodedToken = jwt_decode(accessToken);

      if (decodedToken.exp * 1000 < currenDate.getTime()) {
        notify();
        localStorage.removeItem('accessToken');
        localStorage.setItem('ACCOUNT_INFO', JSON.stringify({}));
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default instances;
