import { Fragment, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DefaultLayout } from './share/layouts';
import Loading from './share/components/Loading/Loading';
import { publicRoutes } from './router';
import ScrollToTop from './utils/scrollToTop';
import 'moment/locale/vi';

function App() {
  return (
    <Router>
      <ScrollToTop>
        <Suspense fallback={<Loading />}>
          <div>
            <Routes>
              {publicRoutes.map((route, index) => {
                // const Layout = route.layout === null ? Fragment : DefaultLayout

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
