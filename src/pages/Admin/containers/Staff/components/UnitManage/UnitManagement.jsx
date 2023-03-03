import { useState, useEffect } from 'react';
import instances from '../../../../../../utils/plugin/axios';

// **Assets
import { ic_blog_create } from '../../../../../../assets';

// ** Components
import DataTable from './components/DataTable';
import ConfirmModal from '../../../../../../share/components/Admin/ConfirmModal';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UnitManagement = () => {
  // ** Const
  const navigate = useNavigate();
  const [unitList, setUnitList] = useState([]);
  const [updateTable, setUpdateTable] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [confirmData, setConfirmData] = useState();

  // ** Call api
  useEffect(() => {
    const fetch = async () => {
      const res = await instances.get('/unit');
      // console.log(res.data);
      setUnitList(res.data);
    };
    fetch();
  }, [updateTable]);

  // ** Func
  const handleOpenEdit = (data) => {
    navigate(`/management/unit/edit/${data?.unitId}`);
  };

  const handleOpenDelete = (data) => {
    setIsShowModal(true);
    setConfirmData(data);
  };

  const handleConfirmDelete = () => {
    // console.log(confirmData?.unitId);
    toast.promise(
      instances.delete(`/unit/${confirmData?.unitId}`).then(() => {
        setUpdateTable((prev) => !prev);
        setIsShowModal(false);
      }),
      {
        pending: 'Đang xóa đơn vị',
        success: 'Đã xóa thành công! 👌',
        error: 'Xóa đơn vị thất bại',
      },
    );
  };
  const handleConfirmRestore = () => {
    toast.promise(
      instances
        .put(`/unit`, {
          unitId: confirmData?.unitId,
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
          modalTitle="Đơn vị tính"
          statusTypeAvai={true}
          statusTypeNotAvai={false}
          setUpdateTable={setUpdateTable}
          itemName={confirmData?.name}
          handleConfirmDelete={handleConfirmDelete}
          handleConfirmRestore={handleConfirmRestore}
        />
      )}
      <div className="flex ss:flex-row flex-col gap-4 item-center justify-between mb-[20px]">
        <button
          onClick={() => navigate('/management/unit/new')}
          className="flex items-center w-fit gap-2 py-2 px-3 bg-primary text-white font-medium rounded-[10px]"
        >
          Thêm đơn vị
          <img src={ic_blog_create} />
        </button>
      </div>
      <div>
        <DataTable unitList={unitList} handleOpenEdit={handleOpenEdit} handleOpenDelete={handleOpenDelete} />
      </div>
    </div>
  );
};

export default UnitManagement;
