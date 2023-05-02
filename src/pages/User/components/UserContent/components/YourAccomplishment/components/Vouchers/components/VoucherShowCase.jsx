import { useEffect, useState } from 'react';
import instances from '../../../../../../../../../utils/plugin/axios';
import moment from 'moment/moment';
import { Tooltip } from '@mui/material';
import jwt_decode from 'jwt-decode';

// ** Voucher component
const Voucher = (props) => {
  const { data } = props;
  return (
    <div className={`w-full h-full rounded bg-secondary border-2 border-primary p-4 `}>
      {/* header */}
      <div className="pb-2 border-b-2 border-b-primary">
        <p className="text-black font-semibold text-[18px]">{data?.voucherName}</p>
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
              <span>Giảm giá tối đa</span>{' '}
              <span className="text-black font-medium">{Intl.NumberFormat().format(data?.maximumOrderPrice)}đ</span>
            </>
          )}
        </p>

        {/* valid to */}
        <div className="w-full flex justify-end mt-5">
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

const VoucherShowCase = () => {
  // ** const
  const accessToken = localStorage.getItem('accessToken');
  let decoded_jwt = {};
  if (accessToken) {
    decoded_jwt = jwt_decode(accessToken);
  }
  const [voucherOwnList, setVoucherOwnList] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await instances.get(`/customervouchers/customer/${decoded_jwt?.Id}/vouchers`);
      setVoucherOwnList(res.data.result);
    };
    fetch();
  }, []);

  return (
    <div>
      {voucherOwnList?.length > 0 ? (
        <div className="grid xs:grid-cols-1 smd:grid-cols-2 xxlg:grid-cols-3 xl:grid-cols-3 gap-[8px]">
          {voucherOwnList?.map((item) => (
            <div key={item.customerVoucherId}>
              <Voucher data={item} />
            </div>
          ))}
        </div>
      ) : (
        <p>Hiện chưa có mã giảm giá nào có thể sử dụng</p>
      )}
    </div>
  );
};

export default VoucherShowCase;
