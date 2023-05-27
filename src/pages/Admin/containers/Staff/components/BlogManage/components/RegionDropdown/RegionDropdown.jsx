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

const RegionDropdown = () => {
  const dispatch = useDispatch();

  const [regions, setRegions] = useState();
  const [activeRegion, setActiveRegion] = useState('');

  const handleChangeRegion = (event) => {
    // console.log(event.target);
    dispatch(setContentBlog({ regionId: event.target.value }));
    setActiveRegion(event.target.value);
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await instances.get('/region/dropdown-region');
      setRegions(res.data.result);
    };

    fetch();
  }, []);

  return (
    <div className="flex items-center gap-2">
      {/* <label>Vùng miền</label> */}
      {/* <select
        className={`block mt-2 h-[47px] p-[12px] text-subText sm:text-md max-h-[100px] overflow-y-scroll border border-[#B9B9B9] rounded-[5px] focus:outline-primary`}
      >
        <option value="">Vùng miền</option>
        {regions &&
          regions.map((region) => (
            <option key={region.regionId} value={region.regionId}>
              {region.regionName}
            </option>
          ))}
      </select> */}
      <Select
        MenuProps={MenuProps}
        value={activeRegion}
        onChange={handleChangeRegion}
        displayEmpty
        renderValue={activeRegion !== '' ? undefined : () => <p className="text-[#898989]">Vùng miền</p>}
        inputProps={
          {
            // ...register('districts', { required: true }),
          }
        }
        className={`block w-full h-[47px] p-[12px] text-subText sm:text-md  border rounded-[5px] focus:outline-primary`}
      >
        {regions?.length > 0 ? (
          regions.map((item, i) => (
            <MenuItem key={item.regionId} value={item.regionId}>
              {item.regionName}
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

export default RegionDropdown;
