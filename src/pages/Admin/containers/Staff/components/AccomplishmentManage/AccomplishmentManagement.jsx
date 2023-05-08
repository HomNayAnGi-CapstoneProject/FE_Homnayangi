import { useState, useEffect } from 'react';
import instances from '../../../../../../utils/plugin/axios';

// **Assets
import { ic_blog_create } from '../../../../../../assets';

// ** components
import DataTable from './components/DataTable';
import ConfirmModal from '../../../../../../share/components/Admin/ConfirmModal';
import ModalAccomplishmentDetail from '../../../../../../share/components/Modal/ModalAccomplishmentDetail/ModalAccomplishmentDetail';

// ** third party
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AccomplishmentManagement = () => {
  // ** Const
  const navigate = useNavigate();
  const [accomplishmentList, setAccomplishmentList] = useState([]);
  const [updateTable, setUpdateTable] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [confirmData, setConfirmData] = useState();
  const [openChangeStatusModal, setOpenChangeStatusModal] = useState(false);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [orderDetailData, setOrderDetailData] = useState();
  const [loading, setLoading] = useState(false);

  // ** Call api
  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const res = await instances.get('/accomplishments', {
        params: { status: 'ALL' },
      });
      setLoading(false);
      setAccomplishmentList(res.data.result);
      // setAccomplishmentList(res.data.resource);
    };
    fetch();
  }, [updateTable]);

  // ** Func
  const handleOpenEdit = (data) => {
    navigate(`/management/award/edit/${data?.badgeId}`);
  };

  // handle open detail
  const handelOpenDetail = (data) => {
    setOrderDetailData(data);
    setOpenDetailModal(true);
  };

  // handle change order status
  const handleOpenChangeStatus = (data) => {
    setOrderDetailData(data);
    setOpenChangeStatusModal(true);
  };
  return (
    <div>
      {openDetailModal && (
        <ModalAccomplishmentDetail
          openDetailModal={openDetailModal}
          setOpenDetailModal={setOpenDetailModal}
          data={orderDetailData}
          setUpdateTable={setUpdateTable}
        />
      )}
      <p className="text-[20px] font-semibold text-[#585858]">Quản lý thành quả</p>
      <div className="mt-2">
        <DataTable
          accomplishmentList={accomplishmentList}
          handelOpenDetail={handelOpenDetail}
          handleChangeStatus={handleOpenChangeStatus}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default AccomplishmentManagement;
