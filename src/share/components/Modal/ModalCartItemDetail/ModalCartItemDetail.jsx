import React from 'react';
import { Modal } from '@mui/material';
import Item from './components/Item';
import Image from '../../../components/Image';
import { ic_clock_red } from '../../../../assets';
const ModalCartItemDetail = (props) => {
  const {
    openDetailModal,
    setOpenDetailModal,
    data,
    detailTotalPrice,
    detailCookedImg,
    isCooked,
    shippedDate,
    isDone,
  } = props;

  console.log(shippedDate);

  return (
    <Modal open={openDetailModal} onClose={() => setOpenDetailModal(false)}>
      <div
        className="fixed left-[50%]
          top-[50%] translate-y-[-50%] translate-x-[-50%] sm:w-fit w-full bg-white rounded-[3px] px-3 py-4"
      >
        {data &&
          (data.isCook || isCooked ? (
            <div>
              <div className=" border-solid border-b-[1px] pb-2 px-2">
                <p className="text-[16px] font-semibold">Đặt làm: </p>
                <p className="text-[16px] line-clamp-2 text-primary font-semibold">
                  {data?.orderName || data?.packageName}
                </p>
              </div>
              <Image src={detailCookedImg} alt="" className="sm:w-[430px] h-[260px] object-cover w-full" />
              <div className="my-5 flex items-center gap-2">
                <img src={ic_clock_red} className="w-[24px] h-[24px] object-contain" />
                {/* <p className="text-redError">{new Date(new Date(data?.shippedDate).setSeconds(0)).toLocaleString()}</p> */}
                <p className="text-gray-500">
                  Món sẽ được giao vào lúc{' '}
                  <span className="text-redError">
                    {new Date(new Date(shippedDate).setSeconds(0)).toLocaleString()}
                  </span>
                </p>
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
                  {data?.orderName || data?.packageName}
                </p>
              </div>
              <div className="max-h-[275px] grid sm:grid-cols-2 gap-[10px] scroll-bar overflow-x-hidden overflow-y-scroll py-[15px]">
                {data?.orderDetails?.length > 0 &&
                  data?.orderDetails?.map((item) => (
                    <div key={item?.ingredientId} className="sm:w-[250px]">
                      <Item item={item} />
                    </div>
                  ))}
                {data?.packageDetails?.length > 0 &&
                  data?.packageDetails?.map((item) => (
                    <div key={item?.ingredientId} className="sm:w-[250px]">
                      <Item item={item} isDone={isDone} />
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
          ))}
      </div>
    </Modal>
  );
};

export default ModalCartItemDetail;
