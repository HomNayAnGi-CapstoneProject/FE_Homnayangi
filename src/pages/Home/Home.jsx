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

  return (
    <div className="">
      <HeroSection />
      <SuggestRegion NorthFood={NorthFood} />
      <SuggestToday />
      <SuggestEatType />
      <SuggestCheap Food={Food} />
    </div>
  );
};

export default Home;
