import { useState } from 'react';

import { ic_caret_down_white } from '../../../../assets';

import OutsideClickHandler from 'react-outside-click-handler';

const Filter = (props) => {
  const { setSortValue } = props;
  const [openDropdown, setOpenDropdown] = useState(false);
  const [activeItem, setActiveItem] = useState(1);

  // ** Funct
  const handleChange = (id) => {
    setActiveItem(id);
    setOpenDropdown((prev) => !prev);
    setSortValue(id);
  };

  return (
    <div className="font-inter flex gap-3 items-center">
      <p className="text-black font-medium">Sắp xếp</p>
      <div className="relative">
        <div
          className="flex py-1 pl-3 pr-1 rounded-[10px] h-fit bg-primary text-white cursor-pointer font-semibold"
          onClick={() => setOpenDropdown((prev) => !prev)}
        >
          {activeItem == 1 && 'Mới nhất'}
          {activeItem == 2 && 'Yêu thích'}
          {activeItem == 3 && 'Lượt xem'}
          <div className="w-[24px] h-[24px] bg-cover" style={{ backgroundImage: `url(${ic_caret_down_white})` }} />
        </div>
        <OutsideClickHandler onOutsideClick={() => setOpenDropdown(false)}>
          <ul
            className={`${
              openDropdown ? 'block' : 'hidden'
            } w-[130px] py-1.5 bg-white rounded-[5px] absolute z-[99] shadow-md top-10 left-[50%] translate-x-[-50%]`}
          >
            <li
              className={`text-center cursor-pointer hover:bg-secondary py-1 ${activeItem == 1 ? 'bg-secondary' : ''}`}
              onClick={() => handleChange(1)}
            >
              Mới nhất
            </li>
            <li
              className={`text-center cursor-pointer hover:bg-secondary py-1 ${activeItem == 3 ? 'bg-secondary' : ''}`}
              onClick={() => handleChange(3)}
            >
              Lượt xem
            </li>
            <li
              className={`text-center cursor-pointer hover:bg-secondary py-1 ${activeItem == 2 ? 'bg-secondary' : ''}`}
              onClick={() => handleChange(2)}
            >
              Yêu thích
            </li>
          </ul>
        </OutsideClickHandler>
      </div>
    </div>
  );
};

export default Filter;
