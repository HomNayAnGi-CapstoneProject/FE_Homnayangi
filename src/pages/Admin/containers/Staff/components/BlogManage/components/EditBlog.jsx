import { useEffect, useState, useRef, useLayoutEffect } from 'react';
import instances from '../../../../../../../utils/plugin/axios';
import useDebounce from '../../../../../../../share/hooks/useDebounce';
import Image from '../../../../../../../share/components/Image';

// ** Assets
import ic_loading from '../../../../../../../assets/images/sand-clock.png';

// ** Third party libraries
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

// ** Redux
import {
  setContentBlog,
  getCurrentContent,
  setBlogId,
  clearBlogContent,
} from '../../../../../../../redux/actionSlice/managementSlice';
import { useDispatch, useSelector } from 'react-redux';

// ** Firebase
import { storage } from '../../../../../../../firebase';
import { ref, uploadBytes, listAll, getDownloadURL, deleteObject } from 'firebase/storage';

// ** Components
import SubcateSelect from './SubcateSelect/SubcateSelect';
import MaterialSelect from './MaterialSelect/MaterialSelect';
import Portion from './Portion/Portion';
import CookTime from './CookTime/CookTime';
import IsEvent from './IsEvent/IsEvent';

// ** Markdown
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import EmojiPicker from '../../../../../../../utils/plugin/EmojiPicker';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

const EditBlog = () => {
  // ** Const
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const notifyError = (error) =>
    toast.error(error, {
      pauseOnHover: false,
      position: 'top-center',
      autoClose: 2000,
    });
  const [uploadBlogSuccess, setUploadBlogSuccess] = useState(false);
  const [uploading, setUploading] = useState(false);

  // ** get content store
  const contentBlog = useSelector((state) => state.management.blogContent);
  const contentStore = useSelector((state) => state.management);
  // const contentBlog = JSON.parse(localStorage.getItem('BLOG_CONTENT'));

  // Initialize a markdown parser
  const mdParser = new MarkdownIt(/* Markdown-it options */);
  const mdEditDescription = useRef();
  const mdEditPrepare = useRef();
  const mdEditCooking = useRef();
  const mdEditCompletation = useRef();
  MdEditor.use(EmojiPicker);

  const descriptionRef = useRef(null);

  // **! Generate blog ID for image upload
  let blogID = localStorage.getItem('blogId');
  const blogIdRef = useRef(null);
  useEffect(() => {
    if (!params.blogId) {
      const fetch = async () => {
        const res = await instances.post('/blogs');
        dispatch(setBlogId(res.data.blog_id));
        blogIdRef.current = res.data.blog_id;
      };
      fetch();
    } else {
      blogIdRef.current = params.blogId;
      dispatch(setBlogId(params.blogId));
    }
  }, []);

  // ** get edit data (if had)
  useEffect(() => {
    if (params.blogId) {
      const fetch = async () => {
        const res = await instances.get(`/blogs/staff-preview/${params.blogId}`);
        // console.log(res.data);
        dispatch(setContentBlog({ title: res.data?.title }));
        dispatch(setContentBlog({ minSize: res.data?.minSize }));
        dispatch(setContentBlog({ maxSize: res.data?.maxSize }));
        dispatch(setContentBlog({ minutesToCook: res.data?.minutesToCook }));
        dispatch(setContentBlog({ isEvent: res.data?.isEvent }));
        dispatch(setContentBlog({ eventExpiredDate: res.data?.eventExpiredDate }));
        dispatch(setContentBlog({ coverImage: res.data?.imageUrl ? { url: res.data?.imageUrl } : undefined }));
        dispatch(setContentBlog({ packagePrice: res.data?.packagePrice }));
        dispatch(setContentBlog({ cookedPrice: res.data?.cookedPrice }));
        dispatch(setContentBlog({ totalKcal: res.data?.totalKcal }));
        dispatch(setContentBlog({ videoUrl: res.data?.videoUrl }));
        dispatch(setContentBlog({ description: { html: res.data?.descriptionHTML, text: res.data?.descriptionText } }));
        dispatch(setContentBlog({ preparation: { html: res.data?.preparationHTML, text: res.data?.preparationText } }));
        dispatch(setContentBlog({ processing: { html: res.data?.processingHTML, text: res.data?.processingText } }));
        dispatch(setContentBlog({ finished: { html: res.data?.finishedHTML, text: res.data?.finishedText } }));
        dispatch(
          setContentBlog({
            subCategory: res.data?.subCates?.map(function (item) {
              return { subCategoryId: item.subCateId, name: item.name };
            }),
          }),
        );
        dispatch(
          setContentBlog({
            ingredients: res.data?.recipeDetails?.map(function (item) {
              return {
                quantity: item.quantity,
                ingredientId: item.ingredientId,
                description: item.description,
                unitName: item.unitName,
              };
            }),
          }),
        );
      };

      fetch();
    }
  }, []);

  // ** Clear content if it has content when exit edit blog/ delete null draft blog when exit edit blog
  const contentBlogRef = useRef();
  useEffect(() => {
    return () => {
      if (contentBlogRef.current == null) {
        const fetch = async () => {
          await instances.delete(`/blogs/remove-draft/${blogIdRef.current}`);
        };
        fetch();
      } else {
        dispatch(clearBlogContent());
      }
    };
  }, []);

  // ** Change content (blogStatus: 2 - draft, 3 - pending (publish blog then send this))
  useEffect(() => {
    // console.log(contentBlog);
    contentBlogRef.current = contentBlog;
    let subCateList = contentBlog?.subCategory?.map(function (item) {
      return { subCateId: item.subCategoryId, blogId: blogIdRef.current };
    });
    let handler = null;
    if (contentBlog !== null) {
      handler = setTimeout(() => {
        toast.promise(
          instances
            .put(`/blogs`, {
              blog: {
                blogId: contentStore.blogId,
                title: contentBlog?.title || null,
                // description: contentBlog?.description?.html || null,
                // preparation: contentBlog?.preparation?.html || null,
                // processing: contentBlog?.processing?.html || null,
                // finished: contentBlog?.finished?.html || null,
                imageUrl: contentBlog?.coverImage?.url || null,
                blogStatus: 2, // (DELETED: 0, ACTIVE: 1, DRAFT:2, PENDING: 3)
                videoUrl: contentBlog?.videoUrl || null,
                minutesToCook: parseInt(contentBlog?.minutesToCook) || null,
                isEvent: contentBlog?.isEvent || null,
                eventExpiredDate: contentBlog?.eventExpiredDate || null,
              },
              Recipe: {
                packagePrice: parseInt(contentBlog?.packagePrice) || null,
                cookedPrice: parseInt(contentBlog?.cookedPrice) || null,
                maxSize: parseInt(contentBlog?.maxSize) || null,
                minSize: parseInt(contentBlog?.minSize) || null,
                totalKcal: parseInt(contentBlog?.totalKcal) || null,
              },
              RecipeDetails: contentBlog?.ingredients || [],
              BlogSubCates: subCateList || [],
              BlogReferences: [
                {
                  type: 0,
                  text: contentBlog?.description?.text || null,
                  html: contentBlog?.description?.html || null,
                },
                {
                  type: 1,
                  text: contentBlog?.preparation?.text || null,
                  html: contentBlog?.preparation?.html || null,
                },
                {
                  type: 2,
                  text: contentBlog?.processing?.text || null,
                  html: contentBlog?.processing?.html || null,
                },
                {
                  type: 3,
                  text: contentBlog?.finished?.text || null,
                  html: contentBlog?.finished?.html || null,
                },
              ],
            })
            .then((res) => {
              navigate(`/management/blog/edit/${contentStore.blogId}`, { replace: true });
            }),
          {
            pending: 'Đang lưu bản nháp',
            success: 'Đã lưu bản nháp! 👌',
            error: {
              render({ data }) {
                // return data.response?.data.error;
              },
            },
          },
        );
      }, 600);
    }

    return () => {
      clearTimeout(handler);
    };
  }, [contentBlog]);

  // ** image storage folder ref
  const imageStorageRef = ref(storage, `blogs/${contentStore.blogId}`);

  // ** handle height textarea
  const handleInput = (e) => {
    dispatch(setContentBlog({ title: e.target.value }));
    if (descriptionRef.current) {
      descriptionRef.current.style.height = 'auto';
      descriptionRef.current.style.height = `${e.target.scrollHeight}px`;
    }
  };

  // ** handle input videoUrl
  const handleInputVideoUrl = (e) => {
    dispatch(setContentBlog({ videoUrl: e.target.value }));
  };

  // ** Functs
  const getHtmlValuee = () => {
    console.log(mdEditDescription.current.getHtmlValue());
  };

  const getMdValuee = () => {
    console.log(mdEditDescription.current.getMdValue());
  };

  function handleDescriptionChange({ html, text }) {
    dispatch(
      setContentBlog({
        description: {
          html,
          text,
        },
      }),
    );
    // console.log('description', html, text);
  }

  function handlePreparationChange({ html, text }) {
    dispatch(
      setContentBlog({
        preparation: {
          html,
          text,
        },
      }),
    );
  }

  function handleProcessingChange({ html, text }) {
    dispatch(
      setContentBlog({
        processing: {
          html,
          text,
        },
      }),
    );
  }

  function handleFinishedChange({ html, text }) {
    dispatch(
      setContentBlog({
        finished: {
          html,
          text,
        },
      }),
    );
  }

  const removeImageCover = (path) => {
    let deleteRef = ref(storage, `${path}`);
    if (path !== null) {
      deleteObject(deleteRef)
        .then(() => {
          dispatch(setContentBlog({ coverImage: null }));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const uploadImage = (file) => {
    let imageUp = file.target.files[0];
    if (imageUp == null) {
      return;
    }

    // check file size and type
    if (!imageUp.name.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
      notifyError(`Không đúng định dạng hình ảnh. Vui lòng chọn ảnh phù hợp (.jpg,.png,.jpeg)`);
      file.target.value = null;
      return;
    }

    if (imageUp.size >= 2621440) {
      notifyError(`Dung lượng ảnh quá lớn (${Math.round(imageUp.size / 1000000)} MB). Dụng lượng tối đa (2.5 MB)`);
      file.target.value = null;
      return;
    }

    //create folder and image name (lan dau vao gen ra 1 id? luu id do vao local -> chi clear khi publish)
    const imageRef = ref(storage, `blogs/${blogIdRef.current}/${imageUp.name + crypto.randomUUID()}`);
    setUploading(true);
    //upload image
    uploadBytes(imageRef, imageUp).then((snapshot) => {
      console.log(snapshot.ref);
      getDownloadURL(snapshot.ref).then((url) => {
        dispatch(setContentBlog({ coverImage: { url, fullPath: snapshot.ref.fullPath } }));
        setUploading(false);
      });
    });
  };

  // use in MdEditor
  function onImageUpload(file) {
    return new Promise((resolve, reject) => {
      // check file size and type
      if (!file.name.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
        notifyError(`Không đúng định dạng hình ảnh. Vui lòng chọn ảnh phù hợp (.jpg,.png,.jpeg)`);
        file.target.value = null;
        return;
      }

      if (file.size >= 2621440) {
        notifyError(`Dung lượng ảnh quá lớn (${Math.round(file.size / 1000000)} MB). Dụng lượng tối đa (2.5 MB)`);
        file.target.value = null;
        return;
      }
      //create folder and image name
      const imageRef = ref(storage, `blogs/${blogIdRef.current}/${file.name + crypto.randomUUID()}`);
      //upload image
      uploadBytes(imageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          resolve(url);
        });
      });
    });
  }

  return (
    <div className="bg-white font-inter rounded-[5px] shadow-md py-5 px-5">
      {/* ================================= BÀI VIẾT SỰ KIỆN? ================================= */}
      <div className="my-7">
        <IsEvent />
      </div>

      {/* ================================= CHỌN ẢNH BÌA ================================= */}
      <div className="flex items-center gap-2">
        {!uploading ? (
          contentBlog && contentBlog?.coverImage !== undefined && contentBlog?.coverImage !== null ? (
            <div className="flex items-center gap-5">
              {(contentBlog?.coverImage !== undefined || contentBlog?.coverImage !== null) && (
                <Image alt="" className="object-scale-down w-[100px]" src={contentBlog?.coverImage?.url} />
              )}
              <div className="flex items-center gap-2">
                <label
                  htmlFor="changeCoverImage"
                  className="cursor-pointer px-3 py-2 rounded-[5px] border-[2px] text-[#848484]"
                >
                  Thay đổi
                  <input
                    id="changeCoverImage"
                    style={{ display: 'none' }}
                    onChange={(e) => {
                      uploadImage(e);
                    }}
                    type="file"
                    accept="image/png, image/gif, image/jpeg, image/jpg"
                  />
                </label>
                {/* <button
                  onClick={() => removeImageCover(contentBlog?.coverImage.fullPath)}
                  className="text-redError px-3 py-2 hover:bg-[#e6e6e6] rounded-[5px]"
                >
                  Xóa{' '}
                </button> */}
              </div>
            </div>
          ) : (
            <>
              <label
                htmlFor="coverImage"
                className="cursor-pointer w-fit bg-white border-primary border-[2px] rounded-[5px] text-primary font-medium py-2 px-3 mt-5"
              >
                Chọn ảnh bìa
                <input
                  id="coverImage"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    uploadImage(e);
                  }}
                  type="file"
                  accept="image/png, image/gif, image/jpeg, image/jpg"
                  className=""
                />
              </label>
            </>
          )
        ) : (
          <div className="flex items-center">
            <div
              className="w-[20px] h-[20px] bg-cover animate-spin"
              style={{ backgroundImage: `url(${ic_loading})` }}
            />
            <p className="py-2 px-3">Uploading...</p>
          </div>
        )}
      </div>

      <div className="my-7">
        {/* ================================= TIÊU ĐỀ BÀI VIẾT ================================= */}
        <textarea
          required
          rows={1}
          ref={descriptionRef}
          onChange={(e) => handleInput(e)}
          value={contentBlog?.title}
          placeholder="Tiêu đề..."
          className={`text-[30px] text-[#a1a1a1] font-semibold outline-none border-none w-full max-h-[150px] scroll-bar resize-none`}
        />

        {/* ================================= KHẨU PHẦN ĂN, THỜI GIAN NẤU================================= */}
        <div className="my-7 flex sm:flex-row flex-col sm:items-center gap-6 text-[#8f8f8f]">
          <Portion />
          <CookTime />
        </div>

        {/* ================================= DANH MỤC PHỤ ================================= */}
        <div className="my-7">
          <SubcateSelect contentBlog={contentBlog} maxLenght={5} />
        </div>

        {/* ================================= MÔ TẢ BÀI VIẾT ================================= */}
        <div className="my-7">
          <MdEditor
            markdownClass="md_description"
            name="description"
            view={{ menu: true, md: true, html: false }}
            placeholder="Mô tả bài viết..."
            plugins={['header', 'font-bold', 'font-italic', 'font-underline', 'clear', 'logger', 'emoji-picker']}
            style={{ height: '150px', width: '100%' }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={handleDescriptionChange}
            value={contentBlog?.description?.text}
            ref={mdEditDescription}
          />
        </div>

        {/* ================================= NGUYÊN LIỆU ================================= */}
        <div className="my-7">
          <p className="font-semibold text-[20px]">
            Nguyên liệu:{' '}
            <span className="text-redError text-[14px] font-medium">
              * Các bài viết bắt buộc phải có mục nguyên liệu{' '}
            </span>{' '}
          </p>
          <div className="my-3">
            <MaterialSelect />
          </div>
        </div>

        {/* ================================= SƠ CHẾ ================================= */}
        <div className="my-7">
          <p className="font-semibold text-[20px]">
            Sơ chế: <span className="text-redError text-[14px] font-medium">* Phần sơ chế nguyên liệu </span>{' '}
          </p>
          <div className="my-3">
            <MdEditor
              markdownClass="md_description"
              name="preparation"
              view={{ menu: true, md: true, html: false }}
              placeholder="Các bước sơ chế nguyên liệu..."
              plugins={[
                'header',
                'font-bold',
                'font-italic',
                'font-underline',
                'list-unordered',
                'list-ordered',
                'table,',
                'image',
                'clear',
                'logger',
                'emoji-picker',
              ]}
              style={{ height: '350px', width: '100%' }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={handlePreparationChange}
              value={contentBlog?.preparation?.text}
              onImageUpload={onImageUpload}
              ref={mdEditPrepare}
              imageAccept=".jpg,.png,.jpeg"
            />
          </div>
        </div>

        {/* ================================= CÁCH CHẾ BIẾN ================================= */}
        <div className="my-7">
          <p className="font-semibold text-[20px]">
            Cách chế biến: <span className="text-redError text-[14px] font-medium">* Phần chế biến món ăn </span>{' '}
          </p>
          <div className="my-3">
            <MdEditor
              markdownClass="md_description"
              name="cooking"
              view={{ menu: true, md: true, html: false }}
              placeholder="Các bước chế biến món ăn..."
              plugins={[
                'header',
                'font-bold',
                'font-italic',
                'font-underline',
                'list-unordered',
                'list-ordered',
                'table,',
                'image',
                'clear',
                'logger',
                'emoji-picker',
              ]}
              style={{ minHeight: '350px', height: 'max-content', width: '100%' }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={handleProcessingChange}
              value={contentBlog?.processing?.text}
              onImageUpload={onImageUpload}
              ref={mdEditCooking}
              imageAccept=".jpg,.png,.jpeg"
            />
          </div>
        </div>

        {/* ================================= THÀNH PHẨM ================================= */}
        <div className="my-7">
          <p className="font-semibold text-[20px]">
            Thành phẩm: <span className="text-redError text-[14px] font-medium">* Thành phẩm món ăn </span>{' '}
          </p>
          <div className="my-3">
            <MdEditor
              markdownClass="md_description"
              name="completation"
              view={{ menu: true, md: true, html: false }}
              placeholder="Thành quả sau khi nấu..."
              plugins={[
                'header',
                'font-bold',
                'font-italic',
                'font-underline',
                'list-unordered',
                'list-ordered',
                'table,',
                'image',
                'clear',
                'logger',
                'emoji-picker',
              ]}
              style={{ height: '350px', width: '100%' }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={handleFinishedChange}
              value={contentBlog?.finished?.text}
              onImageUpload={onImageUpload}
              ref={mdEditCompletation}
              imageAccept=".jpg,.png,.jpeg"
            />
          </div>
        </div>

        {/* ================================= VIDEO ================================= */}
        <div className="my-7">
          <p className="font-semibold text-[20px]">Video hướng dẫn:</p>
          <div>
            <input
              name="videoUrl"
              placeholder="Dán link vào đây"
              onChange={(e) => handleInputVideoUrl(e)}
              value={contentBlog?.videoUrl}
              className={`block mt-2 w-full h-[47px] p-[12px] text-subText sm:text-md  border border-[#B9B9B9] rounded-[5px] focus:outline-primary`}
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBlog;
