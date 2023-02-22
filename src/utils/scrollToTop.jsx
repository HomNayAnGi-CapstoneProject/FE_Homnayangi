import React, { useEffect } from 'react';
import { useLocation } from 'react-router';

function ScrollToTop({ children }) {
  const location = useLocation();
  useEffect(() => {
    if (!location.pathname.includes('/blog/new') && !location.pathname.includes('/blog/edit')) {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return <div>{children}</div>;
}

export default ScrollToTop;
