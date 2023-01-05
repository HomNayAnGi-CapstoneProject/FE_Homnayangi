import { useState, useEffect } from 'react';
import Item from './Item';

const CategoryList = (props) => {
  // ** Const
  const [activeCate, setActiveCate] = useState(0);

  //** Funct
  const handleSelectCate = (id) => {
    if (id !== activeCate) {
      console.log('category ID:', id);
      props.setCategoryChange(id);
    }
    setActiveCate(id);
    // props?.setIsActive((prev) => !prev);
  };

  return (
    <div className="sticky top-[100px]">
      <div className="mb-[10px]" onClick={() => handleSelectCate(0)}>
        <Item name={'Tất cả'} id={0} activeCate={activeCate} />
      </div>
      {props?.list.length > 0 &&
        props?.list.map((item) => (
          <div key={item.id} className="mb-[10px] last:mb-0" onClick={() => handleSelectCate(item.id)}>
            <Item name={item.name} id={item.id} activeCate={activeCate} />
          </div>
        ))}
    </div>
  );
};

export default CategoryList;
