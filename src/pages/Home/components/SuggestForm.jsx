import { useState } from 'react';
import { ReGex_Numeric } from '../../../utils/regex';
import instances from '../../../utils/plugin/axios';

// ** third party libraries **
import { useForm } from 'react-hook-form';

// ** redux
import { setSuggestFormData, setOpenFormSuggest } from '../../../redux/actionSlice/globalSlice';
import { useDispatch } from 'react-redux';

// ** assets
import img3 from '../../../assets/images/formDeco4.png';
import { ic_FAQ } from '../../../assets';

const SuggestForm = (props) => {
  // ** Const
  const { data } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: data,
  });
  const [creating, setCreating] = useState(false);
  const dispatch = useDispatch();

  // ** Functs
  const onSubmit = async (data) => {
    dispatch(
      setSuggestFormData({
        Age: parseInt(data.Age),
        IsMale: data.IsMale,
        IsLoseWeight: data.IsLoseWeight,
      }),
    );
    dispatch(setOpenFormSuggest(false));
  };
  return (
    <div className="rounded-[10px] px-10 py-5 bg-[#FFD1BE] font-inter sm:max-w-[700px] w-full flex sm:flex-row flex-col">
      <div className="sm:w-[70%]">
        <p className="text-[14px] font-medium text-[#585858]">
          Chúng tôi sẽ dựa trên thông tin dưới đây để gợi ý thực đơn hôm nay cho bạn
        </p>
        <form className="py-3" onSubmit={handleSubmit(onSubmit)}>
          <label className="text-[#585858] font-medium">Độ tuổi</label>
          <input
            name="Age"
            type="number"
            inputMode="numeric"
            // placeholder="Tên đăng nhập"
            className={`block mt-2 w-full h-[47px] ${
              errors?.name ? 'mb-[5px]' : 'mb-[20px]'
            } p-[12px] text-subText sm:text-md  border border-[#B9B9B9] rounded-[5px] focus:outline-primary`}
            {...register('Age', {
              required: true,
              pattern: {
                value: ReGex_Numeric,
              },
            })}
          />
          {errors?.Age?.type === 'required' && (
            <p className="mb-[5px] text-redError text-[14px]">Hãy nhập độ tuổi của bạn</p>
          )}
          {errors?.Age?.type === 'pattern' && (
            <p className="mb-[5px] text-redError text-[14px]">Độ tuổi không hợp lệ</p>
          )}

          <label className="text-[#585858] font-medium">Giới tính</label>
          <select
            className={`block mt-2 w-full h-[47px] ${
              errors?.IsMale ? 'mb-[5px]' : 'mb-[20px]'
            } p-[12px] text-subText sm:text-md  border border-[#B9B9B9] rounded-[5px] focus:outline-primary`}
            {...register('IsMale', { required: true })}
          >
            <option value={true}>Nam</option>
            <option className="py-1" value={false}>
              Nữ
            </option>
          </select>
          {errors?.IsMale?.type === 'required' && (
            <p className="mb-[5px] text-redError text-[14px]">Giới tính không được trống</p>
          )}

          <label className="text-[#585858] font-medium">Bạn có nhu cầu giảm cân?</label>
          <select
            className={`block mt-2 w-full h-[47px] ${
              errors?.IsLoseWeight ? 'mb-[5px]' : 'mb-[20px]'
            } p-[12px] text-subText sm:text-md  border border-[#B9B9B9] rounded-[5px] focus:outline-primary`}
            {...register('IsLoseWeight', { required: true })}
          >
            <option className="py-1" value={true}>
              Có
            </option>
            <option value={false}>Không</option>
          </select>
          {errors?.IsLoseWeight?.type === 'required' && (
            <p className="mb-[5px] text-redError text-[14px]">Xin hãy chọn</p>
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
        <div className="flex items-center gap-2">
          <img alt="" className="object-cover w-[20px]" src={ic_FAQ} />
          <p className="text-[14px] font-medium text-[#585858]">Bạn có thể cập nhật thông tin này sau</p>
        </div>
      </div>
      <img alt="" src={img3} className="object-cover w-[335px]" />
    </div>
  );
};

export default SuggestForm;
