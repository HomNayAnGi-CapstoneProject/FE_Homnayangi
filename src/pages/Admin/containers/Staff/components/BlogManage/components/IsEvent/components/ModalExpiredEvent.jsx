import { useState, useEffect } from 'react';

// ** Redux
import { useDispatch, useSelector } from 'react-redux';
import { setContentBlog } from '../../../../../../../../../redux/actionSlice/managementSlice';

// ** third party
import { Modal } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';

const ModalExpiredEvent = (props) => {
  const { openModal, setOpenModal, setIsEvent, setExpiredEventDate, listData } = props;
  const contentBlog = useSelector((state) => state.management.blogContent);

  const dispatch = useDispatch();
  const today = dayjs();
  // const [date, setDate] = useState(current.currentCart?.length > 0 ? dayjs(current.currentUser.shippedDate) : today);
  const [date, setDate] = useState();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (contentBlog?.eventExpiredDate !== undefined) {
      // console.log('ok');
      setDate(dayjs(contentBlog?.eventExpiredDate));
    }
  }, [contentBlog?.eventExpiredDate]);

  // ** handle select isEvent
  const handleSelectIsEvent = () => {
    if (date !== undefined) {
      // console.log(dayjs(date).format());
      dispatch(setContentBlog({ eventExpiredDate: dayjs(date).format() }));
      dispatch(setContentBlog({ isEvent: true }));
      setOpenModal(false);
      setError(false);
      setExpiredEventDate(dayjs(date).format());
    } else {
      setError(true);
    }
  };

  return (
    <Modal
      open={openModal}
      onClose={() => {
        setOpenModal(false);
        setIsEvent(false);
        dispatch(setContentBlog({ eventExpiredDate: null }));
        dispatch(setContentBlog({ isEvent: false }));
      }}
    >
      <div
        className="fixed left-[50%]
      top-[50%] translate-y-[-50%] translate-x-[-50%] bg-white rounded-[5px] sm:w-fit w-full"
      >
        <div className="px-7 py-6">
          {/* header */}
          <div className="pb-2 mb-5 border-b border-[#b7b7b7]">
            <p className="text-[18px] font-medium">Chọn thời gian kết thúc sự kiện</p>
          </div>
          {/* body */}
          <div>
            <div className="mt-3">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  // onError={(newError, value) => setError(newError)}
                  // slotProps={{
                  //   textField: {
                  //     helperText: errorMessage,
                  //   },
                  // }}
                  value={date}
                  minDateTime={today}
                  onChange={(event, value) => {
                    setDate(event);
                  }}
                  // label="Chọn thời gian hiệu lực"
                  sx={{ width: '100%' }}
                />
              </LocalizationProvider>
              {error && <p className="text-redError">Vui lòng chọn thời gian kết thúc</p>}

              {/* buttons */}
              <div className="mt-5 flex gap-3">
                <button
                  onClick={() => handleSelectIsEvent()}
                  className="w-full bg-primary text-white font-medium uppercase py-3 rounded-[5px]"
                >
                  Xác nhận
                </button>
                <button
                  onClick={() => {
                    setOpenModal(false);
                    setIsEvent(false);
                    dispatch(setContentBlog({ eventExpiredDate: null }));
                    dispatch(setContentBlog({ isEvent: false }));
                  }}
                  className="w-full bg-gray-500 text-white font-medium uppercase py-3 rounded-[5px]"
                >
                  Hủy bỏ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalExpiredEvent;
