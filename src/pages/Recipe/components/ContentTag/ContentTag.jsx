import React from 'react';
import MultiSelect from '../MultiSelectTags/MultiSelect';
import BlogCard from '../../../../share/components/BlogCard';
import SeeMore from '../../../../share/components/SeeMore';

const ContentTag = (props) => {
  return (
    <div>
      <div className="mb-[20px]">
        <MultiSelect tags={props.tags} />
      </div>
      <div className="grid sm:grid-cols-2 xxlg:grid-cols-3 xl:grid-cols-3 gap-[6px]">
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

export default ContentTag;
