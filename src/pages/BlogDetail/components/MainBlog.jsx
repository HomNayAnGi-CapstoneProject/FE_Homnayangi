import { useState } from 'react';
import moment from 'moment';
import Breadcrumbs from '../../../share/components/Breadcrumbs';
import Image from '../../../share/components/Image';
import ModalRequireLogin from '../../../share/components/Modal/ModalRequireLogin';
import ModalOrderCooked from '../../../share/components/Modal/ModalOrderCooked/ModalOrderCooked';

// ** Assets
import staticFood from '../../../assets/images/about_1.webp';

// ** redux
import { useDispatch } from 'react-redux';
import { setAddedProduct, addItemNoStock, getShoppingCart } from '../../../redux/actionSlice/shoppingCartSlice';

// ** third party
import { toast } from 'react-toastify';
import jwt_decode from 'jwt-decode';
import { Modal } from '@mui/material';
import YouTube from 'react-youtube';

const MainBlog = (props) => {
  const { blogDetail } = props;
  const dispatch = useDispatch();
  const shippedDate = localStorage.getItem('curShDate');
  const accessToken = localStorage.getItem('accessToken');
  let decoded_jwt = {};
  if (accessToken) {
    decoded_jwt = jwt_decode(accessToken);
  }

  const [openRequireLogin, setOpenRequireLogin] = useState(false);
  const [openOrderCooked, setOpenOrderCooked] = useState(false);
  const [orderCookedData, setOrderCookedData] = useState();

  const opts = {
    height: '420',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      // autoplay: 1,
      // controls: 0,
      // mute: bannerMId.bannerVolumeClicked ? 1 : 0,
      modestbranding: 1,
    },
  };

  // ** functions
  //** handle add to cart */
  const handleAddToCart = (data, isCook) => {
    if (accessToken) {
      if (isCook) {
        setOpenOrderCooked(true);
        setOrderCookedData(data);
      } else {
        let requestObject = {
          cusId: decoded_jwt.Id,
          orderDetails: data.recipeDetails,
          isCook: isCook,
          orderName: data.recipeTitle,
          id: data.recipeId,
          amount: 1,
          img: data.imageUrl,
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

  // ** get url id from URL
  const getVideoIdFromUrl = (url) => {
    const urlParams = new URLSearchParams(new URL(url).search);
    return urlParams.get('v');
  };

  return (
    <>
      {openRequireLogin && (
        <ModalRequireLogin openRequireLogin={openRequireLogin} setOpenRequireLogin={setOpenRequireLogin} />
      )}
      {openOrderCooked && (
        <ModalOrderCooked
          openCookedOrderModal={openOrderCooked}
          setOpenCookedOrderModal={setOpenOrderCooked}
          data={orderCookedData}
        />
      )}
      <div className="font-inter bg-white rounded-[5px] shadow-md">
        {blogDetail ? (
          <>
            <Image
              src={blogDetail?.imageUrl}
              alt=""
              className="w-full object-cover bg-cover bg-center h-[384px] rounded-tl-[5px] rounded-tr-[5px]"
            />
            <div className="py-5 px-5">
              <p className="text-[#8f8f8f] text-[14px] mb-2">
                {moment(blogDetail?.createdDate).startOf('day').fromNow()}
              </p>
              <p className="text-[30px] text-black font-semibold">{blogDetail?.title}</p>
              <div className="flex gap-6 items-center mt-[12px]">
                <p className="text-[16px] text-[#8f8f8f]">
                  <span className="font-bold text-black">Khẩu phần:</span> từ {blogDetail?.minSize} đến{' '}
                  {blogDetail?.maxSize} người
                </p>
                <p className="text-[16px] text-[#8f8f8f]">
                  <span className="font-bold text-black">Thời gian nấu:</span> {blogDetail?.minutesToCook} phút
                </p>
              </div>
              <div className="mt-[20px] flex flex-wrap gap-2">
                {blogDetail?.subCates?.map((item, i) => (
                  <div
                    key={item.subCateId}
                    className="rounded-full w-max bg-[#EAD35B] border-[2px] border-[#8F8137] border-solid xs:px-[10px] px-[2px] py-[0px] text-[12px] text-[#525252]"
                  >
                    {item.name}
                  </div>
                ))}
              </div>
              <div
                dangerouslySetInnerHTML={{ __html: blogDetail?.descriptionHTML }}
                className="mt-[30px] leading-7 text-[18px] unreset"
              ></div>

              <div id="ingredient" className="mt-[30px]">
                <p className="font-semibold text-[20px]">Nguyên liệu:</p>
                <div className="p-5 bg-[#FFDACA] rounded-[10px] mt-[18px] text-[18px]">
                  {blogDetail?.recipeDetails?.length > 0 &&
                    blogDetail?.recipeDetails?.map((item, i) => (
                      <div key={item.ingredientId} className="">
                        <p>
                          {i + 1}.{' '}
                          <span
                            className={`${
                              item.ingredientName == 'Gia vị'
                                ? 'text-black'
                                : 'cursor-pointer text-primary font-semibold'
                            }`}
                          >
                            {item.ingredientName}
                          </span>
                          <span>
                            :{' '}
                            {item.ingredientName == 'Gia vị' ? (
                              <>
                                {item.description.map((item, i) => (
                                  <span key={i} className="cursor-pointer text-primary font-semibold">
                                    {(i ? ', ' : '') + item}
                                  </span>
                                ))}
                                <span>. Hoặc</span>
                                <span className="text-primary cursor-pointer font-semibold">
                                  {' '}
                                  Gói gia vị homnayangi
                                </span>
                              </>
                            ) : (
                              item.description
                            )}
                          </span>
                        </p>
                      </div>
                    ))}
                </div>
              </div>

              <div className="buy-order my-[20px]">
                <div className="flex justify-center items-center gap-6">
                  <i>Mua gói nguyên liệu này?</i>
                  <button
                    onClick={() => handleAddToCart(blogDetail, false)}
                    className="rounded-[5px] bg-primary hover:bg-primaryHover transition px-6 py-2 text-white font-medium uppercase"
                  >
                    Đặt mua
                  </button>
                </div>
                <p className="text-center my-3 text-[#8B8B8B]">Hoặc</p>
                <div className="flex justify-center items-center gap-6">
                  <i>Đặt làm riêng món này?</i>
                  <button
                    onClick={() => handleAddToCart(blogDetail, true)}
                    className="rounded-[5px] bg-redError hover:bg-redErrorHover transition px-6 py-2 text-white font-medium uppercase"
                  >
                    Đặt làm
                  </button>
                </div>
              </div>

              <div id="preparation" className="mt-[30px]">
                <p className="font-semibold text-[20px]">Sơ chế:</p>

                <div
                  dangerouslySetInnerHTML={{ __html: blogDetail?.preparationHTML }}
                  className="preparation-content mt-[18px] leading-7 text-[18px] unreset"
                ></div>
              </div>

              <div id="cooking" className="mt-[30px]">
                <p className="font-semibold text-[20px]">Cách chế biến:</p>

                <div
                  dangerouslySetInnerHTML={{ __html: blogDetail?.processingHTML }}
                  className="cooking-content mt-[18px] leading-7 text-[18px] unreset"
                ></div>
              </div>

              <div id="completion" className="mt-[30px]">
                <p className="font-semibold text-[20px]">Thành phẩm:</p>
                <div
                  dangerouslySetInnerHTML={{ __html: blogDetail?.finishedHTML }}
                  className="completion-content mt-[18px] leading-7 text-[18px] unreset"
                ></div>
              </div>

              <div className="mt-[30px]">
                {blogDetail?.videoUrl && (
                  <>
                    <YouTube videoId={getVideoIdFromUrl(blogDetail?.videoUrl)} opts={opts} />
                  </>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-2">Đang tải...</div>
        )}
      </div>
    </>
  );
};

export default MainBlog;
