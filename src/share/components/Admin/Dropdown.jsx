import { useState } from 'react';
import { ic_caret_down_white } from '../../../assets';
import OutsideClickHandler from 'react-outside-click-handler';

const Dropdown = (props) => {
  const { dropDownType, data, getValue, idType, nameType } = props;
  const [openDropdown, setOpenDropdown] = useState(false);
  const [activeItem, setActiveItem] = useState('');

  const handleChange = (item) => {
    setActiveItem(item[idType]);
    getValue(item);
    setOpenDropdown((prev) => !prev);
  };

  return (
    <div className="relative">
      <div
        className="flex py-1 pl-3 pr-1 rounded-[10px] h-fit bg-primary text-white cursor-pointer font-semibold"
        onClick={() => setOpenDropdown((prev) => !prev)}
      >
        {activeItem == '' && dropDownType}
        {data?.map((item, index) => activeItem == item[idType] && item[nameType])}
        <div className="w-[24px] h-[24px] bg-cover" style={{ backgroundImage: `url(${ic_caret_down_white})` }} />
      </div>
      <OutsideClickHandler onOutsideClick={() => setOpenDropdown(false)}>
        <ul
          className={`${
            openDropdown ? 'block' : 'hidden'
          } w-max max-h-[200px] overflow-y-scroll scroll-bar py-1.5 bg-white rounded-[5px] absolute z-[99] shadow-md top-10 left-[50%] translate-x-[-50%]`}
        >
          {data?.map((item, index) => (
            <li
              key={index}
              className={`px-3 cursor-pointer hover:bg-secondary py-1 ${
                activeItem == item[idType] ? 'bg-secondary' : ''
              }`}
              onClick={() => handleChange(item)}
            >
              {item[nameType]}
            </li>
          ))}
        </ul>
      </OutsideClickHandler>
    </div>
  );
};

export default Dropdown;
