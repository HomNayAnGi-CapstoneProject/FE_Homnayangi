import { useEffect } from 'react';

const Home = ({ title }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return <div>Home</div>;
};

export default Home;
