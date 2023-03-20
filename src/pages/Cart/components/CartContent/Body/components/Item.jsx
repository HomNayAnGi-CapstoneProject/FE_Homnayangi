import { useState } from 'react';
import Image from '../../../../../../share/components/Image';
import { ic_trash_orange, ic_plus_black, ic_subtract_black } from '../../../../../../assets';
import ModalCartItemDetail from '../../../../../../share/components/Modal/ModalCartItemDetail/ModalCartItemDetail';

// ** redux
import {
  removeWholeItem,
  getShoppingCart,
  addItemNoStock,
  deleteItem,
} from '../../../../../../redux/actionSlice/shoppingCartSlice';
import { useDispatch, useSelector } from 'react-redux';

// ** third party
import { toast } from 'react-toastify';

const Item = (props) => {
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem('accessToken');
  const cartList = useSelector((state) => state.cart.shoppingCart);
  const [productValue, setProductValue] = useState(props?.item.amount);
  const [openDetail, setOpenDetail] = useState(false);
  const [detailData, setDetailData] = useState();
  const [detailTotalPrice, setDetailTotalPrice] = useState(0);
  const [detailCookedImg, setDetailCookedImg] = useState();

  // ** handles functions
  const handleRemoveItem = (item) => {
    dispatch(removeWholeItem(item));
    dispatch(getShoppingCart());
  };

  const handleDecrese = (item) => {
    if (accessToken) {
      if (productValue <= 1) {
        setProductValue(1);
        dispatch(getShoppingCart());
      } else {
        setProductValue((prev) => prev - 1);
        let requestObject = {
          cusId: item.cusId,
          orderDetails: item.orderDetails,
          isCook: item.isCook,
          orderName: item.orderName,
          id: item.id,
          img: item.img,
          price: item.price,
        };
        dispatch(deleteItem(requestObject));
        dispatch(getShoppingCart());
      }
    }
  };

  const handleIncrese = (item) => {
    if (accessToken) {
      setProductValue((prev) => prev + 1);
      // console.log(item);
      let requestObject = {
        cusId: item.cusId,
        orderDetails: item.orderDetails,
        isCook: item.isCook,
        orderName: item.orderName,
        id: item.id,
        img: item.img,
        price: item.price,
      };
      dispatch(addItemNoStock(requestObject));
      dispatch(getShoppingCart());
    }
  };

  // ** handle open detail item
  const handleOpenDetail = (item) => {
    setOpenDetail(true);
    setDetailData(item);
    setDetailTotalPrice(props?.item?.price);
    setDetailCookedImg(props?.item?.img);
  };

  return (
    <>
      {openDetail && (
        <ModalCartItemDetail
          openDetailModal={openDetail}
          setOpenDetailModal={setOpenDetail}
          data={detailData}
          detailTotalPrice={detailTotalPrice}
          detailCookedImg={detailCookedImg}
        />
      )}
      <div className="py-6 w-full flex font-maven">
        {/* img, name, type... */}
        <div className="flex sm:w-4/6 w-5/6 gap-5">
          {/* img */}
          <div
            className="xs:block hidden w-[80px] h-[80px] bg-cover bg-center bg-no-repeat"
            //  style={{ backgroundImage: `url(${product})` }}
          >
            <Image className="w-[80px] h-[80px] object-cover rounded-[5px]" src={props?.item?.img || ''} />
          </div>
          {/* name, type, buttons */}
          <div>
            <p className="text-[18px] font-medium line-clamp-1">{props?.item?.orderName}</p>
            <p className="text-[14px] mb-3 text-gray-500">
              {' '}
              Loại:{' '}
              {props?.item?.isCook ? (
                <span className="text-redError">Đặt nấu</span>
              ) : (
                <span className="text-gray-500">Gói nguyên liệu</span>
              )}
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleRemoveItem(props?.item)}
                className="text-primary font-medium cursor-pointer flex items-center gap-1 underline"
              >
                {' '}
                {/* <img alt="" className="object-contain w-[20px]" src={ic_trash_orange} />  */}
                Xóa
              </button>
              <button onClick={() => handleOpenDetail(props?.item)} className="text-[#897D7D] font-medium underline">
                Chi tiết
              </button>
            </div>
            {/* mobile amount buttons */}
            <div className="sm:hidden flex mt-5 ">
              <div className="input-group flex mr-3">
                <div
                  onClick={() => handleDecrese(props?.item)}
                  className="w-[35px] h-[35px] rounded-tl-[5px] rounded-bl-[5px] border flex items-center justify-center cursor-pointer"
                >
                  <img alt="" className="object-contain w-[24px]" src={ic_subtract_black} />
                </div>
                <div className="select-none w-[40px] h-[35px] flex items-center justify-center border-t border-b">
                  {productValue}
                </div>
                <div
                  onClick={() => handleIncrese(props?.item)}
                  className="w-[35px] h-[35px] rounded-tr-[5px] rounded-br-[5px] border flex items-center justify-center cursor-pointer"
                >
                  <img alt="" className="object-contain w-[24px]" src={ic_plus_black} />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* amount buttons */}
        <div className="sm:flex hidden justify-end w-1/6 ">
          <div className="input-group flex mr-3">
            <div
              onClick={() => handleDecrese(props?.item)}
              className="w-[35px] h-[35px] rounded-tl-[5px] rounded-bl-[5px] border flex items-center justify-center cursor-pointer"
            >
              <img alt="" className="object-contain w-[24px]" src={ic_subtract_black} />
            </div>
            <div className="select-none w-[40px] h-[35px] flex items-center justify-center border-t border-b">
              {productValue}
            </div>
            <div
              onClick={() => handleIncrese(props?.item)}
              className="w-[35px] h-[35px] rounded-tr-[5px] rounded-br-[5px] border flex items-center justify-center cursor-pointer"
            >
              <img alt="" className="object-contain w-[24px]" src={ic_plus_black} />
            </div>
          </div>
        </div>
        {/* price */}
        <div className="w-1/6 sm:flex hidden justify-end">
          <p className="font-medium text-redError">{Intl.NumberFormat().format(props?.item?.price)}đ</p>
        </div>
        {/* total price */}
        <div className="w-1/6 flex justify-end">
          <p className="font-medium text-redError">
            {Intl.NumberFormat().format(props?.item?.price * props?.item?.amount)}đ
          </p>
        </div>
      </div>
    </>
  );
};

export default Item;
