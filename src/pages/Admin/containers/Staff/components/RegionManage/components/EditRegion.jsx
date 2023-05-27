import { useEffect, useState } from 'react';
import instances from '../../../../../../../utils/plugin/axios';
import { ReGex_VietnameseTitle } from '../../../../../../../utils/regex';

import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const EditForm = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  const [editing, setEditing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: props.data,
  });

  //submit form
  const onSubmit = (data) => {
    // console.log(data);
    setEditing(true);
    toast.promise(
      instances
        .put(`/region`, {
          regionId: params.regionId,
          regionName: data.regionName,
          status: true,
        })
        .then((res) => {
          setEditing(false);
          navigate('/management/region');
        }),
      {
        pending: 'Đang chỉnh sửa',
        success: 'Đã chỉnh sửa thành công! 👌',
        error: {
          // render({ data }) {
          //   return data.response?.data.error;
          // },
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Tên vùng miền</label>
      <input
        name="regionName"
        // value={typeData?.name}
        // placeholder={typeData?.name}
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
        disabled={editing ? true : false}
        type="submit"
        className={`${
          editing ? 'cursor-not-allowed' : ''
        } w-full rounded-[5px] mt-[20px] text-white font-semibold text-center bg-primary hover:bg-primaryHover transition py-2`}
      >
        Xác nhận
      </button>
    </form>
  );
};

const EditMethod = () => {
  // ** Const
  const params = useParams();
  const [regionData, setRegionData] = useState();

  // ** call api
  useEffect(() => {
    const fetch = async () => {
      const res = await instances.get(`/region/${params.regionId}`);
      // console.log(res.data);
      setRegionData(res.data);
    };

    fetch();
  }, []);

  return (
    <div>
      <p className="font-semibold text-[18px]">Chỉnh sửa vùng miền</p>
      <div className="bg-white py-5 px-5 rounded-[5px] mt-4">
        {regionData ? <EditForm data={regionData} /> : 'Loading...'}
      </div>
    </div>
  );
};

export default EditMethod;
