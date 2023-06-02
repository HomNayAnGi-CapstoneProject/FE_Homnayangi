import { useState, useEffect, useMemo } from 'react';
import { addItemNoStock, getShoppingCart } from '../../../../redux/actionSlice/shoppingCartSlice';
import Image from '../../Image';

// ** assets
import delivery from '../../../../assets/images/deliver.svg';

// ** third party
import { Modal } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const ModalOrderCooked = (props) => {
  const { openCookedOrderModal, setOpenCookedOrderModal, data, listData, blogData } = props;
  const dispatch = useDispatch();
  const cartList = useSelector((state) => state.cart.shoppingCart);

  const today = dayjs();
  const todayAtNoon = dayjs().set('hour', 12).startOf('hour');
  const todayAt8AM = dayjs().set('hour', 8).startOf('hour').add(1, 'day');
  const maxDate = dayjs().set('hour', 8).startOf('hour').add(30, 'day');
  const shouldDisableTime = (value, view) => view === 'hours' && value.hour() >= 20;

  const accessToken = localStorage.getItem('accessToken');
  let decoded_jwt = {};
  if (accessToken) {
    decoded_jwt = jwt_decode(accessToken);
  }

  // ** get current cart
  const getCurrentCart = () => {
    let currentCart = [];
    let currentUser = undefined;
    if (cartList?.length > 0) {
      currentUser = cartList.find((item) => {
        return item.cusId == decoded_jwt.Id;
      });
    }
    if (currentUser?.cart?.length > 0) {
      currentCart = currentUser.cart.filter((item) => item.isCook == true);
    }
    return { currentCart, currentUser };
  };

  const current = getCurrentCart();
  const [date, setDate] = useState(current.currentCart?.length > 0 ? dayjs(current.currentUser.shippedDate) : today);
  const [error, setError] = useState(null);

  const errorMessage = useMemo(() => {
    // console.log(error);
    switch (error) {
      case 'maxDate':
      case 'minDate':
      case 'maxTime':
      case 'minTime': {
        return 'Thời gian giao hàng từ 8 giờ sáng hôm sau';
      }

      case 'invalidDate': {
        return 'Thời gian giao hàng không hợp lệ';
      }

      case 'shouldDisableTime': {
        return 'Thời gian giao hàng trễ nhất là trước 8h tối';
      }

      default: {
        return '';
      }
    }
  }, [error]);

  //** handle add to cart */
  const handleAddToCart = (data, isCook) => {
    if (date) {
      let shippedDate = new Date(date).toISOString();
      localStorage.setItem('curShDate', shippedDate);
      let requestObject = {
        cusId: decoded_jwt.Id,
        orderDetails: data.item2,
        isCook: isCook,
        orderName: blogData?.title,
        id: data.item1.packageId,
        amount: 1,
        img: blogData?.imageUrl,
        price: isCook ? data.item1.cookedPrice : data.item1.packagePrice,
        shippedDate: shippedDate,
        size: data.item1.size,
      };
      // console.log(requestObject);
      dispatch(addItemNoStock(requestObject));
      dispatch(getShoppingCart());
      setOpenCookedOrderModal(false);
    }
  };

  // ** handle add all 3 to cart
  const handleAddToCartAllNot = (data, isCook) => {
    if (listData) {
      listData?.forEach((item) => {
        handleAddToCart(item, isCook);
      });
    } else {
      handleAddToCart(data, isCook);
    }
  };

  return (
    <Modal open={openCookedOrderModal} onClose={() => setOpenCookedOrderModal(false)}>
      <div
        className="fixed left-[50%]
      top-[50%] translate-y-[-50%] translate-x-[-50%] bg-white rounded-[5px] sm:w-fit w-full"
      >
        <div className="flex gap-10 px-10 py-8 items-center">
          <div className=" sm:w-[410px]">
            {/* header */}
            <div className="pb-2 border-b border-[#b7b7b7]">
              <p className="text-[20px] font-medium">Chọn thời gian giao hàng</p>
              {listData ? (
                listData?.map((item, i) => (
                  <p key={item?.blogId} className="mt-1 font-semibold text-primary">
                    {item?.title}
                  </p>
                ))
              ) : (
                <p className="mt-1 font-bold text-primary text-[30px] leading-10">{blogData?.title}</p>
              )}
            </div>
            {/* body */}
            <div className="mt-5">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  onError={(newError, value) => setError(newError)}
                  slotProps={{
                    textField: {
                      helperText: errorMessage,
                    },
                  }}
                  // disabled={currentCart?.length > 0}
                  shouldDisableTime={shouldDisableTime}
                  value={date}
                  minDateTime={todayAt8AM}
                  maxDateTime={maxDate}
                  onChange={(event, value) => setDate(event)}
                  label="Chọn ngày giờ giao hàng"
                  sx={{ width: '100%' }}
                />
              </LocalizationProvider>
            </div>
            <p className="mt-2 text-[#898989]">
              Để chúng tôi có thể chuẩn bị món ăn cho bạn một cách tốt nhất. Bạn nên chọn thời gian giao hàng là{' '}
              <span className="text-redError font-semibold">
                hôm sau từ 8 giờ sáng (AM) trở đi và trước 8h tối (PM)
              </span>
            </p>

            {current.currentCart?.length > 0 && (
              <>
                <p className="mt-2 text-white p-3 rounded-[5px] bg-red-500">
                  🔔 Các món đặt nấu trong cùng một đơn hàng phải được giao cùng một khung giờ. Bạn đã thêm vào giỏ hàng
                  đặt nấu các món sẽ được giao vào{' '}
                  <span className="font-semibold text-white">
                    {new Date(new Date(current.currentUser.shippedDate).setSeconds(0)).toLocaleString()}
                  </span>
                  .
                </p>
                <p className="text-redError font-semibold mt-1">
                  Chọn khung giờ khác đồng nghĩa khung giờ đó sẽ được áp dụng thay cho hiện tại
                </p>
              </>
            )}
            <button
              disabled={error !== null ? true : false}
              onClick={() => handleAddToCartAllNot(data, true)}
              className={`${
                error !== null ? 'bg-red-200 cursor-not-allowed' : 'bg-redError'
              } w-full  mt-8 py-2 text-white font-medium uppercase rounded-[5px]`}
            >
              Xác nhận
            </button>
          </div>

          <div className="sm:block hidden sm:w-[400px]">
            <img alt="" className="object-cover w-full h-full" src={delivery} />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalOrderCooked;
