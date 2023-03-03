import { useEffect, useState } from 'react';
import instances from '../../../../../../../../utils/plugin/axios';
import { ReGex_VietnameseTitle } from '../../../../../../../../utils/regex';

import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const EditForm = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  const [editing, setEditing] = useState(false);
  const [categories, setCategories] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: props.data,
  });

  // ** Call api get categories
  useEffect(() => {
    const fetch = async () => {
      const res = await instances.get('/categories/dropdown-category');
      // console.log(res.data.resource);
      setCategories(res.data.result);
    };

    fetch();
  }, []);

  //submit form
  const onSubmit = (data) => {
    // console.log(data);
    setEditing(true);
    toast.promise(
      instances
        .put(`/subcategories`, {
          subCategoryId: params.subCategoryId,
          categoryId: data.categoryId,
          name: data.name,
          description: data.description,
          status: props.data.status,
        })
        .then((res) => {
          setEditing(false);
          navigate('/management/category');
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
      <label>Danh mục chính</label>
      <select
        className={`block mt-2 w-full h-[47px] ${
          errors?.categoryId ? 'mb-[5px]' : 'mb-[20px]'
        } p-[12px] text-subText sm:text-md max-h-[100px] overflow-y-scroll border border-[#B9B9B9] rounded-[5px] focus:outline-primary`}
        {...register('categoryId', { required: true })}
      >
        <option value={props?.data.categoryId}>
          {props.data.category.name}
          {/* {categories?.find((cate) => cate.categoryId == props?.data.categoryId)?.name} */}
        </option>
        {categories &&
          categories.map((cate) => (
            <option key={cate.categoryId} value={cate.categoryId}>
              {cate.name}
            </option>
          ))}
      </select>
      {errors?.categoryId?.type === 'required' && (
        <p className="mb-[5px] text-redError text-[14px]">Danh mục chính không được trống</p>
      )}

      <label>Tên danh mục phụ</label>
      <input
        name="name"
        // value={typeData?.name}
        // placeholder={typeData?.name}
        className={`block mt-2 w-full h-[47px] ${
          errors?.name ? 'mb-[5px]' : 'mb-[20px]'
        } p-[12px] text-subText sm:text-md  border border-[#B9B9B9] rounded-[5px] focus:outline-primary`}
        {...register('name', {
          required: true,
          pattern: ReGex_VietnameseTitle,
        })}
      />
      {errors?.name?.type === 'required' && (
        <p className="mb-[5px] text-redError text-[14px]">Tên danh mục không được trống</p>
      )}
      {errors?.name?.type === 'pattern' && (
        <p className="mb-[5px] text-redError text-[14px]">Tên danh mục phụ không hợp lệ</p>
      )}

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

const EditSubCate = () => {
  const params = useParams();
  const [subCateData, setSubCateData] = useState();

  // ** call api
  useEffect(() => {
    const fetch = async () => {
      const res = await instances.get(`/subcategories/${params.subCategoryId}/staff`);
      console.log(res.data);
      setSubCateData(res.data);
    };

    fetch();
  }, []);

  return (
    <div>
      <p className="font-semibold text-[18px]">Chỉnh sửa danh mục phụ</p>
      <div className="bg-white py-5 px-5 rounded-[5px] mt-4">
        {subCateData ? <EditForm data={subCateData} /> : 'Loading...'}
      </div>
    </div>
  );
};

export default EditSubCate;
