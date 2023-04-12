import React from 'react';
import instances from '../../../utils/plugin/axios';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

const RoleConfirmModal = (props) => {
  const {
    setIsShowModal,
    modalTitle,
    data,
    statusTypeAvai,
    statusTypeNotAvai,
    itemName,
    handleConfirmDelete,
    handleConfirmRestore,
    statusTypeDraft,
    handleConfirmDeleteDraft,
    handleConfirmUpdate,
  } = props;

  //**  handle close modal  */
  const handleColseModal = () => {
    setIsShowModal(false);
  };
  return (
    <div>
      <div
        onClick={() => handleColseModal()}
        className="top-0 bottom-0 right-0 left-0 bg-[rgba(0,0,0,0.5)] fixed z-[900]"
      />
      <div
        className={`sm:w-max w-full bg-white fixed z-[990] rounded-[5px] left-[50%]
        translate-x-[-50%] top-[50%] translate-y-[-50%]`}
      >
        <div className="font-inter p-5 w-max">
          <div className={` pb-2 border-b border-gray-300 flex items-center gap-2`}>
            <p className="font-semibold text-[20px] ">Quản lý {modalTitle}</p>
            {/* <ArchiveOutlinedIcon /> */}
          </div>
          <div className="mt-5">
            <p className={`mb-4 ${data?.status === statusTypeAvai ? 'text-redError' : 'text-green-500'}`}>
              Xác nhận thay đổi chức vụ của <span className="font-medium italic">{itemName}</span> ? (
              {data?.status === statusTypeAvai ? 'Quản lý thành nhân viên' : 'Nhân viên thành quản lý'})
            </p>
          </div>

          {data?.status === statusTypeAvai && (
            <div
              onClick={() => handleConfirmUpdate('Staff')}
              className="bg-redError px-4 py-2 text-center text-white rounded-[5px] cursor-pointer font-semibold mt-8"
            >
              Xác nhận
            </div>
          )}

          {data?.status === statusTypeNotAvai && (
            <div
              onClick={() => handleConfirmUpdate('Manager')}
              className="bg-green-500 px-4 py-2 text-center text-white rounded-[5px] cursor-pointer font-semibold mt-8"
            >
              Xác nhận
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoleConfirmModal;
