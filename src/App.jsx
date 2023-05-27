import { Fragment, Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DefaultLayout } from './share/layouts';
import Loading from './share/components/Loading/Loading';
import { publicRoutes, privateRoutes } from './router';
import ScrollToTop from './utils/scrollToTop';
import 'moment/locale/vi';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import jwt_decode from 'jwt-decode';
import { setConnection, setNewNoti } from './redux/actionSlice/globalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function App() {
  // const dispatch = useDispatch();
  const [connection, setConnection] = useState();

  const accessToken = localStorage.getItem('accessToken');
  let decoded_jwt = {};
  if (accessToken) {
    decoded_jwt = jwt_decode(accessToken);
  }

  // ** Notify
  const newNotify = (msg) =>
    toast.info(msg, {
      pauseOnHover: false,
      autoClose: 2000,
    });

  // ** get connection signalR
  useEffect(() => {
    if (accessToken) {
      // console.log(`${import.meta.env.VITE_LOCAL_URL}signalRServer`);
      const connect = new HubConnectionBuilder()
        .withUrl(`${import.meta.env.VITE_LOCAL_URL}/signalRServer`)
        .configureLogging(LogLevel.Information)
        .withAutomaticReconnect()
        .build();

      // dispatch(setConnection(connect));
      setConnection(connect);
    }
  }, []);

  useEffect(() => {
    if (accessToken) {
      if (connection) {
        connection
          .start()
          .then(() => {
            if (decoded_jwt?.role == 'Staff') {
              connection.on('OrderCreated', (message) => {
                // console.log(JSON.parse(message));
                newNotify(JSON.parse(message)?.description);
                dispatch(setNewNoti(true));
              });
            }
            if (decoded_jwt?.role == 'Manager') {
              connection.on('BlogPending', (message) => {
                // console.log(JSON.parse(message));
                newNotify(JSON.parse(message)?.description);
                dispatch(setNewNoti(true));
              });
            }
            if (decoded_jwt?.role == 'Customer') {
              // console.log('???');
              connection.on(`${decoded_jwt.Id}_OrderStatusChanged`, (message) => {
                // console.log(message);
                newNotify(JSON.parse(message)?.description);
                dispatch(setNewNoti(true));
              });
              // // console.log(store?.authorAccomId);
              connection.on(`${decoded_jwt.Id}_InteractAccomplishment`, (message) => {
                // console.log(message);
                newNotify(JSON.parse(message)?.description);
                dispatch(setNewNoti(true));
              });
              connection.on(`${decoded_jwt.Id}_ReplyComment`, (message) => {
                // console.log(message);
                newNotify(JSON.parse(message)?.description);
                dispatch(setNewNoti(true));
              });
            }
          })
          .catch((error) => console.log(error));
      }
    }
  }, [connection]);

  return (
    <Router>
      <ScrollToTop>
        <Suspense fallback={<Loading />}>
          <div>
            <Routes>
              {publicRoutes.map((route, index) => {
                let Layout = DefaultLayout;
                if (route.layout) {
                  Layout = route.layout;
                } else if (route.layout === null) {
                  Layout = Fragment;
                }

                const Page = route.component;
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <Layout>
                        <Page title={route.title} />
                      </Layout>
                    }
                  />
                );
              })}

              {privateRoutes.map((route, index) => {
                let Layout = DefaultLayout;
                if (route.layout) {
                  Layout = route.layout;
                } else if (route.layout === null) {
                  Layout = Fragment;
                }

                const Page = route.component;
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <Layout>
                        <Page title={route.title} />
                      </Layout>
                    }
                  />
                );
              })}
            </Routes>
          </div>
        </Suspense>
      </ScrollToTop>
    </Router>
  );
}

export default App;
