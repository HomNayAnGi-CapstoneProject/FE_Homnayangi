import React from 'react'
import { ic_boiling_white } from '../../../assets';
import North from "../../../assets/images/North.png";
import FoodCard from "./FoodCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import 'swiper/css';
// import 'swiper/css/pagination';
import 'swiper/css/navigation';
const SuggestRegion = (props) => {
    const {NorthFood} = props;
  return (
    <div className="signature-food pt-40">
<div className="flex justify-center">
        <div className="grid">
      <h1 className="font-inter text-primary text-2xl flex justify-center">Bữa ăn đăc trưng</h1>
      <h1 className="font-inter font-bold text-black text-5xl flex justify-center text-center w-[500px]">Món ăn đặc trưng
vùng miền</h1>

</div>

      </div>
      <div className="md:flex hidden gap-4 ">
      <div className="flex flex-col gap-10 mb-12 py-10  ">
  <div className="md:flex hidden scroll-bar pl-10 md:max-h-[458px] max-h-[270px] w-full md:overflow-y-scroll overflow-x-scroll md:flex-col mb-12 gap-10 ">
      {NorthFood?.length > 0 &&
                  NorthFood.map((item) => (
                   
                      <FoodCard key={item.id} food={item} />
                    
                  ))}
                  </div>
    <div className="flex justify-center">
        <button className="flex btn-view hover:scale-125 transition ease-out duration-500 "><p className="mr-2">Xem Thêm</p> <div className="w-[24px] h-[24px] bg-cover" style={{ backgroundImage: `url(${ic_boiling_white})` }} /></button> </div>
    
</div>
<div className="row-span-3 col-span-2 right-[90px] w-[500px] absolute"><img className="border-8 border-orange-400 rounded-full " src={North}></img><p className='font-lobster text-5xl text-center mt-5'>Miền Bắc</p></div>
</div>
<div className="flex md:hidden flex-col">
      <div className="flex flex-col gap-10 mb-12 py-10">
                  <div className='md:hidden px-5'>
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
                      <FoodCard  food={item}/>
                      </SwiperSlide>
                  ))}
                  
                  </div>
              </Swiper>
              </div>
    <div className="flex justify-center">
        <button className="flex btn-view hover:scale-125 transition ease-out duration-500 "><p className="mr-2">Xem Thêm</p> <div className="w-[24px] h-[24px] bg-cover" style={{ backgroundImage: `url(${ic_boiling_white})` }} /></button> </div>
        <div className="flex justify-center">
          <div>
    <img className="border-8 border-orange-400 rounded-full w-[500px] " src={North}></img><p className='font-lobster text-5xl text-center mt-5'>Miền Bắc</p></div></div></div>
</div>

</div>

  )
}

export default SuggestRegion