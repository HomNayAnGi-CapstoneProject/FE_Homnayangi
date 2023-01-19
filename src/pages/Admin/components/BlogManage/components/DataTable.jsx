import React from 'react';
import Loading from '../../../../../share/components/Admin/Loading';
import { ic_edit, ic_delete_red, ic_delete_green } from '../../../../../assets';

import { DataGrid } from '@mui/x-data-grid';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import moment from 'moment/moment';

const rows = [
  {
    blogId: 1,
    title: 'Cách làm bánh ngào mật mía Nghệ An',
    category: null,
    createDate: '2022-12-31T23:18:25.91',
    reaction: 1205,
    view: 1000,
    status: 'AVAILABLE',
  },
  {
    blogId: 2,
    title: 'Cách làm bánh ngào mật mía Nghệ An',
    category: null,
    createDate: '2022-12-31T23:18:25.91',
    reaction: 1205,
    view: 1000,
    status: 'AVAILABLE',
  },
  {
    blogId: 3,
    title: 'Cách làm bánh ngào mật mía Nghệ An',
    category: null,
    createDate: '2022-12-31T23:18:25.91',
    reaction: 1205,
    view: 1000,
    status: 'DELETED',
  },
  {
    blogId: 4,
    title: 'Cách làm bánh ngào mật mía Nghệ An',
    category: null,
    createDate: '2022-12-31T23:18:25.91',
    reaction: 1205,
    view: 1000,
    status: 'AVAILABLE',
  },
  {
    blogId: 5,
    title: 'Cách làm bánh ngào mật mía Nghệ An',
    category: null,
    createDate: '2022-12-31T23:18:25.91',
    reaction: 1205,
    view: 1000,
    status: 'AVAILABLE',
  },
  {
    blogId: 6,
    title: 'Cách làm bánh ngào mật mía Nghệ An',
    category: null,
    createDate: '2022-12-31T23:18:25.91',
    reaction: 1205,
    view: 1000,
    status: 'DELETED',
  },
  {
    blogId: 7,
    title: 'Cách làm bánh ngào mật mía Nghệ An',
    category: null,
    createDate: '2022-12-31T23:18:25.91',
    reaction: 1205,
    view: 1000,
    status: 'DELETED',
  },
  {
    blogId: 8,
    title: 'Cách làm bánh ngào mật mía Nghệ An',
    category: null,
    createDate: '2022-12-31T23:18:25.91',
    reaction: 1205,
    view: 1000,
    status: 'AVAILABLE',
  },
  {
    blogId: 9,
    title: 'Cách làm bánh ngào mật mía Nghệ An',
    category: null,
    createDate: '2022-12-31T23:18:25.91',
    reaction: 1205,
    view: 1000,
    status: 'AVAILABLE',
  },
  {
    blogId: 10,
    title: 'Cách làm bánh ngào mật mía Nghệ An',
    category: null,
    createDate: '2022-12-31T23:18:25.91',
    reaction: 1205,
    view: 1000,
    status: 'AVAILABLE',
  },
  {
    blogId: 11,
    title: 'Cách làm bánh ngào mật mía Nghệ An',
    category: null,
    createDate: '2022-12-31T23:18:25.91',
    reaction: 1205,
    view: 1000,
    status: 'AVAILABLE',
  },
];

const columns = [
  { field: 'blogId', headerName: 'ID', width: 70 },
  {
    field: 'title',
    headerName: 'Tiêu đề bài viết',
    width: 250,
    renderCell: (params) => (
      <div className="">
        <Tooltip title={`${params.row.title}`} placement="top">
          <p className="">{params.row.title}</p>
        </Tooltip>
      </div>
    ),
  },
  {
    field: 'category',
    headerName: 'Danh mục',
    width: 150,
  },
  {
    field: 'createDate',
    headerName: 'Ngày tạo',
    width: 150,
    renderCell: (params) => moment(params.row.createDate).format('Do MMM YY'),
  },
  {
    field: 'reaction',
    headerName: 'Lượt yêu thích',
    width: 150,
    flex: 1,
    renderCell: (params) => <p className="text-[#DB2017] font-medium">{params.row.reaction}</p>,
  },
  {
    field: 'view',
    headerName: 'Lượt xem',
    width: 150,
    flex: 1,
    renderCell: (params) => <p className="text-[#4285F4] font-medium">{params.row.view}</p>,
  },
  {
    field: 'status',
    headerName: 'Trạng thái',
    width: 90,
    flex: 1,
    renderCell: (params) => (
      <div className={`cellWithStatus ${params.row.status}`}>
        {params.row.status === 'AVAILABLE' ? (
          <p className="text-green-500">{params.row.status}</p>
        ) : (
          <p className="text-red-500">{params.row.status}</p>
        )}
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
      renderCell: (params) => (
        <div className="cellAction">
          <Tooltip title="Chỉnh sửa" placement="left">
            <IconButton onClick={() => props?.handleOpenEdit(params.row)} aria-label="edit">
              <img src={ic_edit} />
            </IconButton>
          </Tooltip>
          <Tooltip title={params.row.status == 'AVAILABLE' ? 'Xóa' : 'Khôi phục'} placement="right">
            <IconButton
              // onClick={() => props?.handleOpenDeleteModal(params.row)}
              aria-label="remove"
            >
              {params.row.status == 'AVAILABLE' ? <img src={ic_delete_red} /> : <img src={ic_delete_green} />}
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];
  return (
    <div className="h-[75vh] bg-white">
      <DataGrid
        rows={rows}
        columns={columns.concat(actionColumn)}
        pageSize={10}
        rowsPerPageOptions={[10]}
        className="datagrid"
        getRowId={(row) => row.blogId}
        // loading={!props?.dashboardProList.length}
        //             components={{
        //                 LoadingOverlay: LoadingSmall,
        //             }}
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
