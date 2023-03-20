import React from 'react';
import { setShowModalCart } from '../../../../redux/actionSlice/shoppingCartSlice';

// ** components
import CartItem from './components/CartItem';

//** Third party components*/
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const ModalShoppingCart = (props) => {
  const { decoded_jwt, shoppingCart } = props;
  const itemList = shoppingCart;
  const dispatch = useDispatch();

  const getCurrentCart = () => {
    let currentCart = [];
    let currentUser = undefined;
    if (itemList?.length > 0) {
      currentUser = itemList.find((item) => {
        return item.cusId == decoded_jwt.Id;
      });
    }
    if (currentUser.cart?.length > 0) {
      currentCart = currentUser.cart;
    }
    return currentCart;
  };

  const currentCart = getCurrentCart();

  const totalItemInCart = () => {
    let total = 0;
    let currentUser = undefined;
    if (itemList?.length > 0) {
      currentUser = itemList.find((item) => {
        return item.cusId == decoded_jwt.Id;
      });
    }
    if (currentUser.cart?.length > 0) {
      currentUser.cart.forEach((item) => {
        total += item.amount;
      });
    }
    return total;
  };
  const totalItem = totalItemInCart();

  return (
    <div
      className="font-maven max-w-[300px] w-[300px] absolute z-40 bg-white rounded-[5px]
  overflow-hidden top-[15px] border shadow-md text-black left-[-600%] p-[15px]"
    >
      <div>
        <div className=" border-solid border-b-[1px] pb-2 flex items-center justify-between">
          <p className="text-[16px] font-semibold uppercase">Giỏ hàng</p>
          <p className="text-[16px]">{totalItem} sản phẩm</p>
        </div>
        <div className="max-h-[290px] scroll-bar overflow-x-hidden overflow-y-scroll py-[15px]">
          {currentCart?.map((item) => (
            <div key={item?.id + crypto.randomUUID()} className="border-t border-dashed first:border-t-0">
              <CartItem item={item} isCartModal={true} />
            </div>
          ))}
        </div>
      </div>
      <div className="pt-[20px]">
        <Link to="/cart" onClick={() => dispatch(setShowModalCart(false))}>
          <div className="text-white rounded-[5px] bg-primary py-[5px] text-center cursor-pointer text-[18px]">
            Xem tất cả
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ModalShoppingCart;
