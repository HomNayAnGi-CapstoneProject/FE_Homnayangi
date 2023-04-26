import { useState, useEffect, useRef } from 'react';
import styles from '../../../style';
import instances from '../../../utils/plugin/axios';
import { Regex_Password, Regex_PhoneNumber, Regex_Email } from '../../../utils/regex';

// ** Assests
import loginDecor1 from '../../../assets/images/loginDecor1.webp';
import loginDecor2 from '../../../assets/images/loginDecor2.webp';
import loginDecor3 from '../../../assets/images/loginDecor3.webp';
import logo from '../../../assets/images/Logo.png';
import resetPass from '../../../assets/images/resetPass.svg';
import { ic_eye_gray, ic_eye_closed } from '../../../assets';

// ** Third party components
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import jwt_decode from 'jwt-decode';

const ResetPass = ({ title }) => {
  //** Const */
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [reseted, setReseted] = useState(false);
  const [reseting, setReseting] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordConfirmShown, setPasswordConfirmShown] = useState(false);

  const notifyError = (msg) => {
    toast.error(msg, {
      pauseOnHover: false,
    });
  };

  useEffect(() => {
    document.title = title;
  }, [title]);

  // ** Funct
  const togglePasswordVisiblity = () => {
    setPasswordShown((prev) => !prev);
  };

  const togglePasswordConfirmVisiblity = () => {
    setPasswordConfirmShown((prev) => !prev);
  };

  const onSubmit = async (data) => {
    // console.log(data.newPassword);
    try {
      setReseting(true);
      const res = await instances.put(
        '/personal-customer/password-forgotten',
        {
          newPassword: data.newPassword,
        },
        {
          params: {
            id: params?.id,
          },
        },
      );
      if (res.data.status == 'failed') {
        setReseting(false);
        notifyError('Có lỗi xảy ra');
      } else {
        setReseting(false);
        setReseted(true);
      }
    } catch (error) {
      notifyError('Có lỗi xảy ra');
    }
  };
  return (
    <div className="font-inter h-[100vh] w-full relative">
      <div className={`${styles.flexCenter}`}>
        <div className={`w-full `}>
          <div
            className="md:block hidden absolute left-0 w-[50vh] h-[100vh] bg-cover"
            style={{ backgroundImage: `url(${loginDecor1})` }}
          />
          <div
            className="absolute right-0 w-[50vh] h-[50vh] bg-cover"
            style={{ backgroundImage: `url(${loginDecor2})` }}
          />
          <div
            className=" absolute right-0 bottom-0 w-[100vh] h-[40vh] bg-cover"
            style={{ backgroundImage: `url(${loginDecor3})` }}
          />

          <div
            className="sm:w-fit w-full bg-white shadow-lg rounded-[5px] 
                    absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] z-[10] py-5 px-[40px]"
          >
            <div className="w-full flex justify-center">
              <Link to="/">
                <div
                  className="w-[80px] h-[84px] bg-contain bg-center cursor-pointer"
                  style={{ backgroundImage: `url(${logo})` }}
                />
              </Link>
            </div>
            {reseted ? (
              <div className="pt-[20px] max-w-[550px] text-center">
                <p className="text-[28px] font-bold text-black pb-6">Đã cập nhật mật khẩu</p>

                <div className="w-full flex justify-center">
                  <div className="sm:w-[300px">
                    <img alt="" className="object-cover w-full h-full" src={resetPass} />
                  </div>
                </div>
                <p className="mb-3 font-medium text-gray-500">Mật khẩu của bạn đã được cập nhật thành công!</p>

                <button
                  onClick={() => navigate('/login')}
                  // type="submit"
                  className="w-full rounded-[5px] mt-[20px] text-white font-semibold text-center bg-primary hover:bg-primaryHover transition py-2"
                >
                  Đăng nhập ngay
                </button>
              </div>
            ) : (
              <div className="login-form pt-[20px] max-w-[550px]">
                <p className="text-[28px] font-bold text-black pb-6">Tạo mật khẩu mới</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    {/* new pass */}
                    <p className="mb-3 font-medium text-gray-500">Vui lòng nhập mật khẩu mới</p>
                    <div className="relative">
                      <input
                        type={passwordShown ? 'text' : 'password'}
                        name="newPassword"
                        placeholder="Mật khẩu"
                        className={`block sm:w-[490px] w-full h-[47px] ${
                          errors?.newPassword ? 'mb-[5px]' : 'mb-[15px]'
                        } p-[12px] text-subText sm:text-md  border border-[#B9B9B9] rounded-[5px] focus:outline-primary`}
                        {...register('newPassword', {
                          // onChange: () => {
                          //   console.log(newPassRef.current);
                          // },
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
                    {errors?.newPassword?.type === 'required' && (
                      <p className="mb-[5px] text-redError text-[14px]">Mật khẩu không được trống</p>
                    )}
                    {errors?.newPassword?.type === 'pattern' && (
                      <p className="mb-[5px] text-redError text-[14px]">Mật khẩu không hợp lệ</p>
                    )}
                    {(errors?.newPassword?.type === 'minLength' || errors?.newPassword?.type === 'maxLength') && (
                      <p className="mb-[5px] text-redError text-[14px]">Độ dài mật khẩu từ 6 - 20 ký tự</p>
                    )}

                    {/* confirm pass */}
                    <p className="mb-3 font-medium text-gray-500">Nhập lại mật khẩu</p>
                    <div className="relative">
                      <input
                        type={passwordConfirmShown ? 'text' : 'password'}
                        name="confirmPass"
                        placeholder="Nhập lại mật khẩu"
                        className={`block sm:w-[490px] w-full h-[47px] ${
                          errors?.confirmPass ? 'mb-[5px]' : 'mb-[15px]'
                        } p-[12px] text-subText sm:text-md  border border-[#B9B9B9] rounded-[5px] focus:outline-primary`}
                        {...register('confirmPass', {
                          onChange: () => {
                            console.log(getValues('newPassword'));
                          },
                          required: true,
                          minLength: 6,
                          maxLength: 20,
                          validate: (value) => value === getValues('newPassword'),
                          pattern: {
                            value: Regex_Password,
                          },
                        })}
                      />

                      <div
                        onClick={() => togglePasswordConfirmVisiblity()}
                        className="w-[26px] h-[26px] bg-cover cursor-pointer absolute right-[10px] bottom-[10px]"
                        style={{ backgroundImage: `url(${passwordConfirmShown ? ic_eye_gray : ic_eye_closed})` }}
                      />
                    </div>
                    {errors?.confirmPass?.type === 'required' && (
                      <p className="mb-[5px] text-redError text-[14px]">Vui lòng nhập lại mật khẩu</p>
                    )}
                    {errors?.confirmPass?.type === 'pattern' && (
                      <p className="mb-[5px] text-redError text-[14px]">Mật khẩu không hợp lệ</p>
                    )}
                    {(errors?.confirmPass?.type === 'minLength' || errors?.confirmPass?.type === 'maxLength') && (
                      <p className="mb-[5px] text-redError text-[14px]">Độ dài mật khẩu từ 6 - 20 ký tự</p>
                    )}
                    {errors?.confirmPass?.type === 'validate' && (
                      <p className="mb-[5px] text-redError text-[14px]">Mật khẩu không trùng khớp</p>
                    )}
                  </div>
                  <button
                    disabled={reseting ? true : false}
                    type="submit"
                    className={`w-full rounded-[5px] mt-[20px] text-white font-semibold text-center ${
                      reseting ? 'bg-secondary cursor-not-allowed' : 'bg-primary hover:bg-primaryHover'
                    }  transition py-2`}
                  >
                    {reseting ? 'Đang tạo mới...' : 'Xác nhận'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPass;
