import { useState, useEffect } from 'react';
import styles from '../../style';
import Reaction from './components/Reaction';
import MainBlog from './components/MainBlog';
import RelativeBlog from './components/RelativeBlog';
import FixedBottomNav from './components/FixedBottomNav';

// ** Assets

// ** Third party libraries **
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Breadcrumbs from '../../share/components/Breadcrumbs';

const BlogDetail = () => {
  const params = useParams();

  useEffect(() => {
    // console.log(params);
    document.title = 'Chi tiết';
  }, [params.name]);

  return (
    <>
      <div className={`md:px-[90px] ${styles.flexCenter} py-16`}>
        <div className={`${styles.container} xx4lg:px-10`}>
          <div className="flex gap-5 justify-between">
            <div className="w-[5%] sm:block hidden">
              <Reaction />
            </div>
            <div className="sm:w-[95%] w-full flex gap-5 xxlg:flex-row flex-col">
              <div className="xxlg:w-[70%] w-full relative">
                <div className="ss:block hidden sm:px-[0px] px-5 absolute top-[-35px]">
                  <Breadcrumbs location1="/recipe" location2="/recipe" />
                </div>
                <MainBlog />
              </div>
              <div className="xxlg:w-[30%] w-full sticky top-[100px] h-fit">
                <RelativeBlog />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sm:hidden block">
        <FixedBottomNav />
      </div>
    </>
  );
};

export default BlogDetail;
