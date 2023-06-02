import { useState, useEffect } from 'react';
import { ic_payment_black, ic_online_payment, ic_cash_payment } from '../../../assets';

// ** redux
import { useDispatch, useSelector } from 'react-redux';
import { setPaymentMethod } from '../../../redux/actionSlice/shoppingCartSlice';

const Payments = () => {
  // ** Const
  const dispatch = useDispatch();
  const paymentMethod = useSelector((state) => state.cart.paymentMethod);
  const [paymentType, setPaymentType] = useState(0);
  useEffect(() => {
    dispatch(setPaymentMethod(-1));
  }, []);

  return (
    <div id="paymentMethod" className="font-inter w-full bg-white rounded-[5px] px-[14px] py-2">
      {/* header */}
      <div className="pb-2 border-b flex items-center gap-2">
        <img alt="" src={ic_payment_black} className="object-contain w-[24px] h-[24px]" />
        <p className="uppercase text-black font-medium text-[18px]">Phương thức thanh toán</p>
      </div>
      {/* body */}
      <div className="mb-2 mt-5">
        {/* payment 2 */}
        {/* <div className="flex items-center gap-2 mb-5" onClick={() => dispatch(setPaymentMethod(0))}>
          <div className="w-[20px] h-[20px] rounded-full border-gray-500 border cursor-pointer relative">
            <div
              className={`w-[13px] h-[13px] rounded-full ${
                paymentMethod === 0 ? 'bg-primary' : 'bg-white'
              } absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]`}
            />
          </div>
          <div className="flex gap-2 items-center cursor-pointer select-none">
            <div
              className="w-[24px] h-[24px] bg-center bg-cover bg-no-repeat"
              style={{ backgroundImage: `url(${ic_cash_payment})` }}
            />
            <p className="">Thanh toán khi nhận hàng (COD)</p>
          </div>
        </div> */}
        {/* payment 1 */}
        <div className="flex items-center gap-2" onClick={() => dispatch(setPaymentMethod(1))}>
          <div className="w-[20px] h-[20px] rounded-full border-gray-500 border cursor-pointer relative">
            <div
              className={`w-[13px] h-[13px] rounded-full ${
                paymentMethod === 1 ? 'bg-primary' : 'bg-white'
              } absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]`}
            />
          </div>
          <div className="flex gap-2 items-center cursor-pointer select-none">
            <div
              className="w-[24px] h-[24px] bg-center bg-cover bg-no-repeat"
              style={{ backgroundImage: `url(${ic_online_payment})` }}
            />
            <p className="">Thanh toán online (PayPal)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
