import React from 'react';
import Loading from '../../../../../../../share/components/Admin/Loading';
import { ic_edit, ic_delete_red, ic_delete_green, ic_navigation, ic_eye_gray } from '../../../../../../../assets';

import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import moment from 'moment/moment';

function checkStatus(status) {
  switch (status) {
    case 1:
      return <p className="text-white px-3 rounded-full text-[14px] bg-green-400">HOẠT ĐỘNG</p>;
    case 2:
      return <p className="text-white px-3 rounded-full text-[14px] bg-yellow-500">CHỈNH SỬA</p>;
    case 3:
      return <p className="text-white px-3 rounded-full text-[14px] bg-gray-500">CHỜ DUYỆT</p>;
    case 0:
      return <p className="text-white px-3 rounded-full text-[14px] bg-red-500">ĐÃ ẨN</p>;
    default:
      break;
  }
}

const columns = [
  // { field: 'blogId', headerName: 'ID', width: 70 },
  {
    field: 'authorFullName',
    headerName: 'Tên người dùng',
    width: 200,
    renderCell: (params) => <div className="">{params.row.authorFullName}</div>,
  },
  {
    field: 'reaction',
    headerName: 'Lượt thích',
    width: 150,
    renderCell: (params) => <p className="text-redError font-bold">{params.row.reaction}</p>,
  },
  {
    field: 'createdDate',
    headerName: 'Ngày tạo',
    width: 150,
    renderCell: (params) => moment(params.row.orderDate).format('Do MMM YY'),
    // valueGetter: (params) => new Date(params.row.orderDate).toLocaleString(),
  },
  {
    field: 'status',
    headerName: 'Trạng thái',
    width: 200,
    // flex: 1,
    renderCell: (params) => (
      <div className={`cellWithStatus ${params.row.status}`}>
        {checkStatus(params.row.status)}
        {/* {params.row.status == true ? (
          <p className="text-white px-3 rounded-full text-[14px] bg-green-500">AVAILABLE</p>
        ) : (
          <p className="text-white px-3 rounded-full text-[14px] bg-red-500">DELETED</p>
        )} */}
      </div>
    ),
    // valueGetter: (params) => checkStatusExport(params.row.orderStatus, params.row.paymentMethod),
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
          <Tooltip title="Chi tiết" placement="left">
            <IconButton onClick={() => props?.handelOpenDetail(params.row)} aria-label="edit">
              <img src={ic_eye_gray} />
            </IconButton>
          </Tooltip>
          {/* {params.row.status == 3 && (
            <Tooltip title="Đổi trạng thái thành tựu" placement="right">
              <IconButton onClick={() => props?.handleChangeStatus(params.row)} aria-label="edit">
                <img src={ic_navigation} />
              </IconButton>
            </Tooltip>
          )} */}
        </div>
      ),
    },
  ];
  return (
    <div className="h-[75vh] bg-white">
      <DataGrid
        rows={props.accomplishmentList}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        className="datagrid"
        getRowId={(row) => row.accomplishmentId}
        loading={!props?.accomplishmentList.length}
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
