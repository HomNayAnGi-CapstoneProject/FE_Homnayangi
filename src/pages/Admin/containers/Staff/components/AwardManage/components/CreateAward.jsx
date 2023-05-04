import { useState, useEffect } from 'react';
import instances from '../../../../../../../utils/plugin/axios';
import { ReGex_VietnameseTitle, ReGex_Numeric } from '../../../../../../../utils/regex';

// ** Assets
import defaultImage from '../../../../../../../assets/images/default_image.png';
import defaultImageDetail from '../../../../../../../assets/images/default_image_detail.png';

// ** Library
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

// ** Firebase
import { ref, uploadBytes, listAll, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../../../../../../../firebase';

const CreateAward = () => {
  // ** Const
  const folderID = crypto.randomUUID();
  const [badgesImg, setBadgesImg] = useState();
  const [uploading, setUploading] = useState(false);
  const [voucherList, setVoucherList] = useState([]);
  const navigate = useNavigate();

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

  const notiSuccess = (msg) => {
    toast.success(msg, { pauseOnHover: false });
  };

  // ** get voucher list
  useEffect(() => {
    const fetch = async () => {
      const res = await instances.get('/vouchers/drop-down');
      // console.log(res.data.result);
      setVoucherList(res.data.result);
    };
    fetch();
  }, []);

  // ** Functs
  //submit form
  const onSubmit = (data) => {
    // console.log(data);
    setUploading(true);
    toast.promise(
      // console.log(listImages);
      uploadImage(data.picture[0])
        .then((res) => {
          // console.log(res);
          instances
            .post('/badges', {
              name: data.name,
              description: data.description,
              ImageUrl: res,
              voucherId: data.voucherId,
            })
            .then((res) => {
              if (res.data.status == 'failed') {
                notifyError('Tạo huy hiệu thất bại');
                setUploading(false);
              } else {
                notiSuccess('Đã tạo thành công');
                setUploading(false);
                navigate('/management/award');
              }
            });
        })
        .catch((err) => {
          notifyError(err);
        }),
      {
        pending: 'Đang tạo huy hiệu',
        // success: 'Đã tạo thành công! 👌',
        error: {
          render({ data }) {
            // return data;
          },
        },
      },
    );
  };

  // ** Upload image
  const uploadImage = (file) => {
    return new Promise((resolve, reject) => {
      let imageUp = file;
      if (imageUp == null) {
        // resolve(file);
        return;
      }

      // check file size and type
      if (!imageUp.name.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
        // file.target.value = null;
        setUploading(false);
        reject('Không đúng định dạng hình ảnh. Vui lòng chọn ảnh phù hợp (.jpg,.png,.jpeg)').then(() => {
          return;
        });
      }

      if (imageUp.size >= 2621440) {
        // notifyError(`Dung lượng ảnh quá lớn (${Math.round(imageUp.size / 1000000)} MB). Dụng lượng tối đa (2.5 MB)`);
        // file.target.value = null;
        setUploading(false);
        reject(`Dung lượng ảnh quá lớn (${Math.round(imageUp.size / 1000000)} MB). Dụng lượng tối đa (2.5 MB)`).then(
          () => {
            return;
          },
        );
      }

      //create folder and image name
      const imageRef = ref(storage, `badges/${folderID}/${imageUp.name + crypto.randomUUID()}`);
      // setUploading(true);

      //upload image
      uploadBytes(imageRef, imageUp).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          // setThumbnailURL(url);
          resolve(url);
          // setUploading(false);
        });
      });
    });
  };

  return (
    <div>
      <p className="font-semibold text-[18px]">Thêm danh hiệu</p>
      <div className="bg-white py-5 px-5 rounded-[5px] mt-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex ss:flex-row flex-col justify-between gap-5">
            {/* infos */}
            <div className="flex-1">
              <label>Mã giảm giá</label>
              <select
                className={`block mt-2 w-full h-[47px] ${
                  errors?.voucherId ? 'mb-[5px]' : 'mb-[20px]'
                } p-[12px] text-subText sm:text-md max-h-[100px] overflow-y-scroll border border-[#B9B9B9] rounded-[5px] focus:outline-primary`}
                {...register('voucherId', { required: true })}
              >
                <option value="">Chọn mã giảm giá</option>
                {voucherList &&
                  voucherList.map((type) => (
                    <option key={type.voucherId} value={type.voucherId}>
                      {type.voucherName}
                    </option>
                  ))}
              </select>
              {errors?.voucherId?.type === 'required' && (
                <p className="mb-[5px] text-redError text-[14px]">Mã giảm giá không được trống</p>
              )}

              <div className=" gap-1 items-baseline">
                <label>Tên danh hiệu</label>
              </div>
              <input
                name="name"
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
                <p className="mb-[5px] text-redError text-[14px]">Tên danh hiệu không được trống</p>
              )}
              {errors?.name?.type === 'pattern' && (
                <p className="mb-[5px] text-redError text-[14px]">Tên danh hiệu không hợp lệ</p>
              )}

              <label>Mô tả danh hiệu</label>
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
            {/* img */}
            <div className="ss:w-[50%] w-full pl-10">
              <div className="mt-2">
                <label
                  htmlFor="picture"
                  className="cursor-pointer w-fit bg-white border-primary border-[2px] rounded-[5px] text-primary font-medium py-2 px-3 mt-5"
                >
                  {!badgesImg ? 'Chọn ảnh danh hiệu' : 'Thay đổi'}
                  <input
                    name="picture"
                    id="picture"
                    style={{ display: 'none' }}
                    type="file"
                    accept="image/png, image/gif, image/jpeg, image/jpg"
                    {...register('picture', {
                      onChange: (e) => {
                        setBadgesImg(e.target.files[0]);
                      },
                      required: true,
                    })}
                  />
                </label>
                <img
                  className="w-[80px] h-[80px] mt-5 object-cover rounded"
                  src={badgesImg ? URL.createObjectURL(badgesImg) : `${defaultImage}`}
                  alt="default-img"
                />
              </div>
              {errors?.picture?.type === 'required' && (
                <p className="mb-[5px] text-redError text-[14px]">Ảnh danh hiệu không được trống</p>
              )}
            </div>
          </div>

          <button
            disabled={uploading ? true : false}
            type="submit"
            className={`${
              uploading ? 'cursor-not-allowed' : ''
            } w-full rounded-[5px] mt-[20px] text-white font-semibold text-center bg-primary hover:bg-primaryHover transition py-2`}
          >
            Xác nhận
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAward;
