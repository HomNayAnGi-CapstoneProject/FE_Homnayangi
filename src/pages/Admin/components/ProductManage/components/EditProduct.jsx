import React, { useState, useEffect } from 'react';
import instances from '../../../../../utils/plugin/axios';
import { ReGex_VietnameseTitle, ReGex_Numeric } from '../../../../../utils/regex';
import Image from '../../../../../share/components/Image';

// ** Library
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

// ** Firebase
import { ref, uploadBytes, listAll, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../../../../../firebase';

const EditForm = (props) => {
  const navigate = useNavigate();
  const [types, setTypes] = useState();
  const [units, setUnits] = useState();
  const [thumbNail, setThumbNail] = useState();
  const [imageDetails, setImageDetails] = useState([]);
  const params = useParams();
  const [editing, setEditing] = useState(false);

  const notifyError = (error) =>
    toast.error(error, {
      pauseOnHover: false,
      position: 'top-center',
      autoClose: 2000,
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: props.data,
  });

  // ** Call api get tyype
  useEffect(() => {
    const fetch = async () => {
      const res = await instances.get('/types');
      setTypes(res.data.resource);
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

  //submit form
  const onSubmit = (data) => {
    // console.log(data);
    setEditing(true);
    toast.promise(
      uploadMultiImages(imageDetails).then((listImages) => {
        uploadImage(thumbNail)
          .then((res) => {
            instances
              .put(`/ingredients`, {
                ingredientId: params?.ingredientId,
                name: data?.name,
                kcal: data?.kcal,
                description: data?.description,
                unitId: data?.unitId,
                listImage: listImages.length > 0 ? listImages : data?.listImage,
                picture: res !== undefined ? res : data?.picture,
                price: data?.price,
                typeId: data?.typeId,
                listImagePosition: data?.listImagePosition,
                status: true,
              })
              .then((res) => {
                setEditing(false);
                navigate('/management/product');
              });
          })
          .catch((err) => {
            notifyError(err);
          });
      }),
      {
        pending: 'Đang chỉnh sửa',
        // success: 'Đã chỉnh sửa thành công! 👌',
        error: {
          render({ data }) {
            // return data;
          },
        },
      },
    );
  };

  // ** Funcs

  const uploadMultiImages = async (images) => {
    const imagePromises = Array.from(images, (image) => uploadImage(image));

    const imageRes = await Promise.all(imagePromises);
    return imageRes;
  };

  // ** Upload image
  const uploadImage = (file) => {
    // console.log(file);
    return new Promise((resolve, reject) => {
      let imageUp = file;
      if (imageUp == undefined) {
        resolve(file);
        return;
      }

      // check file size and type
      if (!imageUp?.name?.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
        // file.target.value = null;
        setEditing(false);
        reject('Không đúng định dạng hình ảnh. Vui lòng chọn ảnh phù hợp (.jpg,.png,.jpeg)').then(() => {
          return;
        });
        // return;
      }

      if (imageUp?.size >= 2621440) {
        // file.target.value = null;
        setEditing(false);
        reject(`Dung lượng ảnh quá lớn (${Math.round(imageUp.size / 1000000)} MB). Dụng lượng tối đa (2.5 MB)`).then(
          () => {
            return;
          },
        );
        // return;
      }
      //create folder and image name
      const imageRef = ref(
        storage,
        `ingredients/${props.data.listImagePosition}/${imageUp.name + crypto.randomUUID()}`,
      );

      //upload image
      uploadBytes(imageRef, imageUp).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          // setThumbnailURL(url);
          resolve(url);
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex ss:flex-row flex-col justify-between gap-5">
        <div className="flex-1">
          <label>Tên nguyên liệu</label>
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
            <option value={props.data.unitId}>{props.data.unitName}</option>
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

          <label>Loại sản phẩm</label>
          <select
            className={`block mt-2 w-full h-[47px] ${
              errors?.typeId ? 'mb-[5px]' : 'mb-[20px]'
            } p-[12px] text-subText sm:text-md max-h-[100px] overflow-y-scroll border border-[#B9B9B9] rounded-[5px] focus:outline-primary`}
            {...register('typeId', { required: true })}
          >
            <option value={props?.data.typeId}>{props?.data.typeName}</option>
            {types &&
              types.map((type) => (
                <option key={type.typeId} value={type.typeId}>
                  {type.name}
                </option>
              ))}
          </select>
          {errors?.typeId?.type === 'required' && (
            <p className="mb-[5px] text-redError text-[14px]">Loại không được trống</p>
          )}

          <label>Mô tả sản phẩm</label>
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
              {'Thay đổi'}
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
                })}
              />
            </label>
            <Image
              className="w-[80px] h-[80px] mt-5 object-cover rounded"
              src={thumbNail ? URL.createObjectURL(thumbNail) : `${props.data.picture}`}
              alt="default-img"
            />
          </div>

          <div className="mt-12">
            <label
              htmlFor="listImage"
              className="cursor-pointer w-fit bg-white border-primary border-[2px] rounded-[5px] text-primary font-medium py-2 px-3 my-5 "
            >
              {'Thay đổi'}
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
                })}
              />
            </label>
            <div className="flex flex-wrap gap-1 mt-5">
              {imageDetails.length > 0
                ? imageDetails.map((item, i) => (
                    <React.Fragment key={i}>
                      <Image
                        className="w-[100px] h-[100px] object-cover rounded"
                        src={URL.createObjectURL(item)}
                        alt="default-img_list"
                      />
                    </React.Fragment>
                  ))
                : props.data.listImage.map((item, i) => (
                    <React.Fragment key={i}>
                      <Image className="w-[100px] h-[100px] object-cover rounded" src={item} alt="default-img_list" />
                    </React.Fragment>
                  ))}
              {/* {!imageDetails.length > 0 && (
                <img className="w-[100px] h-[100px] object-cover" src={defaultImageDetail} />
              )} */}
            </div>
          </div>
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

const EditProduct = () => {
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
  const params = useParams();
  const [ingredientData, setIngredientData] = useState();

  // ** call api
  useEffect(() => {
    const fetch = async () => {
      const res = await instances.get(`/ingredients/${params.ingredientId}`);
      // console.log(res.data.result);
      setIngredientData(res.data.result);
    };

    fetch();
  }, []);

  return (
    <div>
      <p className="font-semibold text-[18px]">Chỉnh sửa sản phẩm</p>
      <div className="bg-white py-5 px-5 rounded-[5px] mt-4">
        {ingredientData ? <EditForm data={ingredientData} /> : 'Loading...'}
      </div>
    </div>
  );
};

export default EditProduct;
