import React, { useState, useEffect } from 'react';
import Loading from '../../../../../../../share/components/Admin/Loading';
import {
  ic_edit,
  ic_delete_red,
  ic_delete_green,
  ic_caret_gray,
  ic_caret_gray_right,
  ic_caret_gray_down,
} from '../../../../../../../assets';

// import { DataGrid } from '@mui/x-data-grid';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import moment from 'moment/moment';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const DataTable = (props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(9);
  const [openCollapse, setOpenCollapse] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const columns = [
    {
      id: 'ID',
      label: '',
      width: 10,
      format: (value) => (
        <div className="flex gap-2 items-center h-[20px]">
          <Tooltip title="Danh mục phụ" placement="left">
            <IconButton onClick={() => setOpenCollapse(openCollapse === value ? -1 : value)}>
              <img className={``} src={openCollapse === value ? ic_caret_gray_down : ic_caret_gray_right} />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
    {
      id: 'name',
      label: 'Tên danh mục',
      width: 150,
      fontWeight: 700,
      format: (value) => <p className="line-clamp-1">{value}</p>,
    },
    {
      id: 'description',
      label: 'Mô tả',
      width: 250,
      fontWeight: 700,
      format: (value) => <p className="line-clamp-1">{value}</p>,
    },
    {
      id: 'createdDate',
      label: 'Ngày tạo',
      width: 150,
      fontWeight: 700,
      // align: 'right',
      format: (value) => moment(value).format('Do MMM YY'),
    },
    {
      id: 'status',
      label: 'Trạng thái',
      width: 150,
      flex: 1,
      fontWeight: 700,
      format: (value) => (
        <div className={`cellWithStatus ${value}`}>
          {value == true ? (
            <p className="text-white w-fit px-3 rounded-full text-[14px] bg-green-500">HOẠT ĐỘNG</p>
          ) : (
            <p className="text-white w-fit px-3 rounded-full text-[14px] bg-red-500">ĐÃ XÓA</p>
          )}
        </div>
      ),
    },
    {
      id: 'action',
      label: 'Hành động',
      width: 100,
      fontWeight: 700,
      format: (value) => (
        <div className="h-[20px] flex items-center ">
          <Tooltip title="Chỉnh sửa" placement="left">
            <IconButton onClick={() => props?.handleOpenEdit(value)} aria-label="edit">
              <img src={ic_edit} />
            </IconButton>
          </Tooltip>
          <Tooltip title={value.status == true ? 'Xóa' : 'Khôi phục'} placement="right">
            <IconButton onClick={() => props?.handleOpenDelete(value)} aria-label="remove">
              {value.status == true ? <img src={ic_delete_red} /> : <img src={ic_delete_green} />}
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];
  const subColumns = [
    { width: 35 },
    {
      id: 'name',
      label: 'Tên danh mục phụ',
      width: 150,
      fontWeight: 700,
      format: (value) => <p className="line-clamp-1">{value}</p>,
    },
    {
      id: 'description',
      label: 'Mô tả',
      width: 250,
      fontWeight: 700,
      format: (value) => <p className="line-clamp-1">{value}</p>,
    },
    {
      id: 'createdDate',
      label: 'Ngày tạo',
      width: 150,
      fontWeight: 700,
      // align: 'right',
      format: (value) => moment(value).format('Do MMM YY'),
    },
    {
      id: 'status',
      label: 'Trạng thái',
      width: 150,
      flex: 1,
      fontWeight: 700,
      format: (value) => (
        <div className={`cellWithStatus ${value}`}>
          {value == true ? (
            <p className="text-white w-fit px-3 rounded-full text-[14px] bg-green-500">HOẠT ĐỘNG</p>
          ) : (
            <p className="text-white w-fit px-3 rounded-full text-[14px] bg-red-500">ĐÃ XÓA</p>
          )}
        </div>
      ),
    },
    {
      id: 'action',
      label: 'Hành động',
      width: 100,
      fontWeight: 700,
      format: (value) => (
        <div className="h-[20px] flex items-center ">
          {value.status == true && (
            <Tooltip title="Chỉnh sửa" placement="left">
              <IconButton onClick={() => props?.handleOpenEdit(value)} aria-label="edit">
                <img src={ic_edit} />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title={value.status == true ? 'Xóa' : 'Khôi phục'} placement="right">
            <IconButton onClick={() => props?.handleOpenDelete(value)} aria-label="remove">
              {value.status == true ? <img src={ic_delete_red} /> : <img src={ic_delete_green} />}
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];
  return (
    <div className="h-[67vh] bg-white">
      <TableContainer sx={{ height: '100%' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column, i) => (
                <TableCell
                  key={i}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    fontWeight: column.fontWeight,
                    width: column.width,
                    flex: column.flex,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.categoryList.length > 0 ? (
              // ** thêm key action vào mảng để có data khi render cột action
              props.categoryList
                .map((item) => ({ ...item, action: item, ID: item.categoryId }))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <React.Fragment key={row.categoryId}>
                      <TableRow hover tabIndex={-1}>
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format ? column.format(value) : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={6} sx={{ padding: 0, border: 0 }}>
                          <Collapse in={openCollapse === row.categoryId} timeout="auto" unmountOnExit>
                            <div className="w-full bg-[#f3f3f3] min-h-[36px] px-5 py-3">
                              <Table size="small" aria-label="sub-cate">
                                <TableHead>
                                  <TableRow>
                                    {subColumns.map((column, i) => (
                                      <TableCell
                                        key={i}
                                        align={column.align}
                                        style={{
                                          minWidth: column.minWidth,
                                          fontWeight: column.fontWeight,
                                          width: column.width,
                                          flex: column.flex,
                                        }}
                                      >
                                        {column.label}
                                      </TableCell>
                                    ))}
                                    {/* <TableCell>Date</TableCell>
                                    <TableCell>Customer</TableCell>
                                    <TableCell align="right">Amount</TableCell>
                                    <TableCell align="right">Total price ($)</TableCell> */}
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {row?.subCategories.length > 0 ? (
                                    row?.subCategories
                                      .map((item) => ({ ...item, action: item, ID: item.categoryId }))
                                      .map((subCate) => (
                                        <TableRow hover tabIndex={-1}>
                                          {subColumns.map((column) => {
                                            const value = subCate[column.id];
                                            return (
                                              <TableCell key={column.id} align={column.align}>
                                                {column.format ? column.format(value) : value}
                                              </TableCell>
                                            );
                                          })}
                                        </TableRow>
                                        // <TableRow key={subCate.date}>

                                        //   {/* <TableCell component="th" scope="row">
                                        //     {subCate.date}
                                        //   </TableCell>
                                        //   <TableCell>{subCate.customerId}</TableCell>
                                        //   <TableCell align="right">{subCate.amount}</TableCell>
                                        //   <TableCell align="right">
                                        //     {Math.round(subCate.amount * row.price * 100) / 100}
                                        //   </TableCell> */}
                                        // </TableRow>
                                      ))
                                  ) : (
                                    <div className="flex items-center w-full">
                                      <Loading />
                                    </div>
                                  )}
                                </TableBody>
                              </Table>
                            </div>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
                  );
                })
            ) : (
              <React.Fragment>
                <div className="flex items-center justify-center w-[2400%]">
                  <Loading />
                </div>
              </React.Fragment>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        sx={{ background: '#fff' }}
        rowsPerPageOptions={[12]}
        component="div"
        count={props.categoryList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default DataTable;
