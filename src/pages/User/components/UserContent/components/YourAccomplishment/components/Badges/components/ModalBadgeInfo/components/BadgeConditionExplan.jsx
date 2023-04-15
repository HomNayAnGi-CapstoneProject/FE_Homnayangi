import { useEffect, useState } from 'react';
import instances from '../../../../../../../../../../../utils/plugin/axios';

// ** item
const BadgeItem = (props) => {
  const { img, name, orderNeed, accomNeed } = props;
  return (
    <div className="flex items-center gap-2 mb-2 px-5 py-1 ">
      <img src={img} alt="" className="object-contain w-[50px] h-[50px]" />
      <div>
        <p className="font-semibold text-black">{name}</p>
        {/* conditions */}
        <div className="flex gap-1">
          <p className="text-primary font-bold">
            {orderNeed} <span className="text-[#929292] font-normal">đơn hàng,</span>
          </p>
          <p className="text-primary font-bold">
            {accomNeed} <span className="text-[#929292] font-normal">thành quả cá nhân</span>
          </p>
        </div>
      </div>
    </div>
  );
};

const BadgeConditionExplan = (props) => {
  const { setActiveTab, data } = props;
  const [allBadges, setAllBadges] = useState([]);

  // ** get all badges
  useEffect(() => {
    const fetch = async () => {
      const res = await instances.get('/badgecondition');
      console.log(res.data);
      setAllBadges(res.data);
    };
    fetch();
  }, []);

  return (
    <div>
      <p className="leading-[25px] text-justify">
        Mỗi huy hiệu sẽ đi kèm với các điều kiện nhất định, sau khi bạn đã hoàn tất đủ các điều kiện của 1 huy hiệu nào
        đó thì hệ thống sẽ định kỳ trao tặng bạn huy hiệu đó kèm theo các ưu đãi hấp dẫn ✨
        {/* <span
          onClick={() => setActiveTab(1)}
          className="underline italic font-medium text-primary cursor-pointer w-fit mr-2"
        >
          Xem ưu đãi
        </span> */}
      </p>

      <div className="my-5  max-h-[200px] scroll-bar overflow-x-hidden overflow-y-scroll">
        {allBadges?.length > 0 &&
          allBadges?.map((item) => (
            <div key={item.badgeConditionId}>
              <BadgeItem
                img={item?.badge?.imageUrl}
                name={item?.badge?.name}
                orderNeed={item?.orders || 0}
                accomNeed={item?.accomplishments || 0}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default BadgeConditionExplan;
