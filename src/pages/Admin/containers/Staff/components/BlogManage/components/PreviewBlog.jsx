import { useEffect, useState, useRef } from 'react';
import instances from '../../../../../../../utils/plugin/axios';
import Image from '../../../../../../../share/components/Image';
import YouTube from 'react-youtube';

import { ic_calendar_white } from '../../../../../../../assets';

// ** Redux
import { getCurrentContent, setContentBlog } from '../../../../../../../redux/actionSlice/managementSlice';
import { useSelector, useDispatch } from 'react-redux';

import { useParams } from 'react-router-dom';

const PreviewBlog = () => {
  // ** Const
  const [previewData, setPreviewData] = useState();
  const params = useParams();
  const dispatch = useDispatch();
  const opts = {
    height: '420',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      // autoplay: 1,
      // controls: 0,
      // mute: bannerMId.bannerVolumeClicked ? 1 : 0,
      modestbranding: 1,
    },
  };

  // ** get url id from URL
  const getVideoIdFromUrl = (url) => {
    const urlParams = new URLSearchParams(new URL(url).search);
    return urlParams.get('v');
  };

  // ** get data preview
  useEffect(() => {
    if (params.blogId) {
      const fetch = async () => {
        const res = await instances.get(`/blogs/staff-preview/${params.blogId}`);
        // console.log(res.data);
        setPreviewData(res.data);

        // set data to prepare publish
        dispatch(setContentBlog({ title: res.data?.title }));
        dispatch(setContentBlog({ minSize: res.data?.minSize }));
        dispatch(setContentBlog({ maxSize: res.data?.maxSize }));
        dispatch(setContentBlog({ minutesToCook: res.data?.minutesToCook }));
        dispatch(setContentBlog({ isEvent: res.data?.isEvent }));
        dispatch(setContentBlog({ eventExpiredDate: res.data?.eventExpiredDate }));
        dispatch(setContentBlog({ coverImage: res.data?.imageUrl ? { url: res.data?.imageUrl } : undefined }));
        dispatch(setContentBlog({ packagePrice: res.data?.packagePrice }));
        dispatch(setContentBlog({ cookedPrice: res.data?.cookedPrice }));
        dispatch(setContentBlog({ totalKcal: res.data?.totalKcal }));
        dispatch(setContentBlog({ videoUrl: res.data?.videoUrl }));
        dispatch(setContentBlog({ description: { html: res.data?.descriptionHTML, text: res.data?.descriptionText } }));
        dispatch(setContentBlog({ preparation: { html: res.data?.preparationHTML, text: res.data?.preparationText } }));
        dispatch(setContentBlog({ processing: { html: res.data?.processingHTML, text: res.data?.processingText } }));
        dispatch(setContentBlog({ finished: { html: res.data?.finishedHTML, text: res.data?.finishedText } }));
        dispatch(setContentBlog({ Packages: res.data?.packages }));
        dispatch(setContentBlog({ regionId: res.data?.regionId }));
        dispatch(setContentBlog({ cookingMethodId: res.data?.cookingMethodId }));
        dispatch(
          setContentBlog({
            subCategory: res.data?.subCates?.map(function (item) {
              return { subCategoryId: item.subCateId, name: item.name };
            }),
          }),
        );
        dispatch(
          setContentBlog({
            ingredients: res.data?.recipeDetails?.map(function (item) {
              return { quantity: item.quantity, ingredientId: item.ingredientId, description: item.description };
            }),
          }),
        );
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
          {previewData?.isEvent && (
            <div className="w-full bg-gradient-to-r from-rose-400 to-red-500 p-5 text-white font-medium text-center">
              <p className="text-[20px] mb-2">️🎊 Bài viết sự kiện ️️🎊 </p>
              <p className="font-normal text-[16px]">
                ️🎉 Nhanh tay đăng thành quả cá nhân trong thời gian sự kiện để nhận được nhiều ưu đãi hấp dẫn! ️🎉
              </p>
              <p className="mt-2 italic">
                Thời gian kết thúc sự kiện:{' '}
                <span className="font-semibold">
                  {new Date(new Date(previewData?.eventExpiredDate).setSeconds(0)).toLocaleString()}
                </span>
              </p>
            </div>
          )}
          <div className="py-5 px-5">
            <p className="text-[30px] text-black font-semibold">{previewData?.title}</p>
            <div className="flex gap-6 items-center mt-[12px]">
              <p className="text-[16px] text-[#8f8f8f]">
                <span className="font-medium text-black">Khẩu phần:</span> từ {previewData?.minSize} đến{' '}
                {previewData?.maxSize}
                người
              </p>
              <p className="text-[16px] text-[#8f8f8f]">
                <span className="font-bold text-black">Thời gian nấu:</span> {previewData?.minutesToCook} phút
              </p>
            </div>
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
            {/* video */}
            <div className="mt-[30px]">
              {previewData?.videoUrl && (
                <>
                  <YouTube videoId={getVideoIdFromUrl(previewData?.videoUrl)} opts={opts} />
                </>
              )}
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
