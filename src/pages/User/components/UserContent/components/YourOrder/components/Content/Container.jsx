import { useState, useEffect } from 'react';
import Item from './Item';
import instances from '../../../../../../../../utils/plugin/axios';

// ** assets
import noOrder from '../../../../../../../../assets/images/no_order.png';
import staticFood1 from '../../../../../../../../assets/images/staticFood1.png';

const Container = (props) => {
  // **
  const { status } = props;
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    // console.log(status);
    if (status == 'PENDING') {
      setOrderList([
        {
          id: 5555,
          user: {
            name: 'John',
            address: '123 Main St',
            phonenumber: '123',
          },
          orders: [
            { img: staticFood1, name: 'Cá lóc đồng', unit: '200g', price: 50000, quantity: 2 },
            { img: staticFood1, name: 'Cá lóc đồng 2', unit: '200g', price: 50000, quantity: 2 },
            { img: staticFood1, name: 'Cá lóc đồng 2', unit: '200g', price: 50000, quantity: 2 },
          ],
          createDate: '2023-03-12T10:55:13.494Z',
        },
        {
          id: 5554,
          user: {
            name: 'John 22222',
            address: '123 Main St',
            phonenumber: '123',
          },
          orders: [
            { img: staticFood1, name: 'Cá lóc đồng', unit: '200g', price: 50000, quantity: 2 },
            { img: staticFood1, name: 'Cá lóc đồng 2', unit: '200g', price: 50000, quantity: 2 },
            { img: staticFood1, name: 'Cá lóc đồng 2', unit: '200g', price: 50000, quantity: 2 },
          ],
          createDate: '2023-03-12T10:55:13.494Z',
        },
      ]);
    } else {
      setOrderList([]);
    }
  }, [status]);

  return (
    <div className="mt-4 w-full bg-white rounded-[5px] p-5">
      {orderList?.length > 0 ? (
        <div>
          <div className="xlg:flex hidden pb-3 border-b border-b-[#EDE3E3]">
            <div className="md:w-2/4">
              <p className="font-medium text-black">Thông tin đơn hàng</p>
            </div>
            <div className="md:w-1/4 flex justify-end">
              <p className="font-medium text-black">Thông tin người nhận</p>
            </div>
            <div className="md:w-1/4 flex justify-end">
              <p className="font-medium text-black">Thời gian đặt hàng</p>
            </div>
          </div>
          <div className="max-h-[450px] scroll-bar overflow-y-scroll">
            {orderList?.map((item) => (
              <div key={item.id} className="border-t border-gray-400 border-dashed first:border-t-0 mt-2 first:mt-0">
                <Item data={item} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[250px]">
          <img alt="no-order" className="object-cover w-[100px] h-[100px]" src={noOrder} />
          <p className="mt-5 text-[#898989]">Bạn chưa có đơn hàng nào</p>
        </div>
      )}
    </div>
  );
};

export default Container;
