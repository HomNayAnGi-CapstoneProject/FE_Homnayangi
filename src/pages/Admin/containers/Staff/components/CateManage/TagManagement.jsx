import { useState, useEffect } from 'react';
import instances from '../../../../../../utils/plugin/axios';

// **Assets
import { ic_blog_create } from '../../../../../../assets';

// ** Components
import DataTable from './components/DataTable';
import ConfirmModal from '../../../../../../share/components/Admin/ConfirmModal';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const TagManagement = () => {
  // ** Const
  const navigate = useNavigate();
  const [categoryList, setCategoryList] = useState([]);
  const [updateTable, setUpdateTable] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowSubModal, setIsShowSubModal] = useState(false);
  const [confirmData, setConfirmData] = useState();

  // ** Call api
  useEffect(() => {
    const fetch = async () => {
      const res = await instances.get('/categories');
      // console.log(res.data);
      setCategoryList(res.data);
    };
    fetch();
  }, [updateTable]);
  // ** Func
  const handleOpenEdit = (data) => {
    if (data.subCategoryId) {
      navigate(`/management/category/sub-category/edit/${data?.subCategoryId}`);
    } else {
      navigate(`/management/category/edit/${data?.categoryId}`);
    }
  };

  const handleOpenDelete = (data) => {
    if (data.subCategoryId) {
      setIsShowSubModal(true);
    } else {
      setIsShowModal(true);
    }
    setConfirmData(data);
  };

  const handleConfirmDelete = () => {
    // console.log(confirmData?.unitId);
    toast.promise(
      instances.delete(`/categories/${confirmData?.categoryId}`).then(() => {
        setUpdateTable((prev) => !prev);
        setIsShowModal(false);
      }),
      {
        pending: 'Đang xóa danh mục',
        success: 'Đã xóa thành công! 👌',
        error: 'Xóa danh mục thất bại',
      },
    );
  };
  const handleConfirmDeleteSub = () => {
    // console.log(confirmData?.subCategoryId);
    toast.promise(
      instances.delete(`/subcategories/${confirmData?.subCategoryId}`).then(() => {
        setUpdateTable((prev) => !prev);
        setIsShowSubModal(false);
      }),
      {
        pending: 'Đang xóa danh mục phụ',
        success: 'Đã xóa thành công! 👌',
        error: 'Xóa danh mục phụ thất bại',
      },
    );
  };
  const handleConfirmRestore = () => {
    toast.promise(
      instances
        .put(`/categories`, {
          categoryId: confirmData?.categoryId,
          name: confirmData?.name,
          description: confirmData?.description,
          status: true,
        })
        .then((res) => {
          setUpdateTable((prev) => !prev);
          setIsShowModal(false);
        }),
      {
        pending: 'Đang phục hồi',
        success: 'Đã phục hồi thành công! 👌',
        error: 'Phục hồi thất bại',
      },
    );
  };
  const handleConfirmRestoreSub = () => {
    toast.promise(
      instances
        .put(`/subcategories`, {
          subCategoryId: confirmData?.subCategoryId,
          categoryId: confirmData?.categoryId,
          name: confirmData?.name,
          description: confirmData?.description,
          status: true,
        })
        .then((res) => {
          setUpdateTable((prev) => !prev);
          setIsShowSubModal(false);
        }),
      {
        pending: 'Đang phục hồi',
        success: 'Đã phục hồi thành công! 👌',
        error: 'Phục hồi thất bại',
      },
    );
  };

  return (
    <div>
      {isShowModal && (
        <ConfirmModal
          setIsShowModal={setIsShowModal}
          data={confirmData}
          modalTitle="Danh mục"
          statusTypeAvai={true}
          statusTypeNotAvai={false}
          setUpdateTable={setUpdateTable}
          itemName={confirmData?.name}
          handleConfirmDelete={handleConfirmDelete}
          handleConfirmRestore={handleConfirmRestore}
        />
      )}
      {isShowSubModal && (
        <ConfirmModal
          setIsShowModal={setIsShowSubModal}
          data={confirmData}
          modalTitle="Danh mục phụ"
          statusTypeAvai={true}
          statusTypeNotAvai={false}
          setUpdateTable={setUpdateTable}
          itemName={confirmData?.name}
          handleConfirmDelete={handleConfirmDeleteSub}
          handleConfirmRestore={handleConfirmRestoreSub}
        />
      )}
      <div className="flex ss:flex-row flex-col gap-4 item-center mb-[20px]">
        <button
          onClick={() => navigate('/management/category/new')}
          className="flex items-center w-fit gap-2 py-2 px-3 bg-primary text-white font-medium rounded-[10px]"
        >
          Thêm danh mục
          <img src={ic_blog_create} />
        </button>
        <button
          onClick={() => navigate('/management/category/sub-category/new')}
          className="flex items-center w-fit gap-2 py-2 px-3 bg-primary text-white font-medium rounded-[10px]"
        >
          Thêm danh mục phụ
          <img src={ic_blog_create} />
        </button>
      </div>
      <div>
        <DataTable categoryList={categoryList} handleOpenEdit={handleOpenEdit} handleOpenDelete={handleOpenDelete} />
      </div>
    </div>
  );
};

export default TagManagement;
