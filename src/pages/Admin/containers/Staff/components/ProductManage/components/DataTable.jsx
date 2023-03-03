import React from 'react';
import Loading from '../../../../../../../share/components/Admin/Loading';
import { ic_edit, ic_delete_red, ic_delete_green } from '../../../../../../../assets';
import Image from '../../../../../../../share/components/Image';

import { DataGrid } from '@mui/x-data-grid';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import moment from 'moment/moment';

const rows = [
  {
    blogId: 1,
    title: 'Thịt bò',
    category: null,
    createDate: '2022-12-31T23:18:25.91',
    reaction: 50000,
    view: 1000,
    status: 'AVAILABLE',
  },
  {
    blogId: 2,
    title: 'Thịt bò',
    category: null,
    createDate: '2022-12-31T23:18:25.91',
    reaction: 50000,
    view: 1000,
    status: 'AVAILABLE',
  },
  {
    blogId: 3,
    title: 'Thịt bò',
    category: null,
    createDate: '2022-12-31T23:18:25.91',
    reaction: 50000,
    view: 1000,
    status: 'DELETED',
  },
  {
    blogId: 4,
    title: 'Thịt bò',
    category: null,
    createDate: '2022-12-31T23:18:25.91',
    reaction: 50000,
    view: 1000,
    status: 'AVAILABLE',
  },
  {
    blogId: 5,
    title: 'Thịt bò',
    category: null,
    createDate: '2022-12-31T23:18:25.91',
    reaction: 50000,
    view: 1000,
    status: 'AVAILABLE',
  },
  {
    blogId: 6,
    title: 'Thịt bò',
    category: null,
    createDate: '2022-12-31T23:18:25.91',
    reaction: 50000,
    view: 1000,
    status: 'DELETED',
  },
  {
    blogId: 7,
    title: 'Thịt bò',
    category: null,
    createDate: '2022-12-31T23:18:25.91',
    reaction: 50000,
    view: 1000,
    status: 'DELETED',
  },
  {
    blogId: 8,
    title: 'Thịt bò',
    category: null,
    createDate: '2022-12-31T23:18:25.91',
    reaction: 50000,
    view: 1000,
    status: 'AVAILABLE',
  },
  {
    blogId: 9,
    title: 'Thịt bò',
    category: null,
    createDate: '2022-12-31T23:18:25.91',
    reaction: 50000,
    view: 1000,
    status: 'AVAILABLE',
  },
  {
    blogId: 10,
    title: 'Thịt bò',
    category: null,
    createDate: '2022-12-31T23:18:25.91',
    reaction: 50000,
    view: 1000,
    status: 'AVAILABLE',
  },
  {
    blogId: 11,
    title: 'Thịt bò',
    category: null,
    createDate: '2022-12-31T23:18:25.91',
    reaction: 50000,
    view: 1000,
    status: 'AVAILABLE',
  },
];

const columns = [
  {
    field: 'picture',
    headerName: 'Ảnh mô tả',
    width: 100,
    renderCell: (params) => <Image className="rounded-[5px] h-[40px] w-[60px] object-cover" src={params.row.picture} />,
  },
  {
    field: 'name',
    headerName: 'Tên nguyên liệu',
    width: 200,
  },
  {
    field: 'description',
    headerName: 'Mô tả',
    width: 150,
  },
  {
    field: 'price',
    headerName: 'Giá bán',
    width: 150,
    // flex: 1,
    renderCell: (params) => (
      <p className="text-[#DB2017] font-medium">{Intl.NumberFormat().format(params.row.price)} đ</p>
    ),
  },
  {
    field: 'kcal',
    headerName: 'Số calo',
    width: 150,
    // flex: 1,
    // renderCell: (params) => <p className="text-[#4285F4] font-medium">{params.row.unitName}</p>,
  },
  {
    field: 'unitName',
    headerName: 'Đơn vị',
    width: 150,
    // flex: 1,
    // renderCell: (params) => <p className="text-[#4285F4] font-medium">{params.row.unitName}</p>,
  },
  {
    field: 'status',
    headerName: 'Trạng thái',
    width: 150,
    // flex: 1,
    renderCell: (params) => (
      <div className={`cellWithStatus ${params.row.status}`}>
        {params.row.status === true ? (
          <p className="text-white px-3 rounded-full text-[14px] bg-green-500">AVAILABLE</p>
        ) : (
          <p className="text-white px-3 rounded-full text-[14px] bg-red-500">DELETED</p>
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
          <Tooltip title="Chỉnh sửa" placement="left">
            <IconButton onClick={() => props?.handleOpenEdit(params.row)} aria-label="edit">
              <img src={ic_edit} />
            </IconButton>
          </Tooltip>
          <Tooltip title={params.row.status == true ? 'Xóa' : 'Khôi phục'} placement="right">
            <IconButton onClick={() => props?.handleOpenDelete(params.row)} aria-label="remove">
              {params.row.status == true ? <img src={ic_delete_red} /> : <img src={ic_delete_green} />}
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];
  return (
    <div className="h-[75vh] bg-white">
      <DataGrid
        rows={props.ingredientsList}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        className="datagrid"
        getRowId={(row) => row.ingredientId}
        loading={!props?.ingredientsList.length}
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
