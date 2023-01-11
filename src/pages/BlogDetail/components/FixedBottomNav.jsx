import { useState } from 'react';
import eyes from '../../../assets/images/eyes.png';
import heart from '../../../assets/images/heart.png';
import heart_red from '../../../assets/images/heart_red.png';
import share from '../../../assets/images/share.png';
import share_hover from '../../../assets/images/share_hover.png';
import others from '../../../assets/images/others.png';

import scrollToWithOffset from '../../../utils/scrollToWithOffset';
import OutsideClickHandler from 'react-outside-click-handler';

const FixedBottomNav = () => {
  // ** Const
  const [isHover, setIsHover] = useState(false);
  const [isHoverShare, setIsHoverShare] = useState(false);
  const [openOther, setOpenOther] = useState(false);

  return (
    <div className="fixed bottom-0 z-[999] w-full bg-white rounded-tl-[30px] rounded-tr-[30px] drop-shadow-toTop">
      <div className="flex py-[20px] items-center justify-evenly">
        <div
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          className="flex gap-2 items-center cursor-pointer group"
        >
          <img className="w-[30px]" alt="" src={!isHover ? heart : heart_red} />
          <p>150</p>
          <span className="bottom-tooltip group-hover:scale-100">Yêu thích</span>
        </div>
        <div className="flex gap-2 items-center group">
          <img className="w-[30px]" alt="" src={eyes} />
          <p>150</p>
          <span className="bottom-tooltip group-hover:scale-100">Lượt xem</span>
        </div>
        <div
          onMouseEnter={() => setIsHoverShare(true)}
          onMouseLeave={() => setIsHoverShare(false)}
          className="flex gap-2 items-center cursor-pointer group"
        >
          <img className="w-[30px]" alt="" src={!isHoverShare ? share : share_hover} />
          <span className="bottom-tooltip group-hover:scale-100">Chia sẻ</span>
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
          </ol>
        </div>
      </OutsideClickHandler>
    </div>
  );
};

export default FixedBottomNav;
