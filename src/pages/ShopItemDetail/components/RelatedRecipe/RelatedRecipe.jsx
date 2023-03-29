import React from 'react';

import BlogCard from '../../../../share/components/BlogCard';

//** Third party components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const RelatedRecipe = (props) => {
  return (
    <div>
      {/* <Swiper
        slidesPerView={1}
        spaceBetween={0}
        breakpoints={{
          1200: {
            slidesPerView: 5,
          },
          1060: {
            slidesPerView: 4,
          },
          768: {
            slidesPerView: 3,
          },
          640: {
            slidesPerView: 2,
          },
          480: {
            slidesPerView: 2,
          },
        }}
        grabCursor={true}
        loop={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="mySwiper py-[10px]"
      >
        {data?.map((product) => (
          <SwiperSlide key={product.blogId}>
            <BlogCard data={product} />
          </SwiperSlide>
        ))}
      </Swiper> */}
    </div>
  );
};

export default RelatedRecipe;
