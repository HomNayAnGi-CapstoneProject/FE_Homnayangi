import { useState, useEffect } from 'react';
import instances from '../../../../utils/plugin/axios';

// ** components
import Comments from './components/Comments';
import Accomplishhments from './components/Accomplishments';

// ** third party
import { useNavigate, useLocation, useParams } from 'react-router-dom';

const CommentSection = () => {
  // ** Const
  const params = useParams();
  const [cmtNum, setCmtNum] = useState(0);
  const [accomNum, setAccomNum] = useState(0);
  const [activeTab, setActiveTab] = useState(1);
  const [updateComments, setUpdateComments] = useState(false);
  const [updateAccom, setUpdateAccom] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const [accomList, setAccomList] = useState([]);

  // ** Functs
  const handleSelectCommentTab = () => {
    setActiveTab(1);
  };

  const handleSelectAccomTab = () => {
    setActiveTab(2);
  };

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

  // ** get accom list
  useEffect(() => {
    const fetch = async () => {
      const res = await instances.get(`/accomplishments/blogs/${params.id}`);
      // console.log(res.data.result);
      setAccomNum(res.data.result.length);
      setAccomList(res.data.result);
    };
    fetch();
  }, [updateAccom]);

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
        {activeTab == 1 && (
          <Comments setCmtNum={setCmtNum} commentList={commentList} setUpdateComments={setUpdateComments} />
        )}
        {activeTab == 2 && (
          <Accomplishhments setAccomNum={setAccomNum} accomList={accomList} setUpdateAccom={setUpdateAccom} />
        )}
      </div>
    </div>
  );
};

export default CommentSection;
