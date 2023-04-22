import { useState, useEffect } from 'react';
import ModalExpiredEvent from './components/ModalExpiredEvent';
import { Tooltip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { ic_edit } from '../../../../../../../../assets';
import { setContentBlog } from '../../../../../../../../redux/actionSlice/managementSlice';
const IsEvent = () => {
  const contentBlog = useSelector((state) => state.management.blogContent);
  const dispatch = useDispatch();

  const [isEvent, setIsEvent] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [expiredEventDate, setExpiredEventDate] = useState();

  useEffect(() => {
    if (contentBlog?.eventExpiredDate !== undefined) {
      setExpiredEventDate(contentBlog?.eventExpiredDate);
      setIsEvent(contentBlog?.isEvent);
    }
  }, [contentBlog?.eventExpiredDate]);

  const handleCheckIsEvent = () => {
    setIsEvent((prev) => !prev);
    setExpiredEventDate();
    setOpenModal(true);
    if (isEvent == true) {
      dispatch(setContentBlog({ isEvent: false }));
      dispatch(setContentBlog({ eventExpiredDate: null }));
    }
  };

  return (
    <div>
      {/* check box */}
      <div className="flex items-center">
        <input
          checked={isEvent}
          onChange={() => handleCheckIsEvent()}
          id="isEvent"
          type="checkbox"
          value=""
          className="w-4 h-4"
        />
        <label for="isEvent" className="ml-2 font-medium">
          Bài viết sự kiện{' '}
          <span className="text-gray-400 italic text-[14px]">(bài viết giới hạn thời gian đăng thành quả cá nhân)</span>
        </label>
      </div>
      {/* expired time */}
      {expiredEventDate !== undefined && isEvent && (
        <div className="mt-3 flex items-center gap-4">
          <p className="text-redError">
            Thời gian kết thúc sự kiện:{' '}
            <span>{new Date(new Date(expiredEventDate).setSeconds(0)).toLocaleString()}</span>
          </p>
          <Tooltip title="chỉnh sửa" placement="right">
            <button
              onClick={() => setOpenModal(true)}
              className="hover:bg-gray-300 text-white font-medium rounded-[5px] px-3 py-2 flex items-center gap-2"
            >
              <img alt="" src={ic_edit} />
            </button>
          </Tooltip>
        </div>
      )}

      {/* time select modal */}
      {isEvent && (
        <ModalExpiredEvent
          openModal={openModal}
          setOpenModal={setOpenModal}
          setIsEvent={setIsEvent}
          setExpiredEventDate={setExpiredEventDate}
        />
      )}
    </div>
  );
};

export default IsEvent;
