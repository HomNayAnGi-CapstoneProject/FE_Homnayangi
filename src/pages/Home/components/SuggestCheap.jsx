import React from 'react';
import FoodCard from '../../../share/components/FoodCard';

// ** Assets
import { ic_boiling_white } from '../../../assets';
import styles from '../../../style';

//* Third party library
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import 'swiper/css';
// import 'swiper/css/pagination';
import 'swiper/css/navigation';

const SuggestCheap = (props) => {
  const { Food } = props;
  // console.log(Food);

  //md:min-h-[100vh] xl:min-h-[66vh] h-fit md:mb-14 md:mt-40 mb-40

  return (
    <>
      <section className={`cheap-price-suggest font-inter w-full h-fit ${styles.paddingY}`}>
        <div className="text-center">
          <p className="text-primary uppercase font-semibold text-[18px] mb-2 tracking-[0.24em]">Bữa ăn vừa túi</p>
          <div className="w-full flex justify-center">
            <p className="font-bold text-[40px] sm:w-[470px] sm:px-0 px-5 w-full leading-[55px]">
              Gợi ý thực đơn giá rẻ
            </p>
          </div>
        </div>
        <div className="w-full bg-[#f6e4dc] md:h-[412px] sm:h-[400px] h-[650px] mt-[77px] relative">
          <div className={`${styles.paddingX} hidden md:flex justify-center w-full`}>
            <div className={`${styles.container}`}>
              <Swiper
                pagination={{
                  clickable: true,
                }}
                navigation
                modules={[Navigation]}
                slidesPerView={2}
                spaceBetween={30}
                grabCursor={true}
                loop={true}
                className="mySwiper "
              >
                {Food?.length > 0 &&
                  Food.map((item) => (
                    <SwiperSlide key={item.id}>
                      <FoodCard food={item} />
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          </div>
          <div className="px-5 py-10 md:hidden">
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
                {Food?.length > 0 &&
                  Food.map((item) => (
                    <SwiperSlide key={item.id}>
                      <FoodCard food={item} />
                    </SwiperSlide>
                  ))}
              </div>
            </Swiper>
          </div>
          <div className="flex justify-center mt-10">
            <button className="rounded-[30px] hover:bg-primaryHover transition bg-primary flex items-center gap-3 py-[10px] px-[20px] text-[20px] font-medium text-white">
              Xem thêm
              <div className="bg-cover w-[20px] h-[20px]" style={{ backgroundImage: `url(${ic_boiling_white})` }} />
            </button>
          </div>

          <div className="py-2 mt-5">
            <div className="font-lobster text-subText text-5xl sm:px-20 px-1 leading-[60px] flex justify-center text-center">
              <p className="md:w-[700px]">
                Các món ngon và đầy đủ dinh dưỡng với giá chỉ từ{' '}
                <span className=" ml-2 font-extrabold text-transparent bg-clip-text bg-gradient-to-t   from-redError to-primary">
                  50k - 100k
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="w-full sm:mt-[2%] mt-[25%]">''</div>
      </section>
    </>
  );
};

export default SuggestCheap;
