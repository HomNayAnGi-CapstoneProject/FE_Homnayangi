import { useEffect } from 'react';

//** Third party components
import instances from '../../utils/plugin/axios';

const Home = ({ title }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  // useEffect(() => {
  //   const fetch = async () => {
  //     const res = await instances.get('/weatherforecast');
  //     console.log(res);
  //   };

  //   fetch();
  // }, []);

  return <div className="">Home</div>;
};

export default Home;
