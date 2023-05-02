import { useState, useEffect } from 'react';
import instances from '../../../../../../utils/plugin/axios';

import { ic_blog_create } from '../../../../../../assets';

// ** components
import DataTable from './components/DataTable';
import ConfirmModal from '../../../../../../share/components/Admin/ConfirmModal';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const BadgeConditionManage = () => {
  const navigate = useNavigate();
  const [updateTable, setUpdateTable] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [confirmData, setConfirmData] = useState();
  const [badgeList, setBadgeList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const res = await instances.get('/badgecondition');
      setLoading(false);
      setBadgeList(res.data);
    };
    fetch();
  }, [updateTable]);

  // ** Func
  const handleOpenEdit = (data) => {
    navigate(`/management/edit-badge-condition/${data?.badgeConditionId}`);
  };

  const handleOpenDelete = (data) => {
    setIsShowModal(true);
    setConfirmData(data);
  };

  const handleConfirmDelete = () => {
    // console.log(confirmData?.unitId);
    toast.promise(
      instances.delete(`/badgecondition/${confirmData?.badgeConditionId}`).then(() => {
        setUpdateTable((prev) => !prev);
        setIsShowModal(false);
      }),
      {
        pending: 'Đang xóa điều kiện',
        success: 'Đã xóa thành công! 👌',
        error: 'Xóa điều kiện thất bại',
      },
    );
  };
  const handleConfirmRestore = () => {
    toast.promise(
      instances
        .put(`/badgecondition`, {
          accomplishments: parseInt(confirmData.accomplishments),
          orders: parseInt(confirmData.orders),
          badgeId: confirmData.badge.badgeId,
          badgeConditionId: confirmData.badgeConditionId,
          status: true,
        })
        .then((res) => {
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
          modalTitle="Điều kiện đạt huy hiệu"
          statusTypeAvai={true}
          statusTypeNotAvai={false}
          setUpdateTable={setUpdateTable}
          itemName={confirmData?.badge?.name}
          handleConfirmDelete={handleConfirmDelete}
          handleConfirmRestore={handleConfirmRestore}
        />
      )}
      <div className="flex ss:flex-row flex-col gap-4 item-center justify-between mb-[20px]">
        <button
          onClick={() => navigate('/management/new-badge-condition')}
          className="flex items-center w-fit gap-2 py-2 px-3 bg-primary text-white font-medium rounded-[10px]"
        >
          Thêm điều kiện
          <img src={ic_blog_create} />
        </button>
      </div>
      <div>
        <DataTable
          badgeList={badgeList}
          handleOpenEdit={handleOpenEdit}
          handleOpenDelete={handleOpenDelete}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default BadgeConditionManage;
