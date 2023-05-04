import { useState } from 'react';
import { Modal } from '@mui/material';

const ModalWarningDelete = (props) => {
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
    openModal,
    setOpenModal,
  } = props;
  const [confirmRiskDel, setConfirmDelRisk] = useState(false);

  return (
    <Modal open={openModal} onClose={() => setOpenModal(false)}>
      <div
        className="fixed left-[50%]
      top-[50%] translate-y-[-50%] translate-x-[-50%] sm:w-fit w-full bg-white rounded-[3px] px-3 py-4"
      >
        <div
          className={`sm:w-max w-full bg-white fixed z-[990] rounded-[5px] left-[50%]
            translate-x-[-50%] top-[50%] translate-y-[-50%]`}
        >
          <div className="font-inter p-5 w-max">
            <div className="text-redError pb-2 border-b border-gray-300 flex items-center gap-2">
              <p className="font-semibold text-[20px] ">Quản lý {modalTitle}</p>
              {/* <ArchiveOutlinedIcon /> */}
            </div>
            <div className="mt-5">
              <p className="mb-4 text-redError">
                Xác nhận {data?.status === statusTypeAvai || data?.status === statusTypeDraft ? 'ẩn' : 'phục hồi'}{' '}
                <span className="font-medium italic">{itemName}</span> ?
              </p>
            </div>

            {data?.status === statusTypeAvai && (
              <div className="w-[500px]">
                {confirmRiskDel == true && (
                  <p className="">
                    <span className="text-[20px] text-redError font-semibold">
                      ⛔ Ẩn nguyên liệu sẽ dẫn tới sai sót dữ liệu trong hệ thống! Bạn có muốn tiếp tục hành động này?
                      ⛔
                    </span>
                  </p>
                )}
                {confirmRiskDel == false && (
                  <button
                    onClick={() => setConfirmDelRisk(true)}
                    className="bg-redError px-4 py-2 text-center text-white rounded-[5px] w-full font-semibold mt-8"
                  >
                    Xác nhận ẩn
                  </button>
                )}
              </div>
            )}

            {data?.status === statusTypeAvai && confirmRiskDel == true && (
              <div
                onClick={() => handleConfirmDelete()}
                className="bg-redError px-4 py-2 text-center text-white rounded-[5px] cursor-pointer font-semibold mt-8"
              >
                Tiếp tục
              </div>
            )}

            {data?.status === statusTypeNotAvai && (
              <div
                onClick={() => handleConfirmRestore()}
                className="bg-green-500 px-4 py-2 text-center text-white rounded-[5px] cursor-pointer font-semibold mt-8"
              >
                Phục hồi
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalWarningDelete;
