import { useState, useEffect } from 'react';
import instances from '../../utils/plugin/axios';
import styles from '../../style';
import Loading from '../../share/components/Admin/Loading';

// ** components
import Reaction from './components/Reaction';
import MainBlog from './components/MainBlog';
import RelativeBlog from './components/RelativeBlog';
import FixedBottomNav from './components/FixedBottomNav';
import CommentSection from './components/CommentSection/CommentSection';

// ** Assets

// ** Third party libraries **
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Breadcrumbs from '../../share/components/Breadcrumbs';

const BlogDetail = () => {
  const params = useParams();
  const [blogDetail, setBlogDetail] = useState();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // console.log(params);
    const fetch = async () => {
      try {
        setBlogDetail();
        setLoading(true);
        const res = await instances.get(`/blogs/${params?.id}`);
        // console.log(res);
        if (res.data.status == 'failed') {
          setBlogDetail();
        } else {
          setBlogDetail(res.data);
          setLoading(false);
          document.title = res.data.title;
        }
      } catch (error) {
        navigate('/');
      }
    };
    fetch();
  }, [params.id]);

  return (
    <>
      {!loading ? (
        <div>
          {blogDetail !== undefined ? (
            <>
              <div className={`md:px-[90px] ${styles.flexCenter} py-16`}>
                <div className={`${styles.container} xx4lg:px-10`}>
                  <div className="flex gap-5 justify-between">
                    <div className="w-[5%] sm:block hidden">
                      <Reaction iniReaction={blogDetail?.reaction} iniView={blogDetail?.view} />
                    </div>
                    <div className="sm:w-[95%] w-full flex gap-5 xxlg:flex-row flex-col">
                      <div className="xxlg:w-[70%] w-full relative">
                        <div className="ss:block hidden sm:px-[0px] px-5 absolute top-[-35px]">
                          <Breadcrumbs title={blogDetail?.title} location1="/recipe" location2="/recipe" />
                        </div>
                        <MainBlog blogDetail={blogDetail} />
                        <div id="comment">
                          <CommentSection blogDetail={blogDetail} />
                        </div>
                      </div>
                      <div className="xxlg:w-[30%] w-full sticky top-[100px] h-fit">
                        <RelativeBlog relativeBlogs={blogDetail?.relatedBlogs} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sm:hidden block">
                <FixedBottomNav iniReaction={blogDetail?.reaction} iniView={blogDetail?.view} />
              </div>
            </>
          ) : (
            <div className={`md:px-[90px] ${styles.flexCenter} py-16`}>
              <div className={`${styles.container} justify-center text-center xx4lg:px-10`}>
                <p className="font-semibold">Bài viết không tồn tại</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default BlogDetail;
