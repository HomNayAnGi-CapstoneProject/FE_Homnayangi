import { useEffect, useState } from 'react';
import instances from '../../../../utils/plugin/axios';
import BlogCard from '../../../../share/components/BlogCard';

//** Third party components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const RelatedRecipe = (props) => {
  const { ingreId } = props;
  const [recipeList, setRecipeList] = useState([]);
  // **  get related recipe list **
  useEffect(() => {
    const fetch = async () => {
      const res = await instances.get(`/blogs/ingredients/${ingreId}`);
      if (res.data.status == 'success') {
        setRecipeList(res.data.result);
        console.log(res.data.result);
      } else {
        setRecipeList([]);
      }
    };
    fetch();
  }, [ingreId]);

  return (
    <div>
      {recipeList?.length > 0 && (
        <>
          <p className="text-black font-medium text-[18px] mb-5">Công thức gợi ý</p>
          <Swiper
            slidesPerView={1}
            spaceBetween={0}
            breakpoints={{
              1200: {
                slidesPerView: 5,
              },
              1060: {
                slidesPerView: 4,
              },
              768: {
                slidesPerView: 3,
              },
              640: {
                slidesPerView: 2,
              },
              480: {
                slidesPerView: 2,
              },
            }}
            grabCursor={true}
            // loop={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            className="mySwiper py-[10px]"
          >
            {recipeList?.map((product) => (
              <SwiperSlide key={product.blogId}>
                <BlogCard data={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </div>
  );
};

export default RelatedRecipe;
