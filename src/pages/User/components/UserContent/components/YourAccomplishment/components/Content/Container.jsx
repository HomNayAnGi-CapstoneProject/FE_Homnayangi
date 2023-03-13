import { useState, useEffect } from 'react';
import Item from './Item';

// ** assets
import noAccom from '../../../../../../../../assets/images/no_accom.png';

const Container = (props) => {
  const { status } = props;
  const [accomList, setAccomList] = useState([]);

  // useEffect(() => {
  //   // console.log(status);
  //   if (status == 'pending') {
  //     setAccomList([
  //       {
  //         id: 5555,
  //         user: {
  //           name: 'John',
  //           address: '123 Main St',
  //           phonenumber: '123',
  //         },
  //         orders: [
  //           { img: staticFood1, name: 'Cá lóc đồng', unit: '200g', price: 50000, quantity: 2 },
  //           { img: staticFood1, name: 'Cá lóc đồng 2', unit: '200g', price: 50000, quantity: 2 },
  //           { img: staticFood1, name: 'Cá lóc đồng 2', unit: '200g', price: 50000, quantity: 2 },
  //         ],
  //         createDate: '2023-03-12T10:55:13.494Z',
  //       },
  //       {
  //         id: 5554,
  //         user: {
  //           name: 'John 22222',
  //           address: '123 Main St',
  //           phonenumber: '123',
  //         },
  //         orders: [
  //           { img: staticFood1, name: 'Cá lóc đồng', unit: '200g', price: 50000, quantity: 2 },
  //           { img: staticFood1, name: 'Cá lóc đồng 2', unit: '200g', price: 50000, quantity: 2 },
  //           { img: staticFood1, name: 'Cá lóc đồng 2', unit: '200g', price: 50000, quantity: 2 },
  //         ],
  //         createDate: '2023-03-12T10:55:13.494Z',
  //       },
  //     ]);
  //   } else {
  //     setAccomList([]);
  //   }
  // }, [status]);

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
