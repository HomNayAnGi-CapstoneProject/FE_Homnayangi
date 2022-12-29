import React from 'react';

// ** Assets
import vegan_type from '../../../assets/images/vegan_type.png';
import { ic_left_arrow, ic_boiling_white, ic_add_to_cart_white } from '../../../assets';
import staticFood1 from '../../../assets//images/staticFood1.png';

// ** Third party library
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import 'swiper/css';
// import 'swiper/css/pagination';
import 'swiper/css/navigation';

// ** Card Comp
const Card = (props) => {
  return (
    <div className="relative font-inter rounded-[10px] sm:w-[586px] w-[100%] sm:h-[220px] h-fit bg-[#FFA883] p-[10px] flex sm:flex-row flex-col gap-[18px] drop-shadow-3xl">
      <div className="flex gap-[18px]">
        <div
          className="rounded-[10px] border-[2px] border-solid border-white bg-cover sm:w-[198px] w-[150px] h-[150px] sm:h-[198px] bg-center"
          style={{ backgroundImage: `url(${staticFood1})` }}
        />
        <div className="flex-1">
          <p className="sm:text-[20px] text-[18px] font-semibold text-black mb-[10px] line-clamp-1">
            {props?.data?.name}
          </p>
          <div className="flex gap-[7px]">
            <div className="rounded-full bg-[#88EA5B] border-[2px] border-[#48822c] border-solid xs:px-[10px] px-[2px] py-[0px] text-[12px] text-[#525252]">
              Dễ ăn
            </div>
            <div className="rounded-full bg-[#EAD35B] border-[2px] border-[#8F8137] border-solid xs:px-[10px] px-[2px] py-[0px] text-[12px] text-[#525252]">
              Buổi trưa
            </div>
          </div>
          <p className="leading-[25px] mt-[20px] sm:line-clamp-2 line-clamp-3">
            Đậu hũ kho tiêu mặn mà, đậm vị, giúp kích thích bữa cơm thêm ngon miệng. Đậu hũ kho tiêu mặn mà, đậm vị,
            giúp kích thích bữa cơm thêm ngon miệng. Đậu hũ kho tiêu mặn mà, đậm vị, giúp kích thích bữa cơm thêm ngon
            miệng.
          </p>
          <div className="sm:flex hidden absolute bottom-[10px]  gap-[8px]">
            <button className="bg-[#FF7940] rounded-[10px] cursor-pointer text-white font-medium xs:text-[18px] text-[1vw] px-[20px] py-[10px] flex items-center gap-2">
              Công thức
              <div className="bg-cover w-[20px] h-[20px]" style={{ backgroundImage: `url(${ic_boiling_white})` }} />
            </button>
            <button className="bg-redError rounded-[10px] cursor-pointer text-white font-medium xs:text-[18px] text-[1vw] px-[20px] py-[10px] flex items-center gap-2">
              Đặt làm
              <div className="bg-cover w-[20px] h-[20px]" style={{ backgroundImage: `url(${ic_add_to_cart_white})` }} />
            </button>
          </div>
        </div>
      </div>
      <div className="flex sm:hidden gap-[8px]">
        <button className="bg-[#FF7940] flex-1 rounded-[10px] cursor-pointer text-white font-medium xs:text-[18px] xs:px-[20px] px-1 py-[10px] flex justify-center items-center gap-2">
          Công thức
          <div className="bg-cover w-[20px] h-[20px]" style={{ backgroundImage: `url(${ic_boiling_white})` }} />
        </button>
        <button className="bg-redError flex-1 rounded-[10px] cursor-pointer text-white font-medium xs:text-[18px] xs:px-[20px] px-1 py-[10px] flex justify-center items-center gap-2">
          Đặt làm
          <div className="bg-cover w-[20px] h-[20px]" style={{ backgroundImage: `url(${ic_add_to_cart_white})` }} />
        </button>
      </div>
    </div>
  );
};

// ** data
const data = [
  { id: 1, name: 'Đậu hũ kho tiêu' },
  { id: 2, name: 'Cá lóc lóc lóc' },
  { id: 3, name: 'Cá lóc 3' },
  { id: 4, name: 'Thịt khooooooo' },
];

const SuggestEatType = () => {
  return (
    <div className="font-inter w-full md:min-h-[100vh] xl:mim-h-[66vh] h-fit md:mb-14 md:mt-40 mb-40">
      <div className="text-center">
        <p className="text-primary uppercase font-semibold text-[18px] mb-2">Bữa ăn cho bạn</p>
        <div className="w-full flex justify-center">
          <p className="font-bold text-[40px] sm:w-[470px] sm:px-0 px-5 w-full leading-[55px]">
            Gợi ý theo phong cách ăn uống
          </p>
        </div>
      </div>

      <div className="w-full bg-[#f6e4dc] md:h-[412px] h-[650px] mt-[77px] relative">
        <div className="sm:px-[90px] xl:px-[15em] px-[16px] md:flex md:flex-row flex flex-col-reverse">
          <div className="md:w-[50%] w-full flex flex-col items-center md:mt-0 mt-9">
            <div
              className="absolute bottom-0 bg-cover md:w-[410px] md:h-[478px] w-[243px] h-[285px]"
              style={{ backgroundImage: `url(${vegan_type})` }}
            />
            <div className="absolute mt-5 bottom-[-80px] flex items-center justify-center gap-4">
              <div
                className="bg-cover xs:w-[50px] xs:h-[50px] w-[40px] h-[40px] cursor-pointer"
                style={{ backgroundImage: `url(${ic_left_arrow})` }}
              />
              <div className="bg-[#f6e4dc] rounded-[5px] py-[8px] xs:px-[40px] px-[20px] text-primary md:text-[30px] xs:text-[28px] text-[5vw] font-bold">
                Ăn chay
              </div>
              <div
                className="bg-cover xs:w-[50px] xs:h-[50px] w-[40px] h-[40px] transform rotate-[180deg] cursor-pointer"
                style={{ backgroundImage: `url(${ic_left_arrow})` }}
              />
            </div>
          </div>
          <div className="md:w-[50%] w-full md:absolute bottom-[-90px] right-[90px] xl:right-[15em] gap-[20px] flex flex-col md:items-end items-center justify-center">
            <div className="md:flex hidden scroll-bar md:max-h-[458px] max-h-[270px] w-full md:overflow-y-scroll overflow-x-scroll bottom-[-50px] right-[90px] md:flex-col items-end">
              {data?.length > 0 &&
                data.map((item) => (
                  <div key={item.id} className="md:mb-[18px] md:last:mb-0 md:mr-[5px] mr-[18px]">
                    <Card data={item} />
                  </div>
                ))}
            </div>
            <div className="md:hidden block w-full">
              <Swiper
                pagination={{
                  clickable: true,
                }}
                navigation
                modules={[Navigation]}
                slidesPerView={1}
                spaceBetween={18}
                grabCursor={true}
                loop={true}
                className="mySwiper "
              >
                {data?.length > 0 &&
                  data.map((item) => (
                    <SwiperSlide key={item.id}>
                      <Card data={item} />
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>

            <div className="sm:w-[586px] flex justify-center">
              <button className="rounded-[30px] hover:bg-primaryHover transition bg-primary flex items-center gap-3 py-[10px] px-[20px] text-[20px] font-medium text-white">
                Xem thêm
                <div className="bg-cover w-[20px] h-[20px]" style={{ backgroundImage: `url(${ic_boiling_white})` }} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuggestEatType;
