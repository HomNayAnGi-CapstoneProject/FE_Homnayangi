import { useState, useEffect, useRef } from 'react';
import instances from '../../../../../../../../utils/plugin/axios';
import useDebounce from '../../../../../../../../share/hooks/useDebounce';

import { useParams } from 'react-router-dom';

// ** Redux
import { setContentBlog } from '../../../../../../../../redux/actionSlice/managementSlice';
import { useDispatch, useSelector } from 'react-redux';

// ** Assets
import { ic_plus_white } from '../../../../../../../../assets';
// import ic_loading from '../../../../../../assets/images/sand-clock.png';

// ** Components
import Item from './components/Item';

const MaterialSelect = () => {
  // ** Const
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

  // ** functs
  const handleAddItem = (editItem) => {
    setIngredientList((prev) => [...prev, { id: crypto.randomUUID(), editItem }]);
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
  useEffect(() => {
    let recipeDetails = selectedList?.map(function (item) {
      return {
        quantity: parseInt(item.amount),
        ingredientId: item.item.ingredientId,
        description: item.description,
        unitName: item.unitName,
      };
    });
    if (recipeDetails.length > 0) {
      dispatch(setContentBlog({ ingredients: recipeDetails }));
    } else {
      if (params.blogId) {
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
  }, [selectedList]);

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

  return (
    <div className="font-inter bg-[#FFDACA] rounded-[10px] p-[20px]">
      {ingredientList.length > 0 ? (
        <>
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
          <div className="flex sm:flex-row flex-col sm:items-center sm:gap-10">
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
            <div className="">
              <div className="mb-3 mt-2 flex sm:flex-row flex-col gap-2">
                <p className="text-[#898989]">Giá gói nguyên liệu</p>
                <input
                  value={packagePrice}
                  onChange={(e) => setPackagePrice(e.target.value)}
                  onKeyDown={handleKeyDown}
                  type="number"
                  className="font-bold rounded w-[150px] outline-none pl-2"
                />
              </div>
              <div className="mb-5 flex sm:flex-row flex-col gap-2">
                <p className="text-[#898989]">Giá đặt nấu</p>
                <input
                  value={cookedPrice}
                  onChange={(e) => setCookedPrice(e.target.value)}
                  onKeyDown={handleKeyDown}
                  type="number"
                  className="font-bold rounded w-[150px] outline-none pl-2"
                />
              </div>
            </div>
          </div>
          <button
            onClick={() => handleAddItem()}
            className="bg-primary font-medium text-white flex gap-1 items-center px-4 py-2 rounded-[10px]"
          >
            Thêm nguyên liệu <img className="w-[20px]" src={ic_plus_white} />
          </button>
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
  );
};

export default MaterialSelect;
