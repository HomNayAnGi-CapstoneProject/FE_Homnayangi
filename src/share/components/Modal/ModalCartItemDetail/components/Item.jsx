import { useState } from 'react';
import Image from '../../../Image';
import { ic_cart_white } from '../../../../../assets';

import jwt_decode from 'jwt-decode';
import { Tooltip } from '@mui/material';

// ** redux
import { getShoppingCart, addItemNoStock } from '../../../../../redux/actionSlice/shoppingCartSlice';
import { useDispatch, useSelector } from 'react-redux';

const Item = (props) => {
  //** const */
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem('accessToken');
  let decoded_jwt = {};
  if (accessToken) {
    decoded_jwt = jwt_decode(accessToken);
  }

  // ** handle add ingredients to cart
  const handleAddIngreToCart = (item) => {
    let requestObject = {
      cusId: decoded_jwt.Id,
      orderDetails: [
        {
          ingredientId: item.ingredientId,
          price: item.price,
          quantity: 1,
        },
      ],
      isCook: false,
      orderName: item.ingredientName,
      id: '',
      img: item.image,
      amount: 1,
      price: item.price,
    };
    dispatch(addItemNoStock(requestObject));
    dispatch(getShoppingCart());
  };
  return (
    <div className="w-full h-fit flex gap-4">
      <Image
        src={props.item?.image || props.item?.ingredientImage}
        alt=""
        className="object-cover w-[120px] h-[120px] border-[2px] border-[#B5B5B5] rounded-[5px]"
      />
      <div className="flex flex-col justify-between">
        <div>
          <p className="font-medium line-clamp-1 text-black">{props.item?.ingredientName}</p>
          <p className="text-[#897D7D] text-[14px]">Số lượng: {props.item?.quantity}</p>
        </div>
        {props?.isDone ? (
          <></>
        ) : (
          <Tooltip title="Thêm vào giỏ hàng" placement="top">
            <button
              onClick={() => handleAddIngreToCart(props?.item)}
              className="bg-redError text-white font-medium text-[14px] w-fit px-2 py-1 rounded-[5px]"
            >
              <img src={ic_cart_white} className="object-contain w-[20px] h-[20px]" />
            </button>
          </Tooltip>
        )}
        <p className="text-[18px] text-redError font-bold">{Intl.NumberFormat().format(props.item?.price)}đ</p>
      </div>
    </div>
  );
};

export default Item;
