import React from 'react';

const TabList = (props) => {
  const { status, setStatus } = props;
  // ** functs
  const handleChange = (newValue) => {
    setStatus(newValue);
  };

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
        Chờ duyệt (0)
      </button>
      <button
        onClick={() => handleChange('canceled')}
        className={`px-4 py-2 rounded-[5px] ${
          status == 'canceled' ? 'bg-primary text-white' : 'bg-white text-[#898989]'
        }`}
      >
        Từ chối (0)
      </button>
    </div>
  );
};

export default TabList;
