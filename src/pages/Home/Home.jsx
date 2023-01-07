// import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { useEffect } from 'react';
import HeroSection from './components/HeroSection';
import SuggestToday from './components/SuggestToday';
import SuggestEatType from './components/SuggestEatType';

import SuggestCheap from './components/SuggestCheap';
import SuggestRegion from './components/SuggestRegion';
import { Food, NorthFood } from '../../share/components/FoodData';

//** Third party components
import instances from '../../utils/plugin/axios';

const Home = ({ title }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  // useEffect(() => {
  //   const fetch = async () => {
  //     const res = await instances.get('/home/category/6B21EB68-5BA7-4091-A453-0C6E239A371D/blogs');
  //     console.log(res);
  //   };

  //   fetch();
  // }, []);

  return (
    <div className="">
      <HeroSection />
      <SuggestToday />
      <SuggestEatType />
      <SuggestCheap Food={Food} />
      <SuggestRegion NorthFood={NorthFood} />
    </div>
  );
};

export default Home;
