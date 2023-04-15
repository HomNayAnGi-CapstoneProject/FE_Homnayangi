import { useState, useEffect } from 'react';
import instances from '../../../../../../utils/plugin/axios';

import { toast } from 'react-toastify';
import { Tooltip } from '@mui/material';

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
  const [needRefundCount, setNeedRefundCount] = useState(0);
  const [needConfirmCount, setNeedConfirmCount] = useState(0);
  const [updateTable, setUpdateTable] = useState(false);
  const [currentOrderStatus, setCurrentOrderStatus] = useState(-1);

  const notifyWarn = (msg) => {
    toast.warn(msg, {
      autoClose: 4000,
    });
  };

  //** get orders by status
  useEffect(() => {
    const fetch = async () => {
      const res = await instances.get(`/orders/status`, {
        params: {
          status: currentOrderStatus,
        },
      });
      // console.log(res.data);
      setOrderList(res.data);
      // setOrderCount(res?.data?.length || 0);
      // setNeedRefundCount(res?.data?.filter((order) => order?.orderStatus == 10).length || 0);
    };

    fetch();
  }, [updateTable, currentOrderStatus]);

  // ** get order button number
  useEffect(() => {
    const fetch = async () => {
      const res = await instances.get(`/orders/status`, {
        params: {
          status: -1,
        },
      });
      // console.log(res.data);
      setOrderCount(res?.data?.length || 0);
      setNeedRefundCount(res?.data?.filter((order) => order?.orderStatus == 10).length || 0);
      setNeedConfirmCount(res?.data?.filter((order) => order?.orderStatus == 1).length || 0);
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
      case 10:
        return 'refund';
      default:
        break;
    }
  };

  const handleChangeOrderStatus = (data, isCancel) => {
    // console.log(confirmData?.unitId);
    let status = isCancel ? 'deny' : getOrderStatus(data?.orderStatus);

    // console.log(status);
    toast.promise(
      instances.put(`/orders/${status}/${data?.orderId}`).then(() => {
        setUpdateTable((prev) => !prev);
        if (status === 'deny') {
          if (data?.paymentMethod == 1) {
            notifyWarn('Bạn đã từ chối đơn hàng đã thanh toán, vui lòng kiểm tra và hoàn tiền lại cho khách hàng!');
          }
        }
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
      <div className="flex items-center gap-4">
        <Tooltip title="Xem tổng đơn hàng hiện tại" placement="top">
          <button
            onClick={() => setCurrentOrderStatus(-1)}
            className={`flex items-center w-fit gap-2 py-2 px-3 ${
              currentOrderStatus == -1 ? 'bg-primary text-white' : 'bg-white text-black'
            }  font-medium rounded-[10px]`}
          >
            Tổng đơn hàng ({orderCount})
          </button>
        </Tooltip>
        <Tooltip title="Xem đơn hàng đang chờ xác nhận" placement="top">
          <button
            onClick={() => setCurrentOrderStatus(1)}
            className={`flex items-center w-fit gap-2 py-2 px-3 ${
              currentOrderStatus == 1 ? 'bg-primary text-white ' : 'bg-white text-black'
            } font-medium rounded-[10px]`}
          >
            Chờ xác nhận ({needConfirmCount})
          </button>
        </Tooltip>
        <Tooltip title="Xem đơn hàng đang đợi hoàn tiền" placement="top">
          <button
            onClick={() => setCurrentOrderStatus(10)}
            className={`flex items-center w-fit gap-2 py-2 px-3 ${
              currentOrderStatus == 10 ? 'bg-primary text-white' : 'bg-white text-black'
            }   font-medium rounded-[10px]`}
          >
            Đợi hoàn tiền ({needRefundCount})
          </button>
        </Tooltip>
        {/* <p className="text-[20px] font-semibold text-[#585858]">Tổng đơn hàng ({orderCount})</p> */}
      </div>
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
