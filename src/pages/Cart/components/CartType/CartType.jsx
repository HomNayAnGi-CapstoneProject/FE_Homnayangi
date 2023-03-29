import { useState, useEffect } from 'react';

// ** Redux
import { setCartType } from '../../../../redux/actionSlice/shoppingCartSlice';
import { useDispatch, useSelector } from 'react-redux';

const CartType = (props) => {
  // ** const
  const dispatch = useDispatch();
  const cartType = useSelector((state) => state.cart.cartType);
  return (
    <div className="font-inter mb-4 flex items-center gap-3">
      <p className="text-[#898989] font-medium">Giỏ hàng: </p>
      <button
        onClick={() => dispatch(setCartType(1))}
        className={`px-5 py-2 rounded-[5px] font-semibold text-white ${cartType == 1 ? ' bg-primary' : 'bg-[#D3D3D3]'}`}
      >
        Nguyên liệu
      </button>
      <button
        onClick={() => dispatch(setCartType(2))}
        className={`px-5 py-2 rounded-[5px] font-semibold text-white ${cartType == 2 ? ' bg-primary' : 'bg-[#D3D3D3]'}`}
      >
        Đặt nấu
      </button>
    </div>
  );
};

export default CartType;
