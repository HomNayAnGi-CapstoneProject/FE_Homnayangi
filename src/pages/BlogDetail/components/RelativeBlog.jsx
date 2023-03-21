import React from 'react';
import RelaBlogCard from './RelaBlogCard';
import scrollToWithOffset from '../../../utils/scrollToWithOffset';

const RelativeBlog = (props) => {
  const { relativeBlogs } = props;
  return (
    <div className="font-inter">
      <div className="bg-white rounded-[5px] p-5 sm:block hidden">
        <div className="pb-3 border-b-[#d2d2d2] border-b">
          <p className="uppercase font-semibold">Nội dung</p>
        </div>
        <ol className="mt-2">
          <li onClick={() => scrollToWithOffset(100, 'ingredient')} className="mt-2 cursor-pointer hover:text-primary">
            a. Nguyên liệu
          </li>
          <li onClick={() => scrollToWithOffset(100, 'preparation')} className="mt-2 cursor-pointer hover:text-primary">
            b. Sơ chế
          </li>
          <li onClick={() => scrollToWithOffset(100, 'cooking')} className="mt-2 cursor-pointer hover:text-primary">
            c. Cách chế biến
          </li>
          <li onClick={() => scrollToWithOffset(100, 'completion')} className="mt-2 cursor-pointer hover:text-primary">
            d. Thành phẩm
          </li>
          <li onClick={() => scrollToWithOffset(100, 'comment')} className="mt-2 cursor-pointer hover:text-primary">
            e. Bình luận
          </li>
        </ol>
      </div>

      <div className="bg-white rounded-[5px] p-5 mt-[20px]">
        <div className="pb-3 border-b-[#d2d2d2] border-b">
          <p className="uppercase font-semibold">Món tương tự</p>
        </div>
        <div className="mt-2 sm:flex xxlg:flex-col flex-row">
          {relativeBlogs?.length > 0 &&
            relativeBlogs?.map((item) => (
              <div key={item.blogId} className="mt-2 sm:flex-1">
                <RelaBlogCard data={item} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default RelativeBlog;
