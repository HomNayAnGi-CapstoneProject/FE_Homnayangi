import { useEffect, useState } from 'react';
import instances from '../../../../../../../../utils/plugin/axios';
import { Regex_Password } from '../../../../../../../../utils/regex';
import { ic_eye_gray, ic_eye_closed } from '../../../../../../../../assets';
import { setAccountInfo } from '../../../../../../../../redux/actionSlice/accountSlice';

// ** third party
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const UpdatePassForm = () => {
  // ** const
  const notifyError = (error) =>
    toast.error(error, {
      pauseOnHover: false,
      position: 'top-center',
      autoClose: 2000,
    });
  const notifySuccess = (mess) =>
    toast.success(mess, {
      pauseOnHover: false,
      position: 'top-center',
      autoClose: 2000,
    });
  const [updating, setUpdating] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [newPasswordShown, setNewPasswordShown] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // ** submit password form
  const onSubmit = (data) => {
    // console.log(data);
    setUpdating(true);
    toast.promise(
      instances
        .put('/personal-customer/password', {
          oldPassword: data.oldPassword,
          newPassword: data.newPassword.trim(),
        })
        .then((res) => {
          notifySuccess('Cập nhật mật khẩu thành công');
          handleLogout();
          setUpdating(false);
        })
        .catch((err) => {
          notifyError('Mật khẩu hiện tại không đúng');
          setUpdating(false);
        }),
      {
        pending: 'Đang cập nhật',
        // success: 'Đã cập nhật thành công! 👌',
        error: {
          render({ data }) {
            // return data.response;
          },
        },
      },
    );
  };

  const togglePasswordVisiblity = () => {
    setPasswordShown((prev) => !prev);
  };

  const handleLogout = async () => {
    localStorage.removeItem('accessToken');
    navigate('/login');
    dispatch(setAccountInfo({}));
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex sm:flex-row flex-col-reverse">
          <div className="flex-1">
            {/* old password */}
            <div className="md:flex md:items-center">
              <div className="md:w-1/3">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-3 pr-4">
                  Mật khẩu hiện tại
                </label>
              </div>
              <div className="md:w-2/3">
                <div className="relative">
                  <input
                    type={passwordShown ? 'text' : 'password'}
                    name="oldPassword"
                    placeholder="Mật khẩu"
                    className={`block mt-2 w-full h-[47px] ${
                      errors?.oldPassword ? 'mb-[5px]' : 'mb-[20px]'
                    } p-[12px] text-subText sm:text-md  border border-[#B9B9B9] rounded-[5px] focus:outline-primary`}
                    {...register('oldPassword', {
                      required: true,
                      minLength: 6,
                      maxLength: 20,
                      pattern: {
                        value: Regex_Password,
                      },
                    })}
                  />
                  <div
                    onClick={() => togglePasswordVisiblity()}
                    className="w-[26px] h-[26px] bg-cover cursor-pointer absolute right-[10px] bottom-[10px]"
                    style={{ backgroundImage: `url(${passwordShown ? ic_eye_gray : ic_eye_closed})` }}
                  />
                </div>
                {errors?.oldPassword?.type === 'required' && (
                  <p className="mb-[5px] text-redError text-[14px]">Mật khẩu không được trống</p>
                )}
                {errors?.oldPassword?.type === 'pattern' && (
                  <p className="mb-[5px] text-redError text-[14px]">Mật khẩu không hợp lệ</p>
                )}
                {(errors?.oldPassword?.type === 'minLength' || errors?.oldPassword?.type === 'maxLength') && (
                  <p className="mb-[5px] text-redError text-[14px]">Độ dài mật khẩu từ 6 - 20 ký tự</p>
                )}
              </div>
            </div>
            {/* new password */}
            <div className="md:flex md:items-center">
              <div className="md:w-1/3">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-3 pr-4">Mật khẩu mới</label>
              </div>
              <div className="md:w-2/3">
                <div className="relative">
                  <input
                    type={newPasswordShown ? 'text' : 'password'}
                    name="newPassword"
                    placeholder="Mật khẩu"
                    className={`block mt-2 w-full h-[47px] ${
                      errors?.newPassword ? 'mb-[5px]' : 'mb-[20px]'
                    } p-[12px] text-subText sm:text-md  border border-[#B9B9B9] rounded-[5px] focus:outline-primary`}
                    {...register('newPassword', {
                      required: true,
                      minLength: 6,
                      maxLength: 20,
                      pattern: {
                        value: Regex_Password,
                      },
                    })}
                  />
                  <div
                    onClick={() => setNewPasswordShown((prev) => !prev)}
                    className="w-[26px] h-[26px] bg-cover cursor-pointer absolute right-[10px] bottom-[10px]"
                    style={{ backgroundImage: `url(${newPasswordShown ? ic_eye_gray : ic_eye_closed})` }}
                  />
                </div>
                {errors?.newPassword?.type === 'required' && (
                  <p className="mb-[5px] text-redError text-[14px]">Mật khẩu không được trống</p>
                )}
                {errors?.newPassword?.type === 'pattern' && (
                  <p className="mb-[5px] text-redError text-[14px]">Mật khẩu không hợp lệ</p>
                )}
                {(errors?.newPassword?.type === 'minLength' || errors?.newPassword?.type === 'maxLength') && (
                  <p className="mb-[5px] text-redError text-[14px]">Độ dài mật khẩu từ 6 - 20 ký tự</p>
                )}
              </div>
            </div>
            {/* button */}
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
          <div className="flex-1"></div>
        </div>
      </form>
    </div>
  );
};

export default UpdatePassForm;
