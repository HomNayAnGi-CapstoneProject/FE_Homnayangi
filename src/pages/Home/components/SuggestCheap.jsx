import React from 'react'
import  FoodCard from "../../../share/components/FoodCard"
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
    <div className='cheap-price '>
    <div className="flex justify-center">
      <div className="grid">
    <h1 className="font-inter font-semibold font-size[18px] text-primary text-2xl flex justify-center">BỮA ĂN VỪA TÚI</h1>
    <h1 className="font-inter font-bold text-black text-[40px] flex justify-center text-center w-[300px] sm:px-0 px-5 leading-[55px] mb-10">Gợi ý thực đơn
giá rẻ</h1>
</div>
    </div>
    <div className='w-full bg-[#f6e4dc] md:h-[412px] sm:h-[400px] h-[650px] relative'>
<div className='sm:px-[90px] xl:px-[15em] px-[16px] hidden md:flex '>
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
                   
                      <FoodCard  food={item}/>
                      
                      </SwiperSlide>
                  ))}
                
              </Swiper>
              </div>
              <div className='px-5 py-10 md:hidden'>
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
                      <FoodCard  food={item}/>
                      </SwiperSlide>
                  ))}
                  </div>
              </Swiper>
              </div>
    <div className="flex justify-center mt-10">
      <button className="flex btn-view hover:scale-125 transition ease-out duration-500 "><p className="mr-2">Xem Thêm</p> <div className="w-[24px] h-[24px] bg-cover" style={{ backgroundImage: `url(${ic_boiling_white})` }} /></button> </div>
  
  <div className="py-2 mt-5">
    <div className="font-lobster font-bold text-subText text-5xl px-20 flex justify-center text-center"><p className='md:w-[700px]'>Các món ngon và đầy đủ dinh dưỡng với giá chỉ từ <span className=" ml-2 font-extrabold text-transparent bg-clip-text bg-gradient-to-t   from-redError to-primary"> 50k - 100k</span></p></div></div></div></div>

</>
  )

}

export default SuggestCheap