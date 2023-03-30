import React from 'react';
import Loading from '../../../../../../../share/components/Admin/Loading';
import { ic_edit, ic_delete_red, ic_delete_green, ic_blog_active, ic_eye_gray } from '../../../../../../../assets';

import { DataGrid } from '@mui/x-data-grid';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import moment from 'moment/moment';

function checkStatus(status) {
  switch (status) {
    case 2:
      return <p className="text-white px-3 rounded-full text-[14px] bg-green-500">ACCEPTED</p>;
      break;
    case 5:
      return <p className="text-white px-3 rounded-full text-[14px] bg-yellow-500">SHIPPING</p>;
      break;
    case 3:
      return <p className="text-white px-3 rounded-full text-[14px] bg-red-500">CANCELED</p>;
      break;
    case 6:
      return <p className="text-white px-3 rounded-full text-[14px] bg-gray-400">SHIPPED</p>;
      break;
    default:
      break;
  }
}

const columns = [
  // { field: 'blogId', headerName: 'ID', width: 70 },
  {
    field: 'orderId',
    headerName: 'Mã đơn hàng',
    width: 200,
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
  },
  {
    field: 'totalPrice',
    headerName: 'Đơn giá',
    width: 200,
    renderCell: (params) => (
      <p className="text-redError font-bold">{Intl.NumberFormat().format(params.row.totalPrice)}đ</p>
    ),
  },
  {
    field: 'orderDate',
    headerName: 'Ngày đặt',
    width: 150,
    renderCell: (params) => moment(params.row.orderDate).format('Do MMM YY'),
  },
  {
    field: 'status',
    headerName: 'Trạng thái',
    width: 150,
    // flex: 1,
    renderCell: (params) => (
      <div className={`cellWithStatus ${params.row.orderStatus}`}>
        {checkStatus(params.row.orderStatus)}
        {/* {params.row.status == true ? (
          <p className="text-white px-3 rounded-full text-[14px] bg-green-500">AVAILABLE</p>
        ) : (
          <p className="text-white px-3 rounded-full text-[14px] bg-red-500">DELETED</p>
        )} */}
      </div>
    ),
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
        }}
        sx={{
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 700,
          },
        }}
      />
    </div>
  );
};

export default DataTable;
