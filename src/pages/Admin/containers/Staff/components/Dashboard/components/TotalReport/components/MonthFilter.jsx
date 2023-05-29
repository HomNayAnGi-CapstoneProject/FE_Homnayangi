import { useState, useEffect } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { useDispatch, useSelector } from 'react-redux';
import {
  setReportFilterMonth,
  setReportFilterYear,
  setReportTypee,
} from '../../../../../../../../../redux/actionSlice/managementSlice';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const months = [
  { id: 'm1', name: 'Tháng 1', value: 1 },
  { id: 'm2', name: 'Tháng 2', value: 2 },
  { id: 'm3', name: 'Tháng 3', value: 3 },
  { id: 'm4', name: 'Tháng 4', value: 4 },
  { id: 'm5', name: 'Tháng 5', value: 5 },
  { id: 'm6', name: 'Tháng 6', value: 6 },
  { id: 'm7', name: 'Tháng 7', value: 7 },
  { id: 'm8', name: 'Tháng 8', value: 8 },
  { id: 'm9', name: 'Tháng 9', value: 9 },
  { id: 'm10', name: 'Tháng 10', value: 10 },
  { id: 'm11', name: 'Tháng 11', value: 11 },
  { id: 'm12', name: 'Tháng 12', value: 12 },
];

const MonthFilter = (props) => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.management);
  const { setReportType, setOpenFilterDate } = props;
  const [activeMonth, setActiveMonth] = useState('');
  const [activeYear, setActiveYear] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [errMsgYear, setErrMsgYear] = useState('');

  const handleChange = (e) => {
    setActiveMonth(e.target.value);
  };

  const handleChangeYear = (e) => {
    setActiveYear(e.target.value);
  };

  // ** get edit data
  useEffect(() => {
    setActiveMonth(store.reportFilterMonth);
  }, [store.reportFilterMonth]);

  useEffect(() => {
    setActiveYear(store.reportFilterYear);
  }, [store.reportFilterYear]);

  const handleConfirm = () => {
    if (activeMonth !== '' && activeYear !== '') {
      dispatch(setReportFilterMonth(activeMonth));
      dispatch(setReportFilterYear(activeYear));
      setReportType(1);
      dispatch(setReportTypee(1));
      setOpenFilterDate(false);
    } else {
      if (activeMonth == '') {
        setErrMsg('Vui lòng chọn tháng');
      }
      if (activeYear == '') {
        setErrMsgYear('Vui lòng điền đầy đủ thông tin');
      }
    }
  };

  return (
    <div className="mt-5 p-3">
      <label className="font-medium">Tháng</label>
      <Select
        MenuProps={MenuProps}
        value={activeMonth}
        onChange={handleChange}
        displayEmpty
        renderValue={activeMonth !== '' ? undefined : () => <p className="text-[#898989]">Chọn tháng</p>}
        inputProps={
          {
            // ...register('districts', { required: true }),
          }
        }
        className={`block w-full mt-2 mb-4 h-[47px] p-[12px] text-subText sm:text-md  border rounded-[5px] focus:outline-primary`}
      >
        {months?.length > 0 ? (
          months.map((item, i) => (
            <MenuItem key={crypto.randomUUID()} value={item.value}>
              {item.name}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>
            <em>Chưa có dữ liệu</em>
          </MenuItem>
        )}
      </Select>
      {errMsg && <p className="text-redError font-medium my-2">{errMsg}</p>}

      <label className="font-medium">Năm</label>
      <input
        value={activeYear}
        onChange={(e) => handleChangeYear(e)}
        name="name"
        className={`block mt-2 w-full h-[47px]  p-[12px] text-subText sm:text-md  border border-[#B9B9B9] rounded-[5px] focus:outline-primary`}
      />
      {errMsgYear && <p className="text-redError font-medium my-2">{errMsgYear}</p>}
      <button
        onClick={() => handleConfirm()}
        className="mt-5 py-2 px-3 text-white bg-primary rounded font-medium w-full"
      >
        Xác nhận
      </button>
    </div>
  );
};

export default MonthFilter;
