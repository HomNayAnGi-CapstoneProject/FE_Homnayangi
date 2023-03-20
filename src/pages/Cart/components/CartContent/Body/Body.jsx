import React from 'react';
import emptyCart from '../../../../../share/lottie/emptyCart.json';
import Item from './components/Item';

// ** Redux
import { useDispatch, useSelector } from 'react-redux';
import { getShoppingCart } from '../../../../../redux/actionSlice/shoppingCartSlice';

//** Third party components*/
import Lottie from 'lottie-react';
import { Link, useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const Body = () => {
  //** Const */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartList = useSelector((state) => state.cart.shoppingCart);
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
      currentUser = cartList?.find((item) => {
        return item.cusId == decoded_jwt.Id;
      });
    }
    if (currentUser?.cart?.length > 0) {
      currentCart = currentUser.cart;
    }
    return currentCart;
  };

  const currentCart = getCurrentCart();

  return (
    <div className="w-full bg-white rounded-[5px] px-[14px] py-2">
      {currentCart?.length > 0 ? (
        <div>
          {currentCart?.map((item) => (
            <div
              key={item.id + crypto.randomUUID()}
              className="border-t border-gray-400 border-dashed first:border-t-0 w-full"
            >
              <Item item={item} />
            </div>
          ))}
        </div>
      ) : (
        <div className="py-5 flex flex-col items-center">
          <Lottie animationData={emptyCart} loop={true} controls={false} className="h-[25vh]" />
          <p className="mt-5 text-center text-gray-500 font-semibold">Giỏ hàng của bạn đang rỗng</p>
          <button
            onClick={() => navigate('/recipe')}
            className="bg-primary rounded-[5px] w-fit mt-5 px-5 py-2 text-white font-medium"
          >
            Đặt hàng ngay
          </button>
        </div>
      )}
    </div>
  );
};

export default Body;
