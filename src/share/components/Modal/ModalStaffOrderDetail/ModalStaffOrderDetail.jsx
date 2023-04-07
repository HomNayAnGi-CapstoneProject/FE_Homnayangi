import { useState, useEffect } from 'react';
import instances from '../../../../utils/plugin/axios';
import OrderDetailItem from './components/OrderDetailItem';

import { Modal } from '@mui/material';
import { QRCodeSVG } from 'qrcode.react';

const ModalStaffOrderDetail = (props) => {
  const { openDetailModal, setOpenDetailModal, data, detailTotalPrice, detailCookedImg, isCooked } = props;

  const [detailData, setDetailData] = useState();

  // ** get order detail data **
  useEffect(() => {
    // console.log(data);
    const fetch = async () => {
      const res = await instances.get('/orders/status', {
        params: { status: data?.orderStatus },
      });
      setDetailData(res.data.find((item) => item.orderId == data?.orderId));
    };
    fetch();
  }, []);

  function checkStatus(status, paymentMethod) {
    switch (status) {
      case 1:
        return <p className="text-gray-500 font-medium">{paymentMethod == 1 ? 'CHỜ THANH TOÁN' : 'CHỜ DUYỆT'}</p>;
      case 2:
        return <p className="text-blue-500 font-medium">{paymentMethod == 1 ? 'ĐÃ THANH TOÁN' : 'ĐÃ DUYỆT'}</p>;
      case 5:
        return <p className="text-yellow-500 font-medium">ĐANG GIAO</p>;
      case 3:
        return <p className="text-red-500 font-medium">ĐÃ HỦY</p>;
      case 6:
        return <p className="text-green-400 font-medium">ĐÃ GIAO</p>;
      default:
        break;
    }
  }

  return (
    <Modal open={openDetailModal} onClose={() => setOpenDetailModal(false)}>
      <div
        className="fixed left-[50%]
      top-[50%] translate-y-[-50%] translate-x-[-50%] sm:w-fit w-full bg-white rounded-[3px] px-3 py-4"
      >
        {detailData && (
          <div className="font-inter">
            {/* header */}
            <div className="pb-2 border-b border-[#b7b7b7] ">
              <div className="flex gap-4 items-center">
                <p className="text-[18px] font-medium">Thông tin đơn hàng</p>
                {checkStatus(data?.orderStatus, data?.paymentMethod)}
              </div>
            </div>
            {/* content */}
            <OrderDetailItem data={detailData} />
            <div className="w-full flex gap-10 border-t border-[#b7b7b7] pt-5">
              {/* QRcode */}
              {data?.orderStatus == 5 && (
                <div>
                  <p className="text-[18px] font-medium">Mã đơn hàng</p>
                  <div className="my-3">
                    <QRCodeSVG value={data?.orderId} size={150} level={'H'} />
                  </div>
                </div>
              )}
              {/* footer */}
              <div className="sm:w-[350px] w-full ">
                <p className="text-[18px] font-medium">Thông tin khách hàng</p>
                <p className="mt-2 font-medium text-gray-400">
                  Khách hàng: <span className="text-black">{detailData?.shippedAddress.split(',')[0]}</span>
                </p>
                <p className="mt-2 font-medium text-gray-400">
                  Sđt: <span className="text-black">{detailData?.shippedAddress.split(',')[1]}</span>
                </p>
                <p className="mt-2 font-medium text-gray-400">
                  Địa chỉ:{' '}
                  <span className="text-black">
                    {detailData?.shippedAddress.split(',')[3] +
                      ', ' +
                      detailData?.shippedAddress.split(',')[4] +
                      ', ' +
                      detailData?.shippedAddress.split(',')[5]}
                  </span>
                </p>
                <p className="text-[18px] mt-2 text-redError font-bold">
                  Tổng: <span>{Intl.NumberFormat().format(detailData?.totalPrice)}đ</span>
                </p>
              </div>
            </div>
            <button
              onClick={() => setOpenDetailModal(false)}
              className="bg-primary mt-5 w-full rounded-[5px] px-5 py-2 text-white font-medium"
            >
              Xác nhận
            </button>
          </div>
        )}
        {/* {data &&
          (data.isCook || isCooked ? (
            <div>
              <div className=" border-solid border-b-[1px] pb-2 px-2">
                <p className="text-[16px] font-semibold">Đặt làm: </p>
                <p className="text-[16px] line-clamp-2 text-primary font-semibold">
                  {data?.orderName || data?.recipeName}
                </p>
              </div>
              <Image src={detailCookedImg} alt="" className="sm:w-[430px] h-[260px] object-cover w-full" />
              <div className="my-5 flex items-center gap-2">
                <img src={ic_clock_red} className="w-[24px] h-[24px] object-contain" />
                <p className="text-redError">Đọc từ config</p>
              </div>
              <button
                onClick={() => setOpenDetailModal(false)}
                className="text-white rounded-[5px] w-full bg-redError py-[5px] text-center cursor-pointer text-[18px]"
              >
                Xác nhận
              </button>
            </div>
          ) : (
            <div>
              <div className=" border-solid border-b-[1px] pb-2 px-2">
                <p className="text-[16px] font-semibold">Gói nguyên liệu: </p>
                <p className="text-[16px] line-clamp-2 text-primary font-semibold">
                  {data?.orderName || data?.recipeName}
                </p>
              </div>
              <div className="max-h-[275px] grid sm:grid-cols-2 gap-[10px] scroll-bar overflow-x-hidden overflow-y-scroll py-[15px]">
                {data?.orderDetails?.length > 0 &&
                  data?.orderDetails?.map((item) => (
                    <div key={item?.ingredientId} className="sm:w-[250px]">
                      <Item item={item} />
                    </div>
                  ))}
                {data?.recipeDetails?.length > 0 &&
                  data?.recipeDetails?.map((item) => (
                    <div key={item?.ingredientId} className="sm:w-[250px]">
                      <Item item={item} />
                    </div>
                  ))}
              </div>
              <div className="pt-2 border-solid border-t-[1px]">
                <p className="text-black font-medium py-2">
                  Tổng:{' '}
                  <span className="text-redError font-semibold text-[25px]">
                    {Intl.NumberFormat().format(detailTotalPrice)}đ /gói
                  </span>
                </p>
                <button
                  onClick={() => setOpenDetailModal(false)}
                  className="text-white rounded-[5px] w-full bg-primary py-[5px] text-center cursor-pointer text-[18px]"
                >
                  Xác nhận
                </button>
              </div>
            </div>
          ))} */}
      </div>
    </Modal>
  );
};

export default ModalStaffOrderDetail;
