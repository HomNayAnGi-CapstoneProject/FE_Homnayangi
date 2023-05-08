import { useState, useEffect } from 'react';
import instances from '../../../../utils/plugin/axios';
import { Modal } from '@mui/material';
import { Tooltip } from '@mui/material';
import moment from 'moment/moment';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const ModalEventVoucher = (props) => {
  const { openModalGiveVoucher, setOpenModalGiveVoucher, accomData, handleSelectVoucher } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const notifySuccess = (msg) => {
    toast.success(msg, {
      pauseOnHover: false,
    });
  };
  const notifyEror = (msg) => {
    toast.error(msg, {
      pauseOnHover: false,
    });
  };
  const [voucherList, setVoucherList] = useState([]);
  const [uploading, setUploading] = useState(false);

  // ** get voucher list
  useEffect(() => {
    const fetch = async () => {
      const res = await instances.get('/vouchers/drop-down');
      // console.log(res.data.result);
      setVoucherList(res.data.result);
    };
    fetch();
  }, []);

  const onSubmit = async (data) => {
    const res = await instances.post('/customervouchers/voucher-giving', {
      voucherId: data?.voucherId,
      customerId: accomData?.authorId,
    });
    if (res.data.status == 'success') {
      notifySuccess('Trao mã thành công');
      setOpenModalGiveVoucher(false);
    } else {
      notifyEror('Bạn đã trao mã này cho khách hàng');
      setOpenModalGiveVoucher(false);
    }
  };

  return (
    <Modal open={openModalGiveVoucher} onClose={() => setOpenModalGiveVoucher(false)}>
      <div
        className="fixed left-[50%]
      top-[50%] translate-y-[-50%] translate-x-[-50%] bg-white rounded-[5px] sm:w-fit w-full"
      >
        <div className="px-7 py-6">
          {/* header */}
          <div className="pb-2 mb-5 border-b border-[#b7b7b7]">
            <p className="text-[18px] font-medium">Chọn mã giảm giá để trao tặng</p>
          </div>
          {/* body */}
          <div className="mt-5">
            <form onSubmit={handleSubmit(onSubmit)}>
              <label>Mã giảm giá</label>
              <select
                className={`block mt-2 w-full h-[47px] ${
                  errors?.voucherId ? 'mb-[5px]' : 'mb-[20px]'
                } p-[12px] text-subText sm:text-md max-h-[100px] overflow-y-scroll border border-[#B9B9B9] rounded-[5px] focus:outline-primary`}
                {...register('voucherId', { required: true })}
              >
                <option value="">Chọn mã giảm giá</option>
                {voucherList &&
                  voucherList.map((type) => (
                    <option key={type.voucherId} value={type.voucherId}>
                      {type.voucherName}
                    </option>
                  ))}
              </select>
              {errors?.voucherId?.type === 'required' && (
                <p className="mb-[5px] text-redError text-[14px]">Mã giảm giá không được trống</p>
              )}

              <button
                disabled={uploading ? true : false}
                type="submit"
                className={`${
                  uploading ? 'cursor-not-allowed' : ''
                } w-full rounded-[5px] mt-[20px] text-white font-semibold text-center bg-primary hover:bg-primaryHover transition py-2`}
              >
                Xác nhận
              </button>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalEventVoucher;
