import { memo } from 'react';
import { removeWholeItem, getShoppingCart } from '../../../../../redux/actionSlice/shoppingCartSlice';
import Image from '../../../Image';

//** Third party components*/
import { useDispatch, useSelector } from 'react-redux';

const CartItem = (props) => {
  //** Const */
  const dispatch = useDispatch();

  const handleRemoveItem = (id) => {
    dispatch(removeWholeItem(id));
    dispatch(getShoppingCart());
  };

  return (
    <div className="font-maven flex gap-4 py-5">
      <div
        className="bg-white w-[80px] h-[80px] bg-cover bg-no-repeat bg-center"
        // style={{ backgroundImage: `url(${props?.item?.image ? props?.item.image : product})` }}
      >
        <Image alt="" className="w-[80px] h-[80px] object-cover rounded-[5px]" src={`${props?.item?.img || ''}`} />
      </div>
      <div className="flex-1 relative">
        {props?.isCartModal && (
          <p
            onClick={() => handleRemoveItem(props?.item)}
            className="cursor-pointer p-1 text-redError absolute top-[-5px] right-0 text-[15px] font-semibold"
          >
            X
          </p>
        )}
        <p className="max-w-[85%] text-[16px] font-semibold leading-[1.2] line-clamp-2">
          {props?.item?.orderName ? props?.item.orderName : 'Gói nguyên liệu số 1'}
        </p>
        <p className={`text-[14px] my-1 `}>
          Loại:{' '}
          {props?.item?.isCook ? (
            <span className="text-redError">Đặt nấu</span>
          ) : (
            <span className="text-gray-500">{props?.item?.id !== '' ? 'Gói nguyên liệu' : 'Nguyên liệu'}</span>
          )}
        </p>
        <div className="flex items-center justify-between mt-1 text-primary">
          <p className="text-[14px] font-semibold">
            {props?.item?.price
              ? `${Intl.NumberFormat().format(props?.item?.price)}đ`
              : `${Intl.NumberFormat().format(200000)}đ`}
          </p>
          <p className="text-[14px] font-semibold">{`x${props?.item?.amount ? props?.item?.amount : 3}`}</p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
