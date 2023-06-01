import { useEffect, useState } from 'react';
import { Tooltip } from '@mui/material';
import { ic_plus_white } from '../../../../../../../../../assets';

import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

// ** components
import Item from './Item';

// ** Redux
import { setContentBlog } from '../../../../../../../../../redux/actionSlice/managementSlice';
import { useDispatch, useSelector } from 'react-redux';

const Package = (props) => {
  // ** const
  const params = useParams();
  const { handleKeyDown, handleRemovePackage, id, cookedId, fullPackageList, editItem } = props;
  const ingredientsStore = useSelector((state) => state.management?.blogContent?.Packages[0]?.item2);
  const store = useSelector((state) => state.management);
  const dispatch = useDispatch();

  const [expectedTotalPrice, setExpectedTotalPrice] = useState(0);
  const [totalKcal, setTotalKcal] = useState('');
  const [packagePrice, setPackagePrice] = useState('');
  const [cookedPrice, setCookedPrice] = useState('');
  const [portion, setPortion] = useState('');
  const [ingredientList, setIngredientList] = useState([]);
  const [selectedList, setSelectedList] = useState([]);

  const [dataPackageId, setDataPackageId] = useState(null);
  const [dataCookedId, setDataCookedId] = useState(null);

  const [dupplicatePortionErr, setDupplicatePortionErr] = useState(false);

  const notifyError = (error) =>
    toast.error(error, {
      pauseOnHover: false,
      position: 'top-center',
      autoClose: 2000,
    });

  // ** get placeholer item to edit
  useEffect(() => {
    if (editItem) {
      setPortion(editItem.item1.size);
      setCookedPrice(editItem.item1.cookedPrice);
      setPackagePrice(editItem.item1.packagePrice);
      setDataPackageId(editItem.item1.packageId);
      setDataCookedId(editItem.item1.cookedId);
      editItem.item2.forEach((item) => {
        handleAddItem(item);
      });
    } else {
      if (ingredientsStore?.length > 0) {
        let dataIngredient = [...ingredientsStore];
        if (dataIngredient.length > 0) {
          dataIngredient.forEach((item) => {
            handleAddItem(item);
          });
        }
      }
    }
  }, []);

  //** check dupplicate portion */
  const handleSavePortion = (e) => {
    let dupplicatePortion;
    if (fullPackageList?.length > 0) {
      dupplicatePortion = fullPackageList.find((item) => item.item1.size == parseInt(e.target.value));
    }
    if (store.blogContent.Packages?.length > 0) {
      dupplicatePortion = store.blogContent.Packages.find((item) => item.item1.size == parseInt(e.target.value));
    }
    if (dupplicatePortion) {
      notifyError('Gói không được trùng khẩu phần!');
    } else {
      setPortion(e.target.value);
    }
  };

  // ** handle calculate price and calories
  useEffect(() => {
    let recipeDetails = selectedList?.map(function (item) {
      return {
        packageId: dataPackageId !== null ? dataPackageId : id,
        name: item.item.name,
        quantity: parseInt(item.amount),
        ingredientId: item.item.ingredientId,
        description: item.description,
        unitName: item.unitName,
      };
    });
    let Package = {
      item1: {
        packageId: dataPackageId !== null ? dataPackageId : id,
        cookedId: dataCookedId !== null ? dataCookedId : cookedId,
        title: store.blogContent?.title || null,
        imageUrl: store.blogContent?.coverImage?.url || null,
        packagePrice: parseInt(packagePrice),
        cookedPrice: parseInt(cookedPrice),
        size: parseInt(portion),
        blogId: store?.blogId,
      },
      item2: recipeDetails,
    };
    let Packages = [...store.blogContent.Packages];
    if (fullPackageList?.length > 0) {
      Packages = [...fullPackageList];
    }
    if (recipeDetails.length > 0) {
      // check if package existed
      let packageIdd = dataPackageId !== null ? dataPackageId : id;
      let existedPackage = Packages.find((item) => item.item1.packageId == packageIdd);
      if (existedPackage) {
        let modifiedPac = Packages.filter((item) => item.item1.packageId !== existedPackage.item1.packageId);
        modifiedPac.push(Package);
        dispatch(setContentBlog({ Packages: modifiedPac }));
      } else {
        Packages = [...Packages, Package];
        dispatch(setContentBlog({ Packages: Packages }));
      }
    } else {
      // if (params.blogId) {
      //   console.log('run 95');
      //   // dispatch(setContentBlog({ ingredients: recipeDetails }));
      //   dispatch(setContentBlog({ Packages: Packages }));
      // }
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
  }, [selectedList, portion, cookedPrice, packagePrice]);

  // ** functs
  const handleAddItem = (editItem) => {
    setIngredientList((prev) => [...prev, { id: crypto.randomUUID(), editItem }]);
  };

  return (
    <div className="relative font-inter bg-[#FFDACA] w-fit mb-2 rounded-[10px] p-[20px]">
      <Tooltip title="Xóa gói nguyên liệu" placement="top">
        <button
          onClick={() => handleRemovePackage(id, dataPackageId)}
          className="absolute top-5 right-5 p-1 ml-3 rounded-full bg-redError"
        >
          <img className="w-[20px] transform rotate-[45deg]" src={ic_plus_white} />
        </button>
      </Tooltip>
      {/*  */}
      <div className="sm:gap-10 mb-5">
        {/* portion, ingredient price, cooked price */}
        <div className="flex flex-wrap gap-3 md:items-center items-start mb-5">
          <input
            value={portion}
            onChange={(e) => handleSavePortion(e)}
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
          <input
            value={cookedPrice}
            onChange={(e) => setCookedPrice(e.target.value)}
            onKeyDown={handleKeyDown}
            type="number"
            placeholder="Giá đặt nấu"
            className="font-bold rounded w-[150px] outline-none pl-2"
          />
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
          {/* {previousTotalKcal !== '' && (
            <i className="text-[#898989]">Tổng lượng calo đã điều chỉnh trước đó: {previousTotalKcal}</i>
          )} */}
        </div>
      </div>
      {/* ingredients */}
      {ingredientList?.length > 0 &&
        ingredientList?.map((item, i) => (
          <div key={item.id}>
            <Item
              editItem={item.editItem}
              id={item.id}
              index={i}
              handleKeyDown={handleKeyDown}
              data={item}
              // setSelectedPrice={setSelectedPrice}
              // selectedPrice={selectedPrice}
              setSelectedList={setSelectedList}
              selectedList={selectedList}
            />
          </div>
        ))}
    </div>
  );
};

export default Package;
