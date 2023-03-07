import { useState } from 'react';
import moment from 'moment';
import Breadcrumbs from '../../../share/components/Breadcrumbs';
import Image from '../../../share/components/Image';
// ** Assets
import staticFood from '../../../assets/images/about_1.webp';

// ** dataa
const ingredients = [
  {
    id: 233,
    name: 'Cá lóc',
    description: '1 con khoảng 700g, bạn nên chọn cá lóc đồng để nếu thịt cá sẽ thơm ngon và dai hơn nhìu.',
  },
  { id: 234, name: 'Thịt heo', description: '200g (phần thịt rọi nhiều mỡ)' },
  { id: 235, name: 'Hành lá', description: '50g' },
  { id: 236, name: 'Ớt chỉ thiên', description: '5 trái' },
  { id: 237, name: 'Ớt ngọt', description: 'mỗi loại 1 trái' },
  { id: 238, name: 'Giềng', description: '1 nhánh to' },
  { id: 239, name: 'Gừng', description: '1 nhánh' },
  { id: 240, name: 'Gia vị', description: ['Hạt nêm', 'Tiêu', 'Nước mắm', 'Bột ngọt'] },
];

const MainBlog = (props) => {
  const { blogDetail } = props;
  return (
    <div className="font-inter bg-white rounded-[5px] shadow-md">
      {blogDetail ? (
        <>
          <Image
            src={blogDetail?.imageUrl}
            alt=""
            className="w-full object-cover bg-cover bg-center h-[384px] rounded-tl-[5px] rounded-tr-[5px]"
          />
          <div className="py-5 px-5">
            <p className="text-[#8f8f8f] text-[14px] mb-2">
              {moment(blogDetail?.updatedDate).startOf('day').fromNow()}
            </p>
            <p className="text-[30px] text-black font-semibold">{blogDetail?.title}</p>
            <p className="mt-[12px] text-[14px] text-[#8f8f8f]">
              <span className="font-medium">Khẩu phần:</span> từ {blogDetail?.minSize} đến {blogDetail?.maxSize} người
            </p>
            <div className="mt-[20px] flex flex-wrap gap-2">
              {blogDetail?.subCates?.map((item, i) => (
                <div
                  key={item.subCateId}
                  className="rounded-full w-max bg-[#EAD35B] border-[2px] border-[#8F8137] border-solid xs:px-[10px] px-[2px] py-[0px] text-[12px] text-[#525252]"
                >
                  {item.name}
                </div>
              ))}
            </div>
            <div
              dangerouslySetInnerHTML={{ __html: blogDetail?.descriptionHTML }}
              className="mt-[30px] leading-7 text-[18px] unreset"
            ></div>

            <div id="ingredient" className="mt-[30px]">
              <p className="font-semibold text-[20px]">Nguyên liệu:</p>
              <div className="p-5 bg-[#FFDACA] rounded-[10px] mt-[18px] text-[18px]">
                {blogDetail?.recipeDetails?.length > 0 &&
                  blogDetail?.recipeDetails?.map((item, i) => (
                    <div key={item.ingredientId} className="">
                      <p>
                        {i + 1}.{' '}
                        <span
                          className={`${
                            item.ingredientName == 'Gia vị' ? 'text-black' : 'cursor-pointer text-primary font-semibold'
                          }`}
                        >
                          {item.ingredientName}
                        </span>
                        <span>
                          :{' '}
                          {item.ingredientName == 'Gia vị' ? (
                            <>
                              {item.description.map((item, i) => (
                                <span key={i} className="cursor-pointer text-primary font-semibold">
                                  {(i ? ', ' : '') + item}
                                </span>
                              ))}
                              <span>. Hoặc</span>
                              <span className="text-primary cursor-pointer font-semibold"> Gói gia vị homnayangi</span>
                            </>
                          ) : (
                            item.description
                          )}
                        </span>
                      </p>
                    </div>
                  ))}
              </div>
            </div>

            <div className="buy-order my-[20px]">
              <div className="flex justify-center items-center gap-6">
                <i>Mua gói nguyên liệu này?</i>
                <button className="rounded-[5px] bg-primary hover:bg-primaryHover transition px-6 py-2 text-white font-medium uppercase">
                  Đặt mua
                </button>
              </div>
              <p className="text-center my-3 text-[#8B8B8B]">Hoặc</p>
              <div className="flex justify-center items-center gap-6">
                <i>Đặt làm riêng món này?</i>
                <button className="rounded-[5px] bg-redError hover:bg-redErrorHover transition px-6 py-2 text-white font-medium uppercase">
                  Đặt làm
                </button>
              </div>
            </div>

            <div id="preparation" className="mt-[30px]">
              <p className="font-semibold text-[20px]">Sơ chế:</p>

              <div
                dangerouslySetInnerHTML={{ __html: blogDetail?.preparationHTML }}
                className="preparation-content mt-[18px] leading-7 text-[18px] unreset"
              ></div>
            </div>

            <div id="cooking" className="mt-[30px]">
              <p className="font-semibold text-[20px]">Cách chế biến:</p>

              <div
                dangerouslySetInnerHTML={{ __html: blogDetail?.processingHTML }}
                className="cooking-content mt-[18px] leading-7 text-[18px] unreset"
              ></div>
            </div>

            <div id="completion" className="mt-[30px]">
              <p className="font-semibold text-[20px]">Thành phẩm:</p>
              <div
                dangerouslySetInnerHTML={{ __html: blogDetail?.finishedHTML }}
                className="completion-content mt-[18px] leading-7 text-[18px] unreset"
              ></div>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-2">Đang load...</div>
      )}
    </div>
  );
};

export default MainBlog;
