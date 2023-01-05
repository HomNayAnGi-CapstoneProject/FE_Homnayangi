import React from 'react';

const Item = (props) => {
  return (
    <div
      className={`${
        props?.activeCate == props.id ? 'bg-primary text-white hover:text-white' : 'text-[#929292]'
      } font-inter py-[10px] cursor-pointer text-center  hover:text-primary text-[16px] font-semibold border-[#929292] border-[1px] rounded-[10px] transition`}
    >
      {props?.name || 'Category_name'}
    </div>
  );
};

export default Item;
