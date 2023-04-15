import { useEffect } from 'react';
import BlogDetail from './BlogDetail';

import jwt_decode from 'jwt-decode';
import { Navigate } from 'react-router-dom';

const BlogDetailContainer = () => {
  //   useEffect(() => {
  //     document.title = title;
  //   }, [title]);
  const accessToken = localStorage.getItem('accessToken');
  let decoded_jwt = {};
  if (accessToken) {
    decoded_jwt = jwt_decode(accessToken);
  }

  if (accessToken) {
    if (decoded_jwt.role == 'Admin') {
      return <Navigate replace to="/management" />;
    } else {
      return <BlogDetail />;
    }
  } else {
    return <BlogDetail />;
  }
};

export default BlogDetailContainer;
