import { useState, useEffect } from 'react';
import instances from '../../../../../../../utils/plugin/axios';
import { ReGex_Numeric } from '../../../../../../../utils/regex';

// ** Library
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

// ** edit form
const EditForm = (props) => {
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
  const params = useParams();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [badgeList, setBadgeList] = useState([]);
  const [activeBadgeId, setActiveBadgeId] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: props.data,
  });

  // ** get badge list
  useEffect(() => {
    const fetch = async () => {
      const res = await instances.get('/badges/dropdown');
      // console.log(res.data.resource);
      setBadgeList(res.data);
    };
    fetch();
  }, []);

  //submit form
  const onSubmit = (data) => {
    // console.log(data);
    setEditing(true);
    toast.promise(
      instances
        .put(`/badgecondition`, {
          accomplishments: parseInt(data.accomplishments),
          orders: parseInt(data.orders),
          badgeId: data.badgeId,
          badgeConditionId: params.badgeConditionId,
          status: true,
        })
        .then((res) => {
          setEditing(false);
          navigate('/management');
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
      {/* badge id */}
      <label>Huy hiệu</label>

      <Select
        MenuProps={MenuProps}
        value={activeBadgeId}
        onChange={(e) => setActiveBadgeId(e.target.value)}
        displayEmpty
        renderValue={() => (
          <p className="text-[#898989]">{badgeList.find((item) => item.badgeId == props.data.badgeId)?.badgeName}</p>
        )}
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
        <p className="mb-[5px] text-redError text-[14px]">Vui lòng chọn huy hiệu</p>
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

const EditBadgeCondition = () => {
  // ** Const
  const params = useParams();
  const [editData, setEditData] = useState();

  // ** call api
  useEffect(() => {
    const fetch = async () => {
      const res = await instances.get(`/badgecondition/${params.badgeConditionId}`);
      // console.log(res.data);
      setEditData(res.data);
    };

    fetch();
  }, []);
  return (
    <div>
      <p className="font-semibold text-[18px]">Chỉnh sửa điều kiện</p>
      <div className="bg-white py-5 px-5 rounded-[5px] mt-4">
        {editData ? <EditForm data={editData} /> : 'Loading...'}
      </div>
    </div>
  );
};

export default EditBadgeCondition;
