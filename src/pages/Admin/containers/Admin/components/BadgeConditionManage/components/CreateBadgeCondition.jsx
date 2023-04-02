import { useState, useEffect } from 'react';
import instances from '../../../../../../../utils/plugin/axios';
import { ReGex_Numeric } from '../../../../../../../utils/regex';

// ** Library
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const CreateBadgeCondition = () => {
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
  const [creating, setCreating] = useState(false);
  const navigate = useNavigate();
  const [badgeList, setBadgeList] = useState([]);
  const [activeBadgeId, setActiveBadgeId] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const notifyError = (error) =>
    toast.error(error, {
      pauseOnHover: false,
      position: 'top-center',
      autoClose: 2000,
    });

  // ** get badge list
  useEffect(() => {
    const fetch = async () => {
      const res = await instances.get('/badges/dropdown');
      // console.log(res.data);
      setBadgeList(res.data);
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
        .post('/badgecondition', {
          accomplishments: parseInt(data.accomplishments),
          orders: parseInt(data.orders),
          badgeId: data.badgeId,
        })
        .then((res) => {
          setCreating(false);
          navigate('/management');
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
      <p className="font-semibold text-[18px]">Thêm điều kiện</p>
      <div className="bg-white py-5 px-5 rounded-[5px] mt-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* badge id */}
          <label>Huy hiệu</label>

          <Select
            MenuProps={MenuProps}
            value={activeBadgeId}
            onChange={(e) => setActiveBadgeId(e.target.value)}
            displayEmpty
            renderValue={activeBadgeId !== '' ? undefined : () => <p className="text-[#898989]">Chọn huy hiệu</p>}
            inputProps={{
              ...register('badgeId', { required: true }),
            }}
            className={`block w-full h-[47px] ${
              errors?.badgeId ? 'mb-[5px]' : 'mb-[20px]'
            } p-[12px] text-subText sm:text-md mt-2  border rounded-[5px] focus:outline-primary`}
          >
            {badgeList.length > 0 ? (
              badgeList.map((item, i) => (
                <MenuItem key={item.badgeId} value={item.badgeId}>
                  {item.badgeName}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>
                <em>Chưa có dữ liệu</em>
              </MenuItem>
            )}
          </Select>
          {errors?.badgeId?.type === 'required' && (
            <p className="mb-[5px] text-redError text-[14px]">Vui lòng chọn tỉnh/thành của bạn</p>
          )}

          {/* orders condition */}
          <label>Số đơn hàng cần đạt</label>
          <input
            name="orders"
            type="number"
            // placeholder="Tên đăng nhập"
            className={`block mt-2 w-full h-[47px] ${
              errors?.orders ? 'mb-[5px]' : 'mb-[20px]'
            } p-[12px] text-subText sm:text-md  border border-[#B9B9B9] rounded-[5px] focus:outline-primary`}
            {...register('orders', {
              required: true,
              pattern: {
                value: ReGex_Numeric,
              },
            })}
          />
          {errors?.orders?.type === 'required' && (
            <p className="mb-[5px] text-redError text-[14px]">Số đơn hàng cần đạt không được trống</p>
          )}
          {errors?.orders?.type === 'pattern' && (
            <p className="mb-[5px] text-redError text-[14px]">Số đơn hàng cần đạt không hợp lệ</p>
          )}
          {/* {(errors?.name?.type === 'minLength' || errors?.name?.type === 'maxLength') && (
        <p className="mb-[5px] text-redError text-[14px]">Tên loại từ 5 - 16 ký tự</p>
      )} */}

          {/* accomplishments condition */}
          <label>Số thành quả cần đạt</label>
          <input
            name="accomplishments"
            type="number"
            // placeholder="Tên đăng nhập"
            className={`block mt-2 w-full h-[47px] ${
              errors?.accomplishments ? 'mb-[5px]' : 'mb-[20px]'
            } p-[12px] text-subText sm:text-md  border border-[#B9B9B9] rounded-[5px] focus:outline-primary`}
            {...register('accomplishments', {
              required: true,
              pattern: {
                value: ReGex_Numeric,
              },
            })}
          />
          {errors?.accomplishments?.type === 'required' && (
            <p className="mb-[5px] text-redError text-[14px]">Số thành quả cần đạt không được trống</p>
          )}
          {errors?.accomplishments?.type === 'pattern' && (
            <p className="mb-[5px] text-redError text-[14px]">Số thành quả cần đạt không hợp lệ</p>
          )}
          {/* {(errors?.name?.type === 'minLength' || errors?.name?.type === 'maxLength') && (
        <p className="mb-[5px] text-redError text-[14px]">Tên loại từ 5 - 16 ký tự</p>
      )} */}

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

export default CreateBadgeCondition;
