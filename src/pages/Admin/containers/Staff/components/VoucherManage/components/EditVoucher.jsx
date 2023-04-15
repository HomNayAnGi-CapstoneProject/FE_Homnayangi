import { useState, useEffect, useMemo } from 'react';
import instances from '../../../../../../../utils/plugin/axios';
import { ReGex_VietnameseTitle, ReGex_Numeric } from '../../../../../../../utils/regex';

// ** Library
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';

const EditForm = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(null);
  const today = dayjs();
  const [validFromDate, setValidFromDate] = useState();
  const [validToDate, setValidToDate] = useState();
  const [checkedValue, setCheckedValue] = useState(props.data?.discount <= 1 ? 'percent' : 'vnd');

  const notifyError = (err) => {
    toast.error(err, {
      pauseOnHover: false,
    });
  };

  const errorMessage = useMemo(() => {
    // console.log(error);
    switch (error) {
      case 'maxDate':
      case 'minDate':
      case 'maxTime':
      case 'minTime': {
        return 'Thời gian từ 8 giờ sáng hôm sau';
      }

      case 'invalidDate': {
        return 'Thời gian không hợp lệ';
      }

      default: {
        return '';
      }
    }
  }, [error]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: props.data.name,
      description: props.data.description,
      validFrom: dayjs(props.data.validFrom),
      validTo: dayjs(props.data.validTo),
      discount: props.data?.discount <= 1 ? props.data?.discount * 100 : props.data?.discount,
      minimumOrderPrice: props.data?.minimumOrderPrice,
      maximumOrderPrice: props.data?.maximumOrderPrice,
    },
  });

  //submit form
  const onSubmit = (data) => {
    let validFrom = dayjs(data?.validFrom).format();
    let validTo = dayjs(data?.validTo).format();
    let validFromTime = new Date(data?.validFrom).getTime();
    let validToTime = new Date(data?.validTo).getTime();
    // console.log({
    //   validFrom: validFromTime,
    //   validTo: validToTime,
    // });
    if (parseInt(data?.minimumOrderPrice) > parseInt(data?.maximumOrderPrice)) {
      notifyError('Giá trị đơn hàng tối thiếu không được lớn hơn giá trị đơn hàng tối đa');
    } else if (validFromTime >= validToTime) {
      notifyError('Thời gian hết hạn phải dài hơn thời gian hiệu lực');
    } else {
      setEditing(true);
      toast.promise(
        instances
          .put('/vouchers', {
            voucherId: params.voucherId,
            name: data.name,
            description: data.description,
            validFrom: validFrom,
            validTo: validTo,
            // discount: parseInt(data?.discount),
            discount: checkedValue == 'vnd' ? parseInt(data?.discount) : parseInt(data?.discount) / 100,
            minimumOrderPrice: parseInt(data?.minimumOrderPrice),
            maximumOrderPrice: parseInt(data?.maximumOrderPrice),
          })
          .then((res) => {
            setEditing(false);
            navigate('/management/voucher');
          }),
        {
          pending: 'Đang chỉnh sửa',
          success: 'Đã chỉnh sửa thành công! 👌',
          error: {
            render({ data }) {
              // return data.response?.data.error;
            },
          },
        },
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex ss:flex-row flex-col justify-between gap-5">
        {/* ... */}
        <div className="flex-1">
          <label>Tên mã giảm giá</label>
          <input
            name="name"
            // placeholder="Tên đăng nhập"
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
            <p className="mb-[5px] text-redError text-[14px]">Tên mã giảm giá không được trống</p>
          )}
          {errors?.name?.type === 'pattern' && (
            <p className="mb-[5px] text-redError text-[14px]">Tên mã giảm giá không hợp lệ</p>
          )}

          <label>Chọn đơn vị giảm giá</label>

          <div className="flex gap-3 mt-2 mb-3">
            <div className="flex items-center">
              <input
                checked={checkedValue == 'vnd' ? true : false}
                id="inline-vnd"
                type="radio"
                value="vnd"
                name="currency"
                onChange={() => setCheckedValue('vnd')}
                className="w-4 h-4 bg-gray-200"
              />
              <label for="inline-vnd" className="ml-2 font-medium text-gray-500">
                VNĐ
              </label>
            </div>
            <div className="flex items-center">
              <input
                checked={checkedValue == 'percent' ? true : false}
                id="inline-percent"
                type="radio"
                value="percent"
                name="currency"
                onChange={() => setCheckedValue('percent')}
                className="w-4 h-4 bg-gray-200 "
              />
              <label for="inline-percent" className="ml-2 font-medium text-gray-500">
                Phần trăm
              </label>
            </div>
          </div>
          <label>Giảm giá</label>
          <input
            name="discount"
            type="number"
            // placeholder="Tên đăng nhập"
            className={`block mt-2 w-full h-[47px] ${
              errors?.discount ? 'mb-[5px]' : 'mb-[20px]'
            } p-[12px] text-subText sm:text-md  border border-[#B9B9B9] rounded-[5px] focus:outline-primary`}
            {...register('discount', {
              required: true,
              min: checkedValue == 'vnd' ? 1000 : 1,
              max: checkedValue == 'vnd' ? 100000 : 100,
              // pattern: {
              //   value: ReGex_VietnameseTitle,
              // },
            })}
          />
          {errors?.discount?.type === 'required' && (
            <p className="mb-[5px] text-redError text-[14px]">Giảm giá không được trống</p>
          )}
          {errors?.discount?.type === 'pattern' && (
            <p className="mb-[5px] text-redError text-[14px]">Giảm giá không hợp lệ</p>
          )}
          {errors?.discount?.type === 'min' && (
            <p className="mb-[5px] text-redError text-[14px]">
              Giảm giá tối thiểu là {checkedValue == 'vnd' ? '1000đ' : '1%'}
            </p>
          )}
          {errors?.discount?.type === 'max' && (
            <p className="mb-[5px] text-redError text-[14px]">
              Giảm giá tối đa là {checkedValue == 'vnd' ? '100.000đ' : '100%'}
            </p>
          )}

          <label>Giá trị đơn hàng tối thiểu (vnd)</label>
          <input
            name="minimumOrderPrice"
            type="number"
            // placeholder="Tên đăng nhập"
            className={`block mt-2 w-full h-[47px] ${
              errors?.minimumOrderPrice ? 'mb-[5px]' : 'mb-[20px]'
            } p-[12px] text-subText sm:text-md  border border-[#B9B9B9] rounded-[5px] focus:outline-primary`}
            {...register('minimumOrderPrice', {
              required: true,
              min: 1000,
              // pattern: {
              //   value: ReGex_VietnameseTitle,
              // },
            })}
          />
          {errors?.minimumOrderPrice?.type === 'required' && (
            <p className="mb-[5px] text-redError text-[14px]">Giá trị đơn hàng tối thiểu không được trống</p>
          )}
          {errors?.minimumOrderPrice?.type === 'pattern' && (
            <p className="mb-[5px] text-redError text-[14px]">Giá trị đơn hàng tối thiểu không hợp lệ</p>
          )}
          {errors?.minimumOrderPrice?.type === 'min' && (
            <p className="mb-[5px] text-redError text-[14px]">Giá trị đơn hàng tối thiểu là 1000đ</p>
          )}

          {checkedValue == 'percent' && (
            <>
              <label>Giá trị đơn hàng tối đa (vnd)</label>
              <input
                name="maximumOrderPrice"
                type="number"
                // placeholder="Tên đăng nhập"
                className={`block mt-2 w-full h-[47px] ${
                  errors?.maximumOrderPrice ? 'mb-[5px]' : 'mb-[20px]'
                } p-[12px] text-subText sm:text-md  border border-[#B9B9B9] rounded-[5px] focus:outline-primary`}
                {...register('maximumOrderPrice', {
                  required: true,
                  min: 1000,
                  // pattern: {
                  //   value: ReGex_VietnameseTitle,
                  // },
                })}
              />
              {errors?.maximumOrderPrice?.type === 'required' && (
                <p className="mb-[5px] text-redError text-[14px]">Giá trị đơn hàng tối đa không được trống</p>
              )}
              {errors?.maximumOrderPrice?.type === 'pattern' && (
                <p className="mb-[5px] text-redError text-[14px]">Giá trị đơn hàng tối đa không hợp lệ</p>
              )}
              {errors?.maximumOrderPrice?.type === 'min' && (
                <p className="mb-[5px] text-redError text-[14px]">Giá trị đơn hàng tối đa là 1000đ</p>
              )}
            </>
          )}
        </div>
        {/* time picker */}
        <div className="ss:w-[50%] w-full pl-10">
          {/* validFrom */}
          <p className="mb-2">Thời gian hiệu lực</p>
          <Controller
            name="validFrom"
            // defaultValue={validFromDate}
            rules={{ required: true }}
            control={control}
            render={({ field: { onChange, ...restField } }) => (
              <>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    onError={(newError, value) => setError(newError)}
                    slotProps={{
                      textField: {
                        helperText: errorMessage,
                      },
                    }}
                    value={validFromDate}
                    // disabled={currentCart?.length > 0}
                    // minDateTime={todayAt8AM}
                    onChange={(event, value) => {
                      onChange(event);
                      setValidFromDate(event);
                    }}
                    // label="Chọn thời gian hiệu lực"
                    sx={{ width: '100%' }}
                    {...restField}
                  />
                </LocalizationProvider>
                {errors?.validFrom?.type === 'required' && (
                  //if you want to show an error message
                  <p className="mb-[5px] text-redError text-[14px]">Thời gian hiệu lực không được trống</p>
                )}
              </>
            )}
          />

          {/* validTo */}
          <p className="mt-3 mb-2">Thời gian hết hạn</p>
          <Controller
            name="validTo"
            // defaultValue={date}
            rules={{ required: true }}
            control={control}
            render={({ field: { onChange, ...restField } }) => (
              <>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    onError={(newError, value) => setError(newError)}
                    slotProps={{
                      textField: {
                        helperText: errorMessage,
                      },
                    }}
                    value={validToDate}
                    // disabled={currentCart?.length > 0}
                    // minDateTime={todayAt8AM}
                    onChange={(event, value) => {
                      onChange(event);
                      setValidToDate(event);
                    }}
                    // label="Chọn thời gian hiệu lực"
                    sx={{ width: '100%' }}
                    {...restField}
                  />
                </LocalizationProvider>
                {errors?.validTo?.type === 'required' && (
                  //if you want to show an error message
                  <p className="mb-[5px] text-redError text-[14px]">Thời gian hết hạn không được trống</p>
                )}
              </>
            )}
          />

          <p className="mt-4">Mô tả</p>
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
        </div>
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

const EditVoucher = () => {
  // ** Const
  const params = useParams();
  const [voucherData, setVoucherData] = useState();

  // ** call api
  useEffect(() => {
    const fetch = async () => {
      const res = await instances.get(`/vouchers/${params.voucherId}`);
      // console.log(res.data);
      setVoucherData(res.data.result);
    };

    fetch();
  }, []);
  return (
    <div>
      <p className="font-semibold text-[18px]">Chỉnh sửa mã giảm giá</p>
      <div className="bg-white py-5 px-5 rounded-[5px] mt-4">
        {voucherData ? <EditForm data={voucherData} /> : 'Loading...'}
      </div>
    </div>
  );
};

export default EditVoucher;
