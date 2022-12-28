import { useEffect } from 'react';
import HeroSection from './components/HeroSection';
import SuggestToday from './components/SuggestToday';
import SuggestEatType from './components/SuggestEatType';

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

  return (
    <div className="">
      <HeroSection />
      <SuggestToday />
      <SuggestEatType />
    </div>
  );
};

export default Home;
