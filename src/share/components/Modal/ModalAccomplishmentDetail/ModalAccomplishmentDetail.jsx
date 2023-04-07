import { useState, useEffect } from 'react';
import instances from '../../../../utils/plugin/axios';

import { Modal } from '@mui/material';
import { toast } from 'react-toastify';
import moment from 'moment/moment';

import default_user from '../../../../assets/images/default_user.png';

const ModalAccomplishmentDetail = (props) => {
  const { openDetailModal, setOpenDetailModal, data, setUpdateTable } = props;
  const successNotify = (type) =>
    toast.success(type == 'APPROVE' ? 'Bạn đã duyệt thành tựu này 👌' : 'Bạn đã không duyệt thành tựu này');
  const errorNotify = () => toast.error('Có lỗi xảy ra');

  const [detailData, setDetailData] = useState();

  // ** get accomplishment detail data **
  useEffect(() => {
    // console.log(data);
    const fetch = async () => {
      const res = await instances.get(`/accomplishments/${data?.accomplishmentId}`);
      // console.log(res.data);
      setDetailData(res.data.result);
    };
    fetch();
  }, []);

  // ** handle approve reject
  const handleApproveReject = async (type) => {
    const res = await instances.put(`/accomplishments/approve-reject`, {
      type: type,
      accomplishmentId: data?.accomplishmentId,
    });
    if (res.data.status !== 'failed') {
      successNotify(type);
      setOpenDetailModal(false);
      setUpdateTable((prev) => !prev);
    } else {
      errorNotify();
      setOpenDetailModal(false);
      setUpdateTable((prev) => !prev);
    }
  };

  return (
    <Modal open={openDetailModal} onClose={() => setOpenDetailModal(false)}>
      <div
        className="fixed left-[50%]
      top-[50%] translate-y-[-50%] translate-x-[-50%] sm:w-fit w-full bg-white rounded-[3px] px-3 py-4"
      >
        {detailData && (
          <div className="font-inter">
            {/* header */}
            <div className="pb-2 border-b border-[#b7b7b7]">
              <p className="text-[18px] font-medium">Thông tin thành tựu</p>
            </div>
            {/* content */}
            <div className="mt-5">
              {/* user avatar */}
              <div className="flex gap-5">
                <img
                  alt=""
                  className="rounded-full w-[40px] h-[40px] object-cover"
                  src={detailData?.avatar || default_user}
                />
                <div className="w-full">
                  <div className="flex items-center gap-2">
                    <p className="text-black font-semibold">{detailData?.authorFullName}</p>
                    <p className="text-[#A9A8A8] text-[14px]">{moment(detailData?.createdDate).calendar()}</p>
                  </div>
                  {/* content */}
                  <div className="w-[350px] mt-2">
                    <textarea
                      value={detailData?.content}
                      disabled={true}
                      rows="1"
                      // className="rounded-[5px] border border-[#C5C5C5] px-3 py-2 w-full"
                      className={`p-2.5 w-full text-gray-900 bg-white rounded border border-gray-400 `}
                    ></textarea>
                  </div>
                  {/* preview images */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {detailData?.listImage &&
                      detailData?.listImage.map((item, i) => (
                        <img
                          key={i}
                          className="w-[80px] h-[80px] object-cover rounded"
                          src={item}
                          alt="default-img_list"
                        />
                      ))}
                  </div>
                  {/* preview videos */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {detailData?.listVideo &&
                      detailData?.listVideo.map((item, i) => (
                        <video
                          controls
                          key={i}
                          className="w-[220px] h-[120px] object-cover rounded"
                          src={item}
                          alt="default-img_list"
                        />
                      ))}
                  </div>
                </div>
              </div>
            </div>
            {/* buttons */}
            {data?.status == 3 && (
              <div className="flex mt-5 gap-3">
                <button
                  onClick={() => handleApproveReject('APPROVE')}
                  className="text-white w-full font-medium px-5 py-2 bg-primary rounded-[5px]"
                >
                  Phê duyệt
                </button>
                <button
                  onClick={() => handleApproveReject('REJECT')}
                  className="text-white w-full font-medium px-5 py-2 bg-[#cfcfcf] rounded-[5px]"
                >
                  Từ chối
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ModalAccomplishmentDetail;
