import { useState, useEffect } from 'react';
import instances from '../../../../../../utils/plugin/axios';

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

  // ** get blog list
  useEffect(() => {
    const fetch = async () => {
      const res = await instances.get('/blogs/user', {
        params: { isPending: getPendingBlog },
      });
      console.log(res.data.result);
      setDataList(res.data.result || []);
    };

    fetch();
  }, [updateTable, getPendingBlog]);

  // ** functions
  const handleOpenDetail = (data) => {
    navigate(`/management/blog-review/detail/${data?.blogId}`);
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <button
          onClick={() => setGetPendingBlog((prev) => !prev)}
          className={`px-5 py-2 rounded-[5px] text-white ${getPendingBlog ? 'bg-primary' : 'bg-gray-400'}`}
        >
          {getPendingBlog ? 'Xem tất cả' : 'Xem chờ duyệt'}
        </button>
      </div>
      <div>
        <DataTable dataList={dataList} handleOpenDetail={handleOpenDetail} />
      </div>
    </div>
  );
};

export default BlogApprove;
