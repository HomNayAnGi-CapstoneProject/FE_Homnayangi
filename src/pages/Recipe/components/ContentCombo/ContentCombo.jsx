import React from 'react';
import BlogCard from '../../../../share/components/BlogCard';
import SeeMore from '../../../../share/components/SeeMore';
import ComboName from './ComboName';

const ContentCombo = () => {
  return (
    <div>
      <div>
        <ComboName number={1} />
      </div>
      <div className="grid sm:grid-cols-2 xxlg:grid-cols-3 xl:grid-cols-4 gap-[6px]">
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
      </div>
      <SeeMore />
    </div>
  );
};

export default ContentCombo;
