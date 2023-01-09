import { useEffect } from 'react';
import styles from '../../../style';
import HomeSearch from './HomeSearch';

// ** Assets
import foodNorth from '../../../assets/images/foodNorth.webp';
import foodSoouth from '../../../assets/images/foodSoouth.webp';
import foodMid from '../../../assets/images/foodMid.webp';
import { ic_location } from '../../../assets';

// ** Third party libraries
import { useDispatch, useSelector } from 'react-redux';

// ** Redux

const HeroSection = () => {
  // ** States, Const
  const store = useSelector((state) => state.global);

  // ** Funct
  const handleChangeData = () => {
    switch (store.countrySide) {
      case 1:
        return { text: 'Ta', img: foodSoouth, place: 'Nam', imgName: 'Miền Nam' };
        break;
      case 2:
        return { text: 'Nhờ', img: foodNorth, place: 'Bắc', imgName: 'Miền Bắc' };
        break;
      case 3:
        return { text: 'Nhỉ', img: foodMid, place: 'Trung', imgName: 'Miền Trung' };
        break;
      default:
        break;
    }
  };

  return (
    <section
      className={`hero ${styles.paddingX} pb-16 font-inter flex relative  justify-center sm:overflow-hidden overflow-auto`}
    >
      <div className={`${styles.container} flex sm:flex-row flex-col gap-0 mlg:gap-20 xl:gap-36`}>
        <div className={``}>
          <div className={`${styles.container} sm:my-[120px] my-[100px] sm:text-start text-center`}>
            <div className="flex items-center gap-2 sm:justify-start justify-center sm:mb-0 mb-3">
              <div className="bg-cover w-[24px] h-[24px]" style={{ backgroundImage: `url(${ic_location})` }} />
              <p className="text-primary font-medium">Khu vực miền {handleChangeData().place}</p>
            </div>
            <p className="text-black font-bold smd:text-[70px] sm:text-[60px] text-[50px]">Hôm Nay</p>
            <p className="text-black font-bold smd:text-[70px] sm:text-[60px] text-[50px] sm:leading-[84px] leading-[60px]">
              <span className="text-primary">Ăn</span> Gì {handleChangeData().text}?
            </p>
            <p className="text-[20px] font-medium text-subText sm:w-[300px] smd:w-[376px] md:w-[450px] w-full mt-[20px]">
              Chuẩn bị những món ăn <span className="font-medium text-black">phong phú, đa dạng </span> từ khắp các vùng
              miền cho bữa ăn hằng ngày.
            </p>
            <div className="mt-[30px]">
              <HomeSearch />
            </div>
          </div>
        </div>
        <div className="sm:block hidden">
          <div
            className="flex items-center flex-col bg-contain bg-no-repeat relative mt-[80px] md:mt-0"
            // style={{ backgroundImage: `url(${handleChangeData().img})` }}
          >
            <img
              className="object-cover lg:w-[620px] lg:h-[620px] md:w-[500px] md:h-[500px] sm:w-[500px] sm:h-[500px] "
              // loading="lazy"
              src={handleChangeData().img}
              alt={handleChangeData().imgName}
            />
            <p className="absolute bottom-[-50px] font-lobster md:text-[70px] text-[50px] drop-shadow-lg text-primaryHover">
              {handleChangeData().imgName}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
