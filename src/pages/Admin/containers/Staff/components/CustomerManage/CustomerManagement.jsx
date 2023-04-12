import { useState, useEffect } from 'react';
import instances from '../../../../../../utils/plugin/axios';

// **Assets
import { ic_blog_create } from '../../../../../../assets';

// ** Components
import DataTable from './components/DataTable';
import ConfirmModal from '../../../../../../share/components/Admin/ConfirmModal';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CustomerManagement = () => {
  // ** Const
  const navigate = useNavigate();
  const [customerList, setCustomerList] = useState([]);
  const [updateTable, setUpdateTable] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [confirmData, setConfirmData] = useState();

  // ** Call api
  useEffect(() => {
    const fetch = async () => {
      const res = await instances.get('/customers');
      // console.log(res.data.result);
      setCustomerList(res.data.result);
    };
    fetch();
  }, [updateTable]);

  const handleOpenDelete = (data) => {
    setIsShowModal(true);
    setConfirmData(data);
  };

  const handleConfirmDelete = () => {
    // console.log(confirmData?.unitId);
    toast.promise(
      instances.delete(`/customers/${confirmData?.id}`).then(() => {
        setUpdateTable((prev) => !prev);
        setIsShowModal(false);
      }),
      {
        pending: 'Đang ẩn khách hàng',
        success: 'Đã ẩn thành công! 👌',
        error: 'Ẩn khách hàng thất bại',
      },
    );
  };
  const handleConfirmRestore = () => {
    toast.promise(
      instances.put(`/customers/status/${confirmData?.id}`).then((res) => {
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
          data={{ status: !confirmData.isBlocked }}
          modalTitle="Khách hàng"
          statusTypeAvai={true}
          statusTypeNotAvai={false}
          setUpdateTable={setUpdateTable}
          itemName={confirmData?.username}
          handleConfirmDelete={handleConfirmDelete}
          handleConfirmRestore={handleConfirmRestore}
        />
      )}
      <div>
        <p className="font-semibold text-[#898989] text-[18px] mb-3">Quản lý khách hàng</p>
        <div>
          <DataTable customerList={customerList} handleOpenDelete={handleOpenDelete} />
        </div>
      </div>
    </div>
  );
};

export default CustomerManagement;
