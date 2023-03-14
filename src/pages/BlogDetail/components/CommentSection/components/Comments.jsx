import { useState, useEffect } from 'react';
import CustomModal from '../../../../../share/components/Modal/CustomModal';
import instances from '../../../../../utils/plugin/axios';
import Comment from './Comment';

import { setReturnUrl } from '../../../../../redux/actionSlice/globalSlice';

// ** assets
import default_user from '../../../../../assets/images/default_user.png';

// ** third party
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const Comments = (props) => {
  const { setCmtNum } = props;
  // ** get user detail
  const accessToken = localStorage.getItem('accessToken');
  let decoded_jwt = {};
  if (accessToken) {
    decoded_jwt = jwt_decode(accessToken);
  }

  // ** const
  const [commentValue, setCommentValue] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [updateComments, setUpdateComments] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const notifyError = () =>
    toast.error('Có lỗi xảy ra khi thực hiện bình luận', {
      pauseOnHover: false,
    });

  // ** get comments list
  useEffect(() => {
    const fetch = async () => {
      const res = await instances.get(`/comments/${params.id}`);
      // console.log(res.data.result);
      setCmtNum(res.data.total_comments);
      setCommentList(res.data.result);
    };
    fetch();
  }, [updateComments]);

  //** functs */
  const handleDoComment = async () => {
    if (!commentValue.trim()) {
      setOpenModal(true);
    } else {
      // console.log(commentValue, params.id);
      try {
        const res = await instances.post('/comments', {
          parentCommentId: '',
          content: commentValue,
          blogId: params.id,
        });
        // console.log(res);
        setCommentValue('');
        setUpdateComments((prev) => !prev);
      } catch (error) {
        notifyError();
      }
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
        <div className="flex gap-5 relative">
          {/* check authen user */}
          {accessToken ? (
            <></>
          ) : (
            <div className="absolute z-10 h-full bg-white w-full text-center">
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
          <img
            alt="user_avartar"
            className="object-cover rounded-full w-[40px] h-[40px]"
            src={accessToken ? (decoded_jwt.Avatar == '' ? default_user : decoded_jwt.Avatar) : default_user}
          />
          <div className="w-full">
            <textarea
              name="comment"
              value={commentValue}
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
        {commentList.length > 0 ? (
          <div className="mt-6">
            {commentList.map((item, i) => (
              <div key={item.item1.commentId} className="mt-4 first:mt-0">
                <Comment
                  data={item}
                  setUpdateComments={setUpdateComments}
                  setOpenModal={setOpenModal}
                  accessToken={accessToken}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center mt-5">Chưa có bình luận nào</div>
        )}
      </div>
    </>
  );
};

export default Comments;
