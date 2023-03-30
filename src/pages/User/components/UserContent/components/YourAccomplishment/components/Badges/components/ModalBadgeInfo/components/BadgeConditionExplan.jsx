import React from 'react';

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

  return (
    <div>
      <p className="leading-[25px] text-justify">
        Mỗi huy hiệu sẽ đi kèm với các điều kiện nhất định, sau khi bạn đã hoàn tất đủ các điều kiện của 1 huy hiệu nào
        đó thì hệ thống sẽ trao tặng bạn huy hiệu đó kèm theo các ưu đãi hấp dẫn ✨
        <span
          onClick={() => setActiveTab(1)}
          className="underline italic font-medium text-primary cursor-pointer w-fit mr-2"
        >
          Xem ưu đãi
        </span>
      </p>

      <div className="my-5">
        <BadgeItem img={data.badge1} name={'Khởi đầu'} orderNeed={5} accomNeed={0} />
        <BadgeItem img={data.badge2} name={'Làm quen'} orderNeed={10} accomNeed={5} />
        <BadgeItem img={data.badge3} name={'Hội viên'} orderNeed={20} accomNeed={10} />
        <BadgeItem img={data.badge4} name={'Khách quý'} orderNeed={30} accomNeed={20} />
        <BadgeItem img={data.badge5} name={'Lão làng'} orderNeed={30} accomNeed={20} />
        <BadgeItem img={data.badge6} name={'Chuyên gia mua sắm'} orderNeed={60} accomNeed={20} />
      </div>
    </div>
  );
};

export default BadgeConditionExplan;
