import { useState, useEffect } from 'react';
import instances from '../../../../../../../../../utils/plugin/axios';
import useDebounce from '../../../../../../../../../share/hooks/useDebounce';
import truncate from '../../../../../../../../../utils/truncate';

import { ic_plus_white } from '../../../../../../../../../assets';
import ic_loading from '../../../../../../../../../assets/images/sand-clock.png';

import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import OutsideClickHandler from 'react-outside-click-handler';

// ** items comp
const ResultSearch = (props) => {
  return (
    <div className="flex items-center justify-between px-[20px] py-1 hover:bg-[#FFD8C7] transition cursor-pointer">
      <p className="line-clamp-1">{truncate(props?.data.name, 20)}</p>
      <div className="flex gap-5 items-center">
        <p>{props?.data.unitName}</p>
        <p className="text-red-500">{Intl.NumberFormat().format(props?.data.price)}đ</p>
        <p className="text-blue-500">{props?.data.kcal}kcal</p>
      </div>
    </div>
  );
};

const Item = (props) => {
  const {
    id,
    index,
    handleRemoveItem,
    handleKeyDown,
    setSelectedPrice,
    setSelectedList,
    selectedList,
    editItem,
    data,
    // selectedAmount,
    // setSelectedAmount,
  } = props;
  const [selectedItem, setSelectedItem] = useState('');
  const [selectedAmount, setSelectedAmount] = useState('');
  const [selectedUnit, setSelectedUnit] = useState(data?.unitName);
  const [description, setDescription] = useState('');
  const [openResultBox, setOpenResultBox] = useState(false);
  const [searchResult, setSearchResult] = useState('');
  const [searchInput, setSearchhInput] = useState(null);
  const [loading, setLoading] = useState(false);
  const debounced = useDebounce(searchInput, 600);
  const store = useSelector((state) => state.management.blogContent);

  // ** handle click to select item
  const handleSelectItem = (item) => {
    // console.log(item);

    // check duplicate item select in list
    if (store?.ingredients?.length > 0) {
      let duplicateSelectItem = store.ingredients.find((ingre) => ingre.ingredientId === item.ingredientId);
      if (duplicateSelectItem == undefined) {
        // not duplicate
        selectItem(item);
      } else {
        toast.warning('Bạn đã chọn nguyên liệu này!');
      }
    } else {
      selectItem(item);
    }
  };

  const selectItem = (item) => {
    // console.log(item);
    setOpenResultBox(false);
    setSelectedItem(item);
    // setSelectedPrice(item.price);
    setSelectedAmount(item !== '' ? (item.quantity ? item.quantity : 1) : '');
    setSelectedUnit(item.unitName);
    // console.log(item);
    // console.log(selectedAmount);

    if (selectedList.length > 0) {
      let duplicateItem = selectedList.find((item) => item.itemId === id);
      if (duplicateItem == undefined) {
        // not dupplicate
        setSelectedList((prev) => [
          ...prev,
          {
            item,
            itemId: id,
            amount: selectedAmount !== '' ? selectedAmount : 1,
            description: description,
            unitName: item.unitName,
          },
        ]);
      } else {
        // dupplicate
        setSelectedAmount(selectedAmount !== '' ? selectedAmount : 1);
        setSelectedList((current) => current.filter((item) => item.itemId !== duplicateItem.itemId));
        setSelectedList((prev) => [
          ...prev,
          {
            item,
            itemId: duplicateItem.itemId,
            amount: selectedAmount !== '' ? selectedAmount : 1,
            description: description,
            unitName: item.unitName,
          },
        ]);
      }
    } else {
      setSelectedList((prev) => [
        ...prev,
        {
          item,
          itemId: id,
          amount: selectedAmount !== '' ? selectedAmount : item.quantity ? item.quantity : 1,
          description: description,
          unitName: item.unitName,
        },
      ]);
    }
  };

  // ** handle get edit data name
  useEffect(() => {
    if (editItem) {
      // setSelectedItem(editItem.ingredient);
      selectItem({
        ingredientId: editItem.ingredientId,
        kcal: editItem?.kcal,
        name: editItem?.name || editItem?.ingredientName,
        price: editItem?.price,
        quantity: editItem?.quantity,
        unitName: editItem?.unitName,
      });
      setSelectedAmount(editItem.quantity);
      setDescription(editItem.description);
    }
  }, []);
  // ** handle change item amount
  const handleChangeItemAmount = (amount) => {
    if (amount !== '') {
      let duplicateItem = selectedList.find((item) => item?.itemId === id);
      let item = duplicateItem?.item;
      setSelectedList((current) => current.filter((item) => item?.itemId !== duplicateItem?.itemId));
      setSelectedList((prev) => [
        ...prev,
        {
          item,
          itemId: duplicateItem?.itemId,
          amount: parseInt(amount),
          description: duplicateItem?.description,
          unitName: duplicateItem?.unitName,
        },
      ]);
    }
  };

  // ** handle change item description
  const handleChangeItemDescription = (description) => {
    if (description !== '') {
      let duplicateItem = selectedList.find((item) => item.itemId === id);
      let item = duplicateItem?.item;
      setSelectedList((current) => current.filter((item) => item.itemId !== duplicateItem.itemId));
      setSelectedList((prev) => [
        ...prev,
        {
          item,
          itemId: duplicateItem?.itemId,
          amount: duplicateItem?.amount,
          description: description,
          unitName: duplicateItem?.unitName,
        },
      ]);
    }
  };
  return (
    <div className="pb-3 flex items-center">
      <div className="w-4">{index + 1}.</div>
      <div className="flex md:flex-row flex-col md:items-center gap-2 relative">
        <input
          type="search"
          disabled
          placeholder="Tên nguyên liệu"
          value={selectedItem?.name}
          required
          className="outline-none w-[150px] bg-gray-300 rounded-md py-1 pl-2 font-medium text-[#898989]"
        />
        {/* {selectedUnit !== '' && <p className="text-[#898989] w-[50px]">({selectedUnit})</p>} */}
        <input
          placeholder="Số lượng"
          required
          disabled={selectedItem !== '' ? false : true}
          onChange={(e) => {
            setSelectedAmount(e.target.value);
            handleChangeItemAmount(e.target.value);
          }}
          value={selectedAmount}
          onKeyDown={handleKeyDown}
          type="number"
          className={`${
            selectedItem !== '' ? '' : 'cursor-not-allowed'
          } outline-none w-[110px] bg-white rounded-md py-1 pl-2 font-medium text-[#898989]`}
        />
        <input
          disabled={selectedItem !== '' ? false : true}
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          onBlur={(e) => {
            handleChangeItemDescription(e.target.value);
          }}
          placeholder="Mô tả"
          required
          className={`${
            selectedItem !== '' ? '' : 'cursor-not-allowed'
          } outline-none w-fit bg-white rounded-md py-1 pl-2`}
        />
      </div>
    </div>
  );
};

export default Item;
