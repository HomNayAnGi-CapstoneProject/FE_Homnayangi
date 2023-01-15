import { useState, useEffect } from 'react';
import styles from '../../../style';
import instances from '../../../utils/plugin/axios';

// ** Assests
import loginDecor1 from '../../../assets/images/loginDecor1.webp';
import loginDecor2 from '../../../assets/images/loginDecor2.webp';
import loginDecor3 from '../../../assets/images/loginDecor3.webp';
import logo from '../../../assets/images/Logo.png';
import { ic_eye_gray, ic_eye_closed, ic_google } from '../../../assets';

// ** Third party components
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { signInWithGoogle } from '../../../firebase';

const RegisterForm = () => {
  //** Const */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [passwordShown, setPasswordShown] = useState(false);
  const navigate = useNavigate();

  // ** Funct
  const togglePasswordVisiblity = () => {
    setPasswordShown((prev) => !prev);
  };

  //submit form
  const onSubmit = (data) => {
    // console.log(data);
    toast.promise(
      instances
        .post('/authentication/register', {
          username: data.username,
          firstname: data.firstname,
          lastname: data.lastname,
          password: data.password,
          phonenumber: data.phonenumber,
          gender: JSON.parse(data.gender),
        })
        .then((res) => {
          // success navigate to login
          navigate('/login');
        }),
      {
        pending: 'Đang tạo tài khoản',
        success: 'Đã đăng ký thành công! 👌',
        error: {
          render({ data }) {
            return data.response.data.error;
          },
        },
      },
    );
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
            <div className="login-form pt-[20px]">
              <p className="text-[28px] font-bold text-black pb-6">Đăng ký tài khoản</p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  name="username"
                  placeholder="Tên đăng nhập"
                  className={`block sm:w-[490px] w-full h-[47px] ${
                    errors?.username ? 'mb-[5px]' : 'mb-[20px]'
                  } p-[12px] text-subText sm:text-md  border border-[#B9B9B9] rounded-[5px] focus:outline-primary`}
                  {...register('username', {
                    required: true,
                    pattern: {
                      value: /^[A-Za-z0-9]*$/,
                    },
                  })}
                />
                {errors?.username?.type === 'required' && (
                  <p className="mb-[5px] text-redError text-[14px]">Tên đăng nhập không được trống</p>
                )}
                {errors?.username?.type === 'pattern' && (
                  <p className="mb-[5px] text-redError text-[14px]">Tên đăng nhập không hợp lệ</p>
                )}

                <div className="flex gap-3 sm:w-[490px] sm:flex-row flex-col w-full">
                  <div className="w-full">
                    <input
                      type="text"
                      name="firstname"
                      placeholder="Họ"
                      className={`block w-full h-[47px] ${
                        errors?.firstname ? 'mb-[5px]' : 'mb-[20px]'
                      } p-[12px] text-subText sm:text-md  border border-[#B9B9B9] rounded-[5px] focus:outline-primary`}
                      {...register('firstname', {
                        required: true,
                        // pattern: {
                        //   value: /^[A-Za-z0-9]*$/,
                        // },
                      })}
                    />
                    {errors?.firstname?.type === 'required' && (
                      <p className="mb-[5px] text-redError text-[14px]">Họ không được trống</p>
                    )}
                  </div>

                  <div className="w-full">
                    <input
                      type="text"
                      name="lastname"
                      placeholder="Tên"
                      className={`block w-full h-[47px] ${
                        errors?.lastname ? 'mb-[5px]' : 'mb-[20px]'
                      } p-[12px] text-subText sm:text-md  border border-[#B9B9B9] rounded-[5px] focus:outline-primary`}
                      {...register('lastname', {
                        required: true,
                        // pattern: {
                        //   value: /^[A-Za-z0-9]*$/,
                        // },
                      })}
                    />
                    {errors?.lastname?.type === 'required' && (
                      <p className="mb-[5px] text-redError text-[14px]">Tên không được trống</p>
                    )}
                  </div>
                </div>

                <div className="flex gap-3 sm:w-[490px] sm:flex-row flex-col w-full">
                  <div className="w-full">
                    <input
                      type="number"
                      name="phonenumber"
                      placeholder="Số điện thoại"
                      className={`block w-full h-[47px] ${
                        errors?.phonenumber ? 'mb-[5px]' : 'mb-[20px]'
                      } p-[12px] text-subText sm:text-md  border border-[#B9B9B9] rounded-[5px] focus:outline-primary`}
                      {...register('phonenumber', {
                        required: true,
                        minLength: 10,
                        maxLength: 11,
                        pattern: {
                          value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
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

                  <div className="w-full">
                    <select
                      className={`block w-full h-[47px] ${
                        errors?.gender ? 'mb-[5px]' : 'mb-[20px]'
                      } p-[12px] text-subText sm:text-md  border border-[#B9B9B9] rounded-[5px] focus:outline-primary`}
                      {...register('gender', { required: true })}
                    >
                      <option value="">Giới tính</option>
                      <option className="py-1" value={false}>
                        Nữ
                      </option>
                      <option value={true}>Nam</option>
                      <option value="other">Khác</option>
                    </select>
                    {errors?.gender?.type === 'required' && (
                      <p className="mb-[5px] text-redError text-[14px]">Giới tính không được trống</p>
                    )}
                  </div>
                </div>

                <div className="relative">
                  <input
                    type={passwordShown ? 'text' : 'password'}
                    name="password"
                    placeholder="Mật khẩu"
                    className={`block sm:w-[490px] w-full h-[47px] ${
                      errors?.password ? 'mb-[5px]' : 'mb-[20px]'
                    } p-[12px] text-subText sm:text-md  border border-[#B9B9B9] rounded-[5px] focus:outline-primary`}
                    {...register('password', {
                      required: true,
                      minLength: 6,
                      maxLength: 20,
                      pattern: {
                        value: /^[A-Za-z0-9]*$/,
                      },
                    })}
                  />
                  <div
                    onClick={() => togglePasswordVisiblity()}
                    className="w-[26px] h-[26px] bg-cover cursor-pointer absolute right-[10px] bottom-[10px]"
                    style={{ backgroundImage: `url(${passwordShown ? ic_eye_gray : ic_eye_closed})` }}
                  />
                </div>
                {errors?.password?.type === 'required' && (
                  <p className="mb-[5px] text-redError text-[14px]">Mật khẩu không được trống</p>
                )}
                {errors?.password?.type === 'pattern' && (
                  <p className="mb-[5px] text-redError text-[14px]">Mật khẩu không hợp lệ</p>
                )}
                {(errors?.password?.type === 'minLength' || errors?.password?.type === 'maxLength') && (
                  <p className="mb-[5px] text-redError text-[14px]">Độ dài mật khẩu từ 6 - 20 ký tự</p>
                )}

                <button
                  type="submit"
                  className="w-full rounded-[5px] mt-[20px] text-white font-semibold text-center bg-primary hover:bg-primaryHover transition py-2"
                >
                  Đăng ký
                </button>
              </form>

              <div className="text-center w-full my-5">
                <p className="text-[14px] text-[#292D32]">Hoặc đăng nhập bằng tài khoản khác</p>
                <button onClick={signInWithGoogle} className="mt-4">
                  <div className="bg-cover w-[25px] h-[25px]" style={{ backgroundImage: `url(${ic_google})` }} />
                </button>
              </div>

              <div className="text-center w-full mt-6">
                <p className="text-black">
                  Bạn đã có tài khoản?{' '}
                  <span className="text-primary font-semibold">
                    <Link to="/login">Đăng nhập</Link>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
