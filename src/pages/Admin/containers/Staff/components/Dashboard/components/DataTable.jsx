import React from 'react';
import Loading from '../../../../../../../share/components/Admin/Loading';
import { ic_edit, ic_delete_red, ic_delete_green, ic_blog_active } from '../../../../../../../assets';

import { DataGrid } from '@mui/x-data-grid';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import moment from 'moment/moment';

const rows = [];

const columns = [
  // { field: 'blogId', headerName: 'ID', width: 70 },
  {
    field: 'id',
    headerName: 'Mã đơn hàng',
    width: 200,
  },
  {
    field: 'description',
    headerName: 'Mô tả',
    width: 300,
    // renderCell: (params) => (
    //   <div className="">
    //     <Tooltip title={`${params.row.description}`} placement="top">
    //       <div className="">{params.row.description}</div>
    //     </Tooltip>
    //   </div>
    // ),
  },
  {
    field: 'createDate',
    headerName: 'Ngày tạo',
    width: 150,
    renderCell: (params) => moment(params.row.createDate).format('Do MMM YY'),
  },
  {
    field: 'status',
    headerName: 'Trạng thái',
    width: 150,
    // flex: 1,
    renderCell: (params) => (
      <div className={`cellWithStatus ${params.row.status}`}>
        {params.row.status == true ? (
          <p className="text-white px-3 rounded-full text-[14px] bg-green-500">AVAILABLE</p>
        ) : (
          <p className="text-white px-3 rounded-full text-[14px] bg-red-500">DELETED</p>
        )}
      </div>
    ),
  },
];

const DataTable = () => {
  const actionColumn = [
    {
      field: 'action',
      headerName: 'Hành động',
      width: 100,
      // flex: 1,
      renderCell: (params) => (
        <div className="cellAction">
          <Tooltip title="Chi tiết" placement="right">
            <IconButton onClick={() => props?.handleOpenEdit(params.row)} aria-label="edit">
              <img src={ic_blog_active} />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];
  return (
    <div className="h-[53vh] bg-white">
      <DataGrid
        rows={rows}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        className="datagrid"
        getRowId={(row) => row.id}
        // loading={!props?.unitList.length}
        loading={!rows.length}
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
