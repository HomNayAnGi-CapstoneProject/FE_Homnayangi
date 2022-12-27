import { useState, useEffect } from 'react';
import { Navigation, Footer } from '../components';
import gradientBackground from '../../assets/images/Gradient_background.png';
import diadanhmiennam from '../../assets/images/diadanhmiennam1.webp';
import diadanhmienba from '../../assets/images/diadanhmienba.webp';
import diadanhmientrung from '../../assets/images/diadanhmientrung1.webp';
import fooddecor1 from '../../assets/images/fooddecor1.webp';
import fooddecor2 from '../../assets/images/fooddecor2.webp';
import useWindowSize from '../hooks/useWindowSize';
import { useSelector } from 'react-redux';

const DefaultLayout = ({ children }) => {
  const store = useSelector((state) => state.global);
  const [width, height] = useWindowSize();
  const [toggleIcon, setToggleIcon] = useState(true);

  useEffect(() => {
    if (width < 1060) {
      setToggleIcon(false);
    } else {
      setToggleIcon(true);
    }
  }, [width]);

  const handleChangeImage = () => {
    switch (store.countrySide) {
      case 1:
        return diadanhmiennam;
        break;
      case 2:
        return diadanhmienba;
        break;
      case 3:
        return diadanhmientrung;
        break;
      default:
        break;
    }
  };

  return (
    <div className=" relative bg-cover w-full h-[586px]" style={{ backgroundImage: `url(${gradientBackground})` }}>
      <div
        className="md:block hidden absolute right-0 bg-contain bg-no-repeat w-[475px] h-[950px] transition-all ease-in-out"
        style={{ backgroundImage: `url(${handleChangeImage()})` }}
      ></div>
      <div
        className="absolute left-0 top-[704px] bg-contain bg-no-repeat md:w-[768px] w-full h-[758px]"
        style={{ backgroundImage: `url(${fooddecor1})` }}
      />
      {/* <div
        className="absolute right-0 top-[3110.57px] bg-contain bg-no-repeat w-[725px] h-[1118px]"
        style={{ backgroundImage: `url(${fooddecor2})` }}
      /> */}
      <Navigation isHome={toggleIcon ? true : false} />
      <div className="relative z-10 min-h-[100vh]">{children}</div>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
