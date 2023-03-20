import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';

const NotifyItemCart = (props) => {
  const { decoded_jwt, shoppingCart } = props;
  //** handle get total item in cart
  const totalShoppingCartItems = () => {
    let totalItem = 0;
    let currentUser = undefined;
    if (shoppingCart?.length > 0) {
      currentUser = shoppingCart.find((item) => {
        return item.cusId == decoded_jwt.Id;
      });
    }
    if (currentUser?.cart?.length > 0) {
      currentUser?.cart.forEach((item) => {
        totalItem += +item.amount;
      });
    }
    return totalItem;
  };
  const totalItem = totalShoppingCartItems();
  return (
    <>
      {totalItem > 0 && (
        <div className="w-[20px] h-[20px] rounded-full bg-primary absolute top-[-10px] right-[-5px] text-white flex items-center justify-center">
          <p className="text-[13px] text-center">{totalItem}</p>
        </div>
      )}
    </>
  );
};

export default NotifyItemCart;
