import React from 'react';

// ** Redux
import { useDispatch, useSelector } from 'react-redux';
import { setContentBlog } from '../../../../../../../../redux/actionSlice/managementSlice';

const Portion = () => {
  // ** Const
  const contentBlog = useSelector((state) => state.management.blogContent);
  const dispatch = useDispatch();

  // ** Functs
  const handleKeyDown = (e) => {
    if (
      e.keyCode === 69 ||
      e.keyCode === 190 ||
      e.keyCode === 110 ||
      e.keyCode === 107 ||
      e.keyCode === 109 ||
      e.keyCode === 189 ||
      e.keyCode === 231
    ) {
      e.preventDefault();
    }
  };

  return (
    <div className="flex items-center gap-2">
      <p className="font-medium text-black">Khẩu phần: </p>
      <p>Từ </p>
      <input
        type="number"
        inputMode="numeric"
        value={contentBlog?.minSize || ''}
        onChange={(e) => dispatch(setContentBlog({ minSize: e.target.value }))}
        onKeyDown={handleKeyDown}
        className="outline-none border-b border-b-black px-2 w-[30px]"
      />
      <p>đến </p>
      <input
        type="number"
        inputMode="numeric"
        value={contentBlog?.maxSize || ''}
        onChange={(e) => dispatch(setContentBlog({ maxSize: e.target.value }))}
        onKeyDown={handleKeyDown}
        className="outline-none border-b border-b-black  px-2 w-[30px]"
      />
      <p>người </p>
    </div>
  );
};

export default Portion;
