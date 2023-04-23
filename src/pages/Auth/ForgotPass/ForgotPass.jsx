import { useState, useEffect } from 'react';
import styles from '../../../style';
import { Regex_Password, Regex_PhoneNumber, Regex_Email } from '../../../utils/regex';

// ** Assests
import loginDecor1 from '../../../assets/images/loginDecor1.webp';
import loginDecor2 from '../../../assets/images/loginDecor2.webp';
import loginDecor3 from '../../../assets/images/loginDecor3.webp';
import logo from '../../../assets/images/Logo.png';
import sendEmail from '../../../assets/images/sendEmail.svg';

// ** Third party components
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import jwt_decode from 'jwt-decode';

const ForgotPass = ({ title }) => {
  //** Const */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const store = useSelector((state) => state.global);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [emailSent, setEmailSent] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    document.title = title;
  }, [title]);

  const onSubmit = (data) => {
    console.log(data.email);
    setEmailSent(true);
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
            {emailSent ? (
              <div className="pt-[20px] max-w-[550px] text-center">
                <p className="text-[28px] font-bold text-black pb-6">Tin nhắn đã gửi</p>

                <div className="w-full flex justify-center">
                  <div className="sm:w-[300px">
                    <img alt="" className="object-cover w-full h-full" src={sendEmail} />
                  </div>
                </div>
                <p className="mb-3 font-medium text-gray-500">
                  Nếu email đã được dùng đăng ký trong hệ thống, bạn sẽ nhận được một đường dẫn để tạo mới mật khẩu tại
                  địa chỉ email của bạn sau vài phút
                </p>

                <button
                  onClick={() => navigate('/login')}
                  // type="submit"
                  className="w-full rounded-[5px] mt-[20px] text-white font-semibold text-center bg-primary hover:bg-primaryHover transition py-2"
                >
                  Quay lại đăng nhập
                </button>
              </div>
            ) : (
              <div className="login-form pt-[20px] max-w-[550px]">
                <p className="text-[28px] font-bold text-black pb-6">Quên mật khẩu</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    <p className="mb-3 font-medium text-gray-500">
                      Vui lòng nhập địa chỉ email bạn dùng để đăng ký tài khoản. Chúng tôi sẽ gửi cho bạn một đường dẫn
                      để tạo lại mật khẩu
                    </p>
                    <input
                      name="email"
                      // disabled={store.accountInfo?.isGoogleAccount ? true : false}
                      placeholder="Email"
                      className={`block w-full h-[47px] ${
                        errors?.email ? 'mb-[5px]' : 'mb-[15px]'
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
                  </div>
                  <p onClick={() => history.back()} className=" text-[15px] cursor-pointer font-medium text-primary">
                    Quay lại
                  </p>
                  <button
                    disabled={sending ? true : false}
                    type="submit"
                    className={`w-full rounded-[5px] mt-[20px] text-white font-semibold text-center ${
                      sending ? 'bg-secondary cursor-not-allowed' : 'bg-primary hover:bg-primaryHover'
                    }  transition py-2`}
                  >
                    {sending ? 'Đang gửi...' : 'Xác nhận và gửi'}
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

export default ForgotPass;
