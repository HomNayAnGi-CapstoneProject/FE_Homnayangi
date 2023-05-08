import React from 'react';
import Loading from '../../../../../../../share/components/Admin/Loading';
import NoRowOverlay from '../../../../../../../share/components/Admin/NoRowOverlay';
import { ic_edit, ic_delete_red, ic_delete_green } from '../../../../../../../assets';

import { DataGrid } from '@mui/x-data-grid';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import moment from 'moment/moment';

const rows = [
  { unitId: 50121, name: '5KG', description: 'Moo tar', createDate: '2022-12-31T23:18:25.91', status: true },
];

const getRoleName = (role) => {
  switch (role) {
    case 'Manager':
      return <p>Quản lý</p>;
    case 'Staff':
      return <p>Nhân viên</p>;
    default:
      break;
  }
};

const columns = [
  // { field: 'blogId', headerName: 'ID', width: 70 },
  {
    field: 'username',
    headerName: 'Tài khoản',
    width: 200,
  },
  // {
  //   field: 'role',
  //   headerName: 'Chức vụ',
  //   width: 150,
  //   renderCell: (params) => <div className="">{getRoleName(params.row.role)}</div>,
  // },
  {
    field: 'firstname',
    headerName: 'Tên',
    width: 150,
  },
  {
    field: 'lastname',
    headerName: 'Họ',
    width: 150,
  },
  {
    field: 'gender',
    headerName: 'Giới tính',
    width: 150,
    renderCell: (params) => <div>{params.row.gender == 1 ? 'Nam' : 'Nữ'}</div>,
  },
  {
    field: 'phonenumber',
    headerName: 'Số điện thoại',
    width: 150,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 150,
  },
  // {
  //   field: 'isGoogle',
  //   headerName: 'Tài khoản',
  //   width: 150,
  //   renderCell: (params) => {
  //     <div>{params.row?.isGoogle == true ? 'Đăng nhập bằng Google' : 'Đăng ký hệ thống'}</div>;
  //   },
  // },
  {
    field: 'status',
    headerName: 'Trạng thái',
    width: 150,
    // flex: 1,
    renderCell: (params) => (
      <div className={`cellWithStatus ${params.row?.isBlocked}`}>
        {params.row?.isBlocked == false ? (
          <p className="text-white px-3 rounded-full text-[14px] bg-green-500">HOẠT ĐỘNG</p>
        ) : (
          <p className="text-white px-3 rounded-full text-[14px] bg-red-500">ĐÃ ẨN</p>
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
      // flex: 1,
      renderCell: (params) => (
        <div className="cellAction">
          {/* <Tooltip title="Chỉnh sửa" placement="left">
            <IconButton onClick={() => props?.handleOpenEdit(params.row)} aria-label="edit">
              <img src={ic_edit} />
            </IconButton>
          </Tooltip> */}
          <Tooltip title={params.row.isBlocked == false ? 'Xóa' : 'Khôi phục'} placement="right">
            <IconButton onClick={() => props?.handleOpenDelete(params.row)} aria-label="remove">
              {params.row.isBlocked == false ? <img src={ic_delete_red} /> : <img src={ic_delete_green} />}
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];
  return (
    <div className="h-[75vh] bg-white">
      <DataGrid
        rows={props.customerList}
        columns={columns.concat(actionColumn)}
        pageSize={12}
        rowsPerPageOptions={[12]}
        className="datagrid"
        getRowId={(row) => row.id}
        loading={props?.loading}
        // loading={!rows.length}
        components={{
          LoadingOverlay: Loading,
          NoRowsOverlay: NoRowOverlay,
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
