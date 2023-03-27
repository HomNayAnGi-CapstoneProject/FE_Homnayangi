import { useEffect, useState, useRef } from 'react';
import instances from '../../../../../../../utils/plugin/axios';
import Image from '../../../../../../../share/components/Image';
import YouTube from 'react-youtube';

// ** Redux
import { getCurrentContent } from '../../../../../../../redux/actionSlice/managementSlice';
import { useSelector } from 'react-redux';

// ** third party
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const BlogDetail = () => {
  // ** const
  const navigate = useNavigate();
  const [previewData, setPreviewData] = useState();
  const params = useParams();
  const successNotify = (type) =>
    toast.success(type == 'APPROVE' ? 'Bạn đã duyệt bài viết này 👌' : 'Bạn đã không duyệt bài viết này');
  const errorNotify = () => toast.error('Có lỗi xảy ra');
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
      };

      fetch();
    }
  }, []);

  // ** handle approve blog
  const handleApproveReject = async (type) => {
    // toast.promise(
    //   instances.put(`/blogs/${type}/${params.blogId}`).then((res) => {
    //     if (res.status !== 'failed') {
    //       navigate(`/management/blog-review`);
    //     }
    //   }),
    //   {
    //     pending: type == 'APPROVE' ? 'Đang duyệt bài viết' : 'Từ chối bài viết',
    //     success: type == 'APPROVE' ? 'Bạn đã duyệt bài viết này 👌' : 'Bạn đã không duyệt bài viết này',
    //     error: {
    //       render({ data }) {
    //         // return data.response?.data.error;
    //       },
    //     },
    //   },
    // );
    const res = await instances.put(`/blogs/${type}/${params.blogId}`);
    if (res.data.status !== 'failed') {
      successNotify(type);
      navigate(`/management`);
    } else {
      errorNotify();
    }
  };

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
          <p className="font-medium">Tác giả: {previewData?.authorName}</p>
          {previewData?.blogStatus == 3 && (
            <div className="mt-5 flex gap-3">
              <button
                onClick={() => handleApproveReject('APPROVE')}
                className="text-white w-full font-medium px-5 py-2 bg-primary rounded-[5px]"
              >
                Phê duyệt
              </button>
              <button
                onClick={() => handleApproveReject('REJECT')}
                className="text-white w-full font-medium px-5 py-2 bg-[#cfcfcf] rounded-[5px]"
              >
                Từ chối
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
