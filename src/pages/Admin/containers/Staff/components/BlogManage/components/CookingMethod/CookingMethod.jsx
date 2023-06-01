import { useState, useEffect } from 'react';
import instances from '../../../../../../../../utils/plugin/axios';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

// ** Redux
import { useDispatch, useSelector } from 'react-redux';
import { setContentBlog } from '../../../../../../../../redux/actionSlice/managementSlice';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const CookingMethod = () => {
  const dispatch = useDispatch();
  const contentBlog = useSelector((state) => state.management.blogContent);

  const [cookingMethods, setCookingMethods] = useState();
  const [activeMethod, setActiveMethod] = useState('');

  const handleChangeMethod = (event) => {
    // console.log(event.target);
    dispatch(setContentBlog({ cookingMethodId: event.target.value }));
    setActiveMethod(event.target.value);
  };

  // ** get edit cookingMethod
  useEffect(() => {
    if (cookingMethods?.length > 0) {
      let existCookingMethod = cookingMethods.find((c) => c.cookingMethodId == contentBlog.cookingMethodId);
      if (existCookingMethod) {
        setActiveMethod(existCookingMethod.cookingMethodId);
      }
    }
  }, [contentBlog?.cookingMethodId]);

  useEffect(() => {
    const fetch = async () => {
      const res = await instances.get('/cookingmethod/dropdown-cooking-method');
      setCookingMethods(res.data.result);
    };

    fetch();
  }, []);

  return (
    <div className="flex items-center gap-2">
      {/* <select
        className={`block mt-2 h-[47px] p-[12px] text-subText sm:text-md max-h-[100px] overflow-y-scroll border border-[#B9B9B9] rounded-[5px] focus:outline-primary`}
      >
        <option value="">Phương thức nấu</option>
        {cookingMethods &&
          cookingMethods.map((method) => (
            <option key={method.cookingMethodId} value={method.cookingMethodId}>
              {method.cookingMethodName}
            </option>
          ))}
      </select> */}
      <Select
        MenuProps={MenuProps}
        value={activeMethod}
        onChange={handleChangeMethod}
        displayEmpty
        renderValue={activeMethod !== '' ? undefined : () => <p className="text-[#898989]">Phương thức nấu</p>}
        inputProps={
          {
            // ...register('districts', { required: true }),
          }
        }
        className={`block w-full h-[47px] p-[12px] text-subText sm:text-md  border rounded-[5px] focus:outline-primary`}
      >
        {cookingMethods?.length > 0 ? (
          cookingMethods.map((item, i) => (
            <MenuItem key={item.cookingMethodId} value={item.cookingMethodId}>
              {item.cookingMethodName}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>
            <em>Chưa có dữ liệu</em>
          </MenuItem>
        )}
      </Select>
    </div>
  );
};

export default CookingMethod;
