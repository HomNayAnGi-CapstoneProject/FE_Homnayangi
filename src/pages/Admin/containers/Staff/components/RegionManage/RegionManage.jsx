import { useState, useEffect } from 'react';
import instances from '../../../../../../utils/plugin/axios';

// **Assets
import { ic_blog_create } from '../../../../../../assets';

// ** Components
import DataTable from './components/DataTable';
import ConfirmModal from '../../../../../../share/components/Admin/ConfirmModal';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const RegionManage = () => {
  // ** Const
  const navigate = useNavigate();
  const [regions, setRegions] = useState([]);
  const [updateTable, setUpdateTable] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [confirmData, setConfirmData] = useState();
  const [loading, setLoading] = useState(false);

  // ** Call api
  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const res = await instances.get('/region');
      // console.log(res.data);
      setLoading(false);
      setRegions(res.data);
    };
    fetch();
  }, [updateTable]);

  // ** Func
  const handleOpenEdit = (data) => {
    navigate(`/management/region/edit/${data?.regionId}`);
  };

  const handleOpenDelete = (data) => {
    setIsShowModal(true);
    setConfirmData(data);
  };

  const handleConfirmDelete = () => {
    // console.log(confirmData?.unitId);
    toast.promise(
      instances.delete(`/region/${confirmData?.regionId}`).then(() => {
        setUpdateTable((prev) => !prev);
        setIsShowModal(false);
      }),
      {
        pending: 'Đang xóa vùng miền',
        success: 'Đã xóa thành công! 👌',
        error: 'Xóa vùng miền thất bại',
      },
    );
  };
  const handleConfirmRestore = () => {
    toast.promise(
      instances
        .put(`/region`, {
          regionId: confirmData?.regionId,
          regionName: confirmData?.regionName,
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
          modalTitle="Vùng miền"
          statusTypeAvai={true}
          statusTypeNotAvai={false}
          setUpdateTable={setUpdateTable}
          itemName={confirmData?.regionName}
          handleConfirmDelete={handleConfirmDelete}
          handleConfirmRestore={handleConfirmRestore}
        />
      )}
      <div className="flex ss:flex-row flex-col gap-4 item-center mb-[20px]">
        <button
          disabled={regions?.length == 3}
          onClick={() => navigate('/management/region/new')}
          className={`${
            regions?.length == 3 ? 'bg-secondary cursor-not-allowed' : 'bg-primary'
          } flex items-center w-fit gap-2 py-2 px-3  text-white font-medium rounded-[10px]`}
        >
          Thêm vùng miền
          <img src={ic_blog_create} />
        </button>
      </div>
      <div>
        <DataTable
          regions={regions}
          handleOpenEdit={handleOpenEdit}
          handleOpenDelete={handleOpenDelete}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default RegionManage;
