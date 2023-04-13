import { useState, useEffect } from 'react';
import instances from '../../../../../../../../utils/plugin/axios';
import Image from '../../../../../../../../share/components/Image';
import { ic_user_gray, ic_phone_gray, ic_location_gray, ic_time_gray } from '../../../../../../../../assets';
import ModalCartItemDetail from '../../../../../../../../share/components/Modal/ModalCartItemDetail/ModalCartItemDetail';
import ModalCancelOrder from '../../../../../../../../share/components/Modal/ModalCancelOrder/ModalCancelOrder';

import moment from 'moment/moment';
import { toast } from 'react-toastify';

const Item = (props) => {
  const { data, setUpdateCalls } = props;
  const [openDetail, setOpenDetail] = useState(false);
  const [openCancel, setOpenCancel] = useState(false);
  const [canceling, setCanceling] = useState(false);
  const [cancelDetail, setCancelDetail] = useState();
  const [detailData, setDetailData] = useState();
  const [detailTotalPrice, setDetailTotalPrice] = useState(0);
  const [detailCookedImg, setDetailCookedImg] = useState();

  const successNotify = (msg) => {
    toast.success(msg, {});
  };

  // ** handle open detail item
  const handleOpenDetail = (item) => {
    setOpenDetail(true);
    setDetailData(item);
    setDetailTotalPrice(data?.isCooked ? item?.cookedPrice : item?.packagePrice);
    setDetailCookedImg(item?.recipeImage);
  };

  // ** handle open cancel order
  const handleOpenCancelOrder = (item) => {
    setOpenCancel(true);
    setCancelDetail(item);
  };

  // ** handle cancel order
  const handleCancelOrder = async (data) => {
    // console.log(data?.orderId);
    setCanceling(true);
    await instances.put(`/orders/cancel/${data?.orderId}`);
    setCanceling(false);
    successNotify('Đơn hàng đã được hủy');
    setUpdateCalls((prev) => !prev);
  };

  return (
    <>
      {openDetail && (
        <ModalCartItemDetail
          openDetailModal={openDetail}
          setOpenDetailModal={setOpenDetail}
          data={detailData}
          detailTotalPrice={detailTotalPrice}
          detailCookedImg={detailCookedImg}
          isCooked={data?.isCooked}
          shippedDate={data?.shippedDate}
          isDone={true}
        />
      )}
      {openCancel && (
        <ModalCancelOrder
          openModal={openCancel}
          setOpenModal={setOpenCancel}
          data={cancelDetail}
          handleCancelOrder={handleCancelOrder}
          canceling={canceling}
        />
      )}
      <div className="md:flex mt-5">
        {/* thông tin đơn hàng */}
        <div className="md:w-2/4 max-h-[180px] scroll-bar overflow-y-scroll">
          {/* recipeDetails */}
          {data?.orderDetailRecipes?.map((item, i) => (
            <div key={item.recipeId} className="flex w-full mt-5 first:mt-0">
              <div className="md:w-1/2 flex gap-3">
                <Image alt="" className={'object-cover rounded-[5px] w-[80px] h-[80px]'} src={item?.recipeImage} />
                <div className="flex-1">
                  <p className="text-[#897D7D] text-[14px]">{item?.recipeName}</p>
                </div>
              </div>
              <div className="md:w-1/2 flex flex-col items-end">
                <div className="w-fit text-[14px]">
                  <p>
                    Đơn giá:
                    <span className="font-semibold">
                      {Intl.NumberFormat().format(data?.isCooked ? item?.cookedPrice : item?.packagePrice)}đ
                    </span>
                  </p>
                  <p>
                    Số lượng: <span className="font-semibold">{item?.recipeQuantity}</span>
                  </p>
                </div>
                <button onClick={() => handleOpenDetail(item)} className="underline text-[14px] text-primary">
                  Chi tiết
                </button>
              </div>
            </div>
          ))}
          {/* ingredientDetail */}
          {data?.orderDetailIngredients?.length > 0 &&
            data?.orderDetailIngredients?.map((item) => (
              <div key={item.ingredientId} className="flex w-full mt-5 first:mt-0">
                <div className="md:w-1/2 flex gap-3">
                  <Image
                    alt=""
                    className={'object-cover rounded-[5px] w-[80px] h-[80px]'}
                    src={item?.ingredientImage}
                  />
                  <div className="flex-1">
                    <p className="text-[#897D7D] text-[14px]">{item?.ingredientName}</p>
                  </div>
                </div>
                <div className="md:w-1/2 flex flex-col items-end">
                  <div className="w-fit text-[14px]">
                    <p>
                      Đơn giá: <span className="font-semibold">{Intl.NumberFormat().format(item?.price)}đ</span>
                    </p>
                    <p>
                      Số lượng: <span className="font-semibold">{item?.quantity}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {/* thong tin nguoi nhan */}
        <div className="md:w-1/4 flex flex-col">
          <p className="font-medium text-black my-4 md:hidden block">Thông tin người nhận</p>
          <div className="flex flex-col md:bg-white bg-[#FDE9E0] md:p-0 p-3 rounded-[5px]">
            {/* customer name */}
            <div className="flex gap-2">
              <div className="md:w-1/2  flex justify-end">
                <img alt="" className="object-cover w-[24px] h-[24px]" src={ic_user_gray} />
              </div>
              <div className="md:w-1/2 ">
                <p className="text-[#898989] mb-2">{data?.shippedAddress.split(',')[0]}</p>
              </div>
            </div>
            {/* phonenumber */}
            <div className="flex gap-2">
              <div className="md:w-1/2 flex justify-end">
                <img alt="" className="object-contain w-[24px] h-[24px]" src={ic_phone_gray} />
              </div>
              <div className="md:w-1/2 ">
                <p className="text-[#898989] mb-2">{data?.shippedAddress.split(',')[1] || 0}</p>
              </div>
            </div>
            {/* address */}
            <div className="flex gap-2">
              <div className="md:w-1/2  flex justify-end">
                <img alt="" className="object-contain w-[23px] h-[23px]" src={ic_location_gray} />
              </div>
              <div className="md:w-1/2 ">
                <p className="text-[#898989] mb-2">
                  {data?.shippedAddress.split(',')[3] +
                    ', ' +
                    data?.shippedAddress.split(',')[4] +
                    ', ' +
                    data?.shippedAddress.split(',')[5]}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* thoi gian dat hang */}
        <div className="md:w-1/4">
          <p className="font-medium text-black my-4 md:hidden block">Thời gian đặt hàng</p>
          <div className="flex gap-2">
            <div className="md:w-1/2  flex justify-end">
              <img alt="" className="object-contain w-[23px] h-[23px]" src={ic_time_gray} />
            </div>
            <div className="md:w-1/2 ">
              <p className="text-[#898989] mb-2">{moment(data?.orderDate).format('Do MMM YY')}</p>
            </div>
          </div>
          <div className="flex md:justify-end">
            <p className="text-[15px]">
              Loại:{' '}
              <span className={`${data?.isCooked ? 'text-redError' : 'text-primary'}`}>
                {data?.isCooked ? 'Đặt nấu' : 'Gói nguyên liệu'}
              </span>
            </p>
          </div>
          <div className="flex md:justify-end mt-2">
            <p className="text-[15px]">
              Thanh toán <span className={``}>{data?.paymentMethod == 1 ? 'Online' : 'khi nhận hàng'}</span>
            </p>
          </div>
          <div className="flex md:justify-end mt-2">
            <p className="text-[18px] font-bold text-redError">{Intl.NumberFormat().format(data?.totalPrice)}đ</p>
          </div>
          <div className="flex items-end justify-end  mt-5">
            {data?.orderStatus == 1 && data?.paymentMethod == 1 ? (
              <div>
                <div
                  onClick={() => window.location.replace(data.paypalUrl)}
                  className="cursor-pointer px-5 w-fit py-3 rounded-[2px] border uppercase bg-primary text-white font-medium"
                >
                  thanh toán lại
                </div>
                <button
                  onClick={() => handleOpenCancelOrder(data)}
                  className="bg-redError text-white font-medium w-full mt-3 uppercase px-5 py-3 rounded-[2px]"
                >
                  Hủy đơn
                </button>
              </div>
            ) : (
              <></>
            )}
            {data?.orderStatus == 1 && data?.paymentMethod == 0 ? (
              <div>
                <div className="cursor-pointer px-5 w-fit py-3 rounded-[2px] border uppercase text-[#acacac] border-[#acacac]">
                  chờ duyệt
                </div>
                <button
                  onClick={() => handleOpenCancelOrder(data)}
                  className="bg-redError text-white font-medium w-full mt-3 uppercase px-5 py-3 rounded-[2px]"
                >
                  Hủy đơn
                </button>
              </div>
            ) : (
              <></>
            )}
            {data?.orderStatus == 2 && (
              <div className="px-5 w-fit py-3 rounded-[2px] border uppercase text-blue-500 border-blue-500">
                đã xác nhận
              </div>
            )}
            {data?.orderStatus == 3 && (
              <div className="px-5 w-fit py-3 rounded-[2px] border uppercase text-redError border-redError">đã hủy</div>
            )}
            {data?.orderStatus == 5 && (
              <div className="px-5 w-fit py-3 rounded-[2px] border uppercase text-primary border-primary">
                đang giao
              </div>
            )}
            {data?.orderStatus == 6 && (
              <div className="px-5 w-fit py-3 rounded-[2px] border uppercase text-[#88EA5B] border-[#88EA5B]">
                đã giao
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Item;
