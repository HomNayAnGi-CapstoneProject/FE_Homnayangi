import { useState, useEffect } from 'react';

// ** components
import Comments from './components/Comments';
import Accomplishhments from './components/Accomplishments';

const CommentSection = () => {
  // ** Const
  const [cmtNum, setCmtNum] = useState(0);
  const [accomNum, setAccomNum] = useState(0);
  const [activeTab, setActiveTab] = useState(1);

  // ** Functs
  const handleSelectCommentTab = () => {
    setActiveTab(1);
  };

  const handleSelectAccomTab = () => {
    setActiveTab(2);
  };

  return (
    <div className="mt-14 font-inter">
      {/* tabs */}
      <div className="flex gap-7 border-b border-b-[#d1d1d1]">
        <button
          onClick={() => handleSelectCommentTab()}
          className={`font-semibold pb-1 ${activeTab == 1 ? 'text-black border-b border-b-black' : 'text-[#D1d1d1]'}`}
        >
          Bình luận ({cmtNum})
        </button>
        <button
          onClick={() => handleSelectAccomTab()}
          className={`font-semibold pb-1 ${activeTab == 2 ? 'text-black border-b border-b-black' : 'text-[#d1d1d1]'}`}
        >
          Thành quả ({accomNum})
        </button>
      </div>
      {/* content */}
      <div className="mt-3">
        {activeTab == 1 && <Comments />}
        {activeTab == 2 && <Accomplishhments />}
      </div>
    </div>
  );
};

export default CommentSection;
