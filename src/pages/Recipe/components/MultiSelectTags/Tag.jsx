import { useState, useEffect } from 'react';

const Tag = (props) => {
  return (
    <div
      // onClick={() => handleSelectTag(props.id, props.name)}
      className={`${
        props?.isActive == props.id ? 'bg-primary text-white hover:text-white' : ''
      }  py-[5px] px-[15px] bg-white rounded-[50px] border-[1.5px] border-[#B5B5B5] font-inter text-[14px] text-black w-max select-none cursor-pointer transition hover:text-primary`}
    >
      {props?.name || 'Tag_name'}
    </div>
  );
};

export default Tag;
