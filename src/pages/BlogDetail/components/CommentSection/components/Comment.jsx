import { useState } from 'react';
import instances from '../../../../../utils/plugin/axios';
import Image from '../../../../../share/components/Image';
import { setReturnUrl, setParentCommentId } from '../../../../../redux/actionSlice/globalSlice';
import ModalRequireLogin from '../../../../../share/components/Modal/ModalRequireLogin';
import ModalConfirm from './ModalConfirm';

import { ic_repcomment, ic_menu_dots } from '../../../../../assets';
import default_user from '../../../../../assets/images/default_user.png';

// ** third party
import moment from 'moment/moment';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Modal } from '@mui/material';
import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';
import OutsideClickHandler from 'react-outside-click-handler';

const Comment = (props) => {
  const { data, setUpdateComments, setOpenModal, accessToken } = props;

  let decoded_jwt = {};
  if (accessToken) {
    decoded_jwt = jwt_decode(accessToken);
  }

  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openRepBox, setOpenRepBox] = useState(false);
  const [reptValue, setRepValue] = useState('');
  const [openRequireLogin, setOpenRequireLogin] = useState(false);
  const [openModalConfirm, setOpenModalConfirm] = useState(false);
  const [isDelParent, setIsDelParent] = useState(false);
  const [repItem, setRepItem] = useState();

  const [openOpenUpdateEdit, setOpenOpenUpdateEdit] = useState(false);
  const [openOpenUpdateEditRep, setOpenOpenUpdateEditRep] = useState(0);

  const [editParent, setEditParent] = useState(false);
  const [editValue, setEditValue] = useState(data.item1?.content);
  const [editRep, setEditRep] = useState(0);
  const [editRepValue, setEditRepValue] = useState('');
  const notifyError = () =>
    toast.error('Có lỗi xảy ra khi thực hiện bình luận', {
      pauseOnHover: false,
    });

  // ** check authen
  const handleOpenRepBox = () => {
    if (accessToken) {
      setOpenRepBox(true);
    } else {
      setOpenRequireLogin(true);
    }
  };

  // ** handle rep comment
  const handleDoComment = async () => {
    if (!reptValue.trim()) {
      setOpenModal(true);
    } else {
      // console.log(commentValue, params.id);
      try {
        // console.log('parent Id', data.item1.authorId);
        // dispatch(setParentCommentId(data.item1.authorId));
        const res = await instances.post('/comments', {
          parentCommentId: data.item1.commentId,
          content: reptValue,
          blogId: params.id,
        });
        // console.log(res);
        setRepValue('');
        setOpenRepBox(false);
        setUpdateComments((prev) => !prev);
      } catch (error) {
        notifyError();
      }
    }
  };

  // ** handle open update, delete comment parent modal
  const handleCmtOptionsParent = () => {
    if (data.item1.authorId === decoded_jwt.Id) {
      setOpenOpenUpdateEdit((prev) => !prev);
      // console.log(data.item1.content);
    }
  };

  // ** open edit parent comment
  const handleOpenEditParent = () => {
    if (data.item1.authorId === decoded_jwt.Id) {
      setOpenOpenUpdateEdit(false);
      setEditParent(true);
    }
  };

  // ** handle edit parent comment
  const handleEditParent = async () => {
    if (data.item1.authorId === decoded_jwt.Id) {
      if (!editValue.trim()) {
        setOpenModal(true);
      } else {
        // console.log(commentValue, params.id);
        try {
          const res = await instances.put('/comments', {
            content: editValue,
            commentId: data.item1.commentId,
          });
          // console.log(res);
          setEditParent(false);
          setUpdateComments((prev) => !prev);
        } catch (error) {
          notifyError();
        }
      }
    }
  };

  // ** handle delete parent comment
  const openModalConfirmDelParent = () => {
    setIsDelParent(true);
    setOpenModalConfirm(true);
  };
  const handleDeleteParent = async () => {
    if (data.item1.authorId === decoded_jwt.Id) {
      try {
        const res = await instances.delete(`/comments/${data.item1.commentId}`);
        // console.log(res);
        setUpdateComments((prev) => !prev);
      } catch (error) {
        // notifyError();
      }
    }
  };

  // ** handle open update, delete comment rep modal
  const handleCmtOptions = (item) => {
    if (item.authorId === decoded_jwt.Id) {
      setOpenOpenUpdateEditRep(item.commentId);
      // console.log(item.content);
    }
  };

  // ** handle delete rep comment
  const handleOpenDelRep = (item) => {
    setRepItem(item);
    setIsDelParent(false);
    setOpenModalConfirm(true);
  };
  const handleDeleteRep = async () => {
    if (repItem) {
      if (repItem.authorId === decoded_jwt.Id) {
        try {
          const res = await instances.delete(`/comments/${repItem.commentId}`);
          // console.log(res);
          setRepItem();
          setUpdateComments((prev) => !prev);
        } catch (error) {
          // notifyError();
        }
      }
    }
  };

  // ** open rep edit comment
  const handleOpenEditRep = (item) => {
    if (item.authorId === decoded_jwt.Id) {
      setOpenOpenUpdateEditRep(false);
      setEditRepValue(item.content);
      setEditRep(item.commentId);
    }
  };

  // ** handle edit rep comment
  const handleEditRep = async (item) => {
    if (item.authorId === decoded_jwt.Id) {
      if (!editRepValue.trim()) {
        setOpenModal(true);
      } else {
        // console.log(commentValue, params.id);
        try {
          const res = await instances.put('/comments', {
            content: editRepValue,
            commentId: item.commentId,
          });
          // console.log(res);
          setEditRep(0);
          setUpdateComments((prev) => !prev);
        } catch (error) {
          notifyError();
        }
      }
    }
  };

  return (
    <>
      {openRequireLogin && (
        <ModalRequireLogin openRequireLogin={openRequireLogin} setOpenRequireLogin={setOpenRequireLogin} />
      )}
      {openModalConfirm && (
        <ModalConfirm
          openModal={openModalConfirm}
          setOpenModal={setOpenModalConfirm}
          handleDelele={isDelParent ? handleDeleteParent : handleDeleteRep}
          title="Xóa bình luận, thành quả?"
          modalMsg="Bạn có chắc muốn xóa bình luận hoặc thành quả này?"
        />
      )}
      <div className="font-inter w-full">
        {/* parent comment */}
        <div className="flex gap-3">
          {/* avatar */}
          <Image
            alt="avatar"
            className="object-cover rounded-full w-[40px] h-[40px]"
            src={data.item1?.avatar || default_user}
          />
          {/* content */}
          <div className="w-full">
            <div className="w-full">
              <div className="flex items-center gap-2">
                <p className="text-black font-semibold">{data.item1?.fullNameAuthor}</p>
                <p className="text-[#A9A8A8] text-[14px]">{moment(data.item1?.createdDate).calendar()}</p>
              </div>
              <div className="flex items-center gap-2 mt-1">
                {/* parent comment content, toggle between edit and content  */}
                {editParent ? (
                  <textarea
                    value={editValue}
                    disabled={editParent ? false : true}
                    onChange={(e) => setEditValue(e.target.value)}
                    rows="1"
                    // className="rounded-[5px] border border-[#C5C5C5] px-3 py-2 w-full"
                    className={`p-2.5 w-full text-gray-900 bg-white rounded border border-gray-400
          focus:outline-none focus:bg-white focus:border-primary ${editParent ? '' : 'resize-none'}`}
                  ></textarea>
                ) : (
                  <div
                    className={`p-2.5 w-full text-gray-900 bg-white rounded border border-gray-400
          break-words content-wrap`}
                  >
                    {data.item1?.content}
                  </div>
                )}
                {/* handle edit, delete comment poppup */}
                {data.item1.authorId === decoded_jwt.Id && (
                  <div className="relative">
                    <button
                      onClick={() => handleCmtOptionsParent()}
                      className="w-[30px] h-[30px] flex items-center justify-center rounded-full hover:bg-[#e5e5e58c]"
                    >
                      <img className="object-contain w-[20px] h-[20px]" src={ic_menu_dots} />
                    </button>
                    {openOpenUpdateEdit && (
                      <OutsideClickHandler onOutsideClick={() => setOpenOpenUpdateEdit(false)}>
                        <div className="absolute bottom-[45px] right-[50%] transform translate-x-[50%] w-[100px] bg-white rounded-[5px] z-20 shadow-md">
                          <button
                            onClick={() => handleOpenEditParent()}
                            className="text-[14px] px-3 py-1 hover:bg-[#e5e5e58c] w-full"
                          >
                            Chỉnh sửa
                          </button>
                          <button
                            onClick={() => openModalConfirmDelParent()}
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
              {editParent ? (
                <div className="flex gap-3 mt-2">
                  <button
                    disabled={editValue == '' ? true : false}
                    onClick={() => handleEditParent()}
                    className={`${
                      editValue == '' ? 'bg-secondary cursor-not-allowed' : 'bg-primary'
                    } px-4 py-1 rounded-[5px] text-white font-medium`}
                  >
                    Xác nhận
                  </button>
                  <button
                    onClick={() => setEditParent(false)}
                    className="px-4 py-1 rounded-[5px] text-[#C5C5C5] border border-[#C5C5C5] bg-white"
                  >
                    Hủy
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleOpenRepBox()}
                  className="mt-1 px-2 py-1 text-[#838383] text-[14px] font-medium flex item-center gap-1 hover:bg-[#e5e5e58c] rounded-[5px]"
                >
                  <img alt="" className="object-contain w-[20px] h-[20px]" src={ic_repcomment} />
                  Trả lời
                </button>
              )}
            </div>
            {/* rep box */}
            {openRepBox && (
              <div className="w-full mt-4">
                <textarea
                  name="comment"
                  value={reptValue}
                  placeholder="Phản hồi..."
                  // onBlur={(e) => props?.handleInputNote(e.target.value)}
                  onChange={(e) => setRepValue(e.target.value)}
                  rows="1"
                  className="p-2.5 w-full text-gray-900 bg-white rounded border border-gray-400
          focus:outline-none focus:bg-white focus:border-primary"
                ></textarea>
                <div className="flex gap-3">
                  <button
                    disabled={reptValue == '' ? true : false}
                    onClick={() => handleDoComment()}
                    className={`${
                      reptValue == '' ? 'bg-secondary cursor-not-allowed' : 'bg-primary'
                    } px-4 py-1 rounded-[5px] text-white font-medium`}
                  >
                    Xác nhận
                  </button>
                  <button
                    onClick={() => setOpenRepBox(false)}
                    className="px-4 py-1 rounded-[5px] text-[#C5C5C5] border border-[#C5C5C5] bg-white"
                  >
                    Hủy
                  </button>
                </div>
              </div>
            )}
            {/* rep comments */}
            {data.item2.length > 0 &&
              data.item2.map((item) => (
                <div key={item.commentId} className="mt-4 first:mt-0">
                  <div className="flex gap-3">
                    <Image
                      alt="avatar"
                      className="object-cover rounded-full w-[40px] h-[40px]"
                      src={item.avatar || default_user}
                    />
                    <div className="w-full">
                      <div className="flex items-center gap-2">
                        <p className="text-black font-semibold">{item.fullNameAuthor}</p>
                        <p className="text-[#A9A8A8] text-[14px]">{moment(item.createdDate).calendar()}</p>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        {/* rep content, toggle between edit and content */}
                        {editRep == item.commentId ? (
                          <textarea
                            value={editRepValue}
                            onChange={(e) => setEditRepValue(e.target.value)}
                            rows="1"
                            // className="rounded-[5px] border border-[#C5C5C5] px-3 py-2 w-full"
                            className={`p-2.5 w-full text-gray-900 bg-white rounded border border-gray-400
          focus:outline-none focus:bg-white focus:border-primary`}
                          ></textarea>
                        ) : (
                          <div className="rounded-[5px] border border-[#C5C5C5] px-3 py-2 w-full break-words content-wrap">
                            {item.content}
                          </div>
                        )}
                        {item.authorId === decoded_jwt.Id && (
                          // popup edit, delete rep comment
                          <div className="relative">
                            <button
                              onClick={() => handleCmtOptions(item)}
                              className="w-[30px] h-[30px] flex items-center justify-center rounded-full hover:bg-[#e5e5e58c]"
                            >
                              <img className="object-contain w-[20px] h-[20px]" src={ic_menu_dots} />
                            </button>
                            {openOpenUpdateEditRep == item.commentId && (
                              <OutsideClickHandler onOutsideClick={() => setOpenOpenUpdateEditRep(0)}>
                                <div className="absolute bottom-[45px] right-[50%] transform translate-x-[50%] w-[100px] bg-white rounded-[5px] z-20 shadow-md">
                                  <button
                                    onClick={() => handleOpenEditRep(item)}
                                    className="text-[14px] px-3 py-1 hover:bg-[#e5e5e58c] w-full"
                                  >
                                    Chỉnh sửa
                                  </button>
                                  <button
                                    onClick={() => handleOpenDelRep(item)}
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
                      {editRep == item.commentId && (
                        <div className="flex gap-3 mt-2">
                          <button
                            disabled={editRepValue == '' ? true : false}
                            onClick={() => handleEditRep(item)}
                            className={`${
                              editRepValue == '' ? 'bg-secondary cursor-not-allowed' : 'bg-primary'
                            } px-4 py-1 rounded-[5px] text-white font-medium`}
                          >
                            Xác nhận
                          </button>
                          <button
                            onClick={() => setEditRep(0)}
                            className="px-4 py-1 rounded-[5px] text-[#C5C5C5] border border-[#C5C5C5] bg-white"
                          >
                            Hủy
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Comment;
