import { useState, useEffect } from 'react';
import { ic_dollar_white } from '../../../../../../../../assets';

import { useSelector } from 'react-redux';

const Revenue = () => {
  const store = useSelector((state) => state.management);
  const [revenueTitle, setRevenueTitle] = useState('');

  useEffect(() => {
    switch (store.reportType) {
      case 1:
        setRevenueTitle('hàng tháng');
        break;
      case 2:
        setRevenueTitle('hàng năm');
        break;
      default:
        break;
    }
  }, [store.reportType]);

  return (
    <div className="bg-[#fb9678] rounded-[25px] px-8 py-6 text-white">
      <div className="flex justify-between">
        <p className="text-[20px] font-medium">Thu nhập</p>
        <div className={`w-[50px] h-[50px] bg-[#03c9d7] rounded-full mb-3 flex justify-center items-center`}>
          <img alt="" src={ic_dollar_white} />
        </div>
      </div>

      <p className="mt-5 text-[28px] font-medium"> {Intl.NumberFormat().format(store?.reportData?.revenue || 0)}vnđ</p>
      <p className="opacity-50">Doanh thu {revenueTitle}</p>
    </div>
  );
};

export default Revenue;
