import React from 'react';
import { Modal } from '@mui/material';
import { Tooltip } from '@mui/material';
import moment from 'moment/moment';

// ** Voucher component
const Voucher = (props) => {
  const { data, handleSelectVoucher, orderTotalPrice } = props;
  return (
    <div className={`w-full h-full rounded bg-secondary border-2 border-primary p-4 `}>
      {/* header */}
      <div className="pb-2 border-b-2 border-b-primary">
        <p className="text-black font-semibold text-[18px]">{data?.name}</p>
      </div>
      {/* body */}
      <div className="mt-2 h-full">
        <p className=" leading-[30px]">
          Giảm{' '}
          <span className="text-redError text-[18px] font-bold">
            {data?.discount <= 1 ? `${data.discount * 100}%` : `${Intl.NumberFormat().format(data.discount)}đ`}
          </span>{' '}
          <span>cho đơn hàng có tổng giá trị từ</span>{' '}
          <span className="text-black font-medium">{Intl.NumberFormat().format(data.minimumOrderPrice)}đ</span>
          {data?.discount <= 1 && (
            <>
              {' '}
              <span>đến</span>{' '}
              <span className="text-black font-medium">{Intl.NumberFormat().format(data?.maximumOrderPrice)}đ</span>
            </>
          )}
        </p>

        {/* valid to */}
        <div className="w-full flex justify-between items-center mt-5">
          <button
            disabled={orderTotalPrice < data.minimumOrderPrice}
            onClick={() => handleSelectVoucher(data)}
            className={`${
              orderTotalPrice < data.minimumOrderPrice ? 'cursor-not-allowed bg-red-300' : 'bg-redError'
            }  px-3 py-2 rounded-[5px] text-white font-medium uppercase`}
          >
            Sử dụng
          </button>
          <Tooltip title="Thời gian hiệu lực - hết hạn" placement="top">
            <p className="text-[14px]">
              {/* Thời gian hiệu lực:{' '} */}
              <span>
                {moment(data?.validFrom).format('Do MMM YY')} - {moment(data?.validTo).format('Do MMM YY')}
              </span>
            </p>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

const ModalSelectVoucher = (props) => {
  const { openModalVoucher, setOpenModalVoucher, data, handleSelectVoucher, orderTotalPrice } = props;

  return (
    <Modal open={openModalVoucher} onClose={() => setOpenModalVoucher(false)}>
      <div
        className="fixed left-[50%]
      top-[50%] translate-y-[-50%] translate-x-[-50%] bg-white rounded-[5px] sm:w-fit w-full"
      >
        <div className="px-7 py-6">
          {/* header */}
          <div className="pb-2 mb-5 border-b border-[#b7b7b7]">
            <p className="text-[18px] font-medium">Mã giảm giá có thể sử dụng</p>
          </div>
          <div className="max-h-[250px] scroll-bar overflow-x-hidden overflow-y-scroll">
            {/* <div className="grid xs:grid-cols-1 smd:grid-cols-2 xxlg:grid-cols-3 xl:grid-cols-3 gap-[8px]"> */}
            {data?.map((item) => (
              <div className="sm:w-[400px] w-full mb-2 first:mb-0" key={item.voucher.voucherId}>
                <Voucher
                  data={item.voucher}
                  handleSelectVoucher={handleSelectVoucher}
                  orderTotalPrice={orderTotalPrice}
                />
              </div>
            ))}
            {/* </div> */}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalSelectVoucher;
