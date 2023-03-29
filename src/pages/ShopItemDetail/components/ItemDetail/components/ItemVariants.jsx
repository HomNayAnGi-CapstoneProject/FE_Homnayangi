import { useState, useEffect } from 'react';
import ModalRequireLogin from '../../../../../share/components/Modal/ModalRequireLogin';

// ** assets
import { ic_plus_black, ic_subtract_black, ic_cart_white } from '../../../../../assets';

// ** redux
import { getShoppingCart, addItemNoStock, deleteItem } from '../../../../../redux/actionSlice/shoppingCartSlice';
import { useDispatch, useSelector } from 'react-redux';

// ** third party
import jwt_decode from 'jwt-decode';

const ItemVariants = (props) => {
  const { productDetail } = props;
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem('accessToken');
  let decoded_jwt = {};
  if (accessToken) {
    decoded_jwt = jwt_decode(accessToken);
  }

  const [openRequireLogin, setOpenRequireLogin] = useState(false);
  const [productValue, setProductValue] = useState(1);

  //** handle increse value
  const handleIncrese = () => {
    setProductValue((prev) => prev + 1);
  };

  // ** handle decrese value
  const handleDecrese = () => {
    if (productValue <= 1) {
      setProductValue(1);
    } else {
      setProductValue((prev) => prev - 1);
    }
  };
  // ** handle add to cart
  const handleAddToCart = () => {
    if (accessToken) {
      let requestObject = {
        cusId: decoded_jwt.Id,
        orderDetails: [
          {
            ingredientId: productDetail.ingredientId,
            price: productDetail.price,
            quantity: productValue,
          },
        ],
        isCook: false,
        orderName: productDetail.name,
        id: '',
        img: productDetail.picture,
        amount: productValue,
        price: productDetail.price,
      };
      // console.log(requestObject);
      dispatch(addItemNoStock(requestObject));
      dispatch(getShoppingCart());
    } else {
      setOpenRequireLogin(true);
    }
  };

  return (
    <>
      {openRequireLogin && (
        <ModalRequireLogin openRequireLogin={openRequireLogin} setOpenRequireLogin={setOpenRequireLogin} />
      )}
      <div className="font-inter md:px-0 px-5">
        {/* name */}
        <p className="text-[28px] font-medium text-black">{productDetail?.name}</p>
        {/* price */}
        <p className="text-redError text-[28px] font-bold">{Intl.NumberFormat().format(productDetail?.price)}đ</p>
        {/* unit */}
        <p className="mt-10 font-medium text-black">
          Định lượng: <span className="text-[#838383] font-bold">{productDetail?.unitName}</span>
        </p>
        {/* kcal */}
        <p className="mt-5 font-medium text-black">
          Lượng calo: <span className="text-[#838383] font-bold">{productDetail?.kcal}</span>
        </p>
        {/* description */}
        <p className="mt-5 font-medium text-black">
          Mô tả sản phẩm: <span className="text-[#838383] font-bold">{productDetail?.description}</span>
        </p>
        {/* amount */}
        <div className="mt-5 flex items-center gap-2">
          <p className=" font-medium text-black">Số lượng</p>
          <div className="input-group flex ">
            <div
              onClick={() => handleDecrese()}
              className="bg-white w-[35px] h-[35px] rounded-tl-[5px] rounded-bl-[5px] border flex items-center justify-center cursor-pointer"
            >
              <img alt="" className="object-contain w-[24px]" src={ic_subtract_black} />
            </div>
            <div className="bg-white select-none w-[40px] h-[35px] flex items-center justify-center border-t border-b">
              {productValue}
            </div>
            <div
              onClick={() => handleIncrese()}
              className="bg-white w-[35px] h-[35px] rounded-tr-[5px] rounded-br-[5px] border flex items-center justify-center cursor-pointer"
            >
              <img alt="" className="object-contain w-[24px]" src={ic_plus_black} />
            </div>
          </div>
        </div>
        {/* add to cart buttons */}
        <div className="w-full mt-8">
          <button
            onClick={() => handleAddToCart()}
            className="bg-primary px-5 py-2 text-white font-medium rounded-[5px] flex items-center gap-2"
          >
            <img alt="" src={ic_cart_white} className="w-[24px] object-contain" />
            <p>Thêm vào giỏ</p>
          </button>
        </div>
      </div>
    </>
  );
};

export default ItemVariants;
