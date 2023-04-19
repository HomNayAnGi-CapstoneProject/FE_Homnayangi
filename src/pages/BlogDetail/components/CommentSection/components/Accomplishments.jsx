import { useState, useEffect, useRef } from 'react';
import instances from '../../../../../utils/plugin/axios';
import Accomplishment from './Accomplishment';
import CustomModal from '../../../../../share/components/Modal/CustomModal';

import { setReturnUrl } from '../../../../../redux/actionSlice/globalSlice';

// ** assets
import default_user from '../../../../../assets/images/default_user.png';
import { ic_image_black, ic_video_black, ic_image_gray, ic_video_gray, ic_trash_white } from '../../../../../assets';

// ** third party
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Tooltip } from '@mui/material';

// ** Firebase
import { storage } from '../../../../../firebase';
import { ref, uploadBytes, listAll, getDownloadURL, deleteObject } from 'firebase/storage';

const Accomplishments = (props) => {
  const { setAccomNum, accomList, setUpdateAccom } = props;
  // ** get user detail
  const accessToken = localStorage.getItem('accessToken');
  let decoded_jwt = {};
  if (accessToken) {
    decoded_jwt = jwt_decode(accessToken);
  }

  // ** const
  const imagesRef = useRef(null);
  const videosRef = useRef(null);
  const [commentValue, setCommentValue] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [checkHadAccom, setCheckHadAccom] = useState();
  const [imageList, setImageList] = useState([]);
  const [videoList, setVideoList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const notifyError = () =>
    toast.error('Có lỗi xảy ra khi thực hiện bình luận', {
      pauseOnHover: false,
    });

  const notifyImageLimitError = (error) =>
    toast.error(error, {
      pauseOnHover: false,
      position: 'top-center',
      autoClose: 2000,
    });
  const Message = () => {
    return (
      <>
        <p>
          Để tránh người dùng đăng nội dung không phù hợp, thành quả của bạn đã được gửi để chờ duyệt, bạn có thể theo
          dõi trạng thái của thành quả cá nhân tại đây
        </p>
        <div
          onClick={() => navigate('/user/accomplishments')}
          className="cursor-pointer bg-green-500 text-white font-inter font-medium text-center rounded mt-3 py-1"
        >
          Theo dõi thành quả cá nhân
        </div>
      </>
    );
  };
  const notifySuccess = () =>
    toast.success(<Message />, {
      position: 'top-center',
      pauseOnHover: false,
      autoClose: 6000,
    });

  // ** check if customer had accomplishment onn this blog
  useEffect(() => {
    if (accessToken) {
      let allAccomList = [];
      let foundAccom = undefined;
      const fetch = async () => {
        const res = await instances.get(`/accomplishments/customer-manage`);
        allAccomList = res.data.result.filter((item) => item.status == 3 || item.status == 1);
        foundAccom = allAccomList.find((item) => item.blogId == params.id);
        if (foundAccom !== undefined) {
          // console.log(foundAccom);
          setCheckHadAccom(foundAccom);
        } else {
          setCheckHadAccom();
        }
      };
      fetch();
    }
  }, []);

  //** functs */
  const handleDoComment = async () => {
    if (!commentValue.trim()) {
      setOpenModal(true);
    } else {
      // console.log({
      //   listVideo: videoList,
      //   listImage: imageList,
      //   content: commentValue,
      //   blogId: params.id,
      // });
      try {
        //** require imageList or videoList when posting
        if (imageList.length > 0 && videoList.length == 0) {
          setUploading(true);
          uploadMultiImages(imageList).then((listImages) => {
            // console.log(listImages);
            instances
              .post('/accomplishments', {
                listVideo: [],
                listImage: listImages,
                content: commentValue,
                blogId: params.id,
              })
              .then((res) => {
                // console.log(res);
                if (res.data.status == 'success') {
                  setUploading(false);
                  setCommentValue('');
                  setImageList([]);
                  imagesRef.current.value = null;
                  notifySuccess();
                } else {
                  setUploading(false);
                  setCommentValue('');
                  setImageList([]);
                  imagesRef.current.value = null;
                  notifyImageLimitError('Bạn chỉ được đăng 1 thành quả ở mỗi bài viết');
                }
              });
          });
        } else if (videoList.length > 0 && imageList.length == 0) {
          setUploading(true);
          uploadMultiVideos(videoList).then((listVideos) => {
            // console.log(listVideos);
            instances
              .post('/accomplishments', {
                listVideo: listVideos,
                listImage: [],
                content: commentValue,
                blogId: params.id,
              })
              .then((res) => {
                if (res.data.status == 'success') {
                  // console.log(res);
                  setUploading(false);
                  setCommentValue('');
                  setVideoList([]);
                  videosRef.current.value = null;
                  notifySuccess();
                } else {
                  setUploading(false);
                  setCommentValue('');
                  setVideoList([]);
                  videosRef.current.value = null;
                  notifyImageLimitError('Bạn chỉ được đăng 1 thành quả ở mỗi bài viết');
                }
              });
          });
        } else if (videoList.length > 0 && imageList.length > 0) {
          const listImages = await uploadMultiImages(imageList);
          const listVideos = await uploadMultiVideos(videoList);
          instances
            .post('/accomplishments', {
              listVideo: listVideos,
              listImage: listImages,
              content: commentValue,
              blogId: params.id,
            })
            .then((res) => {
              // console.log(res);
              if (res.data.status == 'success') {
                setUploading(false);
                setCommentValue('');
                setImageList([]);
                imagesRef.current.value = null;
                setVideoList([]);
                videosRef.current.value = null;
                notifySuccess();
              } else {
                setUploading(false);
                setCommentValue('');
                setImageList([]);
                imagesRef.current.value = null;
                setVideoList([]);
                videosRef.current.value = null;
                notifyImageLimitError('Bạn chỉ được đăng 1 thành quả ở mỗi bài viết');
              }
            });
        } else {
          notifyImageLimitError('Thành quả phải có ít nhất 1 ảnh hoặc 1 video');
        }
      } catch (error) {
        notifyError();
      }
    }
  };

  // ** Upload multiple images
  const uploadMultiImages = async (images) => {
    const imagePromises = Array.from(images, (image) => uploadImage(image));

    const imageRes = await Promise.all(imagePromises);
    return imageRes;
  };

  // ** Upload multiple videos
  const uploadMultiVideos = async (videos) => {
    const videoPromises = Array.from(videos, (video) => uploadVideo(video));

    const videoRes = await Promise.all(videoPromises);
    return videoRes;
  };

  // ** Upload image
  const uploadImage = (file) => {
    return new Promise((resolve, reject) => {
      let imageUp = file;
      if (imageUp == null) {
        // resolve(file);
        return;
      }

      //create folder and image name
      const imageRef = ref(
        storage,
        `accomplishments/${params.title}/${decoded_jwt.Id}/${imageUp.name + crypto.randomUUID()}`,
      );
      // setUploading(true);

      //upload image
      uploadBytes(imageRef, imageUp).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          resolve(url);
          // setUploading(false);
        });
      });
    });
  };

  // ** Upload video
  const uploadVideo = (file) => {
    return new Promise((resolve, reject) => {
      let videoUp = file;
      if (videoUp == null) {
        resolve(file);
        return;
      }

      //create folder and video name
      const videoRef = ref(
        storage,
        `accomplishments/${params.title}/${decoded_jwt.Id}/${videoUp.name + crypto.randomUUID()}`,
      );
      // setUploading(true);

      //upload image
      uploadBytes(videoRef, videoUp).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          resolve(url);
          // setUploading(false);
        });
      });
    });
  };

  // ** handle select list image
  const handleSelectListImage = (e) => {
    const selectedFiles = e.target.files;
    const selectedFilesArray = Array.from(selectedFiles);
    // console.log(selectedFiles);
    let validImage = true;
    selectedFilesArray.forEach((file) => {
      // check file size and type
      if (!file.name.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
        // file.target.value = null;
        validImage = false;
        notifyImageLimitError('Không đúng định dạng hình ảnh. Vui lòng chọn ảnh phù hợp (.jpg,.png,.jpeg)');
      }

      if (file.size >= 2621440) {
        // file.target.value = null;
        validImage = false;
        notifyImageLimitError(
          `Dung lượng ảnh quá lớn (${Math.round(file.size / 1000000)} MB). Dụng lượng tối đa (2.5 MB)`,
        );
      }
    });
    if (validImage) {
      if (selectedFilesArray.length > 5) {
        notifyImageLimitError('Số lượng ảnh tối đa 5');
        setImageList(selectedFilesArray.slice(0, 5));
      } else {
        setImageList(selectedFilesArray);
      }
    }
  };

  // ** handle select list video
  const handleSelectListVideo = (e) => {
    const selectedFiles = e.target.files;
    const selectedFilesArray = Array.from(selectedFiles);
    // console.log(videoList);
    let validVideo = true;
    selectedFilesArray.forEach((file) => {
      // check file size and type
      if (!file.name.match(/\.(mp4)$/)) {
        // file.target.value = null;
        validVideo = false;
        notifyImageLimitError('Vui lòng chọn video phù hợp (.mp4)');
      }

      if (file.size >= 26214400) {
        // file.target.value = null;
        validVideo = false;
        notifyImageLimitError(
          `Dung lượng video quá lớn (${Math.round(file.size / 1000000)} MB). Dụng lượng tối đa (25 MB)`,
        );
      }
    });
    if (validVideo) {
      if (selectedFilesArray.length > 2) {
        notifyImageLimitError('Số lượng video tối đa 2');
        setVideoList(selectedFilesArray.slice(0, 2));
      } else {
        setVideoList(selectedFilesArray);
      }
    }
  };

  return (
    <>
      <CustomModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        title="Lỗi khi đăng thành quả"
        description="Thành quả không được trống!"
      />
      <div className="bg-white px-5 py-3 rounded-[5px]">
        {/* comment input */}
        <div className="flex gap-5 relative">
          {/* check authen user */}
          {accessToken ? (
            checkHadAccom == undefined ? (
              <>
                <img
                  alt="user_avartar"
                  className="object-cover rounded-full w-[40px] h-[40px]"
                  src={accessToken ? (decoded_jwt.Avatar == '' ? default_user : decoded_jwt.Avatar) : default_user}
                />
                <div className="w-full">
                  <textarea
                    name="comment"
                    value={commentValue}
                    placeholder="Chia sẻ thành quả..."
                    // onBlur={(e) => props?.handleInputNote(e.target.value)}
                    onChange={(e) => setCommentValue(e.target.value)}
                    rows="1"
                    className="p-2.5 w-full text-gray-900 bg-white rounded border border-gray-400
      focus:outline-none focus:bg-white focus:border-primary"
                  ></textarea>
                  <div className="flex gap-3">
                    {/* create accom button */}
                    <button
                      disabled={commentValue == '' ? true : uploading ? true : false}
                      onClick={() => handleDoComment()}
                      className={`${
                        commentValue == ''
                          ? 'bg-secondary cursor-not-allowed'
                          : uploading
                          ? 'bg-secondary cursor-not-allowed'
                          : 'bg-primary'
                      } px-4 py-1 rounded-[5px] text-white font-medium`}
                    >
                      {uploading ? 'Đang đăng thành quá...' : 'Xác nhận'}
                    </button>
                    {/* image list */}
                    <label
                      htmlFor="listImage"
                      className={`cursor-pointer w-fit ${
                        commentValue == ''
                          ? 'bg-white cursor-not-allowed text-gray-300 border-gray-300'
                          : uploading
                          ? 'bg-white cursor-not-allowed text-gray-300 border-gray-300'
                          : 'bg-white text-black border-black'
                      } px-4 py-1 rounded-[5px] font-medium border flex items-center gap-2`}
                    >
                      {!imageList.length > 0 ? (
                        <>
                          Chọn ảnh
                          <img
                            src={commentValue == '' ? ic_image_gray : ic_image_black}
                            alt=""
                            className="object-contain w-[24px] h-[24px]"
                          />
                        </>
                      ) : (
                        <>
                          Thay đổi
                          <img
                            src={commentValue == '' ? ic_image_gray : ic_image_black}
                            alt=""
                            className="object-contain w-[24px] h-[24px]"
                          />
                        </>
                      )}
                      <input
                        ref={imagesRef}
                        disabled={commentValue == '' ? true : false}
                        multiple
                        name="listImage"
                        id="listImage"
                        style={{ display: 'none' }}
                        type="file"
                        accept="image/png, image/gif, image/jpeg, image/jpg"
                        onChange={(e) => handleSelectListImage(e)}
                      />
                    </label>
                    {/* video list */}
                    <label
                      htmlFor="videoList"
                      className={`cursor-pointer w-fit ${
                        commentValue == ''
                          ? 'bg-white cursor-not-allowed text-gray-300 border-gray-300'
                          : uploading
                          ? 'bg-white cursor-not-allowed text-gray-300 border-gray-300'
                          : 'bg-white text-black border-black'
                      } px-4 py-1 rounded-[5px] font-medium border flex items-center gap-2`}
                    >
                      {!videoList.length > 0 ? (
                        <>
                          Chọn video
                          <img
                            src={commentValue == '' ? ic_video_gray : ic_video_black}
                            alt=""
                            className="object-contain w-[24px] h-[24px]"
                          />
                        </>
                      ) : (
                        <>
                          Thay đổi
                          <img
                            src={commentValue == '' ? ic_video_gray : ic_video_black}
                            alt=""
                            className="object-contain w-[24px] h-[24px]"
                          />
                        </>
                      )}
                      <input
                        ref={videosRef}
                        disabled={commentValue == '' ? true : false}
                        multiple
                        name="videoList"
                        id="videoList"
                        style={{ display: 'none' }}
                        type="file"
                        accept="video/*"
                        onChange={(e) => handleSelectListVideo(e)}
                      />
                    </label>
                  </div>
                  {/* preview images */}
                  <div className="flex flex-wrap gap-2 mt-5">
                    {imageList &&
                      imageList.map((item, i) => (
                        <img
                          key={i}
                          className="w-[80px] h-[80px] object-cover rounded"
                          src={URL.createObjectURL(item)}
                          alt="default-img_list"
                        />
                      ))}
                    {imageList?.length > 0 && !uploading && (
                      <Tooltip title="Xóa tất cả ảnh đã chọn" placement="right">
                        <button
                          onClick={() => {
                            setImageList([]);
                            imagesRef.current.value = null;
                          }}
                          className="px-2 py-1 h-fit rounded-[5px] font-medium bg-redError text-white flex items-center gap-2"
                        >
                          <img src={ic_trash_white} alt="" className="object-contain w-[20px] h-[20px]" />
                        </button>
                      </Tooltip>
                    )}
                  </div>
                  {/* preview videos */}
                  <div className="flex flex-wrap gap-2 mt-5">
                    {videoList &&
                      videoList.map((item, i) => (
                        <video
                          controls
                          key={i}
                          className="w-[220px] h-[120px] object-cover rounded"
                          src={URL.createObjectURL(item)}
                          alt="default-img_list"
                        />
                      ))}
                    {videoList?.length > 0 && !uploading && (
                      <Tooltip title="Xóa tất cả video đã chọn" placement="right">
                        <button
                          onClick={() => {
                            setVideoList([]);
                            videosRef.current.value = null;
                          }}
                          className="px-2 py-1 h-fit rounded-[5px] font-medium bg-redError text-white flex items-center gap-2"
                        >
                          <img src={ic_trash_white} alt="" className="object-contain w-[20px] h-[20px]" />
                        </button>
                      </Tooltip>
                    )}
                  </div>
                  {/* uploading mess */}
                  {uploading && <p className="mt-5">Đang đăng thành quả...</p>}
                </div>
              </>
            ) : (
              <div className="h-full bg-white w-full text-center pb-3">
                <p>💡 Bạn chỉ được đăng thành quả cá nhân một lần trong mỗi bài viết</p>
                {checkHadAccom?.status == 3 && (
                  <p className="text-[14px] italic text-gray-500">
                    (thành quả của bạn ở bài viết này đang được chờ duyệt!{' '}
                    <span
                      onClick={() => navigate('/user/accomplishments')}
                      className="underline text-primary cursor-pointer"
                    >
                      kiểm tra
                    </span>
                    )
                  </p>
                )}
              </div>
            )
          ) : (
            <div className="h-full bg-white w-full text-center">
              <p>Bạn cần đăng nhập để có thể thực hiện chức năng này</p>
              <button
                onClick={() => {
                  // console.log(location.pathname);
                  dispatch(setReturnUrl(location.pathname));
                  navigate('/login');
                }}
                className="py-1 px-3 mt-4 bg-primary rounded-[5px] text-white font-medium uppercase"
              >
                Đăng nhập
              </button>
            </div>
          )}
        </div>
        {accomList.length > 0 ? (
          <div className="mt-6">
            {accomList.map((item, i) => (
              <div key={item.accomplishmentId} className="mt-4 first:mt-0">
                <Accomplishment
                  data={item}
                  setUpdateAccom={setUpdateAccom}
                  setOpenModal={setOpenModal}
                  accessToken={accessToken}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center mt-5">Chưa có thành quả nào</div>
        )}
      </div>
    </>
  );
};

export default Accomplishments;
