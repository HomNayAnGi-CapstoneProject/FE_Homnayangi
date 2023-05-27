import { useState, useEffect } from 'react';
import instances from '../../../../../../../utils/plugin/axios';
import { ReGex_VietnameseTitle } from '../../../../../../../utils/regex';

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
  const [maxRegion, setMaxRegion] = useState(false);

  // ** check if region lenght is 3
  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const res = await instances.get('/region');
      // console.log(res.data);
      setLoading(false);
      if (res.data.length == 3) {
        setMaxRegion(true);
      } else {
        setMaxRegion(false);
      }
    };
    fetch();
  }, []);

  // ** Functs
  //submit form
  const onSubmit = (data) => {
    // console.log(data);
    setCreating(true);
    toast.promise(
      instances
        .post('/region', {
          regionName: data.regionName,
        })
        .then((res) => {
          setCreating(false);
          navigate('/management/region');
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
      <p className="font-semibold text-[18px]">Thêm vùng miền</p>
      <div className="bg-white py-5 px-5 rounded-[5px] mt-4">
        {maxRegion ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>Tên vùng miền</label>
            <input
              name="regionName"
              // placeholder="Tên đăng nhập"
              className={`block mt-2 w-full h-[47px] ${
                errors?.regionName ? 'mb-[5px]' : 'mb-[20px]'
              } p-[12px] text-subText sm:text-md  border border-[#B9B9B9] rounded-[5px] focus:outline-primary`}
              {...register('regionName', {
                required: true,
                pattern: {
                  value: ReGex_VietnameseTitle,
                },
              })}
            />
            {errors?.regionName?.type === 'required' && (
              <p className="mb-[5px] text-redError text-[14px]">Tên vùng miền không được trống</p>
            )}
            {errors?.regionName?.type === 'pattern' && (
              <p className="mb-[5px] text-redError text-[14px]">Tên vùng miền không hợp lệ</p>
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
        ) : (
          <div>
            <p>Số lượng vùng miền đã đạt tối đa</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateMethod;
