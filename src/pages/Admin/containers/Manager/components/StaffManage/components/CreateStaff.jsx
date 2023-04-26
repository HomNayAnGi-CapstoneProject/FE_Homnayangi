import { useState } from 'react';
import instances from '../../../../../../../utils/plugin/axios';
import {
  ReGex_VietnameseTitle,
  Regex_PhoneNumber,
  Regex_Password,
  Regex_Email,
} from '../../../../../../../utils/regex';

// ** Assets
import defaultImage from '../../../../../../../assets/images/default_user.png';

// ** Library
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { storage } from '../../../../../../../firebase';
import { ref, uploadBytes, listAll, getDownloadURL, deleteObject } from 'firebase/storage';

const CreateStaff = () => {
  // ** Const
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

  const notifyError = (error) =>
    toast.error(error, {
      pauseOnHover: false,
      position: 'top-center',
      autoClose: 2000,
    });

  const notiSuccess = (msg) => {
    toast.success(msg, { pauseOnHover: false });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [creating, setCreating] = useState(false);
  const folderID = crypto.randomUUID();
  const [avatar, setAvatar] = useState();
  const [activeGener, setActiveGener] = useState(1);

  // ** Functs
  //submit form
  const onSubmit = (data) => {
    // console.log(data);
    setCreating(true);
    instances
      .post('/users', {
        username: data.username,
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        phonenumber: data.phonenumber,
        gender: data.gender,
        displayname: data.displayname,
        avatar: null,
      })
      .then((res) => {
        if (res.data.status == 'failed') {
          notifyError('Có lỗi xảy ra khi tạo mới nhân viên');
          setCreating(false);
        } else {
          notiSuccess('Đã tạo thành công! 👌');
          setCreating(false);
          navigate('/management/staff-manage');
        }
      });
    // toast.promise(
    //   {
    //     pending: 'Đang tạo mới',
    //     success: 'Đã tạo thành công! 👌',
    //     error: 'Có lỗi xảy ra khi tạo mới nhân viên',
    //   },
    // );
  };

  return (
    <div>
      <p className="font-semibold text-[18px]">Thêm nhân viên</p>
      <div className="bg-white py-5 px-5 rounded-[5px] mt-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-5">
            <div className="w-full">
              {/* first name */}
              <label>Tên nhân viên</label>
              <input
                name="firstname"
                // placeholder="Tên đăng nhập"
                className={`block mt-2 w-full h-[47px] ${
                  errors?.firstname ? 'mb-[5px]' : 'mb-[20px]'
                } p-[12px] text-subText sm:text-md  border border-[#B9B9B9] rounded-[5px] focus:outline-primary`}
                {...register('firstname', {
                  required: true,
                  pattern: {
                    value: ReGex_VietnameseTitle,
                  },
                })}
              />
              {errors?.firstname?.type === 'required' && (
                <p className="mb-[5px] text-redError text-[14px]">Họ không được trống</p>
              )}
              {errors?.firstname?.type === 'pattern' && (
                <p className="mb-[5px] text-redError text-[14px]">Họ không hợp lệ</p>
              )}
            </div>

            <div className="w-full">
              {/* last name */}
              <label>Họ nhân viên</label>
              <input
                name="lastname"
                // placeholder="Tên đăng nhập"
                className={`block mt-2 w-full h-[47px] ${
                  errors?.lastname ? 'mb-[5px]' : 'mb-[20px]'
                } p-[12px] text-subText sm:text-md  border border-[#B9B9B9] rounded-[5px] focus:outline-primary`}
                {...register('lastname', {
                  required: true,
                  pattern: {
                    value: ReGex_VietnameseTitle,
                  },
                })}
              />
              {errors?.lastname?.type === 'required' && (
                <p className="mb-[5px] text-redError text-[14px]">Họ không được trống</p>
              )}
              {errors?.lastname?.type === 'pattern' && (
                <p className="mb-[5px] text-redError text-[14px]">Họ không hợp lệ</p>
              )}
            </div>
          </div>

          {/* email */}
          <label>Email</label>
          <input
            name="email"
            // placeholder="Tên đăng nhập"
            className={`block mt-2 w-full h-[47px] ${
              errors?.email ? 'mb-[5px]' : 'mb-[20px]'
            } p-[12px] text-subText sm:text-md  border border-[#B9B9B9] rounded-[5px] focus:outline-primary`}
            {...register('email', {
              required: true,
              pattern: {
                value: Regex_Email,
              },
            })}
          />
          {errors?.email?.type === 'required' && (
            <p className="mb-[5px] text-redError text-[14px]">Email không được trống</p>
          )}
          {errors?.email?.type === 'pattern' && (
            <p className="mb-[5px] text-redError text-[14px]">Email không hợp lệ</p>
          )}

          {/* gender */}
          <p className="mb-2">Giới tính</p>
          <Select
            MenuProps={MenuProps}
            value={activeGener}
            onChange={(e) => setActiveGener(e.target.value)}
            displayEmpty
            // renderValue={activeGener !== '' ? undefined : () => <p className="text-[#898989]">Chọn phường/xã</p>}
            inputProps={{ ...register('gender', { required: true }) }}
            className={`block w-full h-[47px] ${
              errors?.gender ? 'mb-[5px]' : 'mb-[20px]'
            } p-[12px] text-subText sm:text-md  border rounded-[5px] focus:outline-primary`}
          >
            <MenuItem value={1}>Nam</MenuItem>
            <MenuItem value={0}>Nữ</MenuItem>
            {/* <MenuItem value={2}>Khác</MenuItem> */}
          </Select>
          {errors?.gender?.type === 'required' && (
            <p className="mb-[5px] text-redError text-[14px]">Vui lòng chọn giới tính</p>
          )}

          {/* phonenumber */}

          <p className="mb-2">Số điện thoại</p>
          <input
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

          <div className="flex gap-5">
            <div className="w-full">
              {/* username */}
              <label>Tên đăng nhập</label>
              <input
                name="username"
                // placeholder="Tên đăng nhập"
                className={`block mt-2 w-full h-[47px] ${
                  errors?.username ? 'mb-[5px]' : 'mb-[20px]'
                } p-[12px] text-subText sm:text-md  border border-[#B9B9B9] rounded-[5px] focus:outline-primary`}
                {...register('username', {
                  required: true,
                  // pattern: {
                  //   value: ReGex_VietnameseTitle,
                  // },
                })}
              />
              {errors?.username?.type === 'required' && (
                <p className="mb-[5px] text-redError text-[14px]">Tên người dùng không được trống</p>
              )}
              {errors?.username?.type === 'pattern' && (
                <p className="mb-[5px] text-redError text-[14px]">Tên người dùng không hợp lệ</p>
              )}
            </div>
            <div className="w-full">
              {/* displaynem */}
              <label>Tên hiển thị</label>
              <input
                name="displayname"
                // placeholder="Tên đăng nhập"
                className={`block mt-2 w-full h-[47px] ${
                  errors?.displayname ? 'mb-[5px]' : 'mb-[20px]'
                } p-[12px] text-subText sm:text-md  border border-[#B9B9B9] rounded-[5px] focus:outline-primary`}
                {...register('displayname', {
                  required: true,
                  // pattern: {
                  //   value: ReGex_VietnameseTitle,
                  // },
                })}
              />
              {errors?.displayname?.type === 'required' && (
                <p className="mb-[5px] text-redError text-[14px]">Tên hiển thị không được trống</p>
              )}
              {errors?.displayname?.type === 'pattern' && (
                <p className="mb-[5px] text-redError text-[14px]">Tên hiển thị không hợp lệ</p>
              )}
            </div>
          </div>

          <button
            disabled={creating ? true : false}
            type="submit"
            className={`${
              creating ? 'cursor-not-allowed' : ''
            } w-full rounded-[5px] mt-[20px] text-white font-semibold text-center bg-primary hover:bg-primaryHover transition py-2`}
          >
            Xác nhận
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateStaff;
