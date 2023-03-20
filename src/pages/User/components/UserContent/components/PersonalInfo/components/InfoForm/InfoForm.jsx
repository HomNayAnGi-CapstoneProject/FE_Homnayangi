import { useEffect, useState } from 'react';
import instances from '../../../../../../../../utils/plugin/axios';
import defaultImage from '../../../../../../../../assets/images/default_user.png';
import { ReGex_VietnameseTitle, Regex_PhoneNumber, Regex_Password } from '../../../../../../../../utils/regex';
import Loading from '../../../../../../../../share/components/Admin/Loading';
import { storage } from '../../../../../../../../firebase';
import { ref, uploadBytes, listAll, getDownloadURL, deleteObject } from 'firebase/storage';
import UpdatePassForm from './UpdatePassForm';

// ** third party
import { useForm } from 'react-hook-form';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const InfoForm = (props) => {
  // ** const
  const { userData } = props;
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
  const store = useSelector((state) => state.account);
  const [updating, setUpdating] = useState(false);
  const [avatar, setAvatar] = useState();
  const [uploading, setUploading] = useState(false);
  const folderID = crypto.randomUUID();
  const [activeGener, setActiveGener] = useState(userData?.gender);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: userData });

  // ** submit user detail form
  const onSubmit = (data) => {
    // console.log(data);
    setUploading(true);
    toast.promise(
      typeof data.avatar !== 'string'
        ? data.avatar.length > 0
          ? uploadImage(data.avatar[0]).then((res) => {
              // console.log(res);
              instances
                .put('/personal-customer', {
                  customerId: store.accountInfo.Id,
                  firstname: data.firstname,
                  lastname: data.lastname,
                  email: data.email !== '' ? data.email : undefined,
                  gender: data.gender,
                  phonenumber: data.phonenumber,
                  avatar: res,
                })
                .then((res) => {
                  setUploading(false);
                });
            })
          : // .catch((err) => {
            //   notifyError(err);
            // })
            instances
              .put('/personal-customer', {
                customerId: store.accountInfo.Id,
                firstname: data.firstname,
                lastname: data.lastname,
                email: data.email !== '' ? data.email : null,
                gender: data.gender,
                phonenumber: data.phonenumber,
                avatar: data.avatar !== '' ? data.avatar : null,
                username: data.username,
                displayname: null,
              })
              .then((res) => {
                setUploading(false);
              })
        : instances
            .put('/personal-customer', {
              customerId: store.accountInfo.Id,
              firstname: data.firstname,
              lastname: data.lastname,
              email: data.email !== '' ? data.email : null,
              gender: data.gender,
              phonenumber: data.phonenumber,
              avatar: data.avatar !== '' ? data.avatar : null,
              username: data.username,
              displayname: null,
            })
            .then((res) => {
              setUploading(false);
            }),
      {
        pending: 'Đang cập nhật thông tin',
        success: 'Đã cập nhật thành công 👌 Một số thông tin sẽ cập nhật sau khi đăng nhập lại',
        error: {
          render({ data }) {
            // return data;
          },
        },
      },
    );
  };

  // ** Upload image
  const uploadImage = (file) => {
    return new Promise((resolve, reject) => {
      let imageUp = file;
      if (imageUp == null || imageUp === undefined) {
        resolve(file);
        return;
      }

      // check file size and type
      if (!imageUp.name.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
        // file.target.value = null;
        setUploading(false);
        reject('Không đúng định dạng hình ảnh. Vui lòng chọn ảnh phù hợp (.jpg,.png,.jpeg)').then(() => {
          return;
        });
      }

      if (imageUp.size >= 1048575) {
        // notifyError(`Dung lượng ảnh quá lớn (${Math.round(imageUp.size / 1000000)} MB). Dụng lượng tối đa (2.5 MB)`);
        // file.target.value = null;
        setUploading(false);
        reject(`Dung lượng ảnh quá lớn (${Math.round(imageUp.size / 1000000)} MB). Dụng lượng tối đa (1 MB)`).then(
          () => {
            return;
          },
        );
      }

      //create folder and image name
      const imageRef = ref(storage, `customer/${folderID}/${imageUp.name + crypto.randomUUID()}`);
      // setUploading(true);

      //upload image
      uploadBytes(imageRef, imageUp).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          resolve(url);
          // setUploading(false);
        });
      });
    });
  };

  return (
    <div className="w-full h-fit bg-white rounded-[5px] py-5 px-6">
      <div className="pb-[10px] border-b border-b-[#d1d1d1]">
        <p className="text-black text-[18px] font-medium">Thông Tin Cá Nhân</p>
      </div>
      <div className="my-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex sm:flex-row flex-col-reverse">
            {/* left side */}
            <div className="">
              {/* first name */}
              <div className="md:flex md:items-center">
                <div className="md:w-1/3">
                  <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-3 pr-4">Họ</label>
                </div>
                <div className="md:w-2/3">
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
              </div>
              {/* last name */}
              <div className="md:flex md:items-center">
                <div className="md:w-1/3">
                  <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-3 pr-4">Tên</label>
                </div>
                <div className="md:w-2/3">
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
                    <p className="mb-[5px] text-redError text-[14px]">Tên không được trống</p>
                  )}
                  {errors?.lastname?.type === 'pattern' && (
                    <p className="mb-[5px] text-redError text-[14px]">Tên không hợp lệ</p>
                  )}
                </div>
              </div>
              {/* email */}
              <div className="md:flex md:items-center">
                <div className="md:w-1/3">
                  <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-3 pr-4">Email</label>
                </div>
                <div className="md:w-2/3">
                  <input
                    name="email"
                    disabled={store.accountInfo?.isGoogleAccount ? true : false}
                    // placeholder="Tên đăng nhập"
                    className={`block mt-2 w-full h-[47px] ${
                      errors?.email ? 'mb-[5px]' : 'mb-[20px]'
                    } p-[12px] text-subText sm:text-md  border border-[#B9B9B9] rounded-[5px] focus:outline-primary`}
                    {...register('email', {
                      // required: true,
                      // pattern: {
                      //   value: ReGex_VietnameseTitle,
                      // },
                    })}
                  />
                  {errors?.email?.type === 'required' && (
                    <p className="mb-[5px] text-redError text-[14px]">Email không được trống</p>
                  )}
                  {errors?.email?.type === 'pattern' && (
                    <p className="mb-[5px] text-redError text-[14px]">Email không hợp lệ</p>
                  )}
                </div>
              </div>
              {/* gender */}
              <div className="md:flex md:items-center">
                <div className="md:w-1/3">
                  <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-3 pr-4">Giới tính</label>
                </div>
                <div className="md:w-2/3">
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
                    <MenuItem value={2}>Khác</MenuItem>
                  </Select>
                  {errors?.gender?.type === 'required' && (
                    <p className="mb-[5px] text-redError text-[14px]">Vui lòng chọn giới tính</p>
                  )}
                </div>
              </div>
              {/* phone number */}
              <div className="md:flex md:items-center">
                <div className="md:w-1/3">
                  <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-5 pr-4">Số điện thoại</label>
                </div>
                <div className="md:w-2/3">
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
                </div>
              </div>
              {/* user name */}
              <div className="md:flex md:items-center">
                <div className="md:w-1/3">
                  <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-3 pr-4">
                    Tên người dùng
                  </label>
                </div>
                <div className="md:w-2/3">
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
              </div>
              {/* confirm button */}
              <div className="md:flex md:items-center">
                <div className="md:w-1/3"></div>
                <div className="md:w-2/3">
                  <button
                    disabled={updating ? true : false}
                    type="submit"
                    className={`${
                      updating ? 'cursor-not-allowed' : ''
                    } sm:w-fit w-full px-5 rounded-[5px] mt-[20px] text-white font-semibold text-center bg-primary hover:bg-primaryHover transition py-2`}
                  >
                    Xác nhận
                  </button>
                </div>
              </div>
            </div>
            {/* right side */}
            <div className="flex-1 flex justify-center">
              <div className="flex flex-col items-center">
                <img
                  className="w-[110px] h-[110px] mt-5 object-cover rounded-full"
                  src={avatar ? URL.createObjectURL(avatar) : userData.avatar ? userData.avatar : defaultImage}
                  alt="default-img"
                />
                <label
                  htmlFor="avatar"
                  className="cursor-pointer w-fit bg-white border-primary border-[2px] rounded-[5px] text-primary font-medium py-2 px-3 mt-5"
                >
                  {!avatar ? 'Chọn ảnh đại diện' : 'Thay đổi'}
                  <input
                    name="avatar"
                    id="avatar"
                    style={{ display: 'none' }}
                    type="file"
                    accept="image/png, image/gif, image/jpeg, image/jpg"
                    {...register('avatar', {
                      onChange: (e) => {
                        setAvatar(e.target.files[0]);
                      },
                      // required: true,
                    })}
                  />
                </label>
                <div className="mt-3">
                  <p className="text-[#999999]">Dung lượng file tối đa 1 MB</p>
                  <p className="text-[#999999]">Định dạng: ,jpeg, .png, ...</p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      {!store.accountInfo?.isGoogleAccount && (
        <>
          <div className="pb-[10px] border-b border-b-[#d1d1d1] mt-[50px]">
            <p className="text-black text-[18px] font-medium">Thông Tin Bảo Mật</p>
          </div>
          <div className="my-4">
            <UpdatePassForm />
          </div>
        </>
      )}
    </div>
  );
};

export default InfoForm;
