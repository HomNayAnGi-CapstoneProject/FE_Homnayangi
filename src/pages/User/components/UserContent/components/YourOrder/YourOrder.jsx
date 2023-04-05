import { useState, useEffect } from 'react';
import instances from '../../../../../../utils/plugin/axios';

// ** assets
import orderConfirm from '../../../../../../assets/images/orderConfirm.webp';
import orderCancel from '../../../../../../assets/images/orderCancel.webp';

// ** Redux
import { removeCartByStatus, getShoppingCart } from '../../../../../../redux/actionSlice/shoppingCartSlice';
import { useDispatch } from 'react-redux';

// ** third party
import jwt_decode from 'jwt-decode';
import { Navigate, useNavigate } from 'react-router-dom';
import { Modal } from '@mui/material';

// ** componetns
import TabList from './components/TabList';
import Container from './components/Content/Container';

const YourOrder = () => {
  //** const */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [status, setStatus] = useState('NOTPAID');
  const [openModal, setOpenModal] = useState(false);
  const [isComfirmOrder, setIsComfirmOrder] = useState(false);
  const [isCancel, setIsCancel] = useState();
  const [ordersData, setOrdersData] = useState([]);
  const [ordersList, setOrdersList] = useState([]);

  const accessToken = localStorage.getItem('accessToken');
  let decoded_jwt = {};
  if (accessToken) {
    decoded_jwt = jwt_decode(accessToken);
  }

  // ** check tab status
  const getTabStatus = () => {
    switch (status) {
      case 'NOTPAID':
        return 1;
      case 'PENDING':
        return 2;
      case 'SHIPPING':
        return 5;
      case 'SHIPPED':
        return 6;
      case 'CANCELED':
        return 3;
      default:
        break;
    }
  };
  const orderStatus = getTabStatus();

  // ** check url if it is /user/orders or more
  useEffect(() => {
    let guid, cancel, isCooked;
    // http://127.0.0.1:5173/user/orders/guid=4c249e21-5383-4ef6-a4e8-67916d2a768d&Cancel=true?token=EC-75E42967450215338
    // http://127.0.0.1:5173/user/orders/guid=e3fae399-8c60-452f-b570-fd1936472aed&Cancel=false&paymentId=PAYID-MQP4VYA4RG57636GL3423504?token=EC-8CK40445K1457851N&PayerID=2D3HA6GLMWLT6
    // const urlParams = new URLSearchParams(new URL(window.location.href).search);
    let pathName = new URL(window.location.href).pathname;
    // console.log(pathName.split('=')[2]?.split('&')[0] === 'true');
    if (pathName.includes('guid')) {
      guid = pathName.split('=')[1].split('&')[0];
      cancel = pathName.split('=')[2]?.split('&')[0] === 'true';
      isCooked = pathName.split('=')[3]?.split('&')[0] === 'True' ? true : false;
      setIsCancel(cancel);
      // call open accept/cancel modal
      if (isComfirmOrder == false) {
        setOpenModal(true);
      } else {
        const fetch = async () => {
          await instances.put(`/orders/${cancel ? 'cancel' : 'accept'}/${guid}`);
          const res = await instances.get('/orders/status/customer', {
            params: {
              status: orderStatus,
            },
          });
          setOrdersData(res.data);
          const ress = await instances.get('/orders/status/customer', { params: { status: -1 } });
          setOrdersList(ress.data);
          navigate('/user/orders');
          // if payment success (remove item from cart)
          if (cancel == false) {
            dispatch(
              removeCartByStatus({
                cusId: decoded_jwt.Id,
                isCook: isCooked,
              }),
            );
            dispatch(getShoppingCart());
          }
        };
        fetch();
      }
    } else {
      const fetch = async () => {
        const res = await instances.get('/orders/status/customer', { params: { status: orderStatus } });
        setOrdersData(res.data);
        const ress = await instances.get('/orders/status/customer', { params: { status: -1 } });
        setOrdersList(ress.data);
      };
      fetch();
    }
  }, [isComfirmOrder, orderStatus]);

  // useEffect(() => {
  //   const fetch = async () => {
  //     const res = await instances.get('/orders/status/customer', { params: { status: -1 } });
  //     setOrdersList(res.data);
  //   };
  //   fetch();
  // }, []);

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
                    <img
                      alt="order-confirm"
                      className="object-cover w-[250px]"
                      src={isCancel == true ? orderCancel : orderConfirm}
                    />
                    <p className="font-semibold">Đơn hàng đã {isCancel == true ? 'được hủy' : 'được tạo'}</p>
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
                <TabList setStatus={setStatus} status={status} ordersList={ordersList} />
                <Container status={status} orderData={ordersData} />
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
