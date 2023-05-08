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

const VoucherManagement = () => {
  // ** Const
  const navigate = useNavigate();
  const [voucherList, setVoucherList] = useState([]);
  const [updateTable, setUpdateTable] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [confirmData, setConfirmData] = useState();
  const [loading, setLoading] = useState(false);

  // ** Call api
  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const res = await instances.get('/vouchers');
      // console.log(res.data);
      setLoading(false);
      setVoucherList(res.data.result);
    };
    fetch();
  }, [updateTable]);

  // ** Func
  const handleOpenEdit = (data) => {
    navigate(`/management/voucher/edit/${data?.voucherId}`);
  };

  const handleOpenDelete = (data) => {
    setIsShowModal(true);
    setConfirmData(data);
  };

  const handleConfirmDelete = () => {
    // console.log(confirmData?.badgeId);
    toast.promise(
      instances.delete(`/vouchers/${confirmData?.voucherId}`).then(() => {
        setUpdateTable((prev) => !prev);
        setIsShowModal(false);
      }),
      {
        pending: 'Đang xóa mã giảm giá',
        success: 'Đã xóa thành công! 👌',
        error: 'Xóa mã giảm giá thất bại',
      },
    );
  };
  const handleConfirmRestore = () => {
    toast.promise(
      instances
        .put(`/vouchers`, {
          voucherId: confirmData?.voucherId,
          name: confirmData?.name,
          description: confirmData?.description,
          validFrom: confirmData?.validFrom,
          validTo: confirmData?.validTo,
          discount: confirmData?.discount,
          minimumOrderPrice: confirmData?.minimumOrderPrice,
          maximumOrderPrice: confirmData?.maximumOrderPrice,
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
          modalTitle="Mã giảm giá"
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
          onClick={() => navigate('/management/voucher/new')}
          className="flex items-center w-fit gap-2 py-2 px-3 bg-primary text-white font-medium rounded-[10px]"
        >
          Thêm mã giảm giá
          <img src={ic_blog_create} />
        </button>
      </div>
      <div>
        <DataTable
          voucherList={voucherList}
          handleOpenEdit={handleOpenEdit}
          handleOpenDelete={handleOpenDelete}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default VoucherManagement;
