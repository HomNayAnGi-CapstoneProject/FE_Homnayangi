import { useState, useEffect } from 'react';
import CustomModal from '../../../../../share/components/Modal/CustomModal';

// ** assets
import default_user from '../../../../../assets/images/default_user.png';

// ** third party
import jwt_decode from 'jwt-decode';

const Comments = () => {
  // ** get user detail
  const accessToken = localStorage.getItem('accessToken');
  let decoded_jwt = {};
  if (accessToken) {
    decoded_jwt = jwt_decode(accessToken);
  }

  // ** const
  const [commentValue, setCommentValue] = useState('');
  const [openModal, setOpenModal] = useState(false);

  //** functs */
  const handleDoComment = () => {
    if (!commentValue.trim()) {
      setOpenModal(true);
    } else {
      console.log(commentValue);
    }
  };

  return (
    <>
      <CustomModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        title="Lỗi khi thực hiện bình luận"
        description="Bình luận không được trống!"
      />
      <div className="bg-white px-5 py-3 rounded-[5px]">
        {/* comment input */}
        <div className="flex gap-5">
          <img
            alt="user_avartar"
            className="object-cover rounded-full w-[40px] h-[40px]"
            src={accessToken ? (decoded_jwt.Avatar == '' ? default_user : decoded_jwt.Avatar) : default_user}
          />
          <div className="w-full">
            <textarea
              name="comment"
              placeholder="Bình luận tại đây..."
              // onBlur={(e) => props?.handleInputNote(e.target.value)}
              onChange={(e) => setCommentValue(e.target.value)}
              rows="1"
              className="p-2.5 w-full text-gray-900 bg-white rounded border border-gray-400
          focus:outline-none focus:bg-white focus:border-primary"
            ></textarea>
            <button
              disabled={commentValue == '' ? true : false}
              onClick={() => handleDoComment()}
              className={`${
                commentValue == '' ? 'bg-secondary cursor-not-allowed' : 'bg-primary'
              } px-4 py-1 rounded-[5px] text-white font-medium`}
            >
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Comments;