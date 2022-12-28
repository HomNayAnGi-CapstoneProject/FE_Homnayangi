import React from 'react'
import FoodCard from "./FoodCard";
import { ic_boiling_white } from '../../../assets';
 //* Third party library
 import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import 'swiper/css';
// import 'swiper/css/pagination';
import 'swiper/css/navigation';
const SuggestCheap = (props) => {
    const {Food} = props;
    console.log(Food);
  return (
      <>
    <div className='cheap-price'>
    <div className="flex justify-center">
      <div className="grid">
    <h1 className="font-inter text-primary text-2xl flex justify-center">Bữa ăn vừa túi</h1>
    <h1 className="font-inter font-bold text-black text-5xl flex justify-center">Gợi ý thực đơn
giá rẻ</h1>
</div>
    </div>
<div className='px-10 py-10'>
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
                <div className="flex ">
          {Food?.length > 0 &&
                  Food.map((item) => (
                   <SwiperSlide key={item.id}>
                      <FoodCard  food={item}/>
                      </SwiperSlide>
                  ))}
                  </div>
              </Swiper>
              </div>
<div className="flex justify-center">
     
    </div>
    <div className="flex justify-center">
      <button className="flex btn-view hover:scale-125 transition ease-out duration-500 "><p className="mr-2">Xem Thêm</p> <div className="w-[24px] h-[24px] bg-cover" style={{ backgroundImage: `url(${ic_boiling_white})` }} /></button> </div>
  </div>
  <div className="py-2">
    <div className="font-lobster font-bold text-subText text-5xl flex justify-center px-20"><p>Các món ngon và đầy đủ dinh dưỡng với giá chỉ từ</p> <p className=" ml-2 font-extrabold text-transparent bg-clip-text bg-gradient-to-t   from-redError to-primary"> 50k - 100k</p></div>
</div>
</>
  )

}

export default SuggestCheap