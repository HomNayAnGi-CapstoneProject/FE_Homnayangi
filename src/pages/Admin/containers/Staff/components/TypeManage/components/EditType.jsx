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
        .put(`/types/${params.typeId}`, {
          typeId: params.typeId,
          name: data.name,
          description: data.description,
          status: true,
        })
        .then((res) => {
          setEditing(false);
          navigate('/management/type');
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
      <label>Tên loại</label>
      <input
        name="name"
        // value={typeData?.name}
        // placeholder={typeData?.name}
        className={`block mt-2 w-full h-[47px] ${
          errors?.name ? 'mb-[5px]' : 'mb-[20px]'
        } p-[12px] text-subText sm:text-md  border border-[#B9B9B9] rounded-[5px] focus:outline-primary`}
        {...register('name', {
          required: true,
          pattern: {
            value: ReGex_VietnameseTitle,
          },
        })}
      />
      {errors?.name?.type === 'required' && (
        <p className="mb-[5px] text-redError text-[14px]">Tên loại không được trống</p>
      )}
      {errors?.name?.type === 'pattern' && <p className="mb-[5px] text-redError text-[14px]">Tên loại không hợp lệ</p>}

      <label>Mô tả</label>

      <textarea
        name="description"
        // defaultValue={typeData?.description}
        // onBlur={(e) => props?.handleInputNote(e.target.value)}
        rows="4"
        className="mt-2 p-2.5 w-full text-gray-900 bg-white rounded border border-gray-400
            focus:outline-none focus:bg-white focus:border-primary resize-none"
        {...register('description', {
          required: true,
        })}
      ></textarea>
      {errors?.description?.type === 'required' && (
        <p className="mb-[5px] text-redError text-[14px]">Mô tả không được trống</p>
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

const EditType = () => {
  // ** Const
  const params = useParams();
  const [typeData, setTypeData] = useState();

  // ** call api
  useEffect(() => {
    const fetch = async () => {
      const res = await instances.get(`/types/${params.typeId}`);
      // console.log(res.data);
      setTypeData(res.data);
    };

    fetch();
  }, []);

  return (
    <div>
      <p className="font-semibold text-[18px]">Chỉnh sửa loại sản phẩm</p>
      <div className="bg-white py-5 px-5 rounded-[5px] mt-4">
        {typeData ? <EditForm data={typeData} /> : 'Loading...'}
      </div>
    </div>
  );
};

export default EditType;
