import { useState, useEffect } from 'react';
import instances from '../../../../../../../../utils/plugin/axios';
import { ic_voucher_bold } from '../../../../../../../../assets';

import Accom from './components/Accom';
import ModalEventVoucher from '../../../../../../../../share/components/Modal/ModalEventVoucher/ModalEventVoucher';

import { useParams } from 'react-router-dom';

const GiveEventVoucher = () => {
  const params = useParams();
  const [top3AccomList, setTop3AccomList] = useState([]);
  const [blogData, setBlogData] = useState();
  const [openModalGiveVoucher, setOpenModalGiveVoucher] = useState(false);
  const [accomData, setAccomData] = useState();

  // ** check if this blog is event -> if not go back to previous page
  useEffect(() => {
    if (params.eventId) {
      const fetch = async () => {
        const res = await instances.get(`/blogs/staff-preview/${params.eventId}`);
        if (res.data?.isEvent == false) {
          history.back();
        } else {
          setBlogData(res.data);
          // ** if is event then get top3 accomplishment
          const top3Accom = await instances.get(`/accomplishments/top3/${params.eventId}`);
          setTop3AccomList(top3Accom.data.result);
        }
      };

      fetch();
    } else {
      history.back();
    }
  }, []);

  const handleOpenModalEvent = (data) => {
    setAccomData(data);
    setOpenModalGiveVoucher(true);
  };

  return (
    <div>
      {openModalGiveVoucher && (
        <ModalEventVoucher
          accomData={accomData}
          openModalGiveVoucher={openModalGiveVoucher}
          setOpenModalGiveVoucher={setOpenModalGiveVoucher}
        />
      )}
      <p className="text-[20px] font-semibold text-[#585858]">Trao tặng mã giảm giá</p>
      <div className="bg-white p-5 rounded-[5px] mt-5">
        <p className="text-[18px] font-semibold text-[#585858]">
          Danh sách 3 thành quả có tương tác cao nhất sự kiện <span className="text-primary">{blogData?.title}</span>:
        </p>
        {/* top 3 accom list */}
        <div className="mt-5">
          {top3AccomList?.length > 0 ? (
            top3AccomList?.map((item) => (
              <div key={item.accomplishmentId} className="mt-2 first:mb-0 flex">
                <Accom data={item} handleOpenModalEvent={handleOpenModalEvent} />
              </div>
            ))
          ) : (
            <div>
              <p>Chưa có thành tựu nào được đăng...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GiveEventVoucher;
