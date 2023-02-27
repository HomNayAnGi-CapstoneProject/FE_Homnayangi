import { useEffect, useState, useRef } from 'react';
import instances from '../../../../../utils/plugin/axios';
import Image from '../../../../../share/components/Image';

// ** Redux
import { getCurrentContent } from '../../../../../redux/actionSlice/managementSlice';
import { useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';

const PreviewBlog = () => {
  // ** Const
  const [previewData, setPreviewData] = useState();
  const params = useParams();

  // ** get data preview
  useEffect(() => {
    if (params.blogId) {
      const fetch = async () => {
        const res = await instances.get(`/blogs/staff-preview/${params.blogId}`);
        // console.log(res.data);
        setPreviewData(res.data);
      };

      fetch();
    }
  }, []);

  return (
    <div className="bg-white xxlg:w-[70%] w-full font-inter rounded-[5px] shadow-md">
      {/* ================================= ẢNH BÌA ================================= */}
      {previewData ? (
        <>
          {previewData?.imageUrl && (
            <Image
              alt="coverImage"
              className="object-cover w-full h-[384px] rounded-tl-[5px] rounded-tr-[5px]"
              src={previewData?.imageUrl}
            />
          )}
          <div className="py-5 px-5">
            <p className="text-[30px] text-black font-semibold">{previewData?.title}</p>
            <p className="mt-[12px] text-[14px] text-[#8f8f8f]">
              <span className="font-medium">Khẩu phần:</span> từ {previewData?.minSize} đến {previewData?.maxSize} người
            </p>
            <div className="mt-[12px] flex flex-wrap gap-2">
              {previewData?.subCates?.map((item, i) => (
                <div
                  key={item.subCateId}
                  className="rounded-full w-max bg-[#EAD35B] border-[2px] border-[#8F8137] border-solid xs:px-[10px] px-[2px] py-[0px] text-[12px] text-[#525252]"
                >
                  {item.name}
                </div>
              ))}
            </div>
            <div className="mt-[30px] unreset" dangerouslySetInnerHTML={{ __html: previewData?.descriptionHTML }}></div>

            <div className="mt-[30px]">
              <p className="font-semibold text-[20px]">Nguyên liệu:</p>
              <div className="p-5 bg-[#FFDACA] rounded-[10px] mt-[18px] text-[18px]">
                {previewData?.recipeDetails?.length > 0 &&
                  previewData?.recipeDetails?.map((item, i) => (
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

            <div className="mt-[30px]">
              <p className="font-semibold text-[20px]">Sơ chế:</p>
              <div
                className="mt-[10px] unreset"
                dangerouslySetInnerHTML={{ __html: previewData?.preparationHTML }}
              ></div>
            </div>
            <div className="mt-[30px]">
              <p className="font-semibold text-[20px]">Cách chế biến:</p>
              <div
                className="mt-[10px] unreset"
                dangerouslySetInnerHTML={{ __html: previewData?.processingHTML }}
              ></div>
            </div>
            <div className="mt-[30px]">
              <p className="font-semibold text-[20px]">Thành phẩm:</p>
              <div className="mt-[10px] unreset" dangerouslySetInnerHTML={{ __html: previewData?.finishedHTML }}></div>
            </div>
          </div>
        </>
      ) : (
        <div className="py-5 px-5">Chưa có nội dung</div>
      )}
    </div>
  );
};

export default PreviewBlog;
