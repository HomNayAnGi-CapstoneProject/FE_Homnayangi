import { useState, useEffect } from 'react';
import instances from '../../../../../../../utils/plugin/axios';
import { ReGex_Numeric } from '../../../../../../../utils/regex';

// ** Library
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

// ** edit form
const EditForm = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [minutes, setMinutes] = useState(props.data.minute);
  const [hour, setHour] = useState(props.data.hour || '');
  const [day, setDay] = useState(props.data.day || '');

  useEffect(() => {
    console.log(minutes, hour, day);
  }, [minutes, hour, day]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: props.data,
  });

  const notifyError = (err) =>
    toast.error(err, {
      pauseOnHover: false,
    });
  const notifySuccess = (mess) =>
    toast.success(mess, {
      pauseOnHover: false,
    });

  //submit form
  const onSubmit = async (data) => {
    const res = {
      day: data.day !== '' ? parseInt(data.day) : null,
      hour: data.hour !== '' ? parseInt(data.hour) : data.day !== '' ? 0 : null,
      minute: data.minute !== '' ? parseInt(data.minute) : 0,
      targetObject: props.data.targetObject,
      cronJobTimeConfigId: props.data.cronJobTimeConfigId,
    };
    // console.log(res);

    const result = await instances.put(`/cronjobtimeconfig`, {
      day: data.day !== '' ? parseInt(data.day) : null,
      hour: data.hour !== '' ? parseInt(data.hour) : data.day !== '' ? 0 : null,
      minute: data.minute !== '' ? parseInt(data.minute) : 0,
      targetObject: props.data.targetObject,
      cronJobTimeConfigId: props.data.cronJobTimeConfigId,
    });
    if (result.data.status == 'failed') {
      setEditing(false);
      notifyError(result.data.msg);
    } else {
      notifySuccess('Chỉnh sửa thành công');
      setEditing(false);
      navigate('/management/cronjob');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* minute (hour) */}
      <label className="font-semibold text-[18px]">Phút </label>
      <p className="text-[16px] italic text-gray-500">
        Quét định kỳ <span className="text-red-500 font-bold">mỗi đầu giờ</span> dựa trên số phút đã chọn. (vd: "số
        phút: <span className="font-bold text-red-500">5</span>", thời gian hiện tại là {new Date().getHours()}h{' '}
        {new Date().getMinutes()} phút. Thời gian đến lần quét tiếp theo: {new Date().getHours() + 1}h{' '}
        <span className="font-bold text-red-500">5 phút</span>)
      </p>
      <input
        name="minute"
        type="number"
        // placeholder="Tên đăng nhập"
        className={`block mt-2 w-full h-[47px] ${
          errors?.minute ? 'mb-[5px]' : 'mb-[20px]'
        } p-[12px] text-subText sm:text-md  border border-[#B9B9B9] rounded-[5px] focus:outline-primary`}
        {...register('minute', {
          onChange: (e) => {
            setMinutes(e.target.value);
          },
          // required: true,
          min: 0,
          max: 59,
          pattern: {
            value: ReGex_Numeric,
          },
        })}
      />
      {/* {errors?.minute?.type === 'required' && (
        <p className="mb-[5px] text-redError text-[14px]">Số đơn hàng cần đạt không được trống</p>
      )} */}
      {errors?.minute?.type === 'pattern' && (
        <p className="mb-[5px] text-redError text-[14px]">Thời gian không hợp lệ</p>
      )}
      {errors?.minute?.type === 'min' && <p className="mb-[5px] text-redError text-[14px]">Số phút từ 0- 59 </p>}
      {errors?.minute?.type === 'max' && <p className="mb-[5px] text-redError text-[14px]">Số phút từ 0 - 59 </p>}

      {/* hour (daily) */}
      <label className="font-semibold text-[18px]">Giờ </label>
      <p className="text-[16px] italic text-gray-500">
        Quét định kỳ <span className="text-red-500 font-bold">mỗi ngày bắt đầu vào số giờ</span> đã chọn. (vd: "số giờ:{' '}
        <span className="font-bold text-red-500">5(am)</span>", thời gian đến lần quét tiếp theo: hôm sau lúc{' '}
        <span className="font-bold text-red-500"> 5(am)</span>)
      </p>
      <input
        name="hour"
        type="number"
        // placeholder="Tên đăng nhập"
        className={`block mt-2 w-full h-[47px] ${
          errors?.hour ? 'mb-[5px]' : 'mb-[20px]'
        } p-[12px] text-subText sm:text-md  border border-[#B9B9B9] rounded-[5px] focus:outline-primary`}
        {...register('hour', {
          // required: true,
          onChange: (e) => {
            setHour(e.target.value);
          },
          min: 0,
          max: 23,
          pattern: {
            value: ReGex_Numeric,
          },
        })}
      />
      {/* {errors?.hour?.type === 'required' && (
        <p className="mb-[5px] text-redError text-[14px]">Số đơn hàng cần đạt không được trống</p>
      )} */}
      {errors?.hour?.type === 'pattern' && <p className="mb-[5px] text-redError text-[14px]">Thời gian không hợp lệ</p>}
      {errors?.hour?.type === 'max' && <p className="mb-[5px] text-redError text-[14px]">Số giờ từ 0 - 23 </p>}
      {errors?.hour?.type === 'min' && <p className="mb-[5px] text-redError text-[14px]">Số giờ từ 0 - 23 </p>}

      {/* day (monthly) */}
      <label className="font-semibold text-[18px]">Ngày </label>
      <p className="text-[16px] italic text-gray-500">
        Quét định kỳ <span className="text-red-500 font-bold">mỗi tháng bắt đầu vào ngày</span> đã chọn. (vd: "ngày:{' '}
        <span className="font-bold text-red-500">5</span>", thời gian đến lần quét tiếp theo: tháng sau vào{' '}
        <span className="font-bold text-red-500">ngày thứ 5</span>)
      </p>
      <input
        name="day"
        type="number"
        // placeholder="Tên đăng nhập"
        className={`block mt-2 w-full h-[47px] ${
          errors?.day ? 'mb-[5px]' : 'mb-[20px]'
        } p-[12px] text-subText sm:text-md  border border-[#B9B9B9] rounded-[5px] focus:outline-primary`}
        {...register('day', {
          // required: true,
          onChange: (e) => {
            setDay(e.target.value);
          },
          min: 1,
          max: 31,
          pattern: {
            value: ReGex_Numeric,
          },
        })}
      />
      {/* {errors?.day?.type === 'required' && (
        <p className="mb-[5px] text-redError text-[14px]">Số đơn hàng cần đạt không được trống</p>
      )} */}
      {errors?.day?.type === 'pattern' && <p className="mb-[5px] text-redError text-[14px]">Thời gian không hợp lệ</p>}
      {errors?.day?.type === 'max' && <p className="mb-[5px] text-redError text-[14px]">Số ngày từ 1 - 31 </p>}
      {errors?.day?.type === 'min' && <p className="mb-[5px] text-redError text-[14px]">Số ngày từ 1 - 31 </p>}

      {/* preview time config */}
      <div className="mt-8 mb-5 flex items-center gap-4">
        <p className="text-[18px] font-medium text-gray-500">Thời gian quét định kỳ hiện tại: </p>
        <p className="text-[18px] font-bold">
          Mỗi {day && <span className="text-[20px] font-bold text-red-500">tháng vào ngày {day}</span>}{' '}
          {(hour !== '' || day !== '') && (
            <span className="text-[20px] font-bold text-red-500">
              {day !== '' ? 'lúc' : 'ngày vào'} {hour !== '' ? hour : 0} giờ
            </span>
          )}{' '}
          {day == '' && hour == '' && (
            <span className="text-[20px] font-bold text-red-500">
              đầu giờ tại phút thứ {minutes !== '' ? minutes : 0}
            </span>
          )}{' '}
          {(day !== '' || hour !== '') && (
            <span className="text-[20px] font-bold text-red-500">{minutes !== '' ? minutes : 0} phút</span>
          )}{' '}
        </p>
      </div>
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

const EditCronJob = () => {
  // ** Const
  const params = useParams();
  const [editData, setEditData] = useState();

  // ** call api
  useEffect(() => {
    const fetch = async () => {
      const res = await instances.get(`/cronjobtimeconfig/${params.cronJobTimeConfigId}`);
      // console.log(res.data);
      setEditData(res.data);
    };

    fetch();
  }, []);
  return (
    <div>
      <p className="font-semibold text-[18px]">
        Chỉnh sửa thời gian trao {editData ? (editData.targetObject == 0 ? 'huy hiệu' : 'mã giảm giá') : ''}
      </p>
      <p className="text-gray-500 italic">
        (Thời gian hệ thống <span className="font-bold text-black">quét định kỳ</span> để trao huy hiệu / mã giảm giá
        cho khách hàng)
      </p>
      <div className="bg-white py-5 px-5 rounded-[5px] mt-4">
        {editData ? <EditForm data={editData} /> : 'Loading...'}
      </div>
    </div>
  );
};

export default EditCronJob;
