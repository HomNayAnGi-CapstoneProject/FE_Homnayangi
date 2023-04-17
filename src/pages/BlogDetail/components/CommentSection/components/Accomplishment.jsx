import { useState, useRef, useEffect } from 'react';
import instances from '../../../../../utils/plugin/axios';
import Image from '../../../../../share/components/Image';
import { setReturnUrl } from '../../../../../redux/actionSlice/globalSlice';
import ModalRequireLogin from '../../../../../share/components/Modal/ModalRequireLogin';
import generateSlug from '../../../../../utils/generateSlug';

import {
  ic_repcomment,
  ic_menu_dots,
  ic_image_black,
  ic_video_black,
  ic_image_gray,
  ic_video_gray,
  ic_trash_white,
} from '../../../../../assets';
import default_user from '../../../../../assets/images/default_user.png';
import heart from '../../../../../assets/images/heart.png';
import heart_red from '../../../../../assets/images/heart_red.png';

// ** Firebase
import { storage } from '../../../../../firebase';
import { ref, uploadBytes, listAll, getDownloadURL, deleteObject } from 'firebase/storage';

// ** third party
import moment from 'moment/moment';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Modal } from '@mui/material';
import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';
import OutsideClickHandler from 'react-outside-click-handler';
import { Tooltip } from '@mui/material';

const Accomplishment = (props) => {
  const { data, setUpdateAccom, setOpenModal, accessToken, isFromYourAccom } = props;

  let decoded_jwt = {};
  if (accessToken) {
    decoded_jwt = jwt_decode(accessToken);
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const imagesRef = useRef(null);
  const videosRef = useRef(null);
  const [imageList, setImageList] = useState([]);
  const [videoList, setVideoList] = useState([]);
  const [removeDataImages, setRemoveDataImages] = useState(false);
  const [removeDataVideo, setRemoveDataVideo] = useState(false);

  const [uploading, setUploading] = useState(false);
  const [openRequireLogin, setOpenRequireLogin] = useState(false);
  const [editContent, setEditContent] = useState(false);
  const [editValue, setEditValue] = useState(data.content);
  const [openOpenUpdateEdit, setOpenOpenUpdateEdit] = useState(false);

  const [isYourReaction, setYourReaction] = useState(false);
  const [reaction, setReaction] = useState(data?.reaction);

  // ** notify
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

  // ** get personel reaction
  useEffect(() => {
    if (accessToken) {
      const fetch = async () => {
        const res = await instances.get(`accomplishmentreactions/accomplishments/${data.accomplishmentId}`);
        if (res.data.status == 'success') {
          setYourReaction(true);
        } else {
          setYourReaction(false);
        }
      };
      fetch();
    }
  }, []);

  // ** FUNTIONS

  // ** handle open update, delete accom modal
  const handleCmtOptions = () => {
    if (data.authorId === decoded_jwt.Id) {
      setOpenOpenUpdateEdit((prev) => !prev);
      // console.log(data.item1.content);
    }
  };

  // ** open edit accom
  const handleOpenEdit = () => {
    if (data.authorId === decoded_jwt.Id) {
      setOpenOpenUpdateEdit(false);
      setEditContent(true);
    }
  };

  // ** handle delete accom
  const handleDelete = async () => {
    if (data.authorId === decoded_jwt.Id) {
      try {
        const res = await instances.delete(`/accomplishments/customer-delete/${data.accomplishmentId}`);
        // console.log(res);
        setUpdateAccom((prev) => !prev);
      } catch (error) {
        // notifyError();
      }
    }
  };

  //** functs */
  const handleDoComment = async () => {
    if (!editValue.trim()) {
      setOpenModal(true);
    } else {
      // console.log({
      //   listVideo: videoList,
      //   listImage: imageList,
      //   content: editValue,
      //   blogId: params.id,
      //   accomplishmentId: data?.accomplishmentId,
      // });
      try {
        //** require imageList or videoList when posting
        //! ==> có data hình/ không có data video
        if (data?.listImage.length > 0 && data?.listVideo.length == 0) {
          // chỉ update text/ không update media (giữ data hình/ không chọn mới video)
          if (data?.listImage.length > 0 && videoList?.length == 0) {
            setUploading(true);
            const res = await instances.put('/accomplishments', {
              listVideo: [],
              listImage: data?.listImage,
              content: editValue,
              blogId: params.id,
              accomplishmentId: data?.accomplishmentId,
            });
            if (res.data.status == 'success') {
              setUpdateAccom((prev) => !prev);
              setUploading(false);
              notifySuccess();
            } else {
              setUpdateAccom((prev) => !prev);
              setUploading(false);
              notifyImageLimitError('Bạn chỉ được đăng 1 thành quả ở mỗi bài viết');
            }
          }
          // có data hình/ chọn thêm video
          if (data?.listImage.length > 0 && videoList?.length > 0) {
            setUploading(true);
            const listVideos = await uploadMultiVideos(videoList);
            const res = await instances.put('/accomplishments', {
              listVideo: listVideos,
              listImage: data?.listImage,
              content: editValue,
              blogId: params.id,
              accomplishmentId: data?.accomplishmentId,
            });
            if (res.data.status == 'success') {
              setUpdateAccom((prev) => !prev);
              setUploading(false);
              setVideoList([]);
              videosRef.current.value = null;
              notifySuccess();
            } else {
              setUpdateAccom((prev) => !prev);
              setUploading(false);
              setVideoList([]);
              videosRef.current.value = null;
              notifyImageLimitError('Bạn chỉ được đăng 1 thành quả ở mỗi bài viết');
            }
            // uploadMultiVideos(videoList).then((listVideos) => {
            //   // console.log(listImages);
            //   instances
            //     .put('/accomplishments', {
            //       listVideo: listVideos,
            //       listImage: listImages.length > 0 ? listImages : data?.listImage,
            //       content: editValue,
            //       blogId: params.id,
            //       accomplishmentId: data?.accomplishmentId,
            //     })
            //     .then((res) => {
            //       // console.log(res);
            //       if (res.data.status == 'success') {
            //         setUploading(false);
            //
            //         setImageList([]);
            //         imagesRef.current.value = null;
            //         notifySuccess();
            //       } else {
            //         setUploading(false);
            //
            //         setImageList([]);
            //         imagesRef.current.value = null;
            //         notifyImageLimitError('Bạn chỉ được đăng 1 thành quả ở mỗi bài viết');
            //       }
            //     });
            // });
          }
          // xóa data hình/ chọn thêm video
          if (removeDataImages && videoList?.length > 0) {
            setUploading(true);
            const listVideos = await uploadMultiVideos(videoList);
            const res = await instances.put('/accomplishments', {
              listVideo: listVideos,
              listImage: [],
              content: editValue,
              blogId: params.id,
              accomplishmentId: data?.accomplishmentId,
            });
            if (res.data.status == 'success') {
              setUpdateAccom((prev) => !prev);
              setUploading(false);
              setRemoveDataImages(false);
              setVideoList([]);
              videosRef.current.value = null;
              notifySuccess();
            } else {
              setUpdateAccom((prev) => !prev);
              setUploading(false);
              setRemoveDataImages(false);
              setVideoList([]);
              videosRef.current.value = null;
              notifyImageLimitError('Bạn chỉ được đăng 1 thành quả ở mỗi bài viết');
            }
          }
          // xóa data hình/ không data video
          if (removeDataImages && videoList?.length == 0) {
            notifyImageLimitError('Thành quả phải có ít nhất 1 ảnh hoặc 1 video');
            setRemoveDataImages(false);
          }
          // chọn mới hình/ không thêm video
          if (imageList.length > 0 && videoList.length == 0) {
            setUploading(true);
            const listImages = await uploadMultiImages(imageList);
            const res = await instances.put('/accomplishments', {
              listVideo: [],
              listImage: listImages,
              content: editValue,
              blogId: params.id,
              accomplishmentId: data?.accomplishmentId,
            });
            if (res.data.status == 'success') {
              setUpdateAccom((prev) => !prev);
              setUploading(false);
              setImageList([]);
              imagesRef.current.value = null;
              notifySuccess();
            } else {
              setUpdateAccom((prev) => !prev);
              setUploading(false);
              setImageList([]);
              imagesRef.current.value = null;
              notifyImageLimitError('Bạn chỉ được đăng 1 thành quả ở mỗi bài viết');
            }
          }
          // chọn mới cả 2 hình/video
          if (imageList.length > 0 && videoList.length > 0) {
            const listImages = await uploadMultiImages(imageList);
            const listVideos = await uploadMultiVideos(videoList);
            const res = await instances.put('/accomplishments', {
              listVideo: listVideos.length > 0 ? listVideos : data?.listVideo,
              listImage: listImages.length > 0 ? listImages : data?.listImage,
              content: editValue,
              blogId: params.id,
              accomplishmentId: data?.accomplishmentId,
            });
            // console.log(res);
            if (res.data.status == 'success') {
              setUpdateAccom((prev) => !prev);
              setUploading(false);
              setImageList([]);
              imagesRef.current.value = null;
              setVideoList([]);
              videosRef.current.value = null;
              notifySuccess();
            } else {
              setUpdateAccom((prev) => !prev);
              setUploading(false);
              setImageList([]);
              imagesRef.current.value = null;
              setVideoList([]);
              videosRef.current.value = null;
              notifyImageLimitError('Bạn chỉ được đăng 1 thành quả ở mỗi bài viết');
            }
          }
        }
        //! ==> không data hình/ có data video
        else if (data?.listVideo.length > 0 && data?.listImage.length == 0) {
          // chỉ update text/ không update media (giữ data video/ không chọn mới hình)
          if (data?.listVideo.length > 0 && imageList?.length == 0) {
            setUploading(true);
            const res = await instances.put('/accomplishments', {
              listVideo: data?.listVideo,
              listImage: [],
              content: editValue,
              blogId: params.id,
              accomplishmentId: data?.accomplishmentId,
            });
            if (res.data.status == 'success') {
              setUpdateAccom((prev) => !prev);
              setUploading(false);
              notifySuccess();
            } else {
              setUpdateAccom((prev) => !prev);
              setUploading(false);
              notifyImageLimitError('Bạn chỉ được đăng 1 thành quả ở mỗi bài viết');
            }
          }
          // chọn thêm hình/ có data video
          if (imageList.length > 0 && data?.listVideo.length > 0) {
            setUploading(true);
            const listImages = await uploadMultiImages(imageList);
            const res = await instances.put('/accomplishments', {
              listVideo: data?.listVideo,
              listImage: listImages,
              content: editValue,
              blogId: params.id,
              accomplishmentId: data?.accomplishmentId,
            });
            if (res.data.status == 'success') {
              setUpdateAccom((prev) => !prev);
              setUploading(false);
              setImageList([]);
              imagesRef.current.value = null;
              notifySuccess();
            } else {
              setUpdateAccom((prev) => !prev);
              setUploading(false);
              setImageList([]);
              imagesRef.current.value = null;
              notifyImageLimitError('Bạn chỉ được đăng 1 thành quả ở mỗi bài viết');
            }
          }
          // chọn thêm hình/ xóa data video
          if (imageList.length > 0 && removeDataVideo) {
            setUploading(true);
            const listImages = await uploadMultiImages(imageList);
            const res = await instances.put('/accomplishments', {
              listVideo: [],
              listImage: listImages,
              content: editValue,
              blogId: params.id,
              accomplishmentId: data?.accomplishmentId,
            });
            if (res.data.status == 'success') {
              setUpdateAccom((prev) => !prev);
              setUploading(false);
              setRemoveDataVideo(false);
              setImageList([]);
              imagesRef.current.value = null;
              notifySuccess();
            } else {
              setUpdateAccom((prev) => !prev);
              setUploading(false);
              setRemoveDataVideo(false);
              setImageList([]);
              imagesRef.current.value = null;
              notifyImageLimitError('Bạn chỉ được đăng 1 thành quả ở mỗi bài viết');
            }
          }
          // không hình/ xóa data video
          if (imageList.length == 0 && removeDataVideo) {
            notifyImageLimitError('Thành quả phải có ít nhất 1 ảnh hoặc 1 video');
            setRemoveDataVideo(false);
          }
          // không thêm hình/ chọn mới video
          if (imageList.length == 0 && videoList.length > 0) {
            setUploading(true);
            const listVideos = await uploadMultiVideos(videoList);
            const res = await instances.put('/accomplishments', {
              listVideo: listVideos,
              listImage: [],
              content: editValue,
              blogId: params.id,
              accomplishmentId: data?.accomplishmentId,
            });
            if (res.data.status == 'success') {
              setUpdateAccom((prev) => !prev);
              setUploading(false);
              setVideoList([]);
              videosRef.current.value = null;
              notifySuccess();
            } else {
              setUpdateAccom((prev) => !prev);
              setUploading(false);
              setVideoList([]);
              videosRef.current.value = null;
              notifyImageLimitError('Bạn chỉ được đăng 1 thành quả ở mỗi bài viết');
            }
          }
          // chọn mới cả 2 hình/video
          if (imageList.length > 0 && videoList.length > 0) {
            setUploading(true);
            const listImages = await uploadMultiImages(imageList);
            const listVideos = await uploadMultiVideos(videoList);
            const res = await instances.put('/accomplishments', {
              listVideo: listVideos.length > 0 ? listVideos : data?.listVideo,
              listImage: listImages.length > 0 ? listImages : data?.listImage,
              content: editValue,
              blogId: params.id,
              accomplishmentId: data?.accomplishmentId,
            });
            // console.log(res);
            if (res.data.status == 'success') {
              setUpdateAccom((prev) => !prev);
              setUploading(false);
              setImageList([]);
              imagesRef.current.value = null;
              setVideoList([]);
              videosRef.current.value = null;
              notifySuccess();
            } else {
              setUpdateAccom((prev) => !prev);
              setUploading(false);
              setImageList([]);
              imagesRef.current.value = null;
              setVideoList([]);
              videosRef.current.value = null;
              notifyImageLimitError('Bạn chỉ được đăng 1 thành quả ở mỗi bài viết');
            }
          }
        }
        //! ==> có cả 2 data
        else if (data?.listVideo.length > 0 && data?.listImage.length > 0) {
          // chỉ update text/ không update media (giữ data hình/video)
          if (videoList.length == 0 && imageList.length == 0) {
            setUploading(true);
            const res = await instances.put('/accomplishments', {
              listVideo: data?.listVideo,
              listImage: data?.listImage,
              content: editValue,
              blogId: params.id,
              accomplishmentId: data?.accomplishmentId,
            });
            if (res.data.status == 'success') {
              setUpdateAccom((prev) => !prev);
              setUploading(false);
              notifySuccess();
            } else {
              setUpdateAccom((prev) => !prev);
              setUploading(false);
              notifyImageLimitError('Bạn chỉ được đăng 1 thành quả ở mỗi bài viết');
            }
          }
          // chọn mới hình/ giữ data video
          if (imageList.length > 0 && videoList.length == 0) {
            setUploading(true);
            const listImages = await uploadMultiImages(imageList);
            const res = await instances.put('/accomplishments', {
              listVideo: data?.listVideo,
              listImage: listImages,
              content: editValue,
              blogId: params.id,
              accomplishmentId: data?.accomplishmentId,
            });
            // console.log(res);
            if (res.data.status == 'success') {
              setUpdateAccom((prev) => !prev);
              setUploading(false);
              setImageList([]);
              imagesRef.current.value = null;
              notifySuccess();
            } else {
              setUpdateAccom((prev) => !prev);
              setUploading(false);
              setImageList([]);
              imagesRef.current.value = null;
              notifyImageLimitError('Bạn chỉ được đăng 1 thành quả ở mỗi bài viết');
            }
          }
          // chọn mới video/ giữ data hình
          if (videoList.length > 0 && imageList.length == 0) {
            setUploading(true);
            const listVideos = await uploadMultiVideos(videoList);
            const res = await instances.put('/accomplishments', {
              listVideo: listVideos,
              listImage: data?.listImage,
              content: editValue,
              blogId: params.id,
              accomplishmentId: data?.accomplishmentId,
            });
            // console.log(res);
            if (res.data.status == 'success') {
              setUpdateAccom((prev) => !prev);
              setUploading(false);
              setVideoList([]);
              videosRef.current.value = null;
              notifySuccess();
            } else {
              setUpdateAccom((prev) => !prev);
              setUploading(false);
              setVideoList([]);
              videosRef.current.value = null;
              notifyImageLimitError('Bạn chỉ được đăng 1 thành quả ở mỗi bài viết');
            }
          }
          // xóa cả 2
          if (removeDataImages && removeDataVideo) {
            notifyImageLimitError('Thành quả phải có ít nhất 1 ảnh hoặc 1 video');
            setRemoveDataImages(false);
            setRemoveDataVideo(false);
          }
          // xóa hình/ giữ data video
          if (removeDataImages && videoList.length == 0) {
            setUploading(true);
            const res = await instances.put('/accomplishments', {
              listVideo: data?.listVideo,
              listImage: [],
              content: editValue,
              blogId: params.id,
              accomplishmentId: data?.accomplishmentId,
            });
            // console.log(res);
            if (res.data.status == 'success') {
              setUpdateAccom((prev) => !prev);
              setUploading(false);
              setRemoveDataImages(false);
              notifySuccess();
            } else {
              setUpdateAccom((prev) => !prev);
              setUploading(false);
              setRemoveDataImages(false);
              notifyImageLimitError('Bạn chỉ được đăng 1 thành quả ở mỗi bài viết');
            }
          }
          // giữ hình/ xóa data video
          if (removeDataVideo && imageList.length == 0) {
            setUploading(true);
            const res = await instances.put('/accomplishments', {
              listVideo: [],
              listImage: data?.listImage,
              content: editValue,
              blogId: params.id,
              accomplishmentId: data?.accomplishmentId,
            });
            // console.log(res);
            if (res.data.status == 'success') {
              setUpdateAccom((prev) => !prev);
              setUploading(false);
              setRemoveDataVideo(false);
              notifySuccess();
            } else {
              setUpdateAccom((prev) => !prev);
              setUploading(false);
              setRemoveDataVideo(false);
              notifyImageLimitError('Bạn chỉ được đăng 1 thành quả ở mỗi bài viết');
            }
          }
          // chọn mới cả 2
          if (imageList.length > 0 && videoList.length > 0) {
            setUploading(true);
            const listImages = await uploadMultiImages(imageList);
            const listVideos = await uploadMultiVideos(videoList);
            const res = await instances.put('/accomplishments', {
              listVideo: listVideos.length > 0 ? listVideos : data?.listVideo,
              listImage: listImages.length > 0 ? listImages : data?.listImage,
              content: editValue,
              blogId: params.id,
              accomplishmentId: data?.accomplishmentId,
            });
            // console.log(res);
            if (res.data.status == 'success') {
              setUpdateAccom((prev) => !prev);
              setUploading(false);
              setImageList([]);
              imagesRef.current.value = null;
              setVideoList([]);
              videosRef.current.value = null;
              notifySuccess();
            } else {
              setUpdateAccom((prev) => !prev);
              setUploading(false);
              setImageList([]);
              imagesRef.current.value = null;
              setVideoList([]);
              videosRef.current.value = null;
              notifyImageLimitError('Bạn chỉ được đăng 1 thành quả ở mỗi bài viết');
            }
          }
        } else {
          notifyImageLimitError('Thành quả phải có ít nhất 1 ảnh hoặc 1 video');
        }
      } catch (error) {
        // console.log(error);
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
      if (imageUp == undefined) {
        resolve(file);
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
      if (videoUp == undefined) {
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
      // uploadBytes(videoRef, videoUp).then((snapshot) => {
      //   getDownloadURL(snapshot.ref).then((url) => {
      //     resolve(url);
      //     // setUploading(false);
      //   });
      // });
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

  // ** handle reaction
  const handleReaction = async () => {
    if (accessToken) {
      try {
        await instances.put(`accomplishmentreactions/${data.accomplishmentId}`).then((res) => {
          if (res.data.result.status == true) {
            if (decoded_jwt.Id == res.data.result.customerId) {
              setYourReaction(true);
            }
            setReaction((prev) => prev + 1);
          } else {
            if (decoded_jwt.Id == res.data.result.customerId) {
              setYourReaction(false);
            }
            setReaction((prev) => prev - 1);
          }
          // console.log(response);
        });
      } catch (error) {}
    } else {
      setOpenRequireLogin(true);
    }
  };

  return (
    <div>
      {openRequireLogin && (
        <ModalRequireLogin openRequireLogin={openRequireLogin} setOpenRequireLogin={setOpenRequireLogin} />
      )}
      <div className="flex gap-5">
        <img alt="" className="rounded-full w-[40px] h-[40px] object-cover" src={data?.avatar || default_user} />
        <div className="w-full">
          <div className="flex items-center gap-2">
            <p className="text-black font-semibold">{data?.authorFullName}</p>
            <p className="text-[#A9A8A8] text-[14px]">{moment(data?.createdDate).calendar()}</p>
            {isFromYourAccom && (
              <p
                onClick={() => navigate(`/recipe/${data?.blogId}/${generateSlug(data.blogTitle)}`)}
                className="text-primary text-[14px] underline cursor-pointer"
              >
                {data?.blogTitle}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2 w-full">
            {/* text area */}
            {editContent ? (
              <div className="mt-1 w-full">
                <textarea
                  value={editValue}
                  disabled={editContent ? false : true}
                  onChange={(e) => setEditValue(e.target.value)}
                  rows="1"
                  // className="rounded-[5px] border border-[#C5C5C5] px-3 py-2 w-full"
                  className={`p-2.5 w-full text-gray-900 bg-white rounded border border-gray-400
          focus:outline-none focus:bg-white focus:border-primary ${editContent ? '' : 'resize-none'}`}
                ></textarea>
              </div>
            ) : (
              <div
                className={`p-2.5 w-full text-gray-900 bg-white rounded border border-gray-400
          break-words content-wrap mt-1`}
              >
                {data.content}
              </div>
            )}
            {/* handle edit, delete comment poppup */}
            {isFromYourAccom
              ? data.status == 2 && (
                  <div className="relative">
                    <button
                      onClick={() => handleCmtOptions()}
                      className="w-[30px] h-[30px] flex items-center justify-center rounded-full hover:bg-[#e5e5e58c]"
                    >
                      <img className="object-contain w-[20px] h-[20px]" src={ic_menu_dots} />
                    </button>
                    {openOpenUpdateEdit && (
                      <OutsideClickHandler onOutsideClick={() => setOpenOpenUpdateEdit(false)}>
                        <div className="absolute right-[50%] w-[100px] bg-white rounded-[5px] z-20 shadow-md">
                          <button
                            onClick={() => handleOpenEdit()}
                            className="text-[14px] px-3 py-1 hover:bg-[#e5e5e58c] w-full"
                          >
                            Chỉnh sửa
                          </button>
                          <button
                            onClick={() => handleDelete()}
                            className="text-[14px] px-3 py-1 hover:bg-[#e5e5e58c] w-full"
                          >
                            Xóa
                          </button>
                        </div>
                      </OutsideClickHandler>
                    )}
                  </div>
                )
              : data.authorId === decoded_jwt.Id && (
                  <div className="relative">
                    <button
                      onClick={() => handleCmtOptions()}
                      className="w-[30px] h-[30px] flex items-center justify-center rounded-full hover:bg-[#e5e5e58c]"
                    >
                      <img className="object-contain w-[20px] h-[20px]" src={ic_menu_dots} />
                    </button>
                    {openOpenUpdateEdit && (
                      <OutsideClickHandler onOutsideClick={() => setOpenOpenUpdateEdit(false)}>
                        <div className="absolute bottom-[45px] right-[50%] transform translate-x-[50%] w-[100px] bg-white rounded-[5px] z-20 shadow-md">
                          <button
                            onClick={() => handleOpenEdit()}
                            className="text-[14px] px-3 py-1 hover:bg-[#e5e5e58c] w-full"
                          >
                            Chỉnh sửa
                          </button>
                          <button
                            onClick={() => handleDelete()}
                            className="text-[14px] px-3 py-1 hover:bg-[#e5e5e58c] w-full"
                          >
                            Xóa
                          </button>
                        </div>
                      </OutsideClickHandler>
                    )}
                  </div>
                )}
          </div>
          {/* edit buttons */}
          {editContent && (
            <div className="flex gap-3">
              {/* create accom button */}
              <button
                disabled={editValue == '' ? true : uploading ? true : false}
                onClick={() => handleDoComment()}
                className={`${
                  editValue == ''
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
                htmlFor="listImageEdit"
                className={`cursor-pointer w-fit ${
                  editValue == ''
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
                      src={editValue == '' ? ic_image_gray : ic_image_black}
                      alt=""
                      className="object-contain w-[24px] h-[24px]"
                    />
                  </>
                ) : (
                  <>
                    Thay đổi
                    <img
                      src={editValue == '' ? ic_image_gray : ic_image_black}
                      alt=""
                      className="object-contain w-[24px] h-[24px]"
                    />
                  </>
                )}
                <input
                  ref={imagesRef}
                  disabled={editValue == '' ? true : false}
                  multiple
                  name="listImageEdit"
                  id="listImageEdit"
                  style={{ display: 'none' }}
                  type="file"
                  accept="image/png, image/gif, image/jpeg, image/jpg"
                  onChange={(e) => handleSelectListImage(e)}
                />
              </label>
              {/* video list */}
              <label
                htmlFor="videoListEdit"
                className={`cursor-pointer w-fit ${
                  editValue == ''
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
                      src={editValue == '' ? ic_video_gray : ic_video_black}
                      alt=""
                      className="object-contain w-[24px] h-[24px]"
                    />
                  </>
                ) : (
                  <>
                    Thay đổi
                    <img
                      src={editValue == '' ? ic_video_gray : ic_video_black}
                      alt=""
                      className="object-contain w-[24px] h-[24px]"
                    />
                  </>
                )}
                <input
                  ref={videosRef}
                  disabled={editValue == '' ? true : false}
                  multiple
                  name="videoListEdit"
                  id="videoListEdit"
                  style={{ display: 'none' }}
                  type="file"
                  accept="video/*"
                  onChange={(e) => handleSelectListVideo(e)}
                />
              </label>
              <button
                onClick={() => {
                  setEditContent(false);
                  setEditValue(data.content);
                  setImageList([]);
                  imagesRef.current.value = null;
                  setVideoList([]);
                  videosRef.current.value = null;
                }}
                className="px-4 py-1 rounded-[5px] text-[#C5C5C5] border border-[#C5C5C5] bg-white"
              >
                Hủy
              </button>
            </div>
          )}
          {/* preview images */}
          <div className="flex flex-wrap gap-2 mt-3">
            {imageList?.length > 0
              ? imageList.map((item, i) => (
                  <img
                    key={i}
                    className="w-[80px] h-[80px] object-cover rounded"
                    src={URL.createObjectURL(item)}
                    alt="default-img_list"
                  />
                ))
              : data?.listImage.map((item, i) => (
                  <Image key={i} className="w-[80px] h-[80px] object-cover rounded" src={item} alt="default-img_list" />
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
            {/* {data?.listImage &&
              data?.listImage.map((item, i) => (
                <Image key={i} className="w-[80px] h-[80px] object-cover rounded" src={item} alt="default-img_list" />
              ))} */}
          </div>
          {/* preview videos */}
          <div className="flex flex-wrap gap-2 mt-3">
            {videoList?.length > 0
              ? videoList.map((item, i) => (
                  <video
                    controls
                    key={i}
                    className="w-[220px] h-[120px] object-cover rounded"
                    src={URL.createObjectURL(item)}
                    alt="default-img_list"
                  />
                ))
              : data?.listVideo.map((item, i) => (
                  <video
                    controls
                    key={i}
                    className="w-[220px] h-[120px] object-cover rounded"
                    src={item}
                    alt="default-img_list"
                  />
                ))}
            {videoList?.length > 0 && (
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
            {/* {data?.listVideo &&
              data?.listVideo.map((item, i) => (
                <video
                  controls
                  key={i}
                  className="w-[220px] h-[120px] object-cover rounded"
                  src={item}
                  alt="default-img_list"
                />
              ))} */}
          </div>
          {/* reaction */}
          {isFromYourAccom ? (
            <div className=" mt-3 flex gap-2 items-center">
              <img alt="" className="object-contain w-[20px] h-[20px]" src={heart} />
              <p>{reaction}</p>
            </div>
          ) : (
            <Tooltip title="Yêu thích" placement="left">
              <div onClick={() => handleReaction()} className="cursor-pointer w-fit mt-3 flex gap-2 items-center">
                <img alt="" className="object-contain w-[20px] h-[20px]" src={isYourReaction ? heart_red : heart} />
                <p>{reaction}</p>
              </div>
            </Tooltip>
          )}
        </div>
      </div>
    </div>
  );
};

export default Accomplishment;
