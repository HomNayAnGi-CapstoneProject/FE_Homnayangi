import { useState, useEffect } from 'react';
import instances from '../../../utils/plugin/axios';
import { ic_document_black, ic_plus_black, ic_close_modal } from '../../../assets';
import ModalSelectVoucher from '../../../share/components/Modal/ModalSelectVoucher/ModalSelectVoucher';
import CartItem from '../../../share/components/Modal/ModalShoppingCart/components/CartItem';
import { removeCartByStatus, getShoppingCart } from '../../../redux/actionSlice/shoppingCartSlice';
import scrollToWithOffset from '../../../utils/scrollToWithOffset';

//** Third party components*/
import { useDispatch, useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { Tooltip } from '@mui/material';

const SideComp = () => {
  const cartList = useSelector((state) => state.cart.shoppingCart);
  // const cartType = useSelector((state) => state.cart.cartType);
  const cartType = localStorage.getItem('cartType');
  const cartAddress = useSelector((state) => state.cart.cartAddress);
  const paymentMethod = useSelector((state) => state.cart.paymentMethod);

  const [cartAdd, setCartAdd] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');
  const shippedDate = localStorage.getItem('curShDate');
  let decoded_jwt = {};
  if (accessToken) {
    decoded_jwt = jwt_decode(accessToken);
  }
  const [voucherOwnList, setVoucherOwnList] = useState([]);
  const [openModalVoucher, setOpenModalVoucher] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState();

  // ** get customer voucher

  useEffect(() => {
    const fetch = async () => {
      const res = await instances.get(`/customervouchers/customer/${decoded_jwt?.Id}/vouchers`);
      setVoucherOwnList(res.data.result);
    };
    fetch();
  }, []);

  // ** notify
  const notifyError = (msg) => {
    toast.error(msg, {
      pauseOnHover: false,
      autoClose: 4000,
    });
  };

  const getCurrentCart = () => {
    let currentCart = [];
    let currentUser = undefined;
    if (cartList?.length > 0) {
      currentUser = cartList.find((item) => {
        return item.cusId == decoded_jwt.Id;
      });
    }
    if (currentUser?.cart?.length > 0) {
      // cart type = 1 -> isCooked = false
      if (cartType == 1) {
        currentCart = currentUser.cart.filter((item) => item.isCook == false);
      } else {
        currentCart = currentUser.cart.filter((item) => item.isCook == true);
      }
    }
    return { currentCart, currentUser };
  };

  const current = getCurrentCart();

  const totalItemInCart = () => {
    let total = 0;
    let totalPrice = 0;
    let currentUser = undefined;
    if (cartList?.length > 0) {
      currentUser = cartList.find((item) => {
        return item.cusId == decoded_jwt.Id;
      });
    }
    if (currentUser?.cart?.length > 0) {
      current.currentCart.forEach((item) => {
        total += item.amount;
        totalPrice += item.amount * item.price;
      });
    }
    return { total, totalPrice };
  };
  const totalItem = totalItemInCart();

  const getListTotalIngredients = () => {
    let listTotalIngre = [];
    // currentCart?.forEach((cartItem) => {
    //   listTotalIngre.push(
    //     ...cartItem.orderDetails.map((ingre) => {
    //       return {
    //         ingredientId: ingre.ingredientId,
    //         quantity: ingre.quantity,
    //         price: ingre.price,
    //         recipeId: cartItem.id !== '' ? cartItem.id : null,
    //       };
    //     }),
    //   );
    // });
    listTotalIngre = current.currentCart?.map((cartItem) => {
      return {
        ingredientId: cartItem.id == '' ? cartItem.orderDetails[0].ingredientId : null,
        quantity: cartItem.amount,
        price: cartItem.price,
        recipeId: cartItem.id !== '' ? cartItem.id : null,
      };
    });
    return listTotalIngre;
  };

  // ** handle create order
  const handleCreateOrder = (data) => {
    if (accessToken) {
      // if (cartAddress.split(',')[3] !== '' && cartAddress.split(',')[4] !== '' && cartAddress.split(',')[5] !== '') {
      // console.log(cartAddress.split(','));
      let requestData = {
        shippedDate: cartType == 1 ? null : new Date(current.currentUser.shippedDate).toISOString(),
        discount: selectedVoucher ? selectedVoucher.discount : 0,
        shippedAddress: cartAddress,
        totalPrice: selectedVoucher
          ? selectedVoucher?.discount <= 1
            ? totalItem.totalPrice - selectedVoucher?.discount * 100
            : totalItem.totalPrice - selectedVoucher?.discount
          : totalItem.totalPrice,
        paymentMethod: paymentMethod,
        isCooked: cartType == 1 ? false : true,
        orderDetails: getListTotalIngredients(),
        voucherId: selectedVoucher?.voucherId || null,
      };
      // console.log(requestData);
      // if (paymentMethod == 0 || cartAddress == '') {
      //   notifyPaymentError();
      // } else {
      //   console.log(requestData);
      // }
      // }

      if (cartAddress == '') {
        // notifyAddressError();
        notifyError('Vui lòng điền đầy đủ thông tin và ấn xác nhận địa chỉ !');
      } else {
        if (paymentMethod == -1) {
          notifyError('Vui lòng chọn phương thức thanh toán !');
          scrollToWithOffset(100, 'paymentMethod');
          // notifyPaymentError();
        } else {
          let allowCreateOrder = true;
          if (paymentMethod == 1) {
            if (totalItem.totalPrice <= 10000) {
              notifyError('Tổng giá trị đơn hàng khi thanh toán online phải tối thiểu 10000đ');
              allowCreateOrder = false;
            }
          }
          if (allowCreateOrder) {
            toast.promise(
              instances
                .post('/orders', {
                  shippedDate: cartType == 1 ? null : new Date(current.currentUser.shippedDate).toISOString(),
                  // discount: 0,
                  // shippedAddress: cartAddress,
                  // totalPrice: totalItem.totalPrice,
                  // paymentMethod: paymentMethod,
                  // isCooked: cartType == 1 ? false : true,
                  // orderDetails: getListTotalIngredients(),

                  discount: selectedVoucher ? selectedVoucher.discount : 0,
                  shippedAddress: cartAddress,
                  totalPrice: selectedVoucher
                    ? selectedVoucher?.discount <= 1
                      ? totalItem.totalPrice - selectedVoucher?.discount * 100
                      : totalItem.totalPrice - selectedVoucher?.discount
                    : totalItem.totalPrice,
                  paymentMethod: paymentMethod,
                  isCooked: cartType == 1 ? false : true,
                  orderDetails: getListTotalIngredients(),
                  voucherId: selectedVoucher?.voucherId || null,
                })
                .then((response) => {
                  // console.log(response.data);
                  if (response.data) {
                    window.location.replace(response.data);
                    // window.location.href = response.data;
                  } else {
                    dispatch(
                      removeCartByStatus({
                        cusId: decoded_jwt.Id,
                        isCook: cartType == 1 ? false : true,
                      }),
                    );
                    dispatch(getShoppingCart());
                    navigate('/user/orders/');
                  }
                }),
              {
                success: 'Đang chuyển hướng...',
                pending: 'Đang tạo đơn hàng',
                error: 'Có lỗi xảy ra khi tạo đơn hàng!',
              },
            );
          }
        }
      }
    }
  };

  // ** handle select voucher
  const handleSelectVoucher = (data) => {
    setSelectedVoucher(data);
    setOpenModalVoucher(false);
  };

  return (
    <>
      {openModalVoucher && (
        <ModalSelectVoucher
          openModalVoucher={openModalVoucher}
          setOpenModalVoucher={setOpenModalVoucher}
          data={voucherOwnList}
          handleSelectVoucher={handleSelectVoucher}
          orderTotalPrice={totalItem.totalPrice}
        />
      )}
      {/* cart info */}
      <div className="font-inter w-full bg-white rounded-[5px] px-[14px] py-2">
        {/* header */}
        <div className="pb-2 border-b flex items-center gap-2">
          <img alt="" src={ic_document_black} className="object-contain w-[24px] h-[24px]" />
          <p className="uppercase text-black font-medium text-[18px]">Thông tin đơn hàng</p>
        </div>
        {/* body */}
        <div>
          <div className="max-h-[260px] scroll-bar overflow-x-hidden overflow-y-scroll py-[15px]">
            {current.currentCart?.map((item) => (
              <div key={item?.id + crypto.randomUUID()} className="border-t border-dashed first:border-t-0">
                <CartItem item={item} />
              </div>
            ))}
          </div>
        </div>
        {/* shippedTime for cooked item */}
        {cartType == 2 ? (
          current.currentUser?.shippedDate && (
            <p className="text-redError font-medium">
              Món ăn sẽ được chuẩn bị và giao vào{' '}
              {new Date(new Date(current.currentUser.shippedDate).setSeconds(0)).toLocaleString()}
            </p>
          )
        ) : (
          <></>
        )}
      </div>
      {/* select voucher */}
      {voucherOwnList?.length > 0 && (
        <div className="font-inter w-full bg-white rounded-[5px] px-[14px] py-2 my-3">
          {/* title */}
          <p className="">
            Áp dụng mã giảm giá{' '}
            <span className="text-gray-500 text-[14px]">(mỗi đơn hàng chỉ sử dụng 1 mã giảm giá)</span>
          </p>
          {selectedVoucher ? (
            <div className="w-full mt-2 flex justify-between px-3 py-3 border-2 border-primary rounded">
              <div>
                <p className="line-clamp-1 mb-2 font-semibold">{selectedVoucher.voucherName}</p>
                <p className="">
                  Giảm{' '}
                  <span className="text-redError text-[18px] font-bold">
                    {selectedVoucher?.discount <= 1
                      ? `${selectedVoucher.discount * 100}%`
                      : `${Intl.NumberFormat().format(selectedVoucher.discount)}đ`}
                  </span>
                </p>
              </div>
              <Tooltip title="Bỏ chọn mã giảm giá" placement="top">
                <button onClick={() => setSelectedVoucher()}>
                  <img src={ic_close_modal} className="w-[20px] h-[20px] object-contain" />
                </button>
              </Tooltip>
            </div>
          ) : (
            <button
              onClick={() => setOpenModalVoucher(true)}
              className="w-full mt-2 uppercase font-medium text-gray-400 py-3 flex items-center gap-2 justify-center hover:bg-gray-200"
            >
              Chọn mã giảm giá của bạn <img className="w-[24px] h-[24px] object-contain" src={ic_plus_black} />
            </button>
          )}
        </div>
      )}
      {/* discount, total price */}
      <div className="w-full bg-white rounded-[5px] px-[14px] py-2 my-3">
        <div className="flex justify-between mb-3">
          <p>Tổng giá trị sản phẩm: </p>
          <p>{Intl.NumberFormat().format(totalItem?.totalPrice)}đ</p>
        </div>
        <div className="flex justify-between mb-3">
          <p>Giảm giá: </p>
          <p>
            -
            {selectedVoucher
              ? selectedVoucher?.discount <= 1
                ? `${selectedVoucher.discount * 100}%`
                : `${Intl.NumberFormat().format(selectedVoucher.discount)}đ`
              : `${0}đ`}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="font-semibold">Tổng thanh toán: </p>
          <p className="font-semibold">
            {selectedVoucher
              ? selectedVoucher?.discount <= 1
                ? Intl.NumberFormat().format(totalItem.totalPrice - selectedVoucher?.discount * 100)
                : Intl.NumberFormat().format(totalItem.totalPrice - selectedVoucher?.discount)
              : Intl.NumberFormat().format(totalItem.totalPrice)}
            đ
          </p>
        </div>
      </div>
      {/* button */}
      <button
        type="submit"
        form="address-form"
        onClick={() => handleCreateOrder(current.currentCart)}
        disabled={current.currentCart?.length > 0 ? false : true}
        className={`uppercase select-none text-white font-semibold w-full text-center py-2 rounded-[5px] ${
          current.currentCart?.length > 0 ? 'cursor-pointer bg-primary' : 'cursor-not-allowed bg-secondary'
        }`}
      >
        Thanh toán ngay
      </button>
    </>
  );
};

export default SideComp;
