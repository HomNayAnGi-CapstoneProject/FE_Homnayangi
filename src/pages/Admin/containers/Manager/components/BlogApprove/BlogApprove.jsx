import { useState, useEffect } from 'react';
import instances from '../../../../../../utils/plugin/axios';

// ** components
import DataTable from './components/DataTable';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const BlogApprove = () => {
  // ** const
  const navigate = useNavigate();
  const [pendingBlogs, setPendingBlogs] = useState(1);
  const [dataList, setDataList] = useState([
    {
      blogId: '15214512',
      imageUrl: '',
      authorName: 'vanhoa1908',
      title: 'Cách làm mì ý sốt bò bằm ngon tại nhà 🥘🥘',
      createdDate: '2023-03-24T04:48:03.673Z',
      updatedDate: '2023-03-24T04:48:03.673Z',
    },
  ]);

  // ** functions
  const handleOpenDetail = (data) => {
    navigate(`/management/blog-review/detail/${data?.blogId}`);
  };

  return (
    <div>
      <p className="text-[18px] font-semibold text-[#898989] mb-5">
        Bài viết đang chờ duyệt <span className="text-[20px] text-primary">({pendingBlogs})</span>
      </p>
      <div>
        <DataTable dataList={dataList} handleOpenDetail={handleOpenDetail} />
      </div>
    </div>
  );
};

export default BlogApprove;
