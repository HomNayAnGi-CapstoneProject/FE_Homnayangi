import { useState, useEffect, useRef } from 'react';
import instances from '../../../../../../../../utils/plugin/axios';
import useDebounce from '../../../../../../../../share/hooks/useDebounce';

import { useParams } from 'react-router-dom';

// ** Redux
import { setContentBlog, setConfirmPackage } from '../../../../../../../../redux/actionSlice/managementSlice';
import { useDispatch, useSelector } from 'react-redux';

// ** Assets
import { ic_plus_white } from '../../../../../../../../assets';
// import ic_loading from '../../../../../../assets/images/sand-clock.png';

// ** Components
import Item from './components/Item';
import ConfirmPackageModal from './components/ConfirmPackageModal';

const MaterialSelect = (props) => {
  // ** Const
  const { packageId } = props;
  const params = useParams();
  const store = useSelector((state) => state.management);
  const dispatch = useDispatch();
  const [expectedTotalPrice, setExpectedTotalPrice] = useState(0);
  const [totalKcal, setTotalKcal] = useState('');
  const [previousTotalKcal, setPreviousTotalKcal] = useState('');
  const [selectedList, setSelectedList] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState('');
  const [ingredientList, setIngredientList] = useState([]);
  const [packagePrice, setPackagePrice] = useState('');
  const [cookedPrice, setCookedPrice] = useState('');
  const [portion, setPortion] = useState('');
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  // ** functs
  const handleAddItem = (editItem) => {
    setIngredientList((prev) => [...prev, { id: crypto.randomUUID(), editItem }]);
  };

  const handleConfirmPackage = (isConfirmed) => {
    if (isConfirmed == false) {
      dispatch(setConfirmPackage(true));
    } else {
      setOpenConfirmModal(true);
    }
  };

  const handleRemoveItem = (id) => {
    setIngredientList((current) => current.filter((item) => item.id !== id));
    setSelectedList((current) => current.filter((item) => item.itemId !== id));
  };

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

  // ** get placeholer item to edit
  useEffect(() => {
    if (params.blogId) {
      const fetch = async () => {
        const res = await instances.get(`/blogs/staff-preview/${params.blogId}`);
        let dataIngredient = res.data.recipeDetails;
        setPackagePrice(res?.data?.packagePrice);
        setCookedPrice(res?.data?.cookedPrice);
        setPreviousTotalKcal(res?.data?.totalKcal);
        if (dataIngredient.length > 0) {
          dataIngredient.forEach((item) => {
            handleAddItem(item);
          });
        }
      };
      fetch();
    }
  }, []);

  // ** handle calculate price and calories
  // const packageId = crypto.randomUUID();
  useEffect(() => {
    let recipeDetails = selectedList?.map(function (item) {
      return {
        packageId: packageId,
        kcal: item.item.kcal,
        price: item.item.price,
        name: item.item.name,
        quantity: parseInt(item.amount),
        ingredientId: item.item.ingredientId,
        description: item.description,
        unitName: item.unitName,
      };
    });
    let Package = {
      item1: {
        packageId: packageId,
        title: store.blogContent?.title || null,
        imageUrl: store.blogContent?.coverImage?.url || null,
        packagePrice: parseInt(packagePrice),
        cookedPrice: parseInt(cookedPrice),
        size: parseInt(portion),
        blogId: store?.blogId,
      },
      item2: recipeDetails,
    };
    let Packages = [];
    if (recipeDetails.length > 0) {
      // check dupplicate package
      let existedPackage = Packages.find((item) => item.packageId == packageId);
      if (existedPackage) {
        let modifiedPac = Packages.filter((item) => item.packageId !== existedPackage.packageId);
        modifiedPac.push(Package);
        dispatch(setContentBlog({ Packages: modifiedPac }));
      } else {
        Packages.push(Package);
        dispatch(setContentBlog({ ingredients: recipeDetails }));
        dispatch(setContentBlog({ Packages: Packages }));
      }
    } else {
      if (params.blogId) {
        dispatch(setContentBlog({ Packages: Packages }));
        dispatch(setContentBlog({ ingredients: recipeDetails }));
      }
    }
    let expectedPrice = 0;
    let totalKcal = 0;
    selectedList.forEach((item) => {
      expectedPrice += item.item.price * item.amount;
      totalKcal += item.item.kcal * item.amount;
    });
    setExpectedTotalPrice(expectedPrice);
    if (totalKcal > 0) {
      setTotalKcal(totalKcal);
    }
  }, [selectedList, portion, packagePrice, cookedPrice]);

  // ** handle input packed price
  const packedPriceDebounce = useDebounce(packagePrice, 600);
  useEffect(() => {
    if (packedPriceDebounce !== '') {
      // if (!packedPriceDebounce?.trim()) {
      //   return;
      // }
      dispatch(setContentBlog({ packagePrice: packedPriceDebounce }));
    }
  }, [packedPriceDebounce]);

  // ** handle input coooked price
  const cookedPriceDebounce = useDebounce(cookedPrice, 600);
  useEffect(() => {
    if (cookedPriceDebounce !== '') {
      // if (!cookedPriceDebounce?.trim()) {
      //   return;
      // }
      dispatch(setContentBlog({ cookedPrice: cookedPriceDebounce }));
    }
  }, [cookedPriceDebounce]);

  // ** handle input total Kcal
  const totalKcalDebounce = useDebounce(totalKcal, 600);
  useEffect(() => {
    if (totalKcalDebounce !== '') {
      // if (!cookedPriceDebounce?.trim()) {
      //   return;
      // }
      dispatch(setContentBlog({ totalKcal: totalKcalDebounce }));
    }
  }, [totalKcalDebounce]);

  // ** handle input portion
  const portionDebounce = useDebounce(portion, 600);
  useEffect(() => {
    if (portionDebounce !== '') {
      // if (!cookedPriceDebounce?.trim()) {
      //   return;
      // }
      dispatch(setContentBlog({ portion: portionDebounce }));
    }
  }, [portionDebounce]);

  return (
    <>
      {openConfirmModal && <ConfirmPackageModal openModal={openConfirmModal} setOpenModal={setOpenConfirmModal} />}
      <div className="font-inter bg-[#FFDACA] rounded-[10px] p-[20px]">
        {ingredientList.length > 0 ? (
          <>
            <div className="sm:gap-10 mb-5">
              {/* portion, ingredient price, cooked price */}
              <div className="flex md:flex-row flex-col gap-3 md:items-center items-start mb-5">
                <input
                  value={portion}
                  onChange={(e) => setPortion(e.target.value)}
                  onKeyDown={handleKeyDown}
                  type="number"
                  placeholder="Khẩu phần"
                  className="font-bold rounded w-[120px] outline-none pl-2"
                />
                <input
                  value={packagePrice}
                  onChange={(e) => setPackagePrice(e.target.value)}
                  onKeyDown={handleKeyDown}
                  type="number"
                  placeholder="Giá gói nguyên liệu"
                  className="font-bold rounded w-[190px] outline-none pl-2"
                />
                <div className="flex items-center gap-2">
                  <input
                    value={cookedPrice}
                    onChange={(e) => setCookedPrice(e.target.value)}
                    onKeyDown={handleKeyDown}
                    type="number"
                    placeholder="Giá đặt nấu"
                    className="font-bold rounded w-[150px] outline-none pl-2"
                  />
                  <p className="text-gray-500">(Giá của gói đã được chế biến)</p>
                </div>
              </div>

              {/* pre price, total calo */}
              <div>
                <div className="mb-3 flex gap-2">
                  <p className="text-[#898989]">Giá dự kiến</p>
                  <p className="font-bold text-redError">{Intl.NumberFormat().format(expectedTotalPrice)}đ</p>
                </div>
                <div className="mb-3 flex md:flex-row flex-col gap-2">
                  <p className="text-[#898989]">Tổng lượng calo</p>
                  <input
                    onKeyDown={handleKeyDown}
                    type="number"
                    value={totalKcal}
                    onChange={(e) => setTotalKcal(e.target.value)}
                    className="font-bold text-blue-500 rounded w-[150px] outline-none pl-2"
                  ></input>
                </div>
                {previousTotalKcal !== '' && (
                  <i className="text-[#898989]">Tổng lượng calo đã điều chỉnh trước đó: {previousTotalKcal}</i>
                )}
              </div>
            </div>
            {ingredientList.map((item, i) => (
              <div key={item.id}>
                <Item
                  editItem={item.editItem}
                  id={item.id}
                  index={i}
                  handleKeyDown={handleKeyDown}
                  handleRemoveItem={handleRemoveItem}
                  setSelectedPrice={setSelectedPrice}
                  selectedPrice={selectedPrice}
                  setSelectedList={setSelectedList}
                  selectedList={selectedList}
                />
              </div>
            ))}

            <div className="flex md:flex-row flex-col items-start md:items-center gap-3">
              <button
                disabled={store.confirmPackage}
                onClick={() => handleAddItem()}
                className={`${
                  !store.confirmPackage ? '' : 'opacity-50 cursor-not-allowed'
                } bg-primary font-medium text-white flex gap-1 items-center px-4 py-2 rounded-[10px]`}
              >
                Thêm nguyên liệu <img className="w-[20px]" src={ic_plus_white} />
              </button>
              {selectedList?.length > 0 && (
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleConfirmPackage(store.confirmPackage)}
                    className={`${
                      selectedList?.length > 0 ? 'bg-green-500' : ''
                    }  font-medium text-white flex gap-1 items-center px-4 py-2 rounded-[10px]`}
                  >
                    {!store.confirmPackage ? 'Xác nhận' : 'Bỏ xác nhận'}
                  </button>
                  <p className="text-gray-500 flex-1">
                    (Sau khi xác nhận sẽ không thể thay đổi nguyên liệu và có thể thêm các gói nguyên liệu khác)
                  </p>
                </div>
              )}
            </div>
          </>
        ) : (
          <button
            onClick={() => handleAddItem()}
            className="bg-primary font-medium text-white flex gap-1 items-center px-4 py-2 rounded-[10px]"
          >
            Thêm nguyên liệu <img className="w-[20px]" src={ic_plus_white} />
          </button>
        )}
      </div>
    </>
  );
};
export default MaterialSelect;
