import { useEffect, useState } from 'react';

import { ic_blog_active } from '../../../../../../../assets';

// ** third pary
import { useNavigate } from 'react-router-dom';

const CountingNumComponent = (props) => {
  const { name, img, endValue, color, textColor, navigateTo } = props;
  const [startValue, setStartValue] = useState(0);
  const navigate = useNavigate();

  // ** logic
  useEffect(() => {
    let duration = 12;
    if (startValue >= Math.floor(endValue * (98 / 100)) && startValue <= endValue) {
      duration = 150;
    }
    let counter = setInterval(() => {
      setStartValue((prev) => prev + 1);
    }, duration);
    if (startValue == endValue) {
      clearInterval(counter);
    }
    return () => clearInterval(counter);
  }, [endValue, startValue]);

  return (
    <div className="font-inter min-w-[180px] bg-white drop-shadow-md rounded-[10px] px-8 py-5">
      <div
        onClick={() => navigate(navigateTo)}
        className={`cursor-pointer w-[40px] h-[40px] ${color} rounded-full mb-3 flex justify-center items-center`}
      >
        <img alt="" src={img || ic_blog_active} />
      </div>
      <p className="mb-2 font-semibold text-[#585858]">{name}</p>
      <p className={`text-[25px] font-bold ${textColor}`}>{Intl.NumberFormat().format(startValue)}</p>
    </div>
  );
};

export default CountingNumComponent;
