import { useState } from 'react';
import { ic_payment_black, ic_online_payment, ic_cash_payment } from '../../../assets';

const Payments = () => {
  // ** Const
  const [paymentType, setPaymentType] = useState(1);

  return (
    <div className="font-inter w-full bg-white rounded-[5px] px-[14px] py-2">
      {/* header */}
      <div className="pb-2 border-b flex items-center gap-2">
        <img alt="" src={ic_payment_black} className="object-contain w-[24px] h-[24px]" />
        <p className="uppercase text-black font-medium text-[18px]">Phương thức thanh toán</p>
      </div>
      {/* body */}
      <div className="mb-2 mt-5">
        <div className="flex items-center gap-2" onClick={() => setPaymentType(1)}>
          <div className="w-[20px] h-[20px] rounded-full border-gray-500 border cursor-pointer relative">
            <div
              className={`w-[13px] h-[13px] rounded-full ${
                paymentType === 1 ? 'bg-primary' : 'bg-white'
              } absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]`}
            />
          </div>
          <div className="flex gap-2 items-center cursor-pointer select-none">
            <div
              className="w-[24px] h-[24px] bg-center bg-cover bg-no-repeat"
              style={{ backgroundImage: `url(${ic_online_payment})` }}
            />
            <p className="">Thanh toán online (Paypal)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
