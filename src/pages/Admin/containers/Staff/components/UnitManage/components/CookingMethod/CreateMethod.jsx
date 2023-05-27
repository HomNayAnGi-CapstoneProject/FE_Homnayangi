import { useState } from 'react';
import instances from '../../../../../../../../utils/plugin/axios';
import { ReGex_VietnameseTitle } from '../../../../../../../../utils/regex';

// ** Library
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CreateMethod = () => {
  // ** Const
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [creating, setCreating] = useState(false);

  // ** Functs
  //submit form
  const onSubmit = (data) => {
    // console.log(data);
    setCreating(true);
    toast.promise(
      instances
        .post('/cookingmethod', {
          cookingMethodName: data.cookingMethodName,
        })
        .then((res) => {
          setCreating(false);
          navigate('/management/unit');
        }),
      {
        pending: 'Đang tạo mới',
        success: 'Đã tạo thành công! 👌',
        error: {
          render({ data }) {
            // return data.response?.data.error;
          },
        },
      },
    );
  };
  return (
    <div>
      <p className="font-semibold text-[18px]">Thêm phương thức nấu</p>
      <div className="bg-white py-5 px-5 rounded-[5px] mt-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Tên phương thức nấu</label>
          <input
            name="cookingMethodName"
            // placeholder="Tên đăng nhập"
            className={`block mt-2 w-full h-[47px] ${
              errors?.cookingMethodName ? 'mb-[5px]' : 'mb-[20px]'
            } p-[12px] text-subText sm:text-md  border border-[#B9B9B9] rounded-[5px] focus:outline-primary`}
            {...register('cookingMethodName', {
              required: true,
              pattern: {
                value: ReGex_VietnameseTitle,
              },
            })}
          />
          {errors?.cookingMethodName?.type === 'required' && (
            <p className="mb-[5px] text-redError text-[14px]">Tên phương thức nấu không được trống</p>
          )}
          {errors?.cookingMethodName?.type === 'pattern' && (
            <p className="mb-[5px] text-redError text-[14px]">Tên phương thức nấu không hợp lệ</p>
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

export default CreateMethod;
