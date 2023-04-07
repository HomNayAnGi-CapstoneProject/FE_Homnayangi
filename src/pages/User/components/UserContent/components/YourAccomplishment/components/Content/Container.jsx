import { useState, useEffect } from 'react';
import Item from './Item';
import Accomplishment from '../../../../../../../BlogDetail/components/CommentSection/components/Accomplishment';
import CustomModal from '../../../../../../../../share/components/Modal/CustomModal';

// ** assets
import noAccom from '../../../../../../../../assets/images/no_accom.png';

const Container = (props) => {
  const { status, accomsData, accessToken, setUpdateAccom } = props;
  const [accomList, setAccomList] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (accomsData.length > 0) {
      switch (status) {
        case 'all':
          setAccomList(accomsData.filter((item) => item.status == 1));
          break;
        case 'pending':
          setAccomList(accomsData.filter((item) => item.status == 3));
          break;
        case 'cancelled':
          setAccomList(accomsData.filter((item) => item.status == 2));
          break;
        default:
          setAccomList([]);
          break;
      }
    }
  }, [accomsData, status]);

  useEffect(() => {
    console.log(accomList);
  }, [accomList]);

  return (
    <>
      <CustomModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        title="Lỗi khi đăng thành quả"
        description="Thành quả không được trống!"
      />
      <div className="mt-4 w-full bg-white rounded-[5px] p-5">
        {accomList?.length > 0 ? (
          <div>
            <div className="max-h-[450px] scroll-bar overflow-y-scroll">
              {accomList?.map((item) => (
                <div
                  key={item.accomplishmentId}
                  className="border-t border-gray-400 border-dashed first:border-t-0 mt-2 first:mt-0 py-3"
                >
                  <Accomplishment
                    data={item}
                    setUpdateAccom={setUpdateAccom}
                    setOpenModal={setOpenModal}
                    accessToken={accessToken}
                    isFromYourAccom={true}
                  />
                  {/* <Item data={item} /> */}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[250px]">
            <img alt="no-order" className="object-cover w-[100px] h-[100px]" src={noAccom} />
            <p className="mt-5 text-[#898989]">Bạn chưa chia sẻ thành quả nào</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Container;
