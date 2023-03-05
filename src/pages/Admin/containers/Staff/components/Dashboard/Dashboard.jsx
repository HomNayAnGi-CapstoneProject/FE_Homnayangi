import { useEffect, useState } from 'react';
import instances from '../../../../../../utils/plugin/axios';

import { ic_blog_active, ic_product_active, ic_unit_active } from '../../../../../../assets';

// ** components
import CountingNumComponent from './components/CountingNumComponent';
import DataTable from './components/DataTable';

const Dashboard = () => {
  const [blogCount, setBlogCount] = useState(0);
  const [ingredientCount, setIngredientCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);

  // count ingredients
  useEffect(() => {
    const fetch = async () => {
      const res = await instances.get(`/ingredients/managing`);
      setIngredientCount(res.data.total_results);
    };

    fetch();
  }, []);

  // count blog
  useEffect(() => {
    const fetch = async () => {
      const res = await instances.get(`/blogs/user`);
      setBlogCount(res.data.total_result);
    };

    fetch();
  }, []);

  // count category
  useEffect(() => {
    const fetch = async () => {
      const res = await instances.get(`/categories`);
      setCategoryCount(res.data.length);
    };

    fetch();
  }, []);

  return (
    <div>
      <div className="flex items-center gap-4 flex-wrap">
        <CountingNumComponent
          name="Bài viết"
          img={ic_blog_active}
          color="bg-red-400"
          textColor="text-red-400"
          endValue={blogCount}
          navigateTo="/management/blog"
        />
        <CountingNumComponent
          name="Nguyên liệu"
          img={ic_product_active}
          color="bg-blue-400"
          textColor="text-blue-400"
          endValue={ingredientCount}
          navigateTo="/management/product"
        />
        <CountingNumComponent
          name="Danh mục"
          img={ic_unit_active}
          color="bg-green-400"
          textColor="text-green-400"
          endValue={categoryCount}
          navigateTo="/management/category"
        />
      </div>
      <div className="mt-8">
        <p className="text-[20px] font-semibold text-[#585858]">Đơn hàng mới</p>
        <div className="mt-2">
          <DataTable
          // unitList={unitList}
          // handleOpenEdit={handleOpenEdit}
          // handleOpenDelete={handleOpenDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
