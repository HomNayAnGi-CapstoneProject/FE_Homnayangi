import { useState, useEffect } from 'react';
import instances from '../../../utils/plugin/axios';
import { ic_document_black } from '../../../assets';
import CartItem from '../../../share/components/Modal/ModalShoppingCart/components/CartItem';

//** Third party components*/
import { useDispatch, useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { toast } from 'react-toastify';

const SideComp = () => {
  const cartList = useSelector((state) => state.cart.shoppingCart);
  const accessToken = localStorage.getItem('accessToken');
  let decoded_jwt = {};
  if (accessToken) {
    decoded_jwt = jwt_decode(accessToken);
  }

  const getCurrentCart = () => {
    let currentCart = [];
    let currentUser = undefined;
    if (cartList?.length > 0) {
      currentUser = cartList.find((item) => {
        return item.cusId == decoded_jwt.Id;
      });
    }
    if (currentUser?.cart?.length > 0) {
      currentCart = currentUser.cart;
    }
    return currentCart;
  };

  const currentCart = getCurrentCart();

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
      currentUser?.cart.forEach((item) => {
        total += item.amount;
        totalPrice += item.amount * item.price;
      });
    }
    return { total, totalPrice };
  };
  const totalItem = totalItemInCart();

  // ** handle create order
  const handleCreateOrder = (data) => {
    if (accessToken) {
      let requestData = {
        shippedAddress: 'test',
        totalPrice: totalItem.totalPrice,
        paymentMethod: 1,
        orderDetails: data.map((item) => {
          return { ingredientId: item.id, quantity: item.amount, price: item.price };
        }),
      };
      console.log(requestData);
      toast.promise(
        instances
          .post('/orders', {
            shippedAddress: 'test',
            totalPrice: totalItem.totalPrice,
            paymentMethod: 1,
            orderDetails: data.map((item) => {
              return { ingredientId: item.id, quantity: item.amount, price: item.price };
            }),
          })
          .then((response) => {
            console.log(response);
          }),
        {
          success: 'Đang chuyển hướng...',
          pending: 'Đang tạo đơn hàng',
          error: 'Có lỗi xảy ra!',
        },
      );
    }
  };

  return (
    <>
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
            {currentCart?.map((item) => (
              <div key={item?.id + crypto.randomUUID()} className="border-t border-dashed first:border-t-0">
                <CartItem item={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* discount, total price */}
      <div className="w-full bg-white rounded-[5px] px-[14px] py-2 my-3">
        <div className="flex justify-between mb-3">
          <p>Tổng giá trị sản phẩm: </p>
          <p>{Intl.NumberFormat().format(totalItem?.totalPrice)}đ</p>
        </div>
        <div className="flex justify-between mb-3">
          <p>Giảm giá: </p>
          <p>-0đ</p>
        </div>
        <div className="flex justify-between">
          <p className="font-semibold">Tổng thanhh toán: </p>
          <p className="font-semibold">{Intl.NumberFormat().format(totalItem?.totalPrice)}đ</p>
        </div>
      </div>
      {/* button */}
      <button
        onClick={() => handleCreateOrder(currentCart)}
        disabled={currentCart?.length > 0 ? false : true}
        className={`uppercase select-none text-white font-semibold w-full text-center py-2 rounded-[5px] ${
          currentCart?.length > 0 ? 'cursor-pointer bg-primary' : 'cursor-not-allowed bg-secondary'
        }`}
      >
        Thanh toán ngay
      </button>
    </>
  );
};

export default SideComp;
