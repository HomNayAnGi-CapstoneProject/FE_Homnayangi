import React from 'react';
import Loading from '../../../../../../../share/components/Admin/Loading';
import { ic_edit, ic_delete_red, ic_delete_green } from '../../../../../../../assets';
import Image from '../../../../../../../share/components/Image';

import { DataGrid } from '@mui/x-data-grid';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import moment from 'moment/moment';

const rows = [
  { unitId: 50121, name: '5KG', description: 'Moo tar', createDate: '2022-12-31T23:18:25.91', status: true },
];

const columns = [
  {
    field: 'targetObject',
    headerName: 'Thiết lập',
    width: 200,
    renderCell: (params) => (
      <p>{params.row.targetObject == 0 ? 'Thời gian trao huy hiệu' : 'Thời gian trao mã giảm giá'}</p>
    ),
  },
  {
    field: 'minute',
    headerName: 'Phút',
    width: 150,
    renderCell: (params) => <div className="">{params.row.minute || 0}</div>,
  },
  {
    field: 'hour',
    headerName: 'Giờ',
    width: 150,
    renderCell: (params) => <div className="">{params.row.hour || 0}</div>,
  },
  {
    field: 'day',
    headerName: 'Ngày',
    width: 150,
    renderCell: (params) => <div className="">{params.row.day || 0}</div>,
  },
  {
    field: 'createdDate',
    headerName: 'Ngày tạo',
    width: 150,
    renderCell: (params) => moment(params.row.createDate).format('Do MMM YY'),
  },
  {
    field: 'updatedDate',
    headerName: 'Ngày chỉnh sửa',
    width: 150,
    renderCell: (params) => moment(params.row.createDate).format('Do MMM YY'),
  },
  //   {
  //     field: 'status',
  //     headerName: 'Trạng thái',
  //     width: 150,
  //     // flex: 1,
  //     renderCell: (params) => (
  //       <div className={`cellWithStatus ${params.row.status}`}>
  //         {params.row.status == true ? (
  //           <p className="text-white px-3 rounded-full text-[14px] bg-green-500">AVAILABLE</p>
  //         ) : (
  //           <p className="text-white px-3 rounded-full text-[14px] bg-red-500">DELETED</p>
  //         )}
  //       </div>
  //     ),
  //   },
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
          <Tooltip title="Chỉnh sửa" placement="right">
            <IconButton onClick={() => props?.handleOpenEdit(params.row)} aria-label="edit">
              <img src={ic_edit} />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];
  return (
    <div className="h-[75vh] bg-white">
      <DataGrid
        rows={props.cronJobList}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        className="datagrid"
        getRowId={(row) => row.cronJobTimeConfigId}
        loading={!props?.cronJobList.length}
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
