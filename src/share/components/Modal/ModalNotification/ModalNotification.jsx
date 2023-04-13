import { useState } from 'react';
import { setShowModalCart } from '../../../../redux/actionSlice/shoppingCartSlice';

// ** components
import NotifyItem from './components/NotifyItem';

//** Third party components*/
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const ModalNotification = (props) => {
  const { decoded_jwt } = props;
  const dispatch = useDispatch();
  const [notify, setNotify] = useState(0);
  const [notifyList, setNofityList] = useState([]);

  return (
    <div
      className="font-maven max-w-[300px] w-[300px] absolute z-40 bg-white rounded-[5px]
overflow-hidden top-[35px] border shadow-md text-black left-[-600%] p-[15px]"
    >
      <div>
        <div className=" border-solid border-b-[1px] pb-2 flex items-center justify-between">
          <p className="text-[16px] font-semibold uppercase">Thông báo</p>
          {/* <p className="text-[16px]">{notify}</p> */}
        </div>
        <div className="max-h-[290px] scroll-bar overflow-x-hidden overflow-y-scroll py-[15px]">
          {notifyList?.length > 0 ? (
            notifyList?.map((item) => (
              <div key={item?.id + crypto.randomUUID()} className="border-t border-dashed first:border-t-0">
                <NotifyItem item={item} isCartModal={true} />
              </div>
            ))
          ) : (
            <div>Bạn chưa có thông báo nào!</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalNotification;
