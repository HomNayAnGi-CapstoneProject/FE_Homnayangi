import { useState, useEffect } from 'react';
import instances from '../../../../../../utils/plugin/axios';
import { ReGex_VietnameseTitle } from '../../../../../../utils/regex';

// ** Assets

// ** Library
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CreateSubCate = () => {
  // ** Const
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [creating, setCreating] = useState(false);
  const [categories, setCategories] = useState();

  // ** Call api get categories
  useEffect(() => {
    const fetch = async () => {
      const res = await instances.get('/categories/dropdown-category');
      // console.log(res.data.resource);
      setCategories(res.data.result);
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
        .post('/subcategories', {
          name: data.name,
          description: data.description,
          categoryId: data.categoryId,
        })
        .then((res) => {
          setCreating(false);
          navigate('/management/category');
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
      <p className="font-semibold text-[18px]">Thêm danh mục phụ</p>
      <div className="bg-white py-5 px-5 rounded-[5px] mt-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Danh mục chính</label>
          <select
            className={`block mt-2 w-full h-[47px] ${
              errors?.categoryId ? 'mb-[5px]' : 'mb-[20px]'
            } p-[12px] text-subText sm:text-md max-h-[100px] overflow-y-scroll border border-[#B9B9B9] rounded-[5px] focus:outline-primary`}
            {...register('categoryId', { required: true })}
          >
            <option value="">Danh mục chính</option>
            {categories &&
              categories.map((category) => (
                <option key={category.categoryId} value={category.categoryId}>
                  {category.name}
                </option>
              ))}
          </select>
          {errors?.categoryId?.type === 'required' && (
            <p className="mb-[5px] text-redError text-[14px]">Danh mục chính không được trống</p>
          )}

          <label>Tên danh mục phụ</label>
          <input
            name="name"
            // placeholder="Tên đăng nhập"
            className={`block mt-2 w-full h-[47px] ${
              errors?.name ? 'mb-[5px]' : 'mb-[20px]'
            } p-[12px] text-subText sm:text-md  border border-[#B9B9B9] rounded-[5px] focus:outline-primary`}
            {...register('name', {
              required: true,
              pattern: ReGex_VietnameseTitle,
            })}
          />
          {errors?.name?.type === 'required' && (
            <p className="mb-[5px] text-redError text-[14px]">Tên danh mục phụ không được trống</p>
          )}
          {errors?.name?.type === 'pattern' && (
            <p className="mb-[5px] text-redError text-[14px]">Tên danh mục phụ không hợp lệ</p>
          )}
          {/* {(errors?.name?.type === 'minLength' || errors?.name?.type === 'maxLength') && (
    <p className="mb-[5px] text-redError text-[14px]">Tên loại từ 5 - 16 ký tự</p>
  )} */}

          <label>Mô tả</label>

          <textarea
            name="description"
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

export default CreateSubCate;
