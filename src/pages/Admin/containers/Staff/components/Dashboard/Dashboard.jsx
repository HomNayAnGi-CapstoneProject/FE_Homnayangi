import { useEffect, useState } from 'react';
import instances from '../../../../../../utils/plugin/axios';

import { ic_blog_active, ic_product_active, ic_unit_active } from '../../../../../../assets';

// ** third party
import { useNavigate } from 'react-router-dom';

// ** components
import CountingNumComponent from './components/CountingNumComponent';
import DataTable from './components/DataTable';
import ModalStaffOrderDetail from '../../../../../../share/components/Modal/ModalStaffOrderDetail/ModalStaffOrderDetail';

const Dashboard = () => {
  const navigate = useNavigate();
  const [blogCount, setBlogCount] = useState(0);
  const [ingredientCount, setIngredientCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [orderList, setOrderList] = useState([]);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [orderDetailData, setOrderDetailData] = useState();

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

  // get orders
  useEffect(() => {
    const fetch = async () => {
      const res = await instances.get(`/orders`);
      // console.log(res.data);
      setOrderList(res.data);
      setOrderCount(res?.data?.length || 0);
    };

    fetch();
  }, []);

  // handle open detail
  const handelOpenDetail = (data) => {
    setOrderDetailData(data);
    setOpenDetailModal(true);
  };

  // handle change order status
  const handleChangeStatus = () => {};

  return (
    <div>
      {openDetailModal && (
        <ModalStaffOrderDetail
          openDetailModal={openDetailModal}
          setOpenDetailModal={setOpenDetailModal}
          data={orderDetailData}
        />
      )}
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
        <div className="flex items-center gap-3">
          <p className="text-[20px] font-semibold text-[#585858]">Đơn hàng ({orderCount})</p>
          <button
            onClick={() => navigate('/management/order')}
            className="px-5 py-2 rounded-[10px] bg-primary text-white font-medium"
          >
            Quản lý đơn hàng
          </button>
        </div>
        <div className="mt-2">
          <DataTable
            orderList={orderList}
            handelOpenDetail={handelOpenDetail}
            handleChangeStatus={handleChangeStatus}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
