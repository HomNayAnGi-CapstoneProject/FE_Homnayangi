import { useState, useEffect } from 'react';
import { setShowModalCart } from '../../../../redux/actionSlice/shoppingCartSlice';
import instances from '../../../../utils/plugin/axios';

// ** components
import NotifyItem from './components/NotifyItem';

//** Third party components*/
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';

const ModalNotification = (props) => {
  const { isCustomer, setOpenNotification } = props;
  const accessToken = localStorage.getItem('accessToken');
  let decoded_jwt = {};
  if (accessToken) {
    decoded_jwt = jwt_decode(accessToken);
  }
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [notify, setNotify] = useState(0);
  const [notifyList, setNofityList] = useState([]);

  // ** check isCustomer or not to get noti list
  useEffect(() => {
    if (accessToken) {
      if (isCustomer == false) {
        if (decoded_jwt?.role == 'Staff') {
          const fetch = async () => {
            const res = await instances.get('/notifications/staff');
            setNofityList(res.data.result);
          };

          fetch();
        }
        if (decoded_jwt?.role == 'Manager') {
          const fetch = async () => {
            const res = await instances.get('/notifications/manager');
            setNofityList(res.data.result);
          };

          fetch();
        }
      } else {
        const fetch = async () => {
          const res = await instances.get(`/notifications/receivers/${decoded_jwt.Id}`);
          setNofityList(res.data.result);
        };

        fetch();
      }
    }
  }, [isCustomer]);

  return (
    <div
      className="font-maven max-w-[300px] w-[300px] absolute z-40 bg-white rounded-[5px]
overflow-hidden top-[35px] border shadow-md text-black left-[-600%] py-[15px]"
    >
      <div>
        <div className=" border-solid border-b-[1px] pb-2 px-[15px] flex items-center justify-between">
          <p className="text-[16px] font-semibold uppercase ">Thông báo</p>
          {accessToken && (
            <p onClick={() => navigate('/notifications')} className="text-primary cursor-pointer text-[15px]">
              Xem tất cả
            </p>
          )}
        </div>
        <div className="max-h-[290px] scroll-bar overflow-x-hidden overflow-y-scroll">
          {notifyList?.length > 0 ? (
            notifyList?.map((item) => (
              <div key={item?.notificationId} className="border-t border-dashed first:border-t-0">
                <NotifyItem item={item} isCustomer={isCustomer} setOpenNotification={setOpenNotification} />
              </div>
            ))
          ) : accessToken ? (
            <div className="px-[15px] py-2">Bạn chưa có thông báo nào!</div>
          ) : (
            <div className="px-[15px] py-2">
              Đăng nhập để xem thông báo
              <button
                onClick={() => navigate('/login')}
                className="w-full py-2 text-white font-medium uppercase rounded-[5px] bg-primary mt-2"
              >
                Đăng nhập
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalNotification;
