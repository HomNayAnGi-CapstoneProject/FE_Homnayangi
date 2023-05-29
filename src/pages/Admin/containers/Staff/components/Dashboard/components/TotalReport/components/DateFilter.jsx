import { useState, useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';

import { useDispatch, useSelector } from 'react-redux';
import {
  setReportFilterMonth,
  setReportFilterYear,
  setReportFilterDateFrom,
  setReportFilterDateTo,
  setReportTypee,
} from '../../../../../../../../../redux/actionSlice/managementSlice';

const DateFilter = (props) => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.management);

  const { setReportType, setOpenFilterDate } = props;

  const [fromDate, setFromDate] = useState(store.reportFilterDateFrom ? dayjs(store.reportFilterDateFrom) : undefined);
  const [fromDateError, setFromDateError] = useState();
  const [toDate, setToDate] = useState(store.reportFilterDateTo ? dayjs(store.reportFilterDateTo) : undefined);
  const [toDateError, setToDateError] = useState();
  const [error, setError] = useState();

  // ** handle select isEvent
  const handleSelectTime = () => {
    if (fromDate !== undefined && toDate !== undefined) {
      // console.log(dayjs(date).format());
      let fromTime = new Date(fromDate).getTime();
      let toTime = new Date(toDate).getTime();
      if (fromTime >= toTime) {
        setError('Ngày bắt đầu không được dài hơn ngày kết thúc');
      } else {
        setError();
        setFromDateError();
        setToDateError();
        dispatch(setReportFilterDateFrom(dayjs(fromDate).format()));
        dispatch(setReportFilterDateTo(dayjs(toDate).format()));
        setOpenFilterDate(false);
        setReportType(3);
        dispatch(setReportTypee(3));
      }
    } else {
      if (fromDate == undefined) {
        setFromDateError('Vui lòng chọn ngày bắt đầu');
      }
      if (toDate == undefined) {
        setToDateError('Vui lòng chọn ngày kết thúc');
      }
    }
  };

  return (
    <div className="p-3">
      {/* body */}
      <div className="mt-5">
        <p className="mb-2">Từ</p>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            // onError={(newError, value) => setError(newError)}
            // slotProps={{
            //   textField: {
            //     helperText: errorMessage,
            //   },
            // }}
            value={fromDate}
            // minDateTime={today}
            onChange={(event, value) => {
              setFromDate(event);
            }}
            // label="Chọn thời gian hiệu lực"
            sx={{ width: '100%' }}
          />
        </LocalizationProvider>
        {fromDateError !== undefined && <p className="text-redError">{fromDateError}</p>}

        <p className="my-2">Đến</p>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            // onError={(newError, value) => setError(newError)}
            // slotProps={{
            //   textField: {
            //     helperText: errorMessage,
            //   },
            // }}
            value={toDate}
            // minDateTime={today}
            onChange={(event, value) => {
              setToDate(event);
            }}
            // label="Chọn thời gian hiệu lực"
            sx={{ width: '100%' }}
          />
        </LocalizationProvider>
        {toDateError !== undefined && <p className="text-redError">{toDateError}</p>}

        {error !== undefined && <p className="text-redError">{error}</p>}
      </div>
      <button
        onClick={() => handleSelectTime()}
        className="mt-5 py-2 px-3 text-white bg-primary rounded font-medium w-full"
      >
        Xác nhận
      </button>
    </div>
  );
};

export default DateFilter;
