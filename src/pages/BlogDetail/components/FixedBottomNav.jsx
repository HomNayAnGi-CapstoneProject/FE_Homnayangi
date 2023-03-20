import { useState, useEffect } from 'react';
import instances from '../../../utils/plugin/axios';
import ModalRequireLogin from '../../../share/components/Modal/ModalRequireLogin';
import eyes from '../../../assets/images/eyes.png';
import heart from '../../../assets/images/heart.png';
import heart_red from '../../../assets/images/heart_red.png';
import share from '../../../assets/images/share.png';
import share_hover from '../../../assets/images/share_hover.png';
import others from '../../../assets/images/others.png';
import { ic_clipboard } from '../../../assets';

import scrollToWithOffset from '../../../utils/scrollToWithOffset';
import OutsideClickHandler from 'react-outside-click-handler';
import { toast } from 'react-toastify';
import { Modal } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const FixedBottomNav = (props) => {
  // ** Const
  const { iniReaction, iniView } = props;
  const accessToken = localStorage.getItem('accessToken');
  let decoded_jwt = {};
  if (accessToken) {
    decoded_jwt = jwt_decode(accessToken);
  }
  const notifySuccess = (mess) =>
    toast.success(mess, {
      pauseOnHover: false,
      position: 'top-center',
    });
  const params = useParams();
  const [isHover, setIsHover] = useState(false);
  const [isHoverShare, setIsHoverShare] = useState(false);
  const [openOther, setOpenOther] = useState(false);

  const [reaction, setReaction] = useState(0);
  const [view, setView] = useState(0);
  const [openRequireLogin, setOpenRequireLogin] = useState(false);
  const [openShareModal, setOpenShareModal] = useState(false);
  const [isYourReaction, setYourReaction] = useState(false);

  // ** get initial view reaction
  useEffect(() => {
    setReaction(iniReaction);
    setView(iniView);
  }, [iniView, iniReaction]);

  useEffect(() => {
    if (accessToken) {
      const fetch = async () => {
        const res = await instances.get(`blogreactions/blogs/${params.id}`);
        if (res.data.status == 'success') {
          setYourReaction(true);
        } else {
          setYourReaction(false);
        }
      };
      fetch();
    }
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
        <ModalRequireLogin openRequireLogin={openRequireLogin} setOpenRequireLogin={setOpenRequireLogin} />
      )}
      <div className="fixed bottom-0 z-[999] w-full bg-white rounded-tl-[30px] rounded-tr-[30px] drop-shadow-toTop">
        <div className="flex py-[20px] items-center justify-evenly">
          <div
            onClick={() => handleReaction()}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            className="flex gap-2 items-center cursor-pointer group"
          >
            <img className="w-[30px]" alt="" src={isYourReaction ? heart_red : !isHover ? heart : heart_red} />
            <p>{reaction}</p>
            <span className="bottom-tooltip group-hover:scale-100">Yêu thích</span>
          </div>
          <div className="flex gap-2 items-center group">
            <img className="w-[30px]" alt="" src={eyes} />
            <p>{view}</p>
            <span className="bottom-tooltip group-hover:scale-100">Lượt xem</span>
          </div>
          <div className="relative">
            <div
              onClick={() => setOpenShareModal(true)}
              onMouseEnter={() => setIsHoverShare(true)}
              onMouseLeave={() => setIsHoverShare(false)}
              className="flex gap-2 items-center cursor-pointer group"
            >
              <img className="w-[30px]" alt="" src={!isHoverShare ? share : share_hover} />
              <span className="bottom-tooltip group-hover:scale-100">Chia sẻ</span>
            </div>
            {openShareModal && (
              <Modal open={openShareModal} onClose={() => setOpenShareModal(false)}>
                <div
                  className="fixed left-[50%]
            top-[50%] translate-y-[-50%] translate-x-[-50%] bg-white rounded-[5px] xs:min-w-[300px] min-w-full px-10 py-5"
                >
                  <div className="flex">
                    <div className="flex flex-col w-full">
                      <p className="text-black text-[22px] mb-2 font-semibold">Chia sẻ bài viết đến mọi người!</p>
                      <button
                        className="bg-primary w-full text-white font-medium px-4 mt-4 py-2 rounded-[5px] flex items-center justify-center gap-2"
                        onClick={() => {
                          navigator.clipboard.writeText(window.location.href);
                          notifySuccess('Đã copy đường dẫn');
                        }}
                      >
                        <p>Sao chép đường dẫn</p>
                        <img alt="" src={ic_clipboard} className="object-contain w-[24px]" />
                      </button>
                      <a
                        target="_blank"
                        href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}%2F&amp;src=sdkpreparse`}
                        className="fb-xfbml-parse-ignore text-center my-4 w-full bg-blue-500 text-white font-medium px-4 py-2 rounded-[5px]"
                      >
                        Chia sẻ qua Facebook
                      </a>
                    </div>
                    {/* <img src={shareDecor} alt="" className="object-cover w-[220px] h-[220px] md:block hidden" /> */}
                  </div>
                </div>
              </Modal>
            )}
          </div>
          <div onClick={() => setOpenOther((prev) => !prev)} className="flex gap-2 items-center cursor-pointer group">
            <img className="w-[30px]" alt="" src={others} />
            <span className="bottom-tooltip group-hover:scale-100">Nội dung</span>
          </div>
        </div>
        <OutsideClickHandler onOutsideClick={() => setOpenOther(false)}>
          <div
            className={`${
              openOther ? 'block' : 'hidden'
            } transition absolute bottom-[80px] right-6 w-max bg-white rounded-[5px] shadow-md p-5`}
          >
            <div className="pb-3 border-b-[#d2d2d2] border-b">
              <p className="uppercase font-semibold">Nội dung</p>
            </div>
            <ol className="mt-2">
              <li
                onClick={() => scrollToWithOffset(100, 'ingredient')}
                className="mt-2 cursor-pointer hover:text-primary"
              >
                a. Nguyên liệu
              </li>
              <li
                onClick={() => scrollToWithOffset(100, 'preparation')}
                className="mt-2 cursor-pointer hover:text-primary"
              >
                b. Sơ chế
              </li>
              <li onClick={() => scrollToWithOffset(100, 'cooking')} className="mt-2 cursor-pointer hover:text-primary">
                c. Cách chế biến
              </li>
              <li
                onClick={() => scrollToWithOffset(100, 'completion')}
                className="mt-2 cursor-pointer hover:text-primary"
              >
                d. Thành phẩm
              </li>
              <li onClick={() => scrollToWithOffset(100, 'comment')} className="mt-2 cursor-pointer hover:text-primary">
                e. Bình luận
              </li>
            </ol>
          </div>
        </OutsideClickHandler>
      </div>
    </>
  );
};

export default FixedBottomNav;
