import { useEffect, useState } from 'react';
import instances from '../../../../../../utils/plugin/axios';
import ConfirmModal from '../../../../../../share/components/Admin/ConfirmModal';
import { toast } from 'react-toastify';

import { ic_blog_create } from '../../../../../../assets';
import Search from '../../../../../../share/components/Search';
import DataTable from './components/DataTable';

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const BlogManagement = () => {
  //** Const */
  const navigate = useNavigate();
  const globalStore = useSelector((state) => state.global);
  const [updateTable, setUpdateTable] = useState(false);
  const [blogDataList, setBlogDataList] = useState([]);
  const [confirmData, setConfirmData] = useState();
  const [isShowModal, setIsShowModal] = useState(false);

  // ** Call api
  useEffect(() => {
    const fetch = async () => {
      setBlogDataList([]);
      const res = await instances.get('/blogs/user');
      // console.log(res.data.result);
      setBlogDataList(res.data.result || []);
    };

    let handler = null;
    if (globalStore.previousUrl == '/management/blog/new') {
      handler = setTimeout(() => {
        fetch();
      }, 600);
    } else {
      fetch();
    }
    return () => {
      clearTimeout(handler);
    };
  }, [updateTable, globalStore]);

  // ** Func
  const handleCreateBlog = () => {
    navigate('/management/blog/new');
  };
  const handleOpenEdit = (data) => {
    // console.log(data);
    navigate(`/management/blog/edit/${data?.blogId}`);
  };

  const handleOpenDelete = (data) => {
    setIsShowModal(true);
    setConfirmData(data);
  };

  const handleConfirmDelete = () => {
    // console.log(confirmData?.typeId);
    toast.promise(
      instances.delete(`/blogs/${confirmData?.blogId}`).then(() => {
        setUpdateTable((prev) => !prev);
        setIsShowModal(false);
      }),
      {
        pending: 'Đang xóa bài viết',
        success: 'Đã xóa thành công! 👌',
        error: 'Xóa bài viết thất bại',
      },
    );
  };

  const handleConfirmDeleteDraft = () => {
    // console.log(confirmData?.typeId);
    toast.promise(
      instances.delete(`/blogs/remove-draft/${confirmData?.blogId}`).then(() => {
        setUpdateTable((prev) => !prev);
        setIsShowModal(false);
      }),
      {
        pending: 'Đang xóa bài viết',
        success: 'Đã xóa thành công! 👌',
        error: 'Xóa bài viết thất bại',
      },
    );
  };
  const handleConfirmRestore = () => {
    toast.promise(
      instances.put(`/blogs/restore-blog/${confirmData?.blogId}`).then((res) => {
        setUpdateTable((prev) => !prev);
        setIsShowModal(false);
      }),
      {
        pending: 'Đang phục hồi',
        success: 'Đã phục hồi thành công! 👌',
        error: {},
      },
    );
  };

  return (
    <div>
      {isShowModal && (
        <ConfirmModal
          setIsShowModal={setIsShowModal}
          data={confirmData}
          modalTitle="Bài viết"
          statusTypeAvai={1}
          statusTypeDraft={2}
          statusTypeNotAvai={0}
          setUpdateTable={setUpdateTable}
          itemName={confirmData?.title}
          handleConfirmDelete={handleConfirmDelete}
          handleConfirmDeleteDraft={handleConfirmDeleteDraft}
          handleConfirmRestore={handleConfirmRestore}
        />
      )}
      <div className="flex ss:flex-row flex-col gap-4 item-center justify-between mb-[20px]">
        {/* <Search placeholder="Tìm kiếm tại đây..." /> */}
        <button
          onClick={() => handleCreateBlog()}
          className="flex items-center w-fit gap-2 py-2 px-3 bg-primary text-white font-medium rounded-[10px]"
        >
          Tạo bài viết
          <img src={ic_blog_create} />
        </button>
      </div>
      <div>
        <DataTable blogDataList={blogDataList} handleOpenDelete={handleOpenDelete} handleOpenEdit={handleOpenEdit} />
      </div>
    </div>
  );
};

export default BlogManagement;
