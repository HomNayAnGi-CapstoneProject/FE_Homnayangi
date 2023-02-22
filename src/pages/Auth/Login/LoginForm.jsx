import { useState, useEffect } from 'react';
import styles from '../../../style';
import instances from '../../../utils/plugin/axios';
import { setAccountInfo } from '../../../redux/actionSlice/accountSlice';
import { Regex_Password } from '../../../utils/regex';

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
import { auth, provider } from '../../../firebase';
import { signInWithPopup } from 'firebase/auth';
import jwt_decode from 'jwt-decode';

const LoginForm = () => {
  //** Const */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [passwordShown, setPasswordShown] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const notifyError = () =>
    toast.error('Sai email hoặc mật khẩu!', {
      pauseOnHover: false,
    });

  // ** Funct
  const togglePasswordVisiblity = () => {
    setPasswordShown((prev) => !prev);
  };

  //submit form
  const onSubmit = async (data) => {
    toast.promise(
      instances.post('/authentication/login', data).then((res) => {
        if (res?.status === 404) {
          notifyError();
        } else {
          const decoded = jwt_decode(res?.data?.result);
          dispatch(setAccountInfo(decoded));
          localStorage.setItem('accessToken', res.data.result);
          if (decoded?.role === 'Staff' || decoded?.role === 'Admin') {
            navigate('/management');
          } else {
            navigate('/');
          }
        }
      }),
      {
        pending: 'Đang kiểm tra thông tin...',
        // success: 'Đăng nhập thành công! 👌',
        error: 'Đăng nhập thất bại!',
      },
    );
    // const res = await instances.post('/login', data)
  };

  //handle google auth
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((response) => {
        // console.log(response.user.accessToken);
        toast.promise(
          instances
            .post(
              '/authentication/login-google',
              {},
              { headers: { Authorization: 'Bearer ' + response.user.accessToken } },
            )
            .then((res) => {
              if (res?.status === 404) {
                notifyError();
              } else {
                const decoded = jwt_decode(res?.data?.result);
                dispatch(setAccountInfo(decoded));
                localStorage.setItem('accessToken', res.data.result);
                if (decoded?.role === 'Staff' || decoded?.role === 'Admin') {
                  navigate('/management');
                } else {
                  navigate('/');
                }
              }
            }),
          {
            pending: 'Đang kiểm tra thông tin...',
            // success: 'Đăng nhập thành công! 👌',
            error: 'Đăng nhập thất bại!',
          },
        );
      })
      .catch((error) => {
        console.log(error);
      });
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
              <p className="text-[28px] font-bold text-black pb-6">Đăng nhập</p>
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
                      value: Regex_Password,
                    },
                  })}
                />
                {errors?.username?.type === 'required' && (
                  <p className="mb-[5px] text-redError text-[14px]">Tên đăng nhập không được trống</p>
                )}
                {errors?.username?.type === 'pattern' && (
                  <p className="mb-[5px] text-redError text-[14px]">Tên đăng nhập không hợp lệ</p>
                )}

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
                {errors?.password?.type === 'required' && (
                  <p className="mb-[5px] text-redError text-[14px]">Mật khẩu không được trống</p>
                )}
                {errors?.password?.type === 'pattern' && (
                  <p className="mb-[5px] text-redError text-[14px]">Mật khẩu không hợp lệ</p>
                )}

                <button
                  type="submit"
                  className="w-full rounded-[5px] mt-[20px] text-white font-semibold text-center bg-primary hover:bg-primaryHover transition py-2"
                >
                  Đăng nhập
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
                  Bạn chưa có tài khoản?{' '}
                  <span className="text-primary font-semibold">
                    <Link to="/register">Đăng ký</Link>
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

export default LoginForm;
