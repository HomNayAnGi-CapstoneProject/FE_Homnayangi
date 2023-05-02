import { useState, useEffect } from 'react';
import instances from '../../../../../../utils/plugin/axios';

import { ic_switch_white } from '../../../../../../assets';

// ** components
import DataTable from './components/DataTable';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const BlogApprove = () => {
  // ** const
  const navigate = useNavigate();
  const [updateTable, setUpdateTable] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [getPendingBlog, setGetPendingBlog] = useState(true);
  const [totalPendings, setTotalPendings] = useState(0);
  const [loadingData, setLoadingData] = useState(false);

  // ** get blog list
  useEffect(() => {
    const fetch = async () => {
      setLoadingData(true);
      const res = await instances.get('/blogs/user', {
        params: { isPending: getPendingBlog },
      });
      setLoadingData(false);
      // console.log(res.data.result);
      setDataList(res.data.result || []);
    };

    fetch();
  }, [updateTable, getPendingBlog]);

  // ** get totalPending
  useEffect(() => {
    const fetch = async () => {
      const res = await instances.get('/blogs/user', {
        params: { isPending: true },
      });
      // console.log(res.data.result);
      if (res.data.result?.length > 0) {
        setTotalPendings(res.data.result.length);
      } else {
        setTotalPendings(0);
      }
    };

    fetch();
  }, []);

  // ** functions
  const handleOpenDetail = (data) => {
    navigate(`/management/blog-detail/${data?.blogId}`);
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <button
          onClick={() => setGetPendingBlog((prev) => !prev)}
          className={`px-5 py-2 flex items-center gap-3 rounded-[5px] text-white ${
            getPendingBlog ? 'bg-primary' : 'bg-gray-400'
          }`}
        >
          {getPendingBlog ? 'Xem tất cả' : 'Xem chờ duyệt'}
          <img src={ic_switch_white} className="object-contain w-[24px] h-[24px]" />
        </button>
        <p className="font-semibold text-[#898989]">
          Bài viết đang chờ duyệt: <span className="text-primary">({totalPendings})</span>
        </p>
      </div>
      <div>
        <DataTable dataList={dataList} handleOpenDetail={handleOpenDetail} loadingData={loadingData} />
      </div>
    </div>
  );
};

export default BlogApprove;
