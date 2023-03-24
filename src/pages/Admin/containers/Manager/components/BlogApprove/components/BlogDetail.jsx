import { useEffect, useState, useRef } from 'react';
import instances from '../../../../../../../utils/plugin/axios';
import Image from '../../../../../../../share/components/Image';
import YouTube from 'react-youtube';

// ** Redux
import { getCurrentContent } from '../../../../../../../redux/actionSlice/managementSlice';
import { useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';

const BlogDetail = () => {
  // ** const
  const [previewData, setPreviewData] = useState({
    title: 'Cách làm mì ý sốt bò bằm ngon tại nhà 🥘🥘',
    processingHTML:
      '<p><img src="https://firebasestorage.googleapis.com/v0/b/homnayangi-files.appspot.com/o/blogs%2Fdc7234fa-21fd-45bc-9612-f4fb5e2f4f8b%2Fimage_2023-02-27_173941756.pngc656a399-f18e-49ae-ac89-a8500d305323?alt=media&amp;token=e0f9c3bb-d87e-4199-8cc5-00a53f80d6ad" alt="image_2023-02-27_173941756.png"></p>' +
      '<p>Rau muống nhặt bỏ phần gốc già, lá vàng, nhặt lấy phần ngọn non. Để xào rau muống giòn thì nên lấy phần cuống nhiều hơn phần lá.</p>' +
      '<p>Rau muống sau khi nhặt sạch thì rửa qua sau đó ngâm nước muối loãng khoảng 5-10 phút rồi vớt ra rửa lại, để ở rổ/rá cho ráo nước.</p>' +
      '<p><strong>Mẹo:</strong>' +
      'Ở bước này, có 1 bí quyết rất hay mà bạn có thể áp dụng, đó là sau khi rửa sạch, bạn có thể ngâm rau muống trong thau nước đá lạnh, vừa giúp rau giòn lại xanh. Ngâm khoảng 3 phút thì vớt rau ra, để ráo.</p>',
    preparationHTML:
      '<p><img src="https://firebasestorage.googleapis.com/v0/b/homnayangi-files.appspot.com/o/blogs%2Fdc7234fa-21fd-45bc-9612-f4fb5e2f4f8b%2Fimage_2023-02-27_173941756.pngc656a399-f18e-49ae-ac89-a8500d305323?alt=media&amp;token=e0f9c3bb-d87e-4199-8cc5-00a53f80d6ad" alt="image_2023-02-27_173941756.png"></p>' +
      '<p>Rau muống nhặt bỏ phần gốc già, lá vàng, nhặt lấy phần ngọn non. Để xào rau muống giòn thì nên lấy phần cuống nhiều hơn phần lá.</p>' +
      '<p>Rau muống sau khi nhặt sạch thì rửa qua sau đó ngâm nước muối loãng khoảng 5-10 phút rồi vớt ra rửa lại, để ở rổ/rá cho ráo nước.</p>' +
      '<p><strong>Mẹo:</strong>' +
      'Ở bước này, có 1 bí quyết rất hay mà bạn có thể áp dụng, đó là sau khi rửa sạch, bạn có thể ngâm rau muống trong thau nước đá lạnh, vừa giúp rau giòn lại xanh. Ngâm khoảng 3 phút thì vớt rau ra, để ráo.</p>',
  });
  const params = useParams();
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
  // useEffect(() => {
  //   if (params.blogId) {
  //     const fetch = async () => {
  //       const res = await instances.get(`/blogs/staff-preview/${params.blogId}`);
  //       // console.log(res.data);
  //       setPreviewData(res.data);
  //     };

  //     fetch();
  //   }
  // }, []);

  return (
    <div className="flex gap-3">
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
                <span className="font-medium">Khẩu phần:</span> từ {previewData?.minSize} đến {previewData?.maxSize}{' '}
                người
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
              <div
                className="mt-[30px] unreset"
                dangerouslySetInnerHTML={{ __html: previewData?.descriptionHTML }}
              ></div>

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
                              item.ingredientName == 'Gia vị'
                                ? 'text-black'
                                : 'cursor-pointer text-primary font-semibold'
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
                                <span className="text-primary cursor-pointer font-semibold">
                                  {' '}
                                  Gói gia vị homnayangi
                                </span>
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
                <div
                  className="mt-[10px] unreset"
                  dangerouslySetInnerHTML={{ __html: previewData?.finishedHTML }}
                ></div>
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
      <div className="xxlg:w-[30%] w-full sticky top-[100px] h-fit">
        <div className="bg-white px-5 py-3 rounded-[5px]">
          <p className="font-medium">Tác giả: vanhoa1098</p>
          <div className="mt-5 flex gap-3">
            <button className="text-white w-full font-medium px-5 py-2 bg-primary rounded-[5px]">Phê duyệt</button>
            <button className="text-white w-full font-medium px-5 py-2 bg-[#cfcfcf] rounded-[5px]">Từ chối</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
