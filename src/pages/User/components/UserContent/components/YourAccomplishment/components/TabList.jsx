import { useState, useEffect } from 'react';

const TabList = (props) => {
  const { status, setStatus, accomsData } = props;
  const [pendingValue, setPendingValue] = useState(0);
  const [cancelValue, setCancelValue] = useState(0);
  // ** functs
  const handleChange = (newValue) => {
    setStatus(newValue);
  };

  // ** count order to get notification
  useEffect(() => {
    if (accomsData.length > 0) {
      setPendingValue(accomsData.filter((item) => item.status == 3).length);
      setCancelValue(accomsData.filter((item) => item.status == 2).length);
    }
  }, [accomsData]);

  return (
    <div className="flex gap-3">
      <button
        onClick={() => handleChange('all')}
        className={`px-4 py-2 rounded-[5px] ${status == 'all' ? 'bg-primary text-white' : 'bg-white text-[#898989]'}`}
      >
        Tất cả
      </button>
      <button
        onClick={() => handleChange('pending')}
        className={`px-4 py-2 rounded-[5px] ${
          status == 'pending' ? 'bg-primary text-white' : 'bg-white text-[#898989]'
        }`}
      >
        Chờ duyệt ({pendingValue})
      </button>
      <button
        onClick={() => handleChange('cancelled')}
        className={`px-4 py-2 rounded-[5px] ${
          status == 'cancelled' ? 'bg-primary text-white' : 'bg-white text-[#898989]'
        }`}
      >
        Từ chối ({cancelValue})
      </button>
    </div>
  );
};

export default TabList;
