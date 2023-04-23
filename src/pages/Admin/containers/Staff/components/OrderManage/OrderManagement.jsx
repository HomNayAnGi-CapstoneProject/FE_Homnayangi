import { useState, useEffect } from 'react';
import instances from '../../../../../../utils/plugin/axios';
import { setCurrentOrderStatus } from '../../../../../../redux/actionSlice/managementSlice';
import { ic_category_white } from '../../../../../../assets';

import { toast } from 'react-toastify';
import { Tooltip } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment/moment';

// ** components
import DataTable from './components/DataTable';
import ModalStaffOrderDetail from '../../../../../../share/components/Modal/ModalStaffOrderDetail/ModalStaffOrderDetail';
import ModalOrderStatus from '../../../../../../share/components/Modal/ModalOrderStatus/ModalOrderStatus';
import ModalFilterOrderDate from './components/ModalFilterOrderDate';

const OrderManagement = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.management);
  const [orderList, setOrderList] = useState([]);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [openChangeStatusModal, setOpenChangeStatusModal] = useState(false);
  const [orderDetailData, setOrderDetailData] = useState();
  const [orderCount, setOrderCount] = useState(0);
  const [needRefundCount, setNeedRefundCount] = useState(0);
  const [needConfirmCount, setNeedConfirmCount] = useState(0);
  const [updateTable, setUpdateTable] = useState(false);
  // const [currentOrderStatus, setCurrentOrderStatus] = useState(-1);
  const [openFilterDate, setOpenFilterDate] = useState(false);
  const [filterFromDate, setFilterFromDate] = useState();
  const [filterToDate, setFilterToDate] = useState();

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
          status: store?.currentOrderStatus,
          fromDate: filterFromDate ? filterFromDate : null,
          toDate: filterToDate ? filterToDate : null,
        },
      });
      // console.log(res.data);
      setOrderList(res.data);
      // setOrderCount(res?.data?.length || 0);
      // setNeedRefundCount(res?.data?.filter((order) => order?.orderStatus == 10).length || 0);
    };

    fetch();
  }, [updateTable, store?.currentOrderStatus, filterFromDate, filterToDate]);

  // ** get order button number
  useEffect(() => {
    const fetch = async () => {
      const res = await instances.get(`/orders/status`, {
        params: {
          status: -1,
          fromDate: filterFromDate ? filterFromDate : null,
          toDate: filterToDate ? filterToDate : null,
        },
      });
      // console.log(res.data);
      setOrderCount(res?.data?.length || 0);
      setNeedRefundCount(res?.data?.filter((order) => order?.orderStatus == 10).length || 0);
      setNeedConfirmCount(res?.data?.filter((order) => order?.orderStatus == 1).length || 0);
    };

    fetch();
  }, [updateTable, filterFromDate, filterToDate]);

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

  const handleOpenFilter = () => {
    setOpenFilterDate(true);
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
      {openFilterDate && (
        <ModalFilterOrderDate
          openFilterDate={openFilterDate}
          setOpenFilterDate={setOpenFilterDate}
          setFilterFromDate={setFilterFromDate}
          setFilterToDate={setFilterToDate}
          filterFromDate={filterFromDate}
          filterToDate={filterToDate}
        />
      )}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Tooltip title="Xem tất cả đơn hàng hiện tại" placement="top">
            <button
              onClick={() => dispatch(setCurrentOrderStatus(-1))}
              className={`flex items-center w-fit gap-2 py-2 px-3 ${
                store?.currentOrderStatus == -1 ? 'bg-primary text-white' : 'bg-white text-black'
              }  font-medium rounded-[10px]`}
            >
              Tất cả ({orderCount})
            </button>
          </Tooltip>
          <Tooltip title="Xem đơn hàng đang chờ xác nhận" placement="top">
            <button
              onClick={() => dispatch(setCurrentOrderStatus(1))}
              className={`flex items-center w-fit gap-2 py-2 px-3 ${
                store?.currentOrderStatus == 1 ? 'bg-primary text-white ' : 'bg-white text-black'
              } font-medium rounded-[10px]`}
            >
              Chờ xác nhận ({needConfirmCount})
            </button>
          </Tooltip>
          <Tooltip title="Xem đơn hàng đang đợi hoàn tiền" placement="top">
            <button
              onClick={() => dispatch(setCurrentOrderStatus(10))}
              className={`flex items-center w-fit gap-2 py-2 px-3 ${
                store?.currentOrderStatus == 10 ? 'bg-primary text-white' : 'bg-white text-black'
              }   font-medium rounded-[10px]`}
            >
              Đợi hoàn tiền ({needRefundCount})
            </button>
          </Tooltip>
          {/* <p className="text-[20px] font-semibold text-[#585858]">Tổng đơn hàng ({orderCount})</p> */}
        </div>

        {/* date filter */}
        <div className="flex items-center gap-3">
          {filterFromDate !== undefined && filterToDate !== undefined ? (
            <p>
              Từ <span className="mx-2 font-semibold">{moment(filterFromDate).format('Do MMM YY')}</span> Đến{' '}
              <span className="mx-2 font-semibold">{moment(filterToDate).format('Do MMM YY')}</span>
            </p>
          ) : (
            <></>
          )}
          <Tooltip title="Lọc đơn hàng" placement="top">
            <button onClick={() => handleOpenFilter()} className="bg-primary rounded-[10px] px-3 py-1">
              <img alt="" className="object-cover w-[20px] h-[20px]" src={ic_category_white} />
            </button>
          </Tooltip>
        </div>
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
