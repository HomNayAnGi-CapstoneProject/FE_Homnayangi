import React from 'react';
import Loading from '../../../../../../../share/components/Admin/Loading';
import NoRowOverlay from '../../../../../../../share/components/Admin/NoRowOverlay';
import { ic_edit, ic_delete_red, ic_delete_green } from '../../../../../../../assets';
import Image from '../../../../../../../share/components/Image';

import { DataGrid } from '@mui/x-data-grid';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import moment from 'moment/moment';

const columns = [
  // {
  //   field: 'imageUrl',
  //   headerName: 'Ảnh mô tả',
  //   width: 100,
  //   renderCell: (params) => (
  //     <Image className="rounded-[5px] h-[40px] w-[60px] object-contain" src={params.row.imageUrl} />
  //   ),
  // },
  {
    field: 'calo',
    headerName: 'Tổng calo',
    width: 250,
    renderCell: (params) => (
      <div className="">
        <Tooltip title={`${params.row.calo}`} placement="top">
          <p className="">{params.row.calo}</p>
        </Tooltip>
      </div>
    ),
  },
  {
    field: 'fromAge',
    headerName: 'Độ tuổi từ',
    width: 150,
  },
  {
    field: 'toAge',
    headerName: 'Đến độ tuổi',
    width: 150,
    // renderCell: (params) => moment(params.row.createdDate).format('Do MMM YY'),
  },
  {
    field: 'isMale',
    headerName: 'Giới tính',
    width: 150,
    // flex: 1,
    renderCell: (params) => <p className="text-[#4285F4] font-medium">{params.row.isMale == true ? 'Nam' : 'Nữ'}</p>,
  },
  // {
  //   field: 'status',
  //   headerName: 'Trạng thái',
  //   width: 150,
  //   // flex: 1,
  //   renderCell: (params) => (
  //     <div className={`cellWithStatus ${params.row.status}`}>
  //       {/* {checkStatus(params.row.status)} */}
  //       {params.row.status === 1 ? (
  //         <p className="text-white px-3 rounded-full text-[14px] bg-green-500">HOẠT ĐỘNG</p>
  //       ) : (
  //         <p className="text-white px-3 rounded-full text-[14px] bg-red-500">ĐÃ XÓA</p>
  //       )}
  //     </div>
  //   ),
  // },
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
          <Tooltip title={'Xóa'} placement="right">
            <IconButton onClick={() => props?.handleOpenDelete(params.row)} aria-label="remove">
              {<img src={ic_delete_red} />}
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];
  return (
    <div className="h-[75vh] bg-white">
      <DataGrid
        rows={props.calorefList}
        columns={columns.concat(actionColumn)}
        pageSize={12}
        rowsPerPageOptions={[12]}
        className="datagrid"
        getRowId={(row) => row.caloReferenceId}
        loading={props?.loading}
        components={{
          LoadingOverlay: Loading,
          NoRowsOverlay: NoRowOverlay,
        }}
        // loading={!rows.length}
        // components={{
        //   LoadingOverlay: Loading,
        // }}
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
