import React from 'react';

// ** Assets
import staticFood1 from '../../../assets//images/staticFood1.png';
import { ic_left_arrow, ic_boiling_white, ic_refresh_white } from '../../../assets';

// ** Third party library
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import 'swiper/css';
// import 'swiper/css/pagination';
import 'swiper/css/navigation';

// ** Card
const Card = (props) => {
  return (
    <div className="font-inter cursor-pointer rounded-[10px] sm:w-[515px] w-full sm:h-[165px] h-fit bg-[#FFA883] p-[10px] flex gap-[18px] drop-shadow-3xl">
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
          Đậu hũ kho tiêu mặn mà, đậm vị, giúp kích thích bữa cơm thêm ngon miệng. Đậu hũ kho tiêu mặn mà, đậm vị, giúp
          kích thích bữa cơm thêm ngon miệng. Đậu hũ kho tiêu mặn mà, đậm vị, giúp kích thích bữa cơm thêm ngon miệng.
        </p>
      </div>
      <div
        className="rounded-[10px] border-[2px] border-solid border-white bg-cover sm:w-[190px] w-[150px] h-[150px] sm:h-[147px] bg-center"
        style={{ backgroundImage: `url(${staticFood1})` }}
      />
    </div>
  );
};

// ** data
const data = [
  { id: 5, name: 'Đậu hũ kho tiêu' },
  { id: 6, name: 'Đậu 2dadada' },
  { id: 7, name: 'Đậu 3dadawdad' },
];

const SuggestToday = () => {
  return (
    <div className="font-inter w-full md:min-h-[100vh] xl:min-h-[66vh] h-fit md:mb-14 md:mt-40 mb-40">
      <div className="text-center">
        <p className="text-primary uppercase font-semibold text-[18px] mb-2">Bữa ăn gia đình</p>
        <div className="w-full flex justify-center">
          <p className="font-bold text-[40px] sm:w-[470px] sm:px-0 px-5 w-full leading-[55px]">
            Gợi ý thực đơn hôm nay
          </p>
        </div>
      </div>

      <div className="w-full bg-[#f6e4dc] md:h-[412px] h-[550px] mt-[7%] relative">
        <div className="sm:px-[90px] xl:px-[15em] w-full absolute z-[10] md:left-[50%]  md:top-[-50%] sm:top-[-20%] top-[-10%] translate-y-[25%] translate-x-[-50%] px-[16px] flex md:flex-row flex-col-reverse">
          <div className="md:flex hidden md:w-[50%] w-full flex-col">
            <div className="flex md:w-full bottom-[-50px] right-[90px] md:flex-col">
              {data?.length > 0 &&
                data.map((item) => (
                  <div key={item.id} className="md:mb-[18px] md:last:mb-0 md:odd:self-end md:odd:mr-5">
                    <Card data={item} />
                  </div>
                ))}
            </div>
          </div>
          <div className="md:w-[50%] w-full md:block hidden">
            <div className="w-fit text-center">
              <div className="md:ml-7 md:w-[533px] w-full md:h-[533px] xs:h-[60vw] h-[70vw]  rounded-full bg-primary relative">
                <div
                  className="bg-cover rounded-full border-white border-[2px] md:w-[508.85px] md:h-[508.85px] xs:w-[56vw] xs:h-[56vw] w-[66vw] h-[66vw] absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%]"
                  style={{ backgroundImage: `url(${staticFood1})` }}
                />
              </div>
              <p className="font-bold md:text-[35px] text-[28px] line-clamp-1 mt-1">Cá lóc kho tộ</p>
            </div>
          </div>
        </div>
        <div className="md:hidden block w-full px-[16px] absolute top-0">
          <div className="w-full flex flex-col items-center text-center">
            <div className="md:ml-7 md:w-[533px] w-[250px] md:h-[533px] h-[250px] xs:w-[320px] xs:h-[320px] rounded-full bg-primary relative">
              <div
                className="bg-cover rounded-full border-white border-[2px] md:w-[508.85px] md:h-[508.85px] xs:w-[310px] xs:h-[310px] w-[235px] h-[235px] absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%]"
                style={{ backgroundImage: `url(${staticFood1})` }}
              />
            </div>
            <p className="font-bold md:text-[35px] text-[28px] line-clamp-1 mt-1">Cá lóc kho tộ</p>
          </div>
        </div>
        <div className="md:hidden block w-full px-[16px] absolute bottom-0">
          <Swiper
            pagination={{
              clickable: true,
            }}
            navigation
            modules={[Navigation]}
            slidesPerView={1}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
            }}
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
      </div>
      <div className="w-full flex justify-center text-center mt-[10%]">
        <div className="flex sm:gap-[27px] gap-[15px]">
          <button className="bg-primary hover:bg-primaryHover rounded-tl-[30px] rounded-bl-[30px] rounded-tr-[5px] rounded-br-[5px] text-medium text-white text-[20px] flex items-center gap-3 py-[10px] sm:px-[20px] px-[10px]">
            Xem thêm
            <div className="bg-cover w-[20px] h-[20px]" style={{ backgroundImage: `url(${ic_boiling_white})` }} />
          </button>
          <button className="bg-redError hover:bg-redErrorHover rounded-tl-[5px] rounded-bl-[5px] rounded-tr-[30px] rounded-br-[30px] text-medium text-white text-[20px] flex items-center gap-3 py-[10px] sm:px-[20px] px-[10px]">
            Đổi món
            <div className="bg-cover w-[20px] h-[20px]" style={{ backgroundImage: `url(${ic_refresh_white})` }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuggestToday;
