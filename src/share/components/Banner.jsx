import React from 'react';
import Banner_1 from '../../assets/images/Banner1.webp';
import Banner_2 from '../../assets/images/Banner2.webp';
import Banner_3 from '../../assets/images/Banner3.webp';
//** Third party components
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper';

const Banner = () => {
  return (
    <div className="sm:block hidden">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        style={{
          '--swiper-pagination-color': '#FF8855',
          '--swiper-pagination-bullet-size': '10px',
          '--swiper-pagination-bullet-inactive-opacity': '1',
          '--swiper-pagination-bullet-inactive-color': '#CCCCCC',
        }}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={Banner_1} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Banner_2} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Banner_3} />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
