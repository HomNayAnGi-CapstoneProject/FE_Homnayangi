import React from 'react';
import { ic_blog_create } from '../../../../assets';
import Search from '../../../../share/components/Search';
import DataTable from './components/DataTable';

import { useNavigate } from 'react-router-dom';

const BlogManagement = () => {
  //** Const */
  const navigate = useNavigate();
  // ** Func
  const handleOpenEdit = () => {};
  return (
    <div>
      <div className="flex item-center justify-between mb-[20px]">
        <Search placeholder="Tìm kiếm tại đây..." />
        <button
          onClick={() => navigate('/management/blog/new')}
          className="flex items-center gap-2 py-1 px-3 bg-primary text-white font-medium rounded-[10px]"
        >
          Tạo bài viết
          <img src={ic_blog_create} />
        </button>
      </div>
      <div>
        <DataTable handleOpenEdit={handleOpenEdit} />
      </div>
    </div>
  );
};

export default BlogManagement;
