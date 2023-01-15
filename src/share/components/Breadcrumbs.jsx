import React from 'react';
import { ic_next_primary } from '../../assets';

import { useLocation, Link } from 'react-router-dom';

const Breadcrumbs = (props) => {
  const location = useLocation();
  // console.log(location);
  return (
    <div className="flex gap-1 items-center font-inter text-[14px]">
      <Link to={`${props?.location1}`}>
        <p className="text-primary">Công thức</p>
      </Link>
      <div className="w-[20px] h-[20px] bg-cover" style={{ backgroundImage: `url(${ic_next_primary})` }} />
      <Link to={`${props?.location2}`}>
        <p className="text-primary">Category_name</p>
      </Link>
      <div className="w-[20px] h-[20px] bg-cover" style={{ backgroundImage: `url(${ic_next_primary})` }} />
      <p className="text-primary font-bold">Recipe_title</p>
    </div>
  );
};

export default Breadcrumbs;
