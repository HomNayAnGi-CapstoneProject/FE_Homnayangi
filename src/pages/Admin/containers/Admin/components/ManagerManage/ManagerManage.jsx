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
  const [loading, setLoading] = useState(false);

  // ** Call api
  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const res = await instances.get('/users/admin-manage/users');
      // console.log(res.data.result);
      setLoading(false);
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

  return (
    <div>
      <div>
        {isShowModal && (
          <RoleConfirmModal
            setIsShowModal={setIsShowModal}
            data={{ status: confirmData.role }}
            modalTitle="Chức vụ"
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
            <DataTable userList={userList} handleOpenDelete={handleOpenDelete} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerManage;
