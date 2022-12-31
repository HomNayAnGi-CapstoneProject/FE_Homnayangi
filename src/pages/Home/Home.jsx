import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
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
  //     const res = await instances.get('/api/categories/f93a40ad-3c64-4d4b-b544-14f2fd7f9a83');
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
