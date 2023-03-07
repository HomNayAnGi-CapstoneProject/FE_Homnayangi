import React from 'react';

const SeeMore = (props) => {
  const { setPageSizeIns, currentSize, totalCount, increaseSize, setCurrentPageSize } = props;

  // ** funct
  const handleIncreasePageSize = (currentSize, totalCount) => {
    // console.log(currentSize + ' currentSize' + ' total ' + totalCount);
    let range = totalCount - currentSize;
    if (range > increaseSize) {
      setPageSizeIns(increaseSize);
      setCurrentPageSize(currentSize + increaseSize);
    } else {
      setPageSizeIns(range);
      setCurrentPageSize(currentSize + range);
    }
  };

  return (
    <div className="text-center mt-[20px]">
      <button
        onClick={() => handleIncreasePageSize(currentSize, totalCount)}
        className="bg-redError sm:w-fit w-full hover:bg-redErrorHover transition text-white font-semibold rounded-[50px] py-[8px] px-[30px]"
      >
        Xem thêm
      </button>
    </div>
  );
};

export default SeeMore;
