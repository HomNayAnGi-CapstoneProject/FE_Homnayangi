import React from 'react';
import Loading from '../../../../../../../share/components/Admin/Loading';
import Image from '../../../../../../../share/components/Image';
import { ic_edit, ic_delete_red, ic_delete_green, ic_eye_gray } from '../../../../../../../assets';

import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import moment from 'moment/moment';

function checkStatus(status) {
  switch (status) {
    case 1:
      return <p className="text-white px-3 rounded-full text-[14px] bg-green-500">AVAILABLE</p>;
      break;
    case 2:
      return <p className="text-white px-3 rounded-full text-[14px] bg-yellow-500">DRAFT</p>;
      break;
    case 0:
      return <p className="text-white px-3 rounded-full text-[14px] bg-red-500">DELETED</p>;
      break;
    case 3:
      return <p className="text-white px-3 rounded-full text-[14px] bg-gray-400">PENDING</p>;
      break;
    default:
      break;
  }
}

const columns = [
  // { field: 'blogId', headerName: 'ID', width: 70 },
  {
    field: 'imageUrl',
    headerName: 'Ảnh mô tả',
    width: 100,
    renderCell: (params) => (
      <Image className="rounded-[5px] h-[40px] w-[60px] object-cover" src={params.row.imageUrl} />
    ),
  },
  {
    field: 'authorName',
    headerName: 'Tác giả',
    width: 150,
  },
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
    field: 'createdDate',
    headerName: 'Ngày tạo',
    width: 150,
    renderCell: (params) => moment(params.row.createdDate).format('Do MMM YY'),
  },
  // {
  //   field: 'updatedDate',
  //   headerName: 'Ngày chỉnh sửa',
  //   width: 150,
  //   renderCell: (params) => moment(params.row.updatedDate).format('Do MMM YY'),
  // },
  {
    field: 'status',
    headerName: 'Trạng thái',
    width: 150,
    // flex: 1,
    renderCell: (params) => (
      <div className={`cellWithStatus ${params.row.status}`}>{checkStatus(params.row.status)}</div>
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
          <Tooltip title="Xem chi tiết" placement="right">
            <IconButton onClick={() => props?.handleOpenDetail(params.row)} aria-label="edit">
              <img src={ic_eye_gray} />
            </IconButton>
          </Tooltip>
          {/* <Tooltip title={params.row.status == true ? 'Xóa' : 'Khôi phục'} placement="right">
            <IconButton onClick={() => props?.handleOpenDelete(params.row)} aria-label="remove">
              {params.row.status == true ? <img src={ic_delete_red} /> : <img src={ic_delete_green} />}
            </IconButton>
          </Tooltip> */}
        </div>
      ),
    },
  ];
  return (
    <div className="h-[75vh] bg-white">
      <DataGrid
        slots={{ toolbar: GridToolbar }}
        rows={props.dataList}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        className="datagrid"
        getRowId={(row) => row.blogId}
        loading={!props?.dataList.length}
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
