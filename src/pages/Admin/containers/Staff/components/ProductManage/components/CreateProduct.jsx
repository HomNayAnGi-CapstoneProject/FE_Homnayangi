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

const CreateProduct = () => {
  // ** Const
  const [types, setTypes] = useState();
  const [units, setUnits] = useState();
  const [thumbNail, setThumbNail] = useState();
  const [imageDetails, setImageDetails] = useState([]);
  const folderID = crypto.randomUUID();
  const [thumbnailURL, setThumbnailURL] = useState();
  const [imageDetailsURL, setImageDetailsURL] = useState([]);
  const [uploading, setUploading] = useState(false);

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
  const navigate = useNavigate();

  // ** Call api get tyype
  useEffect(() => {
    const fetch = async () => {
      const res = await instances.get('/types/drop-down');
      setTypes(res.data);
    };

    fetch();
  }, []);

  // ** Call api get unit dropdown
  useEffect(() => {
    const fetch = async () => {
      const res = await instances.get('/unit/drop-down');
      // console.log(res.data.resource);
      setUnits(res.data);
    };

    fetch();
  }, []);

  // ** Functs
  //submit form
  const onSubmit = (data) => {
    // console.log(data);
    setUploading(true);
    toast.promise(
      uploadMultiImages(imageDetails).then((listImages) => {
        // console.log(listImages);
        uploadImage(data.picture[0])
          .then((res) => {
            // console.log(res);
            instances
              .post('/ingredients', {
                name: data.name,
                description: data.description,
                unitId: data.unitId,
                kcal: data.kcal,
                price: data.price,
                typeId: data.typeId,
                listImagePosition: folderID,
                picture: res,
                listImage: listImages,
              })
              .then((res) => {
                setUploading(false);
                navigate('/management/product');
              });
          })
          .catch((err) => {
            notifyError(err);
          });
      }),
      {
        pending: 'Đang tạo sản phẩm',
        // success: 'Đã tạo thành công! 👌',
        error: {
          render({ data }) {
            // return data;
          },
        },
      },
    );
  };

  const uploadMultiImages = async (images) => {
    const imagePromises = Array.from(images, (image) => uploadImage(image));

    const imageRes = await Promise.all(imagePromises);
    return imageRes;
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
      const imageRef = ref(storage, `ingredients/${folderID}/${imageUp.name + crypto.randomUUID()}`);
      // setUploading(true);

      //upload image
      uploadBytes(imageRef, imageUp).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setThumbnailURL(url);
          resolve(url);
          // setUploading(false);
        });
      });
    });
  };

  // handle select list image
  const handleSelectListImage = (e) => {
    const selectedFiles = e.target.files;
    const selectedFilesArray = Array.from(selectedFiles);
    if (selectedFilesArray.length > 5) {
      notifyError('Số lượng ảnh tối đa 5');
      setImageDetails(selectedFilesArray.slice(0, 5));
    } else {
      setImageDetails(selectedFilesArray);
    }
  };

  return (
    <>
      <p className="font-semibold text-[18px]">Thêm nguyên liệu</p>
      <div className="bg-white py-5 px-5 rounded-[5px] mt-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex ss:flex-row flex-col justify-between gap-5">
            <div className="flex-1">
              <div className=" gap-1 items-baseline">
                <label>Tên nguyên liệu</label>
                <p className="text-[14px] italic text-gray-500">
                  (Nếu tên nguyên liệu trùng nhau thì sẽ sử dụng thêm "định lượng". Ví dụ "Nước mắm 500ml")
                </p>
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
                <p className="mb-[5px] text-redError text-[14px]">Tên nguyên liệu không được trống</p>
              )}
              {errors?.name?.type === 'pattern' && (
                <p className="mb-[5px] text-redError text-[14px]">Tên nguyên liệu không hợp lệ</p>
              )}

              <label>Đơn vị</label>
              <select
                className={`block mt-2 w-full h-[47px] ${
                  errors?.unitId ? 'mb-[5px]' : 'mb-[20px]'
                } p-[12px] text-subText sm:text-md max-h-[100px] overflow-y-scroll border border-[#B9B9B9] rounded-[5px] focus:outline-primary`}
                {...register('unitId', { required: true })}
              >
                <option value="">Đơn vị</option>
                {units &&
                  units.map((unit) => (
                    <option key={unit.unitId} value={unit.unitId}>
                      {unit.unitName}
                    </option>
                  ))}
              </select>
              {errors?.unitId?.type === 'required' && (
                <p className="mb-[5px] text-redError text-[14px]">Đơn vị không được trống</p>
              )}

              <label>Giá tiền</label>
              <input
                type="number"
                name="price"
                className={`block mt-2 w-full h-[47px] ${
                  errors?.price ? 'mb-[5px]' : 'mb-[20px]'
                } p-[12px] text-subText sm:text-md  border border-[#B9B9B9] rounded-[5px] focus:outline-primary`}
                {...register('price', {
                  required: true,
                  pattern: {
                    value: ReGex_Numeric,
                  },
                })}
              />
              {errors?.price?.type === 'required' && (
                <p className="mb-[5px] text-redError text-[14px]">Giá tiền không được trống</p>
              )}
              {errors?.price?.type === 'pattern' && (
                <p className="mb-[5px] text-redError text-[14px]">Giá tiền không hợp lệ</p>
              )}

              <label>Số lượng calo</label>
              <input
                type="number"
                name="kcal"
                className={`block mt-2 w-full h-[47px] ${
                  errors?.kcal ? 'mb-[5px]' : 'mb-[20px]'
                } p-[12px] text-subText sm:text-md  border border-[#B9B9B9] rounded-[5px] focus:outline-primary`}
                {...register('kcal', {
                  required: true,
                  pattern: {
                    value: ReGex_Numeric,
                  },
                })}
              />
              {errors?.kcal?.type === 'required' && (
                <p className="mb-[5px] text-redError text-[14px]">Số lượng calo không được trống</p>
              )}
              {errors?.kcal?.type === 'pattern' && (
                <p className="mb-[5px] text-redError text-[14px]">Số lượng calo không hợp lệ</p>
              )}

              <label>Loại món</label>
              <select
                className={`block mt-2 w-full h-[47px] ${
                  errors?.typeId ? 'mb-[5px]' : 'mb-[20px]'
                } p-[12px] text-subText sm:text-md max-h-[100px] overflow-y-scroll border border-[#B9B9B9] rounded-[5px] focus:outline-primary`}
                {...register('typeId', { required: true })}
              >
                <option value="">Loại món</option>
                {types &&
                  types.map((type) => (
                    <option key={type.typeId} value={type.typeId}>
                      {type.typeName}
                    </option>
                  ))}
              </select>
              {errors?.typeId?.type === 'required' && (
                <p className="mb-[5px] text-redError text-[14px]">Loại không được trống</p>
              )}

              <label>Mô tả nguyên liệu</label>
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
            <div className="ss:w-[50%] w-full pl-10">
              <div className="mt-2">
                <label
                  htmlFor="picture"
                  className="cursor-pointer w-fit bg-white border-primary border-[2px] rounded-[5px] text-primary font-medium py-2 px-3 mt-5"
                >
                  {!thumbNail ? 'Chọn ảnh thumbnail' : 'Thay đổi'}
                  <input
                    name="picture"
                    id="picture"
                    style={{ display: 'none' }}
                    type="file"
                    accept="image/png, image/gif, image/jpeg, image/jpg"
                    {...register('picture', {
                      onChange: (e) => {
                        setThumbNail(e.target.files[0]);
                      },
                      required: true,
                    })}
                  />
                </label>
                <img
                  className="w-[80px] h-[80px] mt-5 object-cover rounded"
                  src={thumbNail ? URL.createObjectURL(thumbNail) : `${defaultImage}`}
                  alt="default-img"
                />
              </div>
              {errors?.picture?.type === 'required' && (
                <p className="mb-[5px] text-redError text-[14px]">Ảnh thumbnail không được trống</p>
              )}

              <div className="mt-12">
                <label
                  htmlFor="listImage"
                  className="cursor-pointer w-fit bg-white border-primary border-[2px] rounded-[5px] text-primary font-medium py-2 px-3 my-5 "
                >
                  {!imageDetails.length > 0 ? 'Chọn ảnh chi tiết (ít nhất 1 ảnh)' : 'Thay đổi'}
                  <input
                    multiple
                    name="listImage"
                    id="listImage"
                    style={{ display: 'none' }}
                    type="file"
                    accept="image/png, image/gif, image/jpeg, image/jpg"
                    {...register('listImage', {
                      onChange: (e) => {
                        handleSelectListImage(e);
                      },
                      required: true,
                    })}
                  />
                </label>
                <div className="flex flex-wrap gap-1 mt-5">
                  {imageDetails &&
                    imageDetails.map((item, i) => (
                      <img
                        key={i}
                        className="w-[100px] h-[100px] object-cover rounded"
                        src={URL.createObjectURL(item)}
                        alt="default-img_list"
                      />
                    ))}
                  {!imageDetails.length > 0 && (
                    <img className="w-[100px] h-[100px] object-cover" src={defaultImageDetail} />
                  )}
                </div>
              </div>
              {errors?.listImage?.type === 'required' && (
                <p className="mb-[5px] text-redError text-[14px]">Chọn ít nhất 1 ảnh chi tiết</p>
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
    </>
  );
};

export default CreateProduct;
