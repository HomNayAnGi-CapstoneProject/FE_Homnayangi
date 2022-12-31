import React from 'react';

// ** Assets
import { ic_boiling_white } from '../../../assets';
import North from '../../../assets/images/North.png';
import FoodCard from '../../../share/components/FoodCard';
import mienBac from '../../../assets/images/hoGuom.webp';
import mienTrung from '../../../assets/images/cauRong.webp';
import mienNam from '../../../assets/images/choBenThanh.webp';
import styles from '../../../style';

// ** Third party libraries
import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import 'swiper/css';
// import 'swiper/css/pagination';
import 'swiper/css/navigation';

const SuggestRegion = (props) => {
  // ** States, Const
  const { NorthFood } = props;
  const store = useSelector((state) => state.global);

  // ** Funct
  const handleChangeData = () => {
    switch (store.countrySide) {
      case 1:
        return { img: mienNam, imgName: 'Miền Nam' };
        break;
      case 2:
        return { img: mienBac, imgName: 'Miền Bắc' };
        break;
      case 3:
        return { img: mienTrung, imgName: 'Miền Trung' };
        break;
      default:
        break;
    }
  };

  //md:min-h-[100vh] xl:min-h-[66vh] h-fit md:mb-14 md:mt-40 mb-40

  return (
    <section className={`signature-food-suggest font-inter w-full h-fit ${styles.paddingY}`}>
      <div className="text-center">
        <p className="text-primary uppercase font-semibold text-[18px] mb-2 tracking-widest">Bữa ăn đặc trưng</p>
        <div className="w-full flex justify-center">
          <p className="font-bold text-[40px] sm:w-[470px] sm:px-0 px-5 w-full leading-[55px]">
            Món ăn đặc trưng vùng miền
          </p>
        </div>
      </div>

      <div className="w-full bg-[#f6e4dc] md:h-[412px] h-[650px] mt-[77px] relative">
        <div
          className={`${styles.paddingX} flex justify-center w-full absolute z-[10] left-[50%]  md:top-[-43%] sm:top-[-25%] top-[-10%] translate-y-[25%] translate-x-[-50%]`}
        >
          <div className={`${styles.container}`}>
            <div className="md:flex hidden gap-4">
              <div className="md:w-[50%] w-full flex flex-col mb-12">
                <div className="md:flex hidden scroll-bar pl-10 md:max-h-[458px] max-h-[270px] w-full md:overflow-y-scroll overflow-x-scroll md:flex-col mb-12 gap-[18px]">
                  {NorthFood?.length > 0 &&
                    NorthFood.map((item) => (
                      <div key={item.id} className="sm:mr-[5px] mr-[18px]">
                        <FoodCard key={item.id} food={item} />
                      </div>
                    ))}
                </div>
                <div className="flex justify-center">
                  <button className="rounded-[30px] hover:bg-primaryHover transition bg-primary flex items-center gap-3 py-[10px] px-[20px] text-[20px] font-medium text-white">
                    Xem thêm
                    <div
                      className="bg-cover w-[20px] h-[20px]"
                      style={{ backgroundImage: `url(${ic_boiling_white})` }}
                    />
                  </button>
                </div>
              </div>
              <div className="md:w-[50%] w-full flex justify-center">
                <div className="row-span-3 col-span-2 right-[90px] w-[500px]">
                  {/* <img className="border-8 border-orange-400 rounded-full " src={North}></img> */}
                  <div className="bg-primary relative w-[520px] h-[520px] rounded-full">
                    <img
                      className="rounded-full absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] object-cover border-[2px] border-white w-[490px] h-[490px]"
                      alt={handleChangeData().imgName}
                      src={handleChangeData().img}
                      loading="lazy"
                    />
                  </div>
                  <p className="font-lobster text-5xl text-center mt-5 text-black">{handleChangeData().imgName}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex md:hidden flex-col">
          <div className="flex flex-col gap-10 mb-12 py-10">
            <div className="md:hidden px-5">
              <Swiper
                pagination={{
                  clickable: true,
                }}
                navigation
                modules={[Navigation]}
                slidesPerView={1}
                spaceBetween={30}
                grabCursor={true}
                loop={true}
                className="mySwiper "
              >
                <div className="flex ">
                  {NorthFood?.length > 0 &&
                    NorthFood.map((item) => (
                      <SwiperSlide key={item.id}>
                        <FoodCard food={item} />
                      </SwiperSlide>
                    ))}
                </div>
              </Swiper>
            </div>
            <div className="flex justify-center">
              <button className="rounded-[30px] hover:bg-primaryHover transition bg-primary flex items-center gap-3 py-[10px] px-[20px] text-[20px] font-medium text-white">
                Xem thêm
                <div className="bg-cover w-[20px] h-[20px]" style={{ backgroundImage: `url(${ic_boiling_white})` }} />
              </button>
            </div>
            <div className="flex justify-center">
              <div>
                {/* <img className="border-8 border-orange-400 rounded-full w-[500px] " src={North}></img> */}
                <div className="bg-primary relative sm:w-[520px] sm:h-[520px] ss:w-[450px] ss:h-[450px] w-[320px] h-[320px] rounded-full">
                  <img
                    className="rounded-full absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] object-cover border-[2px] border-white sm:w-[490px] sm:h-[490px] ss:w-[420px] ss:h-[420px] w-[290px] h-[290px]"
                    alt={handleChangeData().imgName}
                    src={handleChangeData().img}
                    loading="lazy"
                  />
                </div>
                <p className="font-lobster text-5xl text-center mt-5 text-black">{handleChangeData().imgName}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full md:mt-[7%] mt-[40%]">&nbsp;&nbsp;</div>
    </section>
  );
};

export default SuggestRegion;
