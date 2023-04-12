import React from 'react';
import Loading from '../../../../../../../share/components/Admin/Loading';
import { ic_edit, ic_delete_red, ic_delete_green, ic_blog_active, ic_eye_gray } from '../../../../../../../assets';

import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import moment from 'moment/moment';

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

function checkStatus(status, paymentMethod) {
  switch (status) {
    case 1:
      return (
        <p className="text-white px-3 rounded-full text-[14px] bg-gray-500">
          {/* {paymentMethod == 1 ? 'CHỜ THANH TOÁN' : 'CHỜ DUYỆT'} */}
          {paymentMethod == 1 ? 'CHỜ XÁC NHẬN' : 'CHỜ XÁC NHẬN'}
        </p>
      );
    case 2:
      return (
        <p className="text-white px-3 rounded-full text-[14px] bg-blue-500">
          {/* {paymentMethod == 1 ? 'ĐÃ THANH TOÁN' : 'ĐÃ DUYỆT'} */}
          {paymentMethod == 1 ? 'ĐÃ XÁC NHẬN' : 'ĐÃ XÁC NHẬN'}
        </p>
      );
    case 5:
      return <p className="text-white px-3 rounded-full text-[14px] bg-yellow-500">ĐANG GIAO</p>;
    case 3:
      return <p className="text-white px-3 rounded-full text-[14px] bg-red-500">ĐÃ HỦY</p>;
    case 6:
      return <p className="text-white px-3 rounded-full text-[14px] bg-green-400">ĐÃ GIAO</p>;
    default:
      break;
  }
}

function checkStatusExport(status, paymentMethod) {
  switch (status) {
    case 1:
      return paymentMethod == 1 ? 'CHỜ XÁC NHẬN' : 'CHỜ XÁC NHẬN';
    case 2:
      return paymentMethod == 1 ? 'ĐÃ XÁC NHẬN' : 'ĐÃ XÁC NHẬN';
    case 5:
      return 'ĐANG GIAO';
    case 3:
      return 'ĐÃ HỦY';
    case 6:
      return 'ĐÃ GIAO';
    default:
      break;
  }
}

const columns = [
  // { field: 'blogId', headerName: 'ID', width: 70 },
  {
    field: 'orderId',
    headerName: 'Mã đơn hàng',
    width: 120,
  },
  {
    field: 'isCooked',
    headerName: 'Loại đơn hàng',
    width: 200,
    renderCell: (params) => (
      <div className="">
        <Tooltip title={`${params.row.isCooked ? 'Đặt nấu' : 'Nguyên liệu'}`} placement="top">
          <div className={`${params.row.isCooked ? 'text-redError' : ''} font-semibold`}>
            {params.row.isCooked ? 'Đặt nấu' : 'Nguyên liệu'}
          </div>
        </Tooltip>
      </div>
    ),
    valueGetter: (params) => (params.row.isCooked ? 'Đặt nấu' : 'Nguyên liệu'),
  },
  {
    field: 'totalPrice',
    headerName: 'Đơn giá',
    width: 150,
    renderCell: (params) => (
      <p className="text-redError font-bold">{Intl.NumberFormat().format(params.row.totalPrice)}đ</p>
    ),
  },
  {
    field: 'paymentMethod',
    headerName: 'Hình thức thanh toán',
    width: 200,
    renderCell: (params) => (
      <p className={`${params.row.paymentMethod == 0 ? 'text-primary' : 'text-blue-500'} font-bold`}>
        {params.row.paymentMethod == 0 ? 'COD' : 'Online'}
      </p>
    ),
    valueGetter: (params) => (params.row.paymentMethod == 0 ? 'COD' : 'Online'),
  },
  {
    field: 'orderDate',
    headerName: 'Ngày đặt',
    width: 150,
    renderCell: (params) => moment(params.row.orderDate).format('Do MMM YY'),
    valueGetter: (params) => new Date(params.row.orderDate).toLocaleString(),
  },
  {
    field: 'orderStatus',
    headerName: 'Trạng thái',
    width: 200,
    // flex: 1,
    renderCell: (params) => (
      <div className={`cellWithStatus ${params.row.orderStatus}`}>
        {checkStatus(params.row.orderStatus, params.row.paymentMethod)}
        {/* {params.row.status == true ? (
          <p className="text-white px-3 rounded-full text-[14px] bg-green-500">AVAILABLE</p>
        ) : (
          <p className="text-white px-3 rounded-full text-[14px] bg-red-500">DELETED</p>
        )} */}
      </div>
    ),
    valueGetter: (params) => checkStatusExport(params.row.orderStatus, params.row.paymentMethod),
  },
];

const DataTable = (props) => {
  const actionColumn = [
    {
      field: 'action',
      headerName: 'Hành động',
      width: 100,
      // flex: 1,
      renderCell: (params) => (
        <div className="cellAction">
          <Tooltip title="Chi tiết" placement="right">
            <IconButton onClick={() => props?.handelOpenDetail(params.row)} aria-label="edit">
              <img src={ic_eye_gray} />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];
  return (
    <div className="h-[53vh] bg-white">
      <DataGrid
        localeText={{
          toolbarExport: 'Xuất dữ liệu',
        }}
        rows={props.orderList}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        className="datagrid"
        getRowId={(row) => row.orderId}
        loading={!props?.orderList.length}
        // loading={!rows.length}
        components={{
          LoadingOverlay: Loading,
          Toolbar: CustomToolbar,
        }}
        sx={{
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 700,
          },
        }}
        // componentsProps={{
        //   toolbar: {
        //     csvOptions: { fields: ['orderId', 'isCooked', 'totalPrice', 'paymentMethod', 'orderDate', 'orderStatus'] },
        //   },
        // }}
      />
    </div>
  );
};

export default DataTable;
