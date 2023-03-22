import { useRef, useEffect, useState } from 'react';
import ModalRequireLogin from '../../../../share/components/Modal/ModalRequireLogin';

//** Third party components*/
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const SideComp = () => {
  const cartList = useSelector((state) => state.cart.shoppingCart);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
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

  return (
    <div className="sticky top-[100px] mb-10">
      <div className="text-black bg-white rounded-[5px]  px-6 py-2 h-fit">
        <div className="py-[10px] mb-5 border-b flex items-center justify-between">
          <p className="font-semibold">Đơn hàng</p>
          <p className="">{totalItem?.total} sản phẩm</p>
        </div>
        <div className="flex justify-between mb-4">
          <p className="text-primary font-medium text-[18px]">Tổng tiền</p>
          <p className="text-[18px] text-primary font-medium">{Intl.NumberFormat().format(totalItem?.totalPrice)} đ</p>
        </div>
      </div>
      {/* <DelayedLink delay={0} to="/order"> */}
      <button
        onClick={() => navigate('/cart-address')}
        disabled={currentCart?.length > 0 ? false : true}
        className={`uppercase select-none text-white font-semibold mt-5 w-full text-center py-2 rounded-[5px]
${currentCart?.length > 0 ? 'cursor-pointer bg-primary' : 'cursor-not-allowed bg-secondary'}`}
      >
        Đặt hàng ngay
      </button>
      {/* </DelayedLink> */}
    </div>
  );
};

export default SideComp;
