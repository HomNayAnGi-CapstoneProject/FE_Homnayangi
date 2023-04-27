import { useEffect, useState } from 'react';
import instances from '../../utils/plugin/axios';
import styles from '../../style';
import jwt_decode from 'jwt-decode';

import NotifyItem from './components/NotifyItem';

const Notifications = ({ title }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  const accessToken = localStorage.getItem('accessToken');
  let decoded_jwt = {};
  if (accessToken) {
    decoded_jwt = jwt_decode(accessToken);
  }

  const [notifyList, setNofityList] = useState([]);

  useEffect(() => {
    if (accessToken) {
      const fetch = async () => {
        const res = await instances.get(`/notifications/receivers/${decoded_jwt.Id}`);
        setNofityList(res.data.result);
      };

      fetch();
    } else {
    }
  }, []);

  return (
    <div className={`${styles.flexCenter} py-16`}>
      <div className={`${styles.container} flex justify-center`}>
        <div className="sm:w-[700px] w-full bg-white p-3 rounded-[5px] font-inter">
          {/* title */}
          <p className="text-[20px] text-black font-semibold">Thông báo</p>
          {/* body */}
          <div className="mt-5">
            {notifyList?.length > 0 ? (
              notifyList?.map((item) => (
                <div key={item?.notificationId} className="border-t border-dashed first:border-t-0">
                  <NotifyItem
                    item={item}
                    isCustomer={true}
                    // setOpenNotification={setOpenNotification}
                  />
                </div>
              ))
            ) : accessToken ? (
              <div className="px-[15px] py-2 text-center">Bạn chưa có thông báo nào!</div>
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
    </div>
  );
};

export default Notifications;
