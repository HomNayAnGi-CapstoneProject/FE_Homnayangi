import { useState, useEffect } from 'react';
import instances from '../../../utils/plugin/axios';

// ** assets
import eyes from '../../../assets/images/eyes.png';
import heart from '../../../assets/images/heart.png';
import heart_red from '../../../assets/images/heart_red.png';
import share from '../../../assets/images/share.png';
import share_hover from '../../../assets/images/share_hover.png';

// ** third party
import jwt_decode from 'jwt-decode';
import { useParams } from 'react-router-dom';

const Reaction = (props) => {
  // ** Const
  const { iniReaction, iniView } = props;
  const params = useParams();
  const [isHover, setIsHover] = useState(false);
  const [isHoverShare, setIsHoverShare] = useState(false);
  const [reaction, setReaction] = useState(0);
  const [view, setView] = useState(0);

  // ** get initial view reaction
  useEffect(() => {
    setReaction(iniReaction);
    setView(iniView);
  }, [iniView, iniReaction]);

  const handleReaction = async () => {
    // console.log('bruh');
    // try {
    //   await instances.put(`blogreactions/blogs/${params.id}`).then((response) => {
    //   })
    // } catch (error) {
    // }
  };

  return (
    <div className="reaction-container font-inter sticky top-[100px] flex flex-col items-center">
      <div
        onClick={() => handleReaction()}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className="text-center group cursor-pointer w-full flex flex-col items-center rounded-[10px] "
      >
        <div
          className="w-[30px] h-[30px] bg-cover"
          style={{ backgroundImage: `url(${!isHover ? heart : heart_red})` }}
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
  );
};

export default Reaction;
