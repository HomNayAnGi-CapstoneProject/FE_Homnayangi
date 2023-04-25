import React from 'react';
import Loading from '../../../../../../../share/components/Admin/Loading';
import { ic_edit, ic_delete_red, ic_delete_green } from '../../../../../../../assets';
import Image from '../../../../../../../share/components/Image';

import { DataGrid } from '@mui/x-data-grid';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import moment from 'moment/moment';

const columns = [
  {
    field: 'authorName',
    headerName: 'Người tạo',
    width: 150,
    renderCell: (params) => (
      <div className="">
        <Tooltip title={`${params.row.authorName}`} placement="top">
          <p className="">{params.row.authorName}</p>
        </Tooltip>
      </div>
    ),
  },
  {
    field: 'name',
    headerName: 'Tên mã giảm giá',
    width: 150,
    renderCell: (params) => (
      <div className="">
        <Tooltip title={`${params.row.name}`} placement="top">
          <p className="">{params.row.name}</p>
        </Tooltip>
      </div>
    ),
  },
  // {
  //   field: 'description',
  //   headerName: 'Mô tả',
  //   width: 150,
  //   renderCell: (params) => (
  //     <div className="">
  //       <Tooltip title={`${params.row.description}`} placement="top">
  //         <p className="">{params.row.description}</p>
  //       </Tooltip>
  //     </div>
  //   ),
  // },
  {
    field: 'discount',
    headerName: 'Giảm giá',
    renderCell: (params) => (
      <p className="text-red-500">
        {params.row.discount <= 1
          ? `${params.row.discount * 100}%`
          : `${Intl.NumberFormat().format(params.row.discount)}đ`}
      </p>
    ),
  },
  {
    field: 'minimumOrderPrice',
    headerName: 'Giá trị đơn hàng tối thiểu',
    width: 200,
    renderCell: (params) => (
      <p className="text-blue-500">{Intl.NumberFormat().format(params.row.minimumOrderPrice)}đ</p>
    ),
  },
  {
    field: 'maximumOrderPrice',
    headerName: 'Giá trị đơn hàng tối đa',
    width: 200,

    renderCell: (params) => (
      <p className="text-orange-500">{Intl.NumberFormat().format(params.row.maximumOrderPrice)}đ</p>
    ),
  },
  {
    field: 'validFrom',
    headerName: 'Hiệu lực',
    width: 150,
    renderCell: (params) => moment(params.row.validFrom).format('Do MMM YY'),
  },
  {
    field: 'validTo',
    headerName: 'Hết hạn',
    width: 150,
    renderCell: (params) => moment(params.row.validTo).format('Do MMM YY'),
  },
  {
    field: 'createdDate',
    headerName: 'Ngày tạo',
    width: 150,
    renderCell: (params) => moment(params.row.createdDate).format('Do MMM YY'),
  },
  // {
  //   field: 'view',
  //   headerName: 'Lượt xem',
  //   width: 150,
  //   // flex: 1,
  //   renderCell: (params) => <p className="text-[#4285F4] font-medium">{params.row.view}</p>,
  // },
  {
    field: 'status',
    headerName: 'Trạng thái',
    width: 150,
    // flex: 1,
    renderCell: (params) => (
      <div className={`cellWithStatus ${params.row.status}`}>
        {/* {checkStatus(params.row.status)} */}
        {params.row.status === 1 ? (
          <p className="text-white px-3 rounded-full text-[14px] bg-green-500">HOẠT ĐỘNG</p>
        ) : (
          <p className="text-white px-3 rounded-full text-[14px] bg-red-500">ĐÃ XÓA</p>
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
          {params.row.status == 1 && (
            <Tooltip title="Chỉnh sửa" placement="left">
              <IconButton onClick={() => props?.handleOpenEdit(params.row)} aria-label="edit">
                <img src={ic_edit} />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title={params.row.status == 1 ? 'Xóa' : 'Khôi phục'} placement="right">
            <IconButton onClick={() => props?.handleOpenDelete(params.row)} aria-label="remove">
              {params.row.status == 1 ? <img src={ic_delete_red} /> : <img src={ic_delete_green} />}
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];
  return (
    <div className="h-[75vh] bg-white">
      <DataGrid
        rows={props.voucherList}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        className="datagrid"
        getRowId={(row) => row.voucherId}
        loading={!props?.voucherList?.length}
        components={{
          LoadingOverlay: Loading,
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
