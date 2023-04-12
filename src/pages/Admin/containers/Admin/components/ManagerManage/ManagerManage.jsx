import { useState, useEffect } from 'react';
import instances from '../../../../../../utils/plugin/axios';

// **Assets
import { ic_blog_create } from '../../../../../../assets';

// ** Components
import DataTable from './components/DataTable';
import RoleConfirmModal from '../../../../../../share/components/Admin/RoleConfirmModal';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ManagerManage = () => {
  // ** Const
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  const [updateTable, setUpdateTable] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [confirmData, setConfirmData] = useState();

  // ** Call api
  useEffect(() => {
    const fetch = async () => {
      const res = await instances.get('/users/admin-manage/users');
      // console.log(res.data.result);
      setUserList(res.data.result);
    };
    fetch();
  }, [updateTable]);

  const handleOpenDelete = (data) => {
    setIsShowModal(true);
    setConfirmData(data);
  };

  const handleConfirmUpdate = (role) => {
    // console.log(confirmData?.unitId);
    toast.promise(
      instances
        .put(`/users/admin-manage/update-role`, {
          userId: confirmData?.id,
          role: role,
        })
        .then(() => {
          setUpdateTable((prev) => !prev);
          setIsShowModal(false);
        }),
      {
        pending: 'Đang cập nhật chức vụ',
        success: 'Đã cập nhật chức vụ thành công! 👌',
        error: 'cập nhật chức vụ thất bại',
      },
    );
  };
  // const handleConfirmRestore = () => {
  //   toast.promise(
  //     instances
  //       .put(`/badgecondition`, {
  //         accomplishments: parseInt(confirmData.accomplishments),
  //         orders: parseInt(confirmData.orders),
  //         badgeId: confirmData.badge.badgeId,
  //         badgeConditionId: confirmData.badgeConditionId,
  //         status: true,
  //       })
  //       .then((res) => {
  //         setUpdateTable((prev) => !prev);
  //         setIsShowModal(false);
  //       }),
  //     {
  //       pending: 'Đang phục hồi',
  //       success: 'Đã phục hồi thành công! 👌',
  //       error: {},
  //     },
  //   );
  // };

  return (
    <div>
      <div>
        {isShowModal && (
          <RoleConfirmModal
            setIsShowModal={setIsShowModal}
            data={{ status: confirmData.role }}
            modalTitle="Khách hàng"
            statusTypeAvai={'Manager'}
            statusTypeNotAvai={'Staff'}
            setUpdateTable={setUpdateTable}
            itemName={confirmData?.username}
            handleConfirmUpdate={handleConfirmUpdate}
            // handleConfirmRestore={handleConfirmRestore}
          />
        )}
        <div>
          <p className="font-semibold text-[#898989] text-[18px] mb-3">Quản lý chức vụ</p>
          <div>
            <DataTable userList={userList} handleOpenDelete={handleOpenDelete} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerManage;
