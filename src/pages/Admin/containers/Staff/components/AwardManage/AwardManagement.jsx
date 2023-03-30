import { useState, useEffect } from 'react';
import instances from '../../../../../../utils/plugin/axios';

// **Assets
import { ic_blog_create } from '../../../../../../assets';

// ** components
import DataTable from './components/DataTable';
import ConfirmModal from '../../../../../../share/components/Admin/ConfirmModal';

// ** third party
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AwardManagement = () => {
  // ** Const
  const navigate = useNavigate();
  const [badgesList, setBadegesList] = useState([]);
  const [updateTable, setUpdateTable] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [confirmData, setConfirmData] = useState();

  // ** Call api
  useEffect(() => {
    const fetch = async () => {
      const res = await instances.get('/badges');
      // console.log(res.data);
      setBadegesList(res.data.resource);
    };
    fetch();
  }, [updateTable]);

  // ** Func
  const handleOpenEdit = (data) => {
    navigate(`/management/award/edit/${data?.badgeId}`);
  };

  const handleOpenDelete = (data) => {
    setIsShowModal(true);
    setConfirmData(data);
  };

  const handleConfirmDelete = () => {
    // console.log(confirmData?.badgeId);
    toast.promise(
      instances.delete(`/badges/${confirmData?.badgeId}`).then(() => {
        setUpdateTable((prev) => !prev);
        setIsShowModal(false);
      }),
      {
        pending: 'Đang xóa huy hiệu',
        success: 'Đã xóa thành công! 👌',
        error: 'Xóa huy hiệu thất bại',
      },
    );
  };
  const handleConfirmRestore = () => {
    toast.promise(
      instances
        .put(`/badges`, {
          badgeId: confirmData?.badgeId,
          name: confirmData?.name,
          description: confirmData?.description,
          ImageUrl: confirmData?.imageUrl,
          status: 1,
        })
        .then((res) => {
          setUpdateTable((prev) => !prev);
          setIsShowModal(false);
        }),
      {
        pending: 'Đang phục hồi',
        success: 'Đã phục hồi thành công! 👌',
        error: 'Có lỗi xảy ra',
      },
    );
  };
  return (
    <div>
      {isShowModal && (
        <ConfirmModal
          setIsShowModal={setIsShowModal}
          data={confirmData}
          modalTitle="Huy hiệu"
          statusTypeAvai={1}
          statusTypeNotAvai={0}
          setUpdateTable={setUpdateTable}
          itemName={confirmData?.name}
          handleConfirmDelete={handleConfirmDelete}
          handleConfirmRestore={handleConfirmRestore}
        />
      )}
      <div className="flex ss:flex-row flex-col gap-4 item-center justify-between mb-[20px]">
        <button
          onClick={() => navigate('/management/award/new')}
          className="flex items-center w-fit gap-2 py-2 px-3 bg-primary text-white font-medium rounded-[10px]"
        >
          Thêm danh hiệu
          <img src={ic_blog_create} />
        </button>
      </div>
      <div>
        <DataTable badgesList={badgesList} handleOpenEdit={handleOpenEdit} handleOpenDelete={handleOpenDelete} />
      </div>
    </div>
  );
};

export default AwardManagement;
