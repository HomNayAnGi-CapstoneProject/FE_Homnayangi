import { useEffect } from 'react';
import styles from '../../../style';

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
      <div className={`${styles.container} flex sm:flex-row flex-col gap-20 xl:gap-36`}>
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
              <div className="relative">
                <input
                  type="text"
                  id="default-search"
                  className="block w-full p-[12px] pl-[23px] text-subText sm:text-md  border border-primary rounded-full bg-[#f0f0f0] focus:outline-primary "
                  placeholder="Thịt kho tiêu..."
                />
                <button className="hover:bg-primaryHover transition flex items-center gap-2 text-white absolute bg-primary rounded-full right-1 bottom-1 font-medium px-4 py-[8.8px]">
                  Tìm kiếm
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-white dark:text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="sm:block hidden">
          <div
            className="flex items-center flex-col bg-contain bg-no-repeat relative mt-[80px] md:mt-0"
            // style={{ backgroundImage: `url(${handleChangeData().img})` }}
          >
            <img
              className="object-cover lg:w-[620px] lg:h-[620px] md:w-[500px] md:h-[500px] sm:-w-[350px] sm:h-[350px] "
              loading="lazy"
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
