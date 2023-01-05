import React from 'react';

const ComboName = (props) => {
  return (
    <div className="flex justify-center mb-[25px]">
      <div className="bg-primary border-[2px] border-white text-white font-inter font-semibold py-[8px] px-[25px] w-fit rounded-[50px]">
        Thực đơn {props.number}
      </div>
    </div>
  );
};

export default ComboName;
