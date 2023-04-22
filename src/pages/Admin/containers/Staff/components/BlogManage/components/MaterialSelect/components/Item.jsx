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
    // selectedAmount,
    // setSelectedAmount,
  } = props;
  const [selectedItem, setSelectedItem] = useState('');
  const [selectedAmount, setSelectedAmount] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('');
  const [description, setDescription] = useState('');
  const [openResultBox, setOpenResultBox] = useState(false);
  const [searchResult, setSearchResult] = useState('');
  const [searchInput, setSearchhInput] = useState(null);
  const [loading, setLoading] = useState(false);
  const debounced = useDebounce(searchInput, 600);
  const store = useSelector((state) => state.management.blogContent);

  // ** call api
  useEffect(() => {
    if (debounced !== '') {
      if (!debounced?.trim()) {
        return;
      }
      setOpenResultBox(true);
      setLoading(true);
      setSearchResult('');

      const fetch = async () => {
        setSearchResult('');
        const res = await instances.get('/ingredients/ingredient-searching', {
          params: {
            name: debounced,
          },
        });
        setLoading(false);
        // console.log(res.data.result);
        setSearchResult(res.data.result);
      };
      fetch();

      // console.log(searchInput);
    }
  }, [debounced]);

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
    // setOpenResultBox(false);
    // setSelectedItem(item);
    // setSelectedPrice(item.price);
    // setSelectedAmount(item !== '' ? 1 : '');

    // if (selectedList.length > 0) {
    //   let duplicateItem = selectedList.find((item) => item.itemId === id);
    //   if (duplicateItem == undefined) {
    //     // not dupplicate
    //     setSelectedList((prev) => [
    //       ...prev,
    //       { item, itemId: id, amount: selectedAmount !== '' ? selectedAmount : 1, description: description },
    //     ]);
    //   } else {
    //     // dupplicate
    //     setSelectedList((current) => current.filter((item) => item.itemId !== duplicateItem.itemId));
    //     setSelectedList((prev) => [
    //       ...prev,
    //       {
    //         item,
    //         itemId: duplicateItem.itemId,
    //         amount: selectedAmount !== '' ? selectedAmount : 1,
    //         description: description,
    //       },
    //     ]);
    //   }
    // } else {
    //   setSelectedList((prev) => [
    //     ...prev,
    //     { item, itemId: id, amount: selectedAmount !== '' ? selectedAmount : 1, description: description },
    //   ]);
    // }
  };

  const selectItem = (item) => {
    setOpenResultBox(false);
    setSelectedItem(item);
    setSelectedPrice(item.price);
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
          { item, itemId: id, amount: selectedAmount !== '' ? selectedAmount : 1, description: description },
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
        },
      ]);
    }
  };

  // ** handle get edit data name
  useEffect(() => {
    // console.log(editItem);
    if (editItem) {
      // setSelectedItem(editItem.ingredient);
      selectItem({
        ingredientId: editItem.ingredientId,
        kcal: editItem?.kcal,
        name: editItem?.ingredientName,
        price: editItem?.price,
        quantity: editItem?.quantity,
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
        { item, itemId: duplicateItem?.itemId, amount: parseInt(amount), description: duplicateItem?.description },
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
        { item, itemId: duplicateItem?.itemId, amount: duplicateItem?.amount, description: description },
      ]);
    }
  };

  const desciptionDebounce = useDebounce(description, 600);
  useEffect(() => {
    if (desciptionDebounce !== '') {
      // if (!desciptionDebounce?.trim()) {
      //   return;
      // }
      handleChangeItemDescription(desciptionDebounce);
    }
  }, [desciptionDebounce]);

  return (
    <div className="pb-3 flex items-center">
      <div className="w-4">{index + 1}.</div>
      <div className="flex items-center gap-2 relative">
        <input
          type="search"
          onChange={(e) => {
            setSearchhInput(e.target.value);
            setSelectedItem(e.target.value);
            if (e.target.value == '') {
              setSelectedAmount('');
            }
          }}
          placeholder="Tên nguyên liệu"
          value={selectedItem?.name}
          required
          className="outline-none w-[150px] bg-white rounded-md py-1 pl-2 font-medium text-[#898989]"
        />
        {selectedUnit !== '' && <p className="text-[#898989] w-[50px]">({selectedUnit})</p>}
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
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          onBlur={(e) => {
            // handleChangeItemDescription(e.target.value);
          }}
          placeholder="Mô tả"
          required
          className="outline-none w-fit bg-white rounded-md py-1 pl-2"
        />
        <div
          className={`${
            searchInput?.length > 0 && openResultBox == true ? 'block' : 'hidden'
          } absolute top-10 w-full bg-white z-[999] overflow-y-scroll max-h-[175px] scroll-bar rounded-[5px] drop-shadow-xl py-[10px]`}
        >
          <OutsideClickHandler onOutsideClick={() => setOpenResultBox(false)}>
            <div>
              {loading == false ? (
                <>
                  {searchResult !== '' ? (
                    searchResult?.map((item) => (
                      <div onClick={() => handleSelectItem(item)} key={item.ingredientId}>
                        <ResultSearch data={item} />
                      </div>
                    ))
                  ) : (
                    <div className="text-black px-[20px] text-[14px]">Không tìm thấy kết quả!</div>
                  )}
                </>
              ) : (
                <div className="px-[20px] flex justify-center">
                  <div
                    className="w-[20px] h-[20px] bg-cover animate-spin"
                    style={{ backgroundImage: `url(${ic_loading})` }}
                  />
                </div>
              )}
            </div>
          </OutsideClickHandler>
        </div>
      </div>
      <button onClick={() => handleRemoveItem(id)} className="p-1 ml-3 rounded-full bg-redError">
        <img className="w-[20px] transform rotate-[45deg]" src={ic_plus_white} />
      </button>
    </div>
  );
};

export default Item;
