import { useState, useEffect } from 'react';
import truncate from '../../../utils/truncate';
import instances from '../../../utils/plugin/axios';
import generateSlug from '../../../utils/generateSlug';

// ** Assets
import styles from '../../../style';
import staticFood1 from '../../../assets//images/staticFood1.png';
import { ic_left_arrow, ic_boiling_white, ic_refresh_white } from '../../../assets';

// ** Third party library
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import 'swiper/css';
// import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Link, Navigate } from 'react-router-dom';

// ** Card
const Card = (props) => {
  return (
    <Link to={'/recipe/' + props?.data?.blogId + '/' + generateSlug(props?.data?.title)}>
      <div className="font-inter cursor-pointer rounded-[10px] sm:w-[400px] sm:h-[155px] md:w-[515px] w-full md:h-[165px] h-fit bg-[#FFA883] p-[10px] flex gap-[18px] drop-shadow-3xl">
        <div className="flex-1">
          <p className="sm:text-[20px] text-[18px] font-semibold text-black mb-[5px] line-clamp-1">
            {props?.data?.title}
          </p>
          <div className="flex gap-[7px]">
            {props?.data?.listTagName?.length > 0 &&
              props?.data?.listTagName?.slice(0, 3)?.map((item, index) => (
                <div
                  key={index}
                  className="rounded-full w-max bg-[#EAD35B] border-[2px] border-[#8F8137] border-solid xs:px-[10px] px-[2px] py-[0px] text-[12px] text-[#525252]"
                >
                  {item}
                </div>
              ))}
            {/* <div className="rounded-full bg-[#88EA5B] border-[2px] border-[#48822c] border-solid xs:px-[10px] px-[2px] py-[0px] text-[12px] text-[#525252]">
            Dễ ăn
          </div> */}
          </div>
          <p className="leading-[25px] mt-[10px] md:line-clamp-3 line-clamp-2">{props?.data?.description}</p>
        </div>
        <div
          className="rounded-[10px] border-[2px] border-solid border-white bg-cover sm:w-[180px] sm:h-[137px] md:w-[190px] w-[150px] h-[150px] md:h-[147px] bg-center"
          style={{ backgroundImage: `url(${props?.data?.imageUrl})` }}
        />
      </div>
    </Link>
  );
};

// ** data
const data = [
  { id: 5, name: 'Đậu hũ kho tiêu' },
  { id: 6, name: 'Đậu 2dadada' },
  { id: 7, name: 'Đậu 3dadawdad' },
];

//md:mb-14 md:mt-40 mb-40

const SuggestToday = () => {
  // ** Const
  const [todayData, setTodayData] = useState(null);
  const [soup, setSoup] = useState(null);
  const [changeData, setChangeData] = useState(false);

  // ** call api
  useEffect(() => {
    const fetch = async () => {
      const res = await instances.get(`/home/category/2d80def2-0135-4373-a4e6-2b15fc0166b6/blog-menu`);
      // console.log(res.data.result);
      // console.log(res.data.result.find((item) => item.categoryName == 'Món canh'));
      setSoup(res.data.result[0]);
      setTodayData(res.data.result.slice(1, 4));
    };

    fetch();
  }, [changeData]);

  return (
    <section className={`today-suggest font-inter w-full h-fit ${styles.paddingY}`}>
      <div className="text-center">
        <p className="text-primary uppercase font-semibold text-[18px] mb-2 tracking-widest">Bữa ăn gia đình</p>
        <div className="w-full flex justify-center">
          <p className="font-bold text-[40px] sm:w-[470px] sm:px-0 px-5 w-full leading-[55px]">
            Gợi ý thực đơn hôm nay
          </p>
        </div>
      </div>

      <div className="w-full bg-[#f6e4dc] md:h-[412px] mmd:h-[550px] ss:h-[690px] h-[550px] mt-[7%] relative">
        <div
          className={`${styles.paddingX} w-full absolute z-[10] left-[50%]  md:top-[-50%] sm:top-[-20%] top-[-10%] translate-y-[25%] translate-x-[-50%] flex justify-center sm:flex-row flex-col-reverse`}
        >
          <div className={`${styles.container} flex`}>
            <div className="mmd:flex hidden sm:w-[50%] w-full flex-col">
              <div className="flex md:w-full bottom-[-50px] right-[90px] sm:flex-col">
                {todayData?.length > 0 &&
                  todayData.map((item) => (
                    <div key={item.blogId} className="w-fit sm:mb-[18px] sm:last:mb-0 md:odd:self-end md:odd:mr-5">
                      <Card data={item} />
                    </div>
                  ))}
              </div>
            </div>
            <div className="sm:w-[50%] w-full mmd:flex hidden">
              <div className="xs:w-fit sm:w-full sm:flex sm:justify-center sm:flex-col sm:items-center text-center">
                {/* <div className="md:ml-7 md:w-[533px] w-full md:h-[533px] xs:h-[60vw] sm:h-[320px] sm:w-[320px] rounded-full bg-primary relative">
                  <div
                    className="bg-cover rounded-full border-white border-[2px] md:w-[508.85px] md:h-[508.85px] xs:w-[56vw] xs:h-[56vw] sm:w-[300px] sm:h-[300px] w-[66vw] h-[66vw] absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%]"
                    style={{ backgroundImage: `url(${staticFood1})` }}
                  />
                </div>
                <p className="font-bold md:text-[35px] text-[28px] line-clamp-1 mt-1">Cá lóc kho tộ</p> */}
                <div className="bg-primary relative md:w-[520px] md:h-[520px] sm:w-[450px] sm:h-[450px] ss:w-[450px] ss:h-[450px] w-[320px] h-[320px] rounded-full">
                  <img
                    className="rounded-full absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] object-cover border-[2px] border-white md:w-[490px] md:h-[490px] ss:w-[420px] ss:h-[420px] w-[290px] h-[290px]"
                    alt={''}
                    src={soup?.imageUrl}
                    loading="lazy"
                  />
                </div>
                <p className="font-bold md:text-[35px] text-[28px] line-clamp-1 mt-1">{truncate(soup?.title, 20)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mmd:hidden block w-full px-[16px] absolute top-0">
          <div className="w-full flex flex-col items-center text-center">
            {/* <div className="md:ml-7 md:w-[533px] w-[250px] md:h-[533px] h-[250px] xs:w-[320px] xs:h-[320px] rounded-full bg-primary relative">
              <div
                className="bg-cover rounded-full border-white border-[2px] md:w-[508.85px] md:h-[508.85px] xs:w-[310px] xs:h-[310px] w-[235px] h-[235px] absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%]"
                style={{ backgroundImage: `url(${staticFood1})` }}
              />
            </div>
            <p className="font-bold md:text-[35px] text-[28px] line-clamp-1 mt-1">Cá lóc kho tộ</p> */}
            <div className="bg-primary relative md:w-[520px] md:h-[520px] sm:w-[450px] sm:h-[450px] ss:w-[450px] ss:h-[450px] w-[320px] h-[320px] rounded-full">
              <img
                className="rounded-full absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] object-cover border-[2px] border-white md:w-[490px] md:h-[490px] ss:w-[420px] ss:h-[420px] w-[290px] h-[290px]"
                alt={''}
                src={soup?.imageUrl}
                loading="lazy"
              />
            </div>
            <p className="font-bold md:text-[35px] text-[28px] line-clamp-1 mt-1">{soup?.title}</p>
          </div>
        </div>
        <div className="mmd:hidden block w-full px-[16px] absolute bottom-0">
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
            {todayData?.length > 0 &&
              todayData.map((item) => (
                <SwiperSlide key={item.blogId}>
                  <Card data={item} />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
      <div className="w-full flex justify-center text-center md:mt-[9%] mt-[5%]">
        <div className="flex sm:gap-[27px] gap-[15px]">
          <button className="bg-primary hover:bg-primaryHover rounded-tl-[30px] rounded-bl-[30px] rounded-tr-[5px] rounded-br-[5px] text-medium text-white text-[20px] flex items-center gap-3 py-[10px] sm:px-[20px] px-[10px]">
            Xem thêm
            <div className="bg-cover w-[20px] h-[20px]" style={{ backgroundImage: `url(${ic_boiling_white})` }} />
          </button>
          <button
            onClick={() => setChangeData((prev) => !prev)}
            className="bg-redError hover:bg-redErrorHover rounded-tl-[5px] rounded-bl-[5px] rounded-tr-[30px] rounded-br-[30px] text-medium text-white text-[20px] flex items-center gap-3 py-[10px] sm:px-[20px] px-[10px]"
          >
            Đổi món
            <div className="bg-cover w-[20px] h-[20px]" style={{ backgroundImage: `url(${ic_refresh_white})` }} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default SuggestToday;
