import { useState } from 'react';

import { Modal } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';

const ModalFilterOrderDate = (props) => {
  const { openFilterDate, setOpenFilterDate, setFilterFromDate, setFilterToDate, filterFromDate, filterToDate } = props;
  const today = dayjs();
  // const [date, setDate] = useState(current.currentCart?.length > 0 ? dayjs(current.currentUser.shippedDate) : today);
  const [fromDate, setFromDate] = useState(filterFromDate ? dayjs(filterFromDate) : undefined);
  const [fromDateError, setFromDateError] = useState();
  const [toDate, setToDate] = useState(filterToDate ? dayjs(filterToDate) : undefined);
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
        setFilterFromDate(dayjs(fromDate).format());
        setFilterToDate(dayjs(toDate).format());
        setOpenFilterDate(false);
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
    <Modal open={openFilterDate} onClose={() => setOpenFilterDate(false)}>
      <div
        className="fixed left-[50%]
      top-[50%] translate-y-[-50%] translate-x-[-50%] bg-white rounded-[5px] sm:w-fit w-full"
      >
        <div className="px-7 py-6">
          {/* header */}
          <div className="pb-2 mb-5 border-b border-[#b7b7b7]">
            <p className="text-[18px] font-medium">Lọc đơn hàng theo khoảng thời gian</p>
          </div>
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
          {/* buttons */}
          <div className="mt-5 flex gap-3">
            <button
              onClick={() => handleSelectTime()}
              className="w-full bg-primary text-white font-medium uppercase py-3 rounded-[5px]"
            >
              Xác nhận
            </button>
            <button
              onClick={() => {
                setOpenFilterDate(false);
                setFilterFromDate();
                setFilterToDate();
                // setIsEvent(false);
              }}
              className="w-full bg-gray-500 text-white font-medium uppercase py-3 rounded-[5px]"
            >
              Hủy bỏ
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalFilterOrderDate;
