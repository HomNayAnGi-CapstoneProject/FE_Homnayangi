import React from 'react';

const BlogPackage = (props) => {
  const { isStaff, data, handleAddToCart } = props;

  // ** add to cart
  // const handleAddToCart = (data, isCook) => {
  //   if (accessToken) {
  //     if (isCook) {
  //       setOpenOrderCooked(true);
  //       setOrderCookedData(data);
  //     } else {
  //       let requestObject = {
  //         cusId: decoded_jwt.Id,
  //         orderDetails: data.recipeDetails,
  //         isCook: isCook,
  //         orderName: data.recipeTitle,
  //         id: data.recipeId,
  //         amount: 1,
  //         img: data.imageUrl,
  //         price: isCook ? data.cookedPrice : data.packagePrice,
  //         shippedDate: shippedDate ? shippedDate : null,
  //       };
  //       // console.log(requestObject);
  //       dispatch(addItemNoStock(requestObject));
  //       dispatch(getShoppingCart());
  //     }
  //   } else {
  //     setOpenRequireLogin(true);
  //   }
  // };

  return (
    <div className="bg-secondary p-5 rounded-[10px] w-fit" key={data.item1.packageId}>
      <p className="font-medium text-gray-500 text-lg border-b border-b-gray-400 mb-3">
        Gói khẩu phần dành cho <span className="text-redError font-bold text-lg">{data.item1.size} </span> người ăn
      </p>
      <p>
        Gói nguyên liệu:{' '}
        <span className="font-semibold text-lg text-primary">
          {Intl.NumberFormat().format(data.item1.packagePrice)} đ
        </span>
      </p>
      <p>
        Đặt làm:{' '}
        <span className="font-semibold text-lg text-redError">
          {Intl.NumberFormat().format(data.item1.cookedPrice)} đ
        </span>
      </p>

      {/* buttons */}
      {!isStaff && (
        <div className="w-full flex gap-2 justify-end mt-5">
          <button
            onClick={() => handleAddToCart(data, false)}
            className="text-sm rounded-[5px] bg-primary hover:bg-primaryHover transition px-6 py-2 text-white font-medium uppercase"
          >
            Đặt mua
          </button>

          <button
            onClick={() => handleAddToCart(data, true)}
            className="text-sm rounded-[5px] bg-redError hover:bg-redErrorHover transition px-6 py-2 text-white font-medium uppercase"
          >
            Đặt làm
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogPackage;
