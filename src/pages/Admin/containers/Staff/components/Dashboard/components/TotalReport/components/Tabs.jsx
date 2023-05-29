import React from 'react';

const Tab = (props) => {
  const { name, activeType, setActiveType, id } = props;
  return (
    <div
      onClick={() => setActiveType(id)}
      className={`${
        activeType == id ? 'bg-primary text-white' : 'bg-gray-100'
      } px-5 py-2 text-[14px] hover:bg-primary hover:text-white transition cursor-pointer rounded`}
    >
      {name}
    </div>
  );
};

const Tabs = (props) => {
  const { setActiveType, activeType } = props;
  return (
    <div className="flex items-center gap-2">
      <Tab setActiveType={setActiveType} activeType={activeType} name={'Ngày'} id={3} />
      <Tab setActiveType={setActiveType} activeType={activeType} name={'Tháng'} id={1} />
      <Tab setActiveType={setActiveType} activeType={activeType} name={'Năm'} id={2} />
    </div>
  );
};

export default Tabs;
