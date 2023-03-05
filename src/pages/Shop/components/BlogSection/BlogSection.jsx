import React from 'react';

// ** components
import BlogCard from '../../../../share/components/BlogCard';
import SeeMore from '../../../../share/components/SeeMore';

const BlogSection = () => {
  return (
    <div className="font-inter">
      <p className="text-black font-semibold text-[20px] mb-3">Công thức</p>
      <div className="grid xs:grid-cols-2 smd:grid-cols-3 xxlg:grid-cols-4 xl:grid-cols-4 gap-[6px]">
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
      </div>
      <SeeMore />
    </div>
  );
};

export default BlogSection;
