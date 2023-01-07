import { useState, useEffect } from 'react';
import { Navigation, Footer } from '../components';
import gradientBackground from '../../assets/images/Gradient_background.png';
import diadanhmiennam from '../../assets/images/diadanhmiennam1.webp';
import diadanhmienba from '../../assets/images/diadanhmienba.webp';
import diadanhmientrung from '../../assets/images/diadanhmientrung1.webp';
import fooddecor1 from '../../assets/images/fooddecor1.webp';
import fooddecor2 from '../../assets/images/fooddecor2.webp';
import diadanhmienbac2 from '../../assets/images/diadanhmienbac2.webp';
import diadanhmiennam2 from '../../assets/images/diadanhmiennam2.webp';
import diadanhmientrung2 from '../../assets/images/diadanhmientrung2.webp';
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
        return diadanhmiennam2;
        break;
      case 2:
        return diadanhmienbac2;
        break;
      case 3:
        return diadanhmientrung2;
        break;
      default:
        break;
    }
  };

  //  w-[475px] h-[950px] xl:w-[590px] xl:h-[1218px]

  return (
    <div
      className=" relative bg-cover w-full"
      // style={{ backgroundImage: `url(${gradientBackground})` }}
    >
      <div
        className="absolute top-0 bg-cover w-full h-[586px] xl:h-[1080px]"
        style={{ backgroundImage: `url(${gradientBackground})` }}
      />
      <div
        className="lg:block hidden absolute right-0 top-[80px] bg-cover bg-no-repeat w-[47vw] h-[650px]"
        // style={{ backgroundImage: `url(${handleChangeImage()})` }}
      >
        <div className="absolute bg-black opacity-[0.5] w-[47vw] h-[650px] rounded-tl-[355px] rounded-bl-[355px]" />
        <img
          className="object-cover w-[47vw] h-[650px] rounded-tl-[355px] rounded-bl-[355px]"
          // loading="lazy"
          src={handleChangeImage()}
        />
      </div>
      <div
        className="absolute left-0 top-[704px] bg-contain bg-no-repeat md:w-[768px] w-full h-[758px]"
        style={{ backgroundImage: `url(${fooddecor1})` }}
      />
      <div
        className="absolute right-0 top-[3110.57px] bg-contain bg-no-repeat w-[680px] h-[1118px]"
        style={{ backgroundImage: `url(${fooddecor2})` }}
      />
      <Navigation />
      <div className="relative z-10 ">{children}</div>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
