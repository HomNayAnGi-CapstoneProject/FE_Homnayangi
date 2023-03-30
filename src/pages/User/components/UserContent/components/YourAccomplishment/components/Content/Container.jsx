import { useState, useEffect } from 'react';
import Item from './Item';

// ** assets
import noAccom from '../../../../../../../../assets/images/no_accom.png';

const Container = (props) => {
  const { status } = props;
  const [accomList, setAccomList] = useState([]);

  return (
    <div className="mt-4 w-full bg-white rounded-[5px] p-5">
      {accomList?.length > 0 ? (
        <div></div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[250px]">
          <img alt="no-order" className="object-cover w-[100px] h-[100px]" src={noAccom} />
          <p className="mt-5 text-[#898989]">Bạn chưa chia sẻ thành quả nào</p>
        </div>
      )}
    </div>
  );
};

export default Container;
