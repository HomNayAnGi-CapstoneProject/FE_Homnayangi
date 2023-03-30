import { useState, useEffect } from 'react';
import instances from '../../../../utils/plugin/axios';
import BlogCard from '../../../../share/components/BlogCard';
import IngredientCard from '../../../../share/components/IngredientCard';

//** Third party components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const RelatedItem = (props) => {
  const { ingreId, typeId } = props;
  const [itemList, setItemList] = useState([]);

  // **  get related item list **
  useEffect(() => {
    const fetch = async () => {
      const res = await instances.get(`/ingredients/types/${typeId}/ingredients/${ingreId}`);
      // console.log(res.data);
      if (res.data.status == 'success') {
        setItemList(res.data.result);
      } else {
        setItemList([]);
      }
    };
    fetch();
  }, [ingreId, typeId]);
  return (
    <div>
      {itemList?.length > 0 && (
        <>
          <p className="text-black font-medium text-[18px] my-5">Sản phẩm tương tự</p>
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
            loop={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            className="mySwiper py-[10px]"
          >
            {itemList?.map((product) => (
              <SwiperSlide key={product.ingredientId}>
                <IngredientCard data={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </div>
  );
};

export default RelatedItem;
