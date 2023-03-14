import { useState, useEffect } from 'react';
import instances from '../../../utils/plugin/axios';
import { setReturnUrl } from '../../../redux/actionSlice/globalSlice';

// ** assets
import eyes from '../../../assets/images/eyes.png';
import heart from '../../../assets/images/heart.png';
import heart_red from '../../../assets/images/heart_red.png';
import share from '../../../assets/images/share.png';
import share_hover from '../../../assets/images/share_hover.png';

// ** third party
import jwt_decode from 'jwt-decode';
import { Modal } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
const Reaction = (props) => {
  // ** Const
  const { iniReaction, iniView } = props;
  const accessToken = localStorage.getItem('accessToken');
  let decoded_jwt = {};
  if (accessToken) {
    decoded_jwt = jwt_decode(accessToken);
  }
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isHover, setIsHover] = useState(false);
  const [isYourReaction, setYourReaction] = useState(false);
  const [isHoverShare, setIsHoverShare] = useState(false);
  const [reaction, setReaction] = useState(0);
  const [view, setView] = useState(0);
  const [openRequireLogin, setOpenRequireLogin] = useState(false);

  // ** get initial view reaction
  useEffect(() => {
    setReaction(iniReaction);
    setView(iniView);
  }, [iniView, iniReaction]);

  useEffect(() => {
    const fetch = async () => {
      const res = await instances.get(`blogreactions/blogs/${params.id}`);
      if (res.data.status == 'success') {
        setYourReaction(true);
      } else {
        setYourReaction(false);
      }
    };
    fetch();
  }, []);

  const handleReaction = async () => {
    // console.log('bruh');
    if (accessToken) {
      try {
        await instances.put(`blogreactions/blogs/${params.id}`).then((res) => {
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
    <>
      {openRequireLogin && (
        <Modal open={openRequireLogin} onClose={() => setOpenRequireLogin(false)}>
          <div
            className="fixed left-[50%]
          top-[50%] translate-y-[-50%] translate-x-[-50%] bg-white rounded-[5px] max-w-[500px]"
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
      )}
      <div className="reaction-container font-inter sticky top-[100px] flex flex-col items-center">
        <div
          onClick={() => handleReaction()}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          className="text-center group cursor-pointer w-full flex flex-col items-center rounded-[10px] "
        >
          <div
            className="w-[30px] h-[30px] bg-cover"
            style={{ backgroundImage: `url(${isYourReaction ? heart_red : !isHover ? heart : heart_red})` }}
          />
          <p className="mt-[5px] text-[14px]">{reaction}</p>
          <span className="sidebar-tooltip group-hover:scale-100">Yêu thích</span>
        </div>

        <div className="mt-[25px] w-full flex flex-col items-center text-center group">
          <div className="w-[30px] h-[30px] bg-cover" style={{ backgroundImage: `url(${eyes})` }} />
          <p className="mt-[5px] text-[14px]">{view}</p>
          <span className="sidebar-tooltip group-hover:scale-100">Lượt xem</span>
        </div>

        <div
          onMouseEnter={() => setIsHoverShare(true)}
          onMouseLeave={() => setIsHoverShare(false)}
          className="mt-[25px] cursor-pointer flex flex-col items-center group"
        >
          <div
            className="w-[30px] h-[30px] bg-cover"
            style={{ backgroundImage: `url(${!isHoverShare ? share : share_hover})` }}
          />
          <span className="sidebar-tooltip group-hover:scale-100">Chia sẻ</span>
        </div>
      </div>
    </>
  );
};

export default Reaction;
