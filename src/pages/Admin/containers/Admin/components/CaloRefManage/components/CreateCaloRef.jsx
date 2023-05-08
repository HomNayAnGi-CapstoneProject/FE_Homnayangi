import { useState } from 'react';
import instances from '../../../../../../../utils/plugin/axios';
import { ReGex_VietnameseTitle } from '../../../../../../../utils/regex';

// ** Assets

// ** Library
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const CreateCaloRef = () => {
  // ** Const
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
  const [activeGener, setActiveGener] = useState(true);

  // ** Functs
  //submit form
  const onSubmit = (data) => {
    // console.log(data);
    if (parseInt(data?.fromAge) >= parseInt(data?.toAge)) {
      notifyError('Khoảng độ tuổi không phù hợp');
    } else {
      // console.log({
      //   fromAge: parseInt(data?.fromAge),
      //   toAge: parseInt(data?.toAge),
      //   calo: parseInt(data?.calo),
      //   isMale: data?.isMale === 'true',
      // });
      setCreating(true);
      instances
        .post('/caloreference', {
          fromAge: parseInt(data?.fromAge),
          toAge: parseInt(data?.toAge),
          calo: parseInt(data?.calo),
          isMale: data?.isMale,
        })
        .then((res) => {
          if (res.data.status == 'failed') {
            notifyError(res.data?.msg);
            setCreating(false);
          } else {
            notiSuccess('Đã tạo thành công! 👌');
            setCreating(false);
            navigate('/management/caloref-manage');
          }
        });

      // toast.promise(
      //   {
      //     pending: 'Đang tạo mới',
      //     success: 'Đã tạo thành công! 👌',
      //     error: {
      //       render({ data }) {
      //         // return data.response?.data.error;
      //       },
      //     },
      //   },
      // );
    }
  };
  return (
    <div>
      <p className="font-semibold text-[18px]">Thêm calo gợi ý</p>
      <div className="bg-white py-5 px-5 rounded-[5px] mt-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Tổng calo gợi ý</label>
          <input
            name="calo"
            type="number"
            // placeholder="Tên đăng nhập"
            className={`block mt-2 w-full h-[47px] ${
              errors?.calo ? 'mb-[5px]' : 'mb-[20px]'
            } p-[12px] text-subText sm:text-md  border border-[#B9B9B9] rounded-[5px] focus:outline-primary`}
            {...register('calo', {
              required: true,
              // pattern: {
              //   value: ReGex_VietnameseTitle,
              // },
            })}
          />
          {errors?.calo?.type === 'required' && (
            <p className="mb-[5px] text-redError text-[14px]">Tổng calo gợi ý không được trống</p>
          )}
          {errors?.calo?.type === 'pattern' && (
            <p className="mb-[5px] text-redError text-[14px]">Tổng calo gợi ý không hợp lệ</p>
          )}
          {/* {(errors?.name?.type === 'minLength' || errors?.name?.type === 'maxLength') && (
    <p className="mb-[5px] text-redError text-[14px]">Tên loại từ 5 - 16 ký tự</p>
  )} */}

          <label>Độ tuổi từ</label>
          <input
            name="fromAge"
            type="number"
            // placeholder="Tên đăng nhập"
            className={`block mt-2 w-full h-[47px] ${
              errors?.fromAge ? 'mb-[5px]' : 'mb-[20px]'
            } p-[12px] text-subText sm:text-md  border border-[#B9B9B9] rounded-[5px] focus:outline-primary`}
            {...register('fromAge', {
              required: true,
              // pattern: {
              //   value: ReGex_VietnameseTitle,
              // },
            })}
          />
          {errors?.fromAge?.type === 'required' && (
            <p className="mb-[5px] text-redError text-[14px]">Độ tuổi không được trống</p>
          )}
          {errors?.fromAge?.type === 'pattern' && (
            <p className="mb-[5px] text-redError text-[14px]">Độ tuổi không hợp lệ</p>
          )}
          {/* {(errors?.name?.type === 'minLength' || errors?.name?.type === 'maxLength') && (
    <p className="mb-[5px] text-redError text-[14px]">Tên loại từ 5 - 16 ký tự</p>
  )} */}

          <label>Đến độ tuổi</label>
          <input
            name="toAge"
            type="number"
            // placeholder="Tên đăng nhập"
            className={`block mt-2 w-full h-[47px] ${
              errors?.toAge ? 'mb-[5px]' : 'mb-[20px]'
            } p-[12px] text-subText sm:text-md  border border-[#B9B9B9] rounded-[5px] focus:outline-primary`}
            {...register('toAge', {
              required: true,
              max: 100,
              // pattern: {
              //   value: ReGex_VietnameseTitle,
              // },
            })}
          />
          {errors?.toAge?.type === 'required' && (
            <p className="mb-[5px] text-redError text-[14px]">Độ tuổi không được trống</p>
          )}
          {errors?.toAge?.type === 'pattern' && (
            <p className="mb-[5px] text-redError text-[14px]">Độ tuổi không hợp lệ</p>
          )}
          {errors?.toAge?.type === 'max' && <p className="mb-[5px] text-redError text-[14px]">Độ tuổi tối đa là 100</p>}
          {/* {(errors?.name?.type === 'minLength' || errors?.name?.type === 'maxLength') && (
    <p className="mb-[5px] text-redError text-[14px]">Tên loại từ 5 - 16 ký tự</p>
  )} */}

          {/* gender */}
          <p className="mb-2">Giới tính</p>
          <select
            className={`block mt-2 w-full h-[47px] ${
              errors?.isMale ? 'mb-[5px]' : 'mb-[20px]'
            } p-[12px] text-subText sm:text-md  border border-[#B9B9B9] rounded-[5px] focus:outline-primary`}
            {...register('isMale', { required: true })}
          >
            <option value={true}>Nam</option>
            <option className="py-1" value={false}>
              Nữ
            </option>
          </select>
          {errors?.isMale?.type === 'required' && (
            <p className="mb-[5px] text-redError text-[14px]">Vui lòng chọn giới tính</p>
          )}

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

export default CreateCaloRef;
