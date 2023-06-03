import { useState, useEffect } from 'react';
import { ic_boiling_white } from '../../assets';
import { ic_add_to_cart_white } from '../../assets';
import { addItemNoStock, getShoppingCart } from '../../redux/actionSlice/shoppingCartSlice';

import ModalOrderCooked from './Modal/ModalOrderCooked/ModalOrderCooked';
import ModalRequireLogin from './Modal/ModalRequireLogin';

import Image from './Image';
import generateSlug from '../../utils/generateSlug';

import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const FoodCard = (props) => {
  const { food, isCheap } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem('accessToken');
  let decoded_jwt = {};
  if (accessToken) {
    decoded_jwt = jwt_decode(accessToken);
  }
  const [openRequireLogin, setOpenRequireLogin] = useState(false);
  const [openOrderCooked, setOpenOrderCooked] = useState(false);
  const [orderCookedData, setOrderCookedData] = useState();

  // ** functions
  //** handle add to cart */
  const handleAddToCart = (data, isCook) => {
    if (accessToken) {
      if (isCook) {
        setOpenOrderCooked(true);
        setOrderCookedData(data);
        // let requestObject = {
        //   cusId: decoded_jwt.Id,
        //   orderDetails: data.recipeDetails,
        //   isCook: isCook,
        //   orderName: data.recipeTitle,
        //   id: data.recipeId,
        //   amount: 1,
        //   img: data.imageUrl,
        //   price: isCook ? data.cookedPrice : data.packagePrice,
        // };
        // // console.log(requestObject);
        // dispatch(addItemNoStock(requestObject));
        // dispatch(getShoppingCart());
      }
    } else {
      setOpenRequireLogin(true);
    }
  };

  return (
    <>
      {openRequireLogin && (
        <ModalRequireLogin openRequireLogin={openRequireLogin} setOpenRequireLogin={setOpenRequireLogin} />
      )}

      {openOrderCooked && (
        <ModalOrderCooked
          openCookedOrderModal={openOrderCooked}
          setOpenCookedOrderModal={setOpenOrderCooked}
          data={orderCookedData}
        />
      )}
      <div
        // key={food.blogId}
        className={`relative font-inter rounded-[10px] bg-[#FFA883] p-[10px] ${
          isCheap ? ' md:h-[245px]' : 'md:w-[586px]  md:h-[220px]'
        } flex sm:flex-row flex-col gap-[18px] drop-shadow-3xl`}
      >
        <div className="flex gap-[18px]">
          <div
            className={`rounded-[10px] border-[2px] border-solid border-white bg-cover bg-center sm:h-[180px] sm:w-[180px] ${
              isCheap ? 'md:w-[225px] md:h-[225px]' : 'md:w-[198px] md:h-[198px]'
            } w-[150px] h-[150px]`}
            // style={{ backgroundImage: `url(${food.image})` }}
          >
            {/* <img className="object-cover rounded-[10px] h-full w-full" alt={food.title} src={food.imageUrl} /> */}
            <Image className="object-cover rounded-[10px] h-full w-full" alt={food.title} src={food.imageUrl} />
          </div>
          <div className="flex-1">
            <p className="sm:text-[20px] text-[18px] font-semibold text-black mb-[5px] line-clamp-1">{food.title}</p>

            <div className="flex gap-[7px]">
              {food?.listSubCateName?.slice(0, 3)?.map((tag, index) => {
                return (
                  <div
                    key={index}
                    className="rounded-full bg-[#EAD35B] border-[2px] border-[#8F8137] border-solid xs:px-[10px] px-[2px] py-[0px] text-[12px] text-[#525252]"
                  >
                    {tag}
                  </div>
                );
              })}
            </div>
            <div className="flex">
              {!isCheap ? (
                ''
              ) : (
                <div className="mt-[5px] flex sm:flex-row flex-col">
                  <p className="font-inter font-medium mr-1 text-[#525252]">Giá nguyên liệu:</p>
                  <p className="text-redError font-semibold">{Intl.NumberFormat().format(food.packagePrice)}đ</p>
                </div>
              )}
            </div>
            <div
              dangerouslySetInnerHTML={{ __html: food.description }}
              className={`leading-[25px] ${
                food.packagePrice ? 'mt-[10px]' : 'mt-[10px] '
              } sm:line-clamp-3 line-clamp-3`}
            ></div>
            <div className="sm:flex hidden absolute bottom-[10px]  gap-[8px]">
              <button
                onClick={() => navigate(`/recipe/${food.blogId}/${generateSlug(food.title)}`)}
                className="bg-[#FF7940] rounded-[10px] cursor-pointer text-white font-medium xs:text-[18px] sm:text-[16px] text-[1vw] xxlg:px-[15px] sm:py-[10px] xlg:px-[3px] md:px-[3px] px-[15px] py-[10px] flex items-center gap-2"
              >
                Công thức
                <div className="bg-cover w-[20px] h-[20px]" style={{ backgroundImage: `url(${ic_boiling_white})` }} />
              </button>
              <button
                // onClick={() => handleAddToCart(food, true)}
                onClick={() => navigate(`/recipe/${food.blogId}/${generateSlug(food.title)}`)}
                // onClick={() => setOpenOrderCooked(true)}
                className="bg-redError rounded-[10px] cursor-pointer text-white font-medium xs:text-[18px] sm:text-[16px] text-[1vw] xxlg:px-[15px] sm:py-[10px] xlg:px-[3px] md:px-[3px] px-[15px] py-[10px] flex items-center gap-2"
              >
                Đặt làm
                <div
                  className="bg-cover w-[20px] h-[20px]"
                  style={{ backgroundImage: `url(${ic_add_to_cart_white})` }}
                />
              </button>
            </div>
            <div className="absolute top-0 left-0 w-[50px] h-[60px] bg-gradient-to-t from-redError to-primary rounded-tl-[10px] rounded-br-[10px] flex flex-col items-center justify-center">
              <p className="text-[12px] font-medium text-white">Kcal</p>
              <p className="font-bold text-white line-clamp-1 ">{Intl.NumberFormat().format(food.totalKcal)}</p>
            </div>
          </div>
        </div>

        <div className="flex sm:hidden gap-[8px]">
          <button
            onClick={() => navigate(`/recipe/${food.blogId}/${generateSlug(food.title)}`)}
            className="bg-[#FF7940] flex-1 rounded-[10px] cursor-pointer text-white font-medium xs:text-[18px] xs:px-[20px] px-1 py-[10px] flex justify-center items-center gap-2"
          >
            Công thức
            <div className="bg-cover w-[20px] h-[20px]" style={{ backgroundImage: `url(${ic_boiling_white})` }} />
          </button>
          <button
            // onClick={() => handleAddToCart(food, true)}
            onClick={() => navigate(`/recipe/${food.blogId}/${generateSlug(food.title)}`)}
            className="bg-redError flex-1 rounded-[10px] cursor-pointer text-white font-medium xs:text-[18px] xs:px-[20px]  px-1 py-[10px] flex justify-center items-center gap-2"
          >
            Đặt làm
            <div className="bg-cover w-[20px] h-[20px]" style={{ backgroundImage: `url(${ic_add_to_cart_white})` }} />
          </button>
        </div>
      </div>
    </>
  );
};

export default FoodCard;
