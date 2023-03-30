import React from 'react';
import BadgesCondition from './BadgesCondition';

const BadgeShowCase = (props) => {
  const { badgeData } = props;
  return (
    <div>
      {/* current rank */}
      <div className="flex items-center gap-1">
        <p className="text-[#929292] font-medium">Danh hiệu đã có: </p>
        {/* rank list < 0: none */}
        <p className="italic font-medium">bạn chưa sỡ hữu danh hiệu nào</p>
      </div>
      {/* not earn rank */}
      <div className="mt-2">
        <p className="text-[#929292] font-medium">Danh hiệu chưa đạt: </p>
        <div className="my-3">
          <BadgesCondition />
        </div>
      </div>
    </div>
  );
};

export default BadgeShowCase;
