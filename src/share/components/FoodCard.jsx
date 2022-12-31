import React from 'react';
import { ic_boiling_white } from '../../assets';
import { ic_add_to_cart_white } from '../../assets';

const FoodCard = (props) => {
  const { food } = props;
  // console.log(food);
  return (
    <>
      {
        <div
          key={food.id}
          className={`relative font-inter rounded-[10px] bg-[#FFA883] p-[10px] ${
            food.ingredient ? ' md:h-[245px]' : 'md:h-[220px]'
          } flex sm:flex-row flex-col gap-[18px] drop-shadow-3xl`}
        >
          <div className="flex gap-[18px]">
            {/* <img
              className="md:w-[200px] md:h-[200px] w-[170px] h-[170px] bg-contain bg-center px-2 py-2 border-[2px] border-solid border-white"
              src={food.image}
            ></img> */}
            <div
              className={`rounded-[10px] border-[2px] border-solid border-white bg-cover bg-center sm:h-[180px] sm:w-[180px] ${
                food.ingredient ? 'md:w-[225px] md:h-[225px]' : 'md:w-[198px] md:h-[198px]'
              } w-[150px] h-[150px]`}
              // style={{ backgroundImage: `url(${food.image})` }}
            >
              <img className="object-cover w-full" alt={food.name} loading="lazy" src={food.image} />
            </div>
            <div className="flex-1">
              <p className="sm:text-[20px] text-[18px] font-semibold text-black mb-[10px] line-clamp-1">{food.name}</p>

              <div className="flex gap-[7px]">
                {food.tags.map((tag) => {
                  return (
                    <>
                      {tag === 'Buổi trưa' ? (
                        <div className="rounded-full bg-[#EAD35B] border-[2px] border-[#8F8137] border-solid xs:px-[10px] px-[2px] py-[0px] text-[12px] text-[#525252]">
                          {tag}
                        </div>
                      ) : (
                        <div className="rounded-full bg-[#88EA5B] border-[2px] border-[#48822c] border-solid xs:px-[10px] px-[2px] py-[0px] text-[12px] text-[#525252]">
                          {tag}
                        </div>
                      )}
                    </>
                  );
                })}
              </div>
              <div className="flex">
                {!food.ingredient ? (
                  ''
                ) : (
                  <div className="mt-[5px] flex">
                    <p className="font-inter font-medium mr-1 text-[#525252]">{food.ingredient}:</p>
                    <p className="text-redError font-semibold">{Intl.NumberFormat().format(food.price)}đ</p>
                  </div>
                )}
              </div>
              <p
                className={`leading-[25px] ${
                  food.ingredient ? 'mt-[10px]' : 'mt-[20px] '
                } sm:line-clamp-2 line-clamp-3`}
              >
                {food.title}
              </p>
              {/* <div className="lg:flex hidden absolute bottom-[10px] gap-[8px] py-1 ">
                <button className="flex justify-center items-center rounded-[10px] mr-5 p-2 min-w-[25%] hover:shadow-xl">
                  <p className="mr-2 ">Công Thức</p>{' '}
                  <div className="w-[24px] h-[24px] bg-cover" style={{ backgroundImage: `url(${ic_boiling_white})` }} />
                </button>
                <button className="flex justify-center items-center rounded-[10px] p-2 min-w-[20%] btn-order hover:shadow-xl">
                  <p className="mr-2">Đặt Làm</p>
                  <div
                    className="w-[25px] h-[25px] bg-cover"
                    style={{ backgroundImage: `url(${ic_add_to_cart_white})` }}
                  />
                </button>
              </div> */}
              <div className="sm:flex hidden absolute bottom-[10px]  gap-[8px]">
                <button className="bg-[#FF7940] rounded-[10px] cursor-pointer text-white font-medium xs:text-[18px] sm:text-[16px] text-[1vw] lg:px-[15px] sm:py-[10px] px-[6px] py-[10px] flex items-center gap-2">
                  Công thức
                  <div className="bg-cover w-[20px] h-[20px]" style={{ backgroundImage: `url(${ic_boiling_white})` }} />
                </button>
                <button className="bg-redError rounded-[10px] cursor-pointer text-white font-medium xs:text-[18px] sm:text-[16px] text-[1vw] lg:px-[15px] sm:py-[10px] px-[6px] py-[10px] flex items-center gap-2">
                  Đặt làm
                  <div
                    className="bg-cover w-[20px] h-[20px]"
                    style={{ backgroundImage: `url(${ic_add_to_cart_white})` }}
                  />
                </button>
              </div>
            </div>
          </div>

          <div className="flex sm:hidden gap-[8px]">
            <button className="bg-[#FF7940] flex-1 rounded-[10px] cursor-pointer text-white font-medium xs:text-[18px] xs:px-[20px] px-1 py-[10px] flex justify-center items-center gap-2">
              Công thức
              <div className="bg-cover w-[20px] h-[20px]" style={{ backgroundImage: `url(${ic_boiling_white})` }} />
            </button>
            <button className="bg-redError flex-1 rounded-[10px] cursor-pointer text-white font-medium xs:text-[18px] xs:px-[20px]  px-1 py-[10px] flex justify-center items-center gap-2">
              Đặt làm
              <div className="bg-cover w-[20px] h-[20px]" style={{ backgroundImage: `url(${ic_add_to_cart_white})` }} />
            </button>
          </div>
        </div>
      }
    </>
  );
};

export default FoodCard;
