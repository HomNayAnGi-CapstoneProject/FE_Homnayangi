import { useState, useEffect } from 'react';
import instances from '../../../utils/plugin/axios';
import Image from '../../../share/components/Image';
import generateSlug from '../../../utils/generateSlug';

// ** Assets
import styles from '../../../style';
import vegan_type from '../../../assets/images/vegan_type.png';
import eat_clean_type from '../../../assets/images/eat_clean_type.png';
import lose_weight_type from '../../../assets/images/lose_weight_type.png';
import { ic_left_arrow, ic_boiling_white, ic_add_to_cart_white } from '../../../assets';
import staticFood1 from '../../../assets//images/staticFood1.png';

// ** Third party library
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import 'swiper/css';
// import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useNavigate } from 'react-router-dom';

// ** Card Comp
const Card = (props) => {
  const navigate = useNavigate();
  return (
    <div className="relative font-inter rounded-[10px] sm:w-[450px] sm:h-[200px] md:w-[586px] w-[100%] md:h-[220px] h-fit bg-[#FFA883] p-[10px] flex sm:flex-row flex-col gap-[18px] drop-shadow-3xl">
      <div className="flex gap-[18px]">
        {/* <div
          className="rounded-[10px] border-[2px] border-solid border-white bg-cover sm:h-[180px] sm:w-[180px] md:w-[198px] w-[150px] h-[150px] md:h-[198px] bg-center"
          style={{ backgroundImage: `url(${props?.data?.imageUrl})` }}
        /> */}
        <Image
          className="rounded-[10px] border-[2px] border-solid border-white object-cover bg-cover sm:h-[180px] sm:w-[180px] md:w-[198px] w-[150px] h-[150px] md:h-[198px] bg-center"
          src={props?.data?.imageUrl}
          alt={''}
        />
        <div className="flex-1">
          <p className="sm:text-[20px] text-[18px] font-semibold text-black mb-[5px] line-clamp-1">
            {props?.data?.title}
          </p>
          <div className="flex gap-[7px]">
            {props?.data?.listSubCateName?.length > 0 &&
              props?.data?.listSubCateName?.slice(0, 3)?.map((item, index) => (
                <div
                  key={index}
                  className="rounded-full w-max bg-[#EAD35B] border-[2px] border-[#8F8137] border-solid xs:px-[10px] px-[2px] py-[0px] text-[12px] text-[#525252]"
                >
                  {item}
                </div>
              ))}
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: props?.data?.description }}
            className="leading-[25px] mt-[10px] md:line-clamp-3  line-clamp-2"
          ></div>
          <div className="sm:flex hidden absolute bottom-[10px]  gap-[8px]">
            <button className="bg-[#FF7940] rounded-[10px] cursor-pointer text-white font-medium xs:text-[18px] sm:text-[16px] text-[1vw] md:px-[15px] sm:py-[10px] px-[6px] py-[10px] flex items-center gap-2">
              Công thức
              <div className="bg-cover w-[20px] h-[20px]" style={{ backgroundImage: `url(${ic_boiling_white})` }} />
            </button>
            <button className="bg-redError rounded-[10px] cursor-pointer text-white font-medium xs:text-[18px] sm:text-[16px] text-[1vw] md:px-[15px] sm:py-[10px] px-[6px] py-[10px] flex items-center gap-2">
              Đặt làm
              <div className="bg-cover w-[20px] h-[20px]" style={{ backgroundImage: `url(${ic_add_to_cart_white})` }} />
            </button>
          </div>
        </div>
      </div>
      <div className="flex sm:hidden gap-[8px]">
        <button
          onClick={() => navigate(`/recipe/${props?.data?.blogId}/${generateSlug(props?.data?.title)}`)}
          className="bg-[#FF7940] flex-1 rounded-[10px] cursor-pointer text-white font-medium xs:text-[18px] xs:px-[20px] px-1 py-[10px] flex justify-center items-center gap-2"
        >
          Công thức
          <div className="bg-cover w-[20px] h-[20px]" style={{ backgroundImage: `url(${ic_boiling_white})` }} />
        </button>
        <button className="bg-redError flex-1 rounded-[10px] cursor-pointer text-white font-medium xs:text-[18px] xs:px-[20px]  px-1 py-[10px] flex justify-center items-center gap-2">
          Đặt làm
          <div className="bg-cover w-[20px] h-[20px]" style={{ backgroundImage: `url(${ic_add_to_cart_white})` }} />
        </button>
      </div>
      <div className="absolute top-0 left-0 w-[50px] h-[60px] bg-gradient-to-t from-redError to-primary rounded-tl-[10px] rounded-br-[10px] flex flex-col items-center justify-center">
        <p className="text-[12px] font-medium text-white">Kcal</p>
        <p className="font-bold text-white line-clamp-1 ">{Intl.NumberFormat().format(props?.data?.totalKcal)}</p>
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

const listTagType = [
  { tagName: 'Ăn chay', tagId: 'c72749fc-917a-469d-b17e-c5c934c350f4', img: vegan_type },
  { tagName: 'Eat clean', tagId: 'e23f1a4a-f82c-41e3-9305-d50f77566808', img: eat_clean_type },
  { tagName: 'Giảm cân', tagId: '93a460cc-f092-447f-aaf5-0564cd0ffadc', img: lose_weight_type },
];

//md:min-h-[100vh] xl:min-h-[66vh] h-fit md:mb-14 md:mt-40 mb-40

const SuggestEatType = () => {
  // ** Const
  const [eatTypeData, setEatTypeData] = useState('');
  const [type, setType] = useState(0);

  // ** call api
  useEffect(() => {
    const fetch = async () => {
      const res = await instances.get(`/home/subcategory/${listTagType[type].tagId}/blogs`);
      // console.log(res.data.result);
      setEatTypeData(res.data.result);
    };

    fetch();
  }, [type]);

  function handleChangeType(direction) {
    // console.log(direction);

    if (direction === 'right') {
      setType((prev) => prev + 1);
      if (type >= listTagType?.length - 1) {
        setType(0);
      }
    }
    if (direction === 'left') {
      setType((prev) => prev - 1);
      if (type <= listTagType?.length) {
        setType(0);
      }
    }
  }

  return (
    <section className={`eat-type-suggest font-inter w-full h-fit ${styles.paddingY}`}>
      <div className="text-center">
        <p className="text-primary uppercase font-semibold text-[18px] mb-2 tracking-widest">Bữa ăn cho bạn</p>
        <div className="w-full flex justify-center">
          <p className="font-bold text-[40px] sm:w-[470px] sm:px-0 px-5 w-full leading-[55px]">
            Gợi ý theo phong cách ăn uống
          </p>
        </div>
      </div>

      <div className="w-full bg-[#f6e4dc] md:h-[412px] sm:h-[400px] h-[650px] mt-[77px] relative">
        <div className={`${styles.paddingX} w-full flex justify-center absolute top-[-5%]`}>
          <div className={`${styles.container} flex sm:flex-row flex-col-reverse`}>
            <div className=" md:w-[50%] w-full relative sm:h-full h-[439px]">
              <div
                className="absolute md:bottom-[18.2%] bottom-[15%] lg:left-[25%] sm:left-0 xs:left-[25%] left-[10%] bg-cover md:w-[410px] md:h-[478px] sm:w-[315px] sm:h-[374px] w-[243px] h-[285px]"
                style={{ backgroundImage: `url(${listTagType[type].img})` }}
              />
              <div className="absolute md:bottom-[0%] bottom-[-1%] lg:left-[35%] sm:left-0 left-[25%] flex items-center justify-center gap-4">
                <div
                  onClick={() => handleChangeType('left')}
                  className="bg-cover xs:w-[50px] xs:h-[50px] w-[40px] h-[40px] cursor-pointer"
                  style={{ backgroundImage: `url(${ic_left_arrow})` }}
                />
                <div className="bg-[#f6e4dc] rounded-[5px] py-[8px] xs:px-[20px] sm:px-[40px] text-primary md:text-[30px] xs:text-[28px] text-[5vw] font-bold">
                  {listTagType[type].tagName}
                </div>
                <div
                  onClick={() => handleChangeType('right')}
                  className="bg-cover xs:w-[50px] xs:h-[50px] w-[40px] h-[40px] transform rotate-[180deg] cursor-pointer"
                  style={{ backgroundImage: `url(${ic_left_arrow})` }}
                />
              </div>
            </div>

            <div className=" md:w-[50%] w-full items-center flex flex-col">
              <div className="sm:flex hidden scroll-bar md:max-h-[460px] sm:max-h-[425px] max-h-[270px] w-fit md:overflow-y-scroll overflow-x-scroll bottom-[-50px] right-[90px] flex-col">
                {eatTypeData?.length > 0 &&
                  eatTypeData.map((item) => (
                    <div key={item.blogId} className="sm:mb-[18px] sm:last:mb-0 sm:mr-[5px] mr-[18px]">
                      <Card data={item} />
                    </div>
                  ))}
              </div>

              <div className="sm:hidden block w-full">
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
                  {eatTypeData?.length > 0 &&
                    eatTypeData.map((item) => (
                      <SwiperSlide key={item.blogId}>
                        <Card data={item} />
                      </SwiperSlide>
                    ))}
                </Swiper>
              </div>

              <div className="sm:w-full flex justify-center mt-5">
                <button className="rounded-[30px] hover:bg-primaryHover transition bg-primary flex items-center gap-3 py-[10px] px-[20px] text-[20px] font-medium text-white">
                  Xem thêm
                  <div className="bg-cover w-[20px] h-[20px]" style={{ backgroundImage: `url(${ic_boiling_white})` }} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full sm:mt-[4%] mt-[10%]">&nbsp;&nbsp;</div>
    </section>
  );
};

export default SuggestEatType;
