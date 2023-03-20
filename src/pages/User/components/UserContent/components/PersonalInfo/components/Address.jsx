import { useState, useEffect } from 'react';
import { Regex_PhoneNumber, ReGex_VietnameseTitle } from '../../../../../../../utils/regex';

// ** assets
import noAddressImg from '../../../../../../../assets/images/no_address.png';
import { ic_close_modal } from '../../../../../../../assets';

// ** third party
import { useForm } from 'react-hook-form';
import { Modal } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';

const Address = () => {
  // ** const
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
  const [openModal, setOpenModal] = useState(false);
  const [activeDistricts, setActiveDistricts] = useState('');
  const [districts, setDistricts] = useState([]);
  const [activeProvinces, setActiveProvinces] = useState('');
  const [provinces, setProvinces] = useState([]);
  const [activeWards, setActiveWards] = useState('');
  const [wards, setWards] = useState([]);
  const [checkedAddress, setCheckedAddress] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // ** funct
  const onSubmit = (data) => {
    console.log(data);
  };

  const handleChangeProvinces = (event) => {
    // console.log(event.target.value);
    setActiveProvinces(event.target.value);
  };

  const handleChangeDistricts = (event) => {
    // console.log(event.target.value);
    setActiveDistricts(event.target.value);
  };

  const handleChangeWards = (event) => {
    // console.log(event.target.value);
    setActiveWards(event.target.value);
  };

  const handleChangeAddress = (event) => {
    setCheckedAddress(event.target.checked);
  };

  return (
    <>
      {
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <div
            className="fixed left-[50%]
        top-[50%] translate-y-[-50%] translate-x-[-50%] bg-white rounded-[5px] min-w-[500px] p-5"
          >
            <div className="flex justify-between">
              <p className="font-medium text-[18px]">Địa chỉ mới</p>
              <button onClick={() => setOpenModal(false)}>
                <img alt="" src={ic_close_modal} className="w-[20px] object-cover" />
              </button>
            </div>
            <div className="mt-5">
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* name and phone number */}
                <div className="flex items-center gap-3 justify-between">
                  <div className="flex-1">
                    <input
                      name="name"
                      placeholder="Họ và tên"
                      className={`block w-full h-[47px] ${
                        errors?.name ? 'mb-[5px]' : 'mb-[20px]'
                      } p-[12px] text-subText sm:text-md  border border-[#B9B9B9] rounded-[5px] focus:outline-primary`}
                      {...register('name', {
                        required: true,
                        pattern: {
                          value: ReGex_VietnameseTitle,
                        },
                      })}
                    />
                    {errors?.name?.type === 'required' && (
                      <p className="mb-[5px] text-redError text-[14px]">Họ và tên không được trống</p>
                    )}
                    {errors?.name?.type === 'pattern' && (
                      <p className="mb-[5px] text-redError text-[14px]">Họ và tên không hợp lệ</p>
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      placeholder="Số điện thoại"
                      type="number"
                      name="phonenumber"
                      className={`block w-full h-[47px] ${
                        errors?.phonenumber ? 'mb-[5px]' : 'mb-[20px]'
                      } p-[12px] text-subText sm:text-md  border border-[#B9B9B9] rounded-[5px] focus:outline-primary`}
                      {...register('phonenumber', {
                        required: true,
                        minLength: 10,
                        maxLength: 11,
                        pattern: {
                          value: Regex_PhoneNumber,
                        },
                      })}
                    />
                    {errors?.phonenumber?.type === 'required' && (
                      <p className="mb-[5px] text-redError text-[14px]">Số điện thoại không được trống</p>
                    )}
                    {(errors?.phonenumber?.type === 'maxLength' ||
                      errors?.phonenumber?.type === 'minLength' ||
                      errors?.phonenumber?.type === 'pattern') && (
                      <p className="mb-[5px] text-redError text-[14px]">Số điện thoại không hợp lệ</p>
                    )}
                  </div>
                </div>
                {/* address */}
                <div className="flex items-center gap-3 justify-between">
                  {/* provinces  */}
                  {/* <div className="flex-1">
                    <Select
                      MenuProps={MenuProps}
                      value={activeProvinces}
                      onChange={handleChangeProvinces}
                      displayEmpty
                      renderValue={
                        activeProvinces !== '' ? undefined : () => <p className="text-[#898989]">Chọn tỉnh/thành</p>
                      }
                      inputProps={{ ...register('provinces', { required: true }) }}
                      className={`block w-full h-[47px] ${
                        errors?.provinces ? 'mb-[5px]' : 'mb-[20px]'
                      } p-[12px] text-subText sm:text-md  border rounded-[5px] focus:outline-primary`}
                    >
                      {provinces.length > 0 ? (
                        provinces.map((item, i) => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.name}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem disabled>
                          <em>Chưa có dữ liệu</em>
                        </MenuItem>
                      )}
                    </Select>
                    {errors?.provinces?.type === 'required' && (
                      <p className="mb-[5px] text-redError text-[14px]">Vui lòng chọn tỉnh/thành của bạn</p>
                    )}
                  </div> */}
                  {/* districts  */}
                  <div className="flex-1">
                    <Select
                      MenuProps={MenuProps}
                      value={activeDistricts}
                      onChange={handleChangeDistricts}
                      displayEmpty
                      renderValue={
                        activeDistricts !== '' ? undefined : () => <p className="text-[#898989]">Chọn quận/huyện</p>
                      }
                      inputProps={{ ...register('districts', { required: true }) }}
                      className={`block w-full h-[47px] ${
                        errors?.districts ? 'mb-[5px]' : 'mb-[20px]'
                      } p-[12px] text-subText sm:text-md  border rounded-[5px] focus:outline-primary`}
                    >
                      {districts.length > 0 ? (
                        districts.map((item, i) => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.name}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem disabled>
                          <em>Chưa có dữ liệu</em>
                        </MenuItem>
                      )}
                    </Select>
                    {errors?.districts?.type === 'required' && (
                      <p className="mb-[5px] text-redError text-[14px]">Vui lòng chọn tỉnh/thành của bạn</p>
                    )}
                  </div>
                  {/* wards  */}
                  <div className="flex-1">
                    <Select
                      MenuProps={MenuProps}
                      value={activeWards}
                      onChange={handleChangeWards}
                      displayEmpty
                      renderValue={
                        activeWards !== '' ? undefined : () => <p className="text-[#898989]">Chọn phường/xã</p>
                      }
                      inputProps={{ ...register('wards', { required: true }) }}
                      className={`block w-full h-[47px] ${
                        errors?.wards ? 'mb-[5px]' : 'mb-[20px]'
                      } p-[12px] text-subText sm:text-md  border rounded-[5px] focus:outline-primary`}
                    >
                      {wards.length > 0 ? (
                        wards.map((item, i) => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.name}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem disabled>
                          <em>Chưa có dữ liệu</em>
                        </MenuItem>
                      )}
                    </Select>
                    {errors?.wards?.type === 'required' && (
                      <p className="mb-[5px] text-redError text-[14px]">Vui lòng chọn tỉnh/thành của bạn</p>
                    )}
                  </div>
                </div>
                {/* specific address */}
                <div>
                  <textarea
                    placeholder="Địa chỉ cụ thể"
                    name="specificAddress"
                    // onBlur={(e) => props?.handleInputNote(e.target.value)}
                    rows="3"
                    className="mt-1 p-2.5 w-full text-gray-900 bg-white rounded border border-gray-400
            focus:outline-none focus:bg-white focus:border-primary resize-none"
                    {...register('specificAddress', {
                      required: true,
                    })}
                  ></textarea>
                  {errors?.specificAddress?.type === 'required' && (
                    <p className="mb-[5px] text-redError text-[14px]">Mô tả không được trống</p>
                  )}
                </div>
                {/* check box */}
                <div>
                  <div class="flex items-center">
                    <input
                      id="checked-checkbox"
                      type="checkbox"
                      {...register('defaultAddress')}
                      className="w-4 h-4 text-primary bg-primary border-primary rounded-[5px] "
                    />
                    <label for="checked-checkbox" className="ml-2 font-medium text-[#898989]">
                      Đặt làm địa chỉ mặc định
                    </label>
                  </div>
                </div>
                {/* button */}
                <div className="flex justify-end mt-2">
                  <button type="submit" className="text-white font-medium bg-primary rounded-[5px] px-4 py-2">
                    Xác nhận
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Modal>
      }
      <div className="w-full h-fit bg-white rounded-[5px] py-5 px-6">
        <div className="pb-[10px] border-b border-b-[#d1d1d1] flex justify-between items-center">
          <p className="text-black text-[18px] font-medium">Địa Chỉ</p>
          <button
            onClick={() => setOpenModal(true)}
            className="text-white font-medium bg-primary rounded-[5px] px-5 py-2"
          >
            Thêm địa chỉ mới
          </button>
        </div>
        {/* content */}
        <div>
          <div className="mt-5 flex flex-col items-center justify-center gap-3">
            <img alt="no_address" src={noAddressImg} className="w-[120px] h-[120px] object-cover" />
            <p className="text-[#898989] font-medium">Bạn chưa thêm địa chỉ</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Address;
