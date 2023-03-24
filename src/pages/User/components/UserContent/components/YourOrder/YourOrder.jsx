import { useState, useEffect } from 'react';
import instances from '../../../../../../utils/plugin/axios';

// ** Redux
import { removeCartByStatus, getShoppingCart } from '../../../../../../redux/actionSlice/shoppingCartSlice';
import { useDispatch } from 'react-redux';

// ** third party
import jwt_decode from 'jwt-decode';
import { Navigate } from 'react-router-dom';
import { Modal } from '@mui/material';

// ** componetns
import TabList from './components/TabList';
import Container from './components/Content/Container';

const YourOrder = () => {
  //** const */
  const dispatch = useDispatch();
  const [status, setStatus] = useState('PENDING');
  const [openModal, setOpenModal] = useState(false);
  const [isComfirmOrder, setIsComfirmOrder] = useState(false);
  const [isCancel, setIsCancel] = useState();

  const accessToken = localStorage.getItem('accessToken');
  let decoded_jwt = {};
  if (accessToken) {
    decoded_jwt = jwt_decode(accessToken);
  }

  // ** check url if it is /user/orders or more
  useEffect(() => {
    let guid, cancel;
    // const urlParams = new URLSearchParams(new URL(window.location.href).search);
    let pathName = new URL(window.location.href).pathname;
    if (pathName.includes('guid')) {
      guid = pathName.split('=')[1].split('&')[0];
      cancel = pathName.split('=')[2] === 'true';
      setIsCancel(cancel);
      // call open accept/cancel modal
      if (isComfirmOrder == false) {
        setOpenModal(true);
      } else {
        const fetch = async () => {
          await instances.put(`/orders/${cancel ? 'cancel' : 'accept'}/${guid}`);
          const res = await instances.get('/orders');
          console.log(res.data);
          // if payment success (remove item from cart)
          if (!cancel) {
            dispatch(
              removeCartByStatus({
                cusId: decoded_jwt.Id,
                isCook: cancel,
              }),
            );
            dispatch(getShoppingCart());
          }
        };

        fetch();
      }
    } else {
      const fetch = async () => {
        const res = await instances.get('/orders');
        console.log(res.data);
      };

      fetch();
    }
  }, [isComfirmOrder]);

  if (accessToken) {
    if (Object.keys(decoded_jwt).length === 0 && decoded_jwt.constructor === Object) {
      return <Navigate replace to="/" />;
    } else {
      switch (decoded_jwt.role) {
        case 'Customer':
          return (
            <>
              <Modal
                open={openModal}
                onClose={() => {
                  setOpenModal(false);
                  setIsComfirmOrder(true);
                }}
              >
                <div
                  className="fixed left-[50%]
          top-[50%] translate-y-[-50%] translate-x-[-50%] bg-white rounded-[5px] sm:w-fit w-full"
                >
                  <div className="flex flex-col items-center justify-center px-7 py-6">
                    {isCancel && <p>Đơn hàng đã {isCancel == true ? 'được hủy' : 'được tạo'}</p>}
                    <button
                      onClick={() => {
                        setOpenModal(false);
                        setIsComfirmOrder(true);
                      }}
                      className="py-1 px-4 mt-4 bg-primary rounded-[5px] text-white font-medium uppercase"
                    >
                      Xác nhận
                    </button>
                  </div>
                </div>
              </Modal>
              <div className="font-inter">
                <TabList setStatus={setStatus} status={status} />
                <Container status={status} />
              </div>
            </>
          );
        default:
          return <Navigate replace to="/" />;
      }
    }
  } else {
    return <Navigate replace to="/" />;
  }
};

export default YourOrder;
