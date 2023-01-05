import { useState, useEffect } from 'react';
import Tag from './Tag';

const MultiSelect = (props) => {
  // ** Const
  const [isActive, setIsActive] = useState(0);

  useEffect(() => {
    console.log('Call api tag id 0');
  }, []);

  //** Funct
  const handleSelectTag = (id) => {
    if (id !== isActive) {
      console.log('tag ID:', id);
    }
    setIsActive(id);
    // props?.setIsActive((prev) => !prev);
  };

  return (
    <div className="w-full flex scroll-bar overflow-x-scroll gap-[10px] bg-transparent rounded-[5px] py-[15px] ">
      <div onClick={() => handleSelectTag(0)}>
        <Tag name={'Tất cả'} id={0} isActive={isActive} setIsActive={setIsActive} />
      </div>
      {props?.tags.length > 0 &&
        props.tags.map((item) => (
          <div onClick={() => handleSelectTag(item.id)} key={item.id} className={``}>
            <Tag name={item.name} id={item.id} isActive={isActive} setIsActive={setIsActive} />
          </div>
        ))}
    </div>
  );
};

export default MultiSelect;
