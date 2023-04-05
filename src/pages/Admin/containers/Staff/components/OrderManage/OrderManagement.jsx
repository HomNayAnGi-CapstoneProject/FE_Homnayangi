import { useState, useEffect } from 'react';
import instances from '../../../../../../utils/plugin/axios';

import { toast } from 'react-toastify';

// ** components
import DataTable from './components/DataTable';
import ModalStaffOrderDetail from '../../../../../../share/components/Modal/ModalStaffOrderDetail/ModalStaffOrderDetail';
import ModalOrderStatus from '../../../../../../share/components/Modal/ModalOrderStatus/ModalOrderStatus';

const OrderManagement = () => {
  const [orderList, setOrderList] = useState([]);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [openChangeStatusModal, setOpenChangeStatusModal] = useState(false);
  const [orderDetailData, setOrderDetailData] = useState();
  const [orderCount, setOrderCount] = useState(0);
  const [updateTable, setUpdateTable] = useState(false);

  // get orders
  useEffect(() => {
    const fetch = async () => {
      const res = await instances.get(`/orders`);
      // console.log(res.data);
      setOrderList(res.data);
      setOrderCount(res?.data?.length || 0);
    };

    fetch();
  }, [updateTable]);

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

  const getOrderStatus = (status) => {
    switch (status) {
      case 1:
        return 'accept';
      case 2:
        return 'shipping';
      case 5:
        return 'delivered';
      default:
        break;
    }
  };

  const handleChangeOrderStatus = (data, isCancel) => {
    // console.log(confirmData?.unitId);
    let status = isCancel ? 'cancel' : getOrderStatus(data?.orderStatus);

    // console.log(status);
    toast.promise(
      instances.put(`/orders/${status}/${data?.orderId}`).then(() => {
        setUpdateTable((prev) => !prev);
        setOpenChangeStatusModal(false);
      }),
      {
        pending: 'Đang chuyển trạng thái',
        success: 'Đã chuyển thành công! 👌',
        error: 'chuyển trạng thái thất bại',
      },
    );
  };

  return (
    <div>
      {openChangeStatusModal && (
        <ModalOrderStatus
          openChangeStatusModal={openChangeStatusModal}
          setOpenChangeStatusModal={setOpenChangeStatusModal}
          handleChangeOrderStatus={handleChangeOrderStatus}
          data={orderDetailData}
        />
      )}
      {openDetailModal && (
        <ModalStaffOrderDetail
          openDetailModal={openDetailModal}
          setOpenDetailModal={setOpenDetailModal}
          data={orderDetailData}
        />
      )}
      <p className="text-[20px] font-semibold text-[#585858]">Đơn hàng ({orderCount})</p>
      <div className="mt-2">
        <DataTable
          orderList={orderList}
          handelOpenDetail={handelOpenDetail}
          handleChangeStatus={handleOpenChangeStatus}
        />
      </div>
    </div>
  );
};

export default OrderManagement;
