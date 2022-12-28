import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { useEffect } from 'react';

import SuggestCheap from "./component/SuggestCheap";
import SuggestRegion from "./component/SuggestRegion";
import { Food, NorthFood } from "./component/FoodData";
//** Third party components
import instances from '../../utils/plugin/axios';


const Home = ({ title }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  // get
  // useEffect(() => {
  //   const fetch = async () => {
  //     const res = await instances.get('/api/categories/f93a40ad-3c64-4d4b-b544-14f2fd7f9a83');
  //     console.log(res);
  //   };

  //   fetch();
  // }, []);
  


  return (<div>
    <SuggestCheap Food={Food}/>
<SuggestRegion NorthFood={NorthFood}/>
  </div>);
};

export default Home;
