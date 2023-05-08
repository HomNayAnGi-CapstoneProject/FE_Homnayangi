import { useState, useEffect } from 'react';
import truncate from '../../../utils/truncate';
import instances from '../../../utils/plugin/axios';
import generateSlug from '../../../utils/generateSlug';
import Image from '../../../share/components/Image';
import Loading from '../../../share/components/Admin/Loading';
import SuggestForm from './SuggestForm';
import ModalOrderCooked from '../../../share/components/Modal/ModalOrderCooked/ModalOrderCooked';
import ModalRequireLogin from '../../../share/components/Modal/ModalRequireLogin';
import { getSuggestData, setOpenFormSuggest } from '../../../redux/actionSlice/globalSlice';
import { addItemNoStock, getShoppingCart } from '../../../redux/actionSlice/shoppingCartSlice';

// ** Assets
import styles from '../../../style';
import staticFood1 from '../../../assets//images/staticFood1.png';
import { ic_add_to_cart_white, ic_boiling_white, ic_refresh_white, ic_blog_active, ic_FAQ } from '../../../assets';

// ** Third party library
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, EffectFade, Autoplay } from 'swiper';
import 'swiper/css';
// import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import jwt_decode from 'jwt-decode';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

// ** Card component
const Card = (props) => {
  return (
    <Link to={'/recipe/' + props?.data?.blogId + '/' + generateSlug(props?.data?.title)}>
      <div className="relative font-inter cursor-pointer rounded-[10px] sm:w-[400px] sm:h-[155px] md:w-[515px] w-full md:h-[165px] h-fit bg-[#FFA883] p-[10px] flex gap-[18px] drop-shadow-3xl">
        <div className="flex-1">
          <p className="sm:text-[20px] text-[18px] font-semibold text-black mb-[5px] line-clamp-1">
            {props?.data?.title}
          </p>
          <div className="flex gap-[7px]">
            {props?.data?.listSubCateName?.length > 0 &&
              props?.data?.listSubCateName?.slice(0, 2)?.map((item, index) => (
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
            className="leading-[25px] mt-[10px] md:line-clamp-3 line-clamp-2"
          ></div>
        </div>
        <Image
          className="rounded-[10px] border-[2px] border-solid border-white object-cover bg-cover sm:w-[180px] sm:h-[137px] md:w-[190px] w-[150px] h-[150px] md:h-[147px] bg-center"
          src={props?.data?.imageUrl}
          alt={props?.data?.title}
        />
        <div className="absolute top-0 right-0 w-[50px] h-[60px] bg-gradient-to-t from-redError to-primary rounded-tr-[10px] rounded-bl-[10px] flex flex-col items-center justify-center">
          <p className="text-[12px] font-medium text-white">Kcal</p>
          <p className="font-bold text-white line-clamp-1 ">{Intl.NumberFormat().format(props?.data?.totalKcal)}</p>
        </div>
      </div>
    </Link>
  );
};

const SuggestToday = () => {
  // ** Const
  const [openOrderCooked, setOpenOrderCooked] = useState(false);
  const [orderCookedData, setOrderCookedData] = useState();

  const [todayData, setTodayData] = useState(null);
  const [suggestCalo, setSuggestCalo] = useState(0);
  const [soup, setSoup] = useState(null);
  const [changeData, setChangeData] = useState(false);
  const [imgList, setImgList] = useState([]);
  const formSuggestData = JSON.parse(localStorage.getItem('FORM_SUGGEST'));
  const store = useSelector((state) => state.global);
  const dispatch = useDispatch();
  const notifyError = () =>
    toast.error('Xin lỗi chúng tôi chưa có đủ dữ liệu cho thông tin này', {
      pauseOnHover: false,
    });
  const notifyErrorMess = (msg) =>
    toast.error(msg, {
      pauseOnHover: false,
    });
  const shippedDate = localStorage.getItem('curShDate');
  const accessToken = localStorage.getItem('accessToken');
  let decoded_jwt = {};
  if (accessToken) {
    decoded_jwt = jwt_decode(accessToken);
  }
  const [openRequireLogin, setOpenRequireLogin] = useState(false);

  const HtmlTooltip = styled(({ className, ...props }) => <Tooltip {...props} classes={{ popper: className }} />)(
    ({ theme }) => ({
      [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: 16,
        border: '1px solid #dadde9',
      },
    }),
  );

  useEffect(() => {
    dispatch(getSuggestData());
  }, []);

  // ** call api
  useEffect(() => {
    if (store?.sugesstFormData?.Age !== undefined) {
      const fetch = async () => {
        try {
          const res = await instances.get(
            `/blogs/suggest-blog/${store?.sugesstFormData.Age}/${store?.sugesstFormData.IsMale}/${store?.sugesstFormData.IsLoseWeight}`,
          );
          // console.log(res)
          if (res.data.status == 'failed') {
            notifyErrorMess(res.data.msg);
          } else {
            setSuggestCalo(res.data?.result?.calo);
            setTodayData(res.data?.result?.suggestBlogs);
            setImgList(res.data?.result?.suggestBlogs.map((item) => item.imageUrl));
          }
        } catch (error) {
          notifyError();
        }
      };
      fetch();
    }
  }, [store?.sugesstFormData]);

  // ** functions
  //** handle add to cart */
  const handleAddToCart = (data, isCook) => {
    if (accessToken) {
      if (isCook == false) {
        let requestObject = {
          cusId: decoded_jwt.Id,
          orderDetails: data.recipeDetails,
          isCook: isCook,
          orderName: data.recipeTitle,
          id: data.recipeId,
          img: data.imageUrl,
          amount: 1,
          price: isCook ? data.cookedPrice : data.packagePrice,
          shippedDate: shippedDate ? shippedDate : null,
        };
        // console.log(requestObject);
        dispatch(addItemNoStock(requestObject));
        dispatch(getShoppingCart());
      }
    } else {
      setOpenRequireLogin(true);
    }
  };

  // ** handle add all 3 to cart
  const handleAddAllToCart = (isCook) => {
    if (accessToken) {
      if (isCook) {
        setOpenOrderCooked(true);
      } else {
        todayData?.forEach((item) => {
          handleAddToCart(item, isCook);
        });
      }
    } else {
      setOpenRequireLogin(true);
    }
  };

  return (
    <>
      {openOrderCooked && (
        <ModalOrderCooked
          openCookedOrderModal={openOrderCooked}
          setOpenCookedOrderModal={setOpenOrderCooked}
          listData={todayData}
        />
      )}
      {openRequireLogin && (
        <ModalRequireLogin openRequireLogin={openRequireLogin} setOpenRequireLogin={setOpenRequireLogin} />
      )}
      <section className={`today-suggest font-inter w-full h-fit ${styles.paddingY}`}>
        <div className="text-center">
          <p className="text-primary uppercase font-semibold text-[18px] mb-2 tracking-widest">Bữa ăn gia đình</p>
          <div className="w-full flex justify-center items-center gap-3">
            <p className="font-bold text-[40px] sm:w-[470px] sm:px-0 px-5 w-full leading-[55px]">
              Gợi ý thực đơn hôm nay
            </p>
            <HtmlTooltip
              title={
                <>
                  <p>
                    Lượng calories gợi ý được dựa trên thông tin thu thập từ{' '}
                    <a
                      target="_blank"
                      href="https://www.vinmec.com/vi/tin-tuc/thong-tin-suc-khoe/dinh-duong/nhu-cau-calo-uoc-tinh-moi-ngay-theo-do-tuoi-gioi-tinh/"
                      className="underline text-primary font-semibold"
                    >
                      vinmec.com
                    </a>
                  </p>
                </>
              }
              placement="top"
            >
              <img alt="" className="object-cover w-[20px]" src={ic_FAQ} />
            </HtmlTooltip>
          </div>
          {suggestCalo !== 0 && (
            <p className="text-gray-500 my-2 font-medium">
              Calories gợi ý dựa trên giới tính, độ tuổi và nhu cầu giảm cân của bạn là:{' '}
              <span className="text-primary font-bold">{suggestCalo}</span>
            </p>
          )}
        </div>

        {!todayData?.length > 0 || store?.openFormSuggest == true ? (
          <div className="mt-[5%] flex w-full justify-center">
            <SuggestForm data={store?.sugesstFormData} />
          </div>
        ) : (
          <>
            <div className="w-full bg-[#f6e4dc] md:h-[412px] mmd:h-[550px] ss:h-[690px] h-[550px] mt-[7%] relative">
              {todayData?.length > 0 ? (
                <>
                  <div
                    className={`${styles.paddingX} w-full absolute z-[10] left-[50%]  md:top-[-50%] sm:top-[-20%] top-[-10%] translate-y-[25%] translate-x-[-50%] flex justify-center sm:flex-row flex-col-reverse`}
                  >
                    <div className={`${styles.container} flex`}>
                      <div className="mmd:flex hidden sm:w-[50%] w-full flex-col">
                        <div className="flex md:w-full bottom-[-50px] right-[90px] sm:flex-col">
                          {todayData?.length > 0 &&
                            todayData.map((item) => (
                              <div
                                key={item.blogId}
                                className="w-fit sm:mb-[18px] sm:last:mb-0 md:odd:self-end md:odd:mr-5"
                              >
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
                            {/* <img
                    className="rounded-full absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] object-cover border-[2px] border-white md:w-[490px] md:h-[490px] ss:w-[420px] ss:h-[420px] w-[290px] h-[290px]"
                    alt={''}
                    src={soup?.imageUrl}
                    loading="lazy"
                  /> */}
                            <Swiper
                              effect={'fade'}
                              autoplay={{
                                delay: 8500,
                                disableOnInteraction: false,
                              }}
                              navigation={false}
                              spaceBetween={30}
                              modules={[EffectFade, Autoplay]}
                              className="mySwiper"
                            >
                              {imgList?.length > 0 &&
                                imgList?.map((item, i) => (
                                  <SwiperSlide key={i}>
                                    <Image
                                      alt={''}
                                      src={item}
                                      className="rounded-full absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] object-cover border-[2px] border-white md:w-[490px] md:h-[490px] ss:w-[420px] ss:h-[420px] w-[290px] h-[290px]"
                                    />
                                  </SwiperSlide>
                                ))}
                            </Swiper>
                          </div>
                          <p className="font-bold md:text-[35px] text-[28px] line-clamp-1 mt-1">
                            {truncate(soup?.title, 20)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mmd:hidden block w-full px-[16px] absolute top-0">
                    <div className="w-full flex flex-col items-center text-center">
                      <div className="bg-primary relative md:w-[520px] md:h-[520px] sm:w-[450px] sm:h-[450px] ss:w-[450px] ss:h-[450px] w-[320px] h-[320px] rounded-full">
                        <Swiper
                          effect={'fade'}
                          autoplay={{
                            delay: 8500,
                            disableOnInteraction: false,
                          }}
                          navigation={false}
                          spaceBetween={30}
                          modules={[EffectFade, Autoplay]}
                          className="mySwiper"
                        >
                          {imgList?.length > 0 &&
                            imgList?.map((item, i) => (
                              <SwiperSlide key={i}>
                                <Image
                                  alt={''}
                                  src={item}
                                  className="rounded-full absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] object-cover border-[2px] border-white md:w-[490px] md:h-[490px] ss:w-[420px] ss:h-[420px] w-[290px] h-[290px]"
                                />
                              </SwiperSlide>
                            ))}
                        </Swiper>
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
                </>
              ) : (
                <Loading />
              )}
            </div>

            {todayData?.length > 0 && (
              <div className="w-full flex justify-center text-center md:mt-[9%] mt-[5%]">
                <div className="flex sm:gap-[15px] gap-[15px]">
                  <button
                    onClick={() => handleAddAllToCart(false)}
                    className="bg-primary hover:bg-primaryHover rounded-tl-[30px] rounded-bl-[30px] rounded-tr-[5px] rounded-br-[5px] text-medium text-white text-[20px] flex items-center gap-3 py-[10px] sm:px-[20px] px-[10px]"
                  >
                    Đặt mua
                    <div
                      className="bg-cover w-[20px] h-[20px]"
                      style={{ backgroundImage: `url(${ic_add_to_cart_white})` }}
                    />
                  </button>
                  <button
                    className="border bg-gray-400 rounded-[10px] py-[10px] sm:px-[20px] px-[10px]"
                    onClick={() => {
                      dispatch(setOpenFormSuggest(true));
                      setTodayData(null);
                    }}
                  >
                    <div className="bg-cover w-[20px] h-[20px]" style={{ backgroundImage: `url(${ic_blog_active})` }} />
                  </button>
                  <button
                    onClick={() => handleAddAllToCart(true)}
                    className="bg-redError hover:bg-redErrorHover rounded-tl-[5px] rounded-bl-[5px] rounded-tr-[30px] rounded-br-[30px] text-medium text-white text-[20px] flex items-center gap-3 py-[10px] sm:px-[20px] px-[10px]"
                  >
                    Đặt làm
                    <div
                      className="bg-cover w-[20px] h-[20px]"
                      style={{ backgroundImage: `url(${ic_boiling_white})` }}
                    />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
};

export default SuggestToday;
