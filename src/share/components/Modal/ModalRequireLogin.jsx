import React from 'react';
import { Modal } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setReturnUrl } from '../../../redux/actionSlice/globalSlice';

const ModalRequireLogin = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { openRequireLogin, setOpenRequireLogin } = props;
  return (
    <Modal open={openRequireLogin} onClose={() => setOpenRequireLogin(false)}>
      <div
        className="fixed left-[50%]
          top-[50%] translate-y-[-50%] translate-x-[-50%] bg-white rounded-[5px] sm:w-fit w-full"
      >
        <div className="flex flex-col items-center justify-center px-7 py-6">
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
      </div>
    </Modal>
  );
};

export default ModalRequireLogin;
