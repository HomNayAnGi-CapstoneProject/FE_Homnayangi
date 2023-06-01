import { useState, useEffect } from 'react';
import EditBlog from './EditBlog';
import PreviewBlog from './PreviewBlog';
import Dropdown from '../../../../../../../share/components/Admin/Dropdown';
import instances from '../../../../../../../utils/plugin/axios';

// ** Redux
import { clearBlogContent, setBlogSubCategory } from '../../../../../../../redux/actionSlice/managementSlice';
import { useDispatch, useSelector } from 'react-redux';

// ** Assets
import { ic_caret_gray, ic_menu, ic_caret_down_white } from '../../../../../../../assets';

// ** Third party libraries
import { useNavigate } from 'react-router-dom';
import OutsideClickHandler from 'react-outside-click-handler';
import { toast } from 'react-toastify';

//** Category list */
const data = [
  { id: 1212212, name: 'Category 1' },
  { id: 1212213, name: 'Category 2' },
  { id: 1212214, name: 'Category 3' },
  { id: 1212215, name: 'Category 4' },
  { id: 1212216, name: 'Category 5' },
  { id: 1212217, name: 'Category 6' },
  { id: 1212218, name: 'Category 7' },
];

const CreateBlog = () => {
  //** Const */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [toggle, setToggle] = useState('edit');
  const [openDropdown, setOpenDropdown] = useState(false);
  const contentBlog = useSelector((state) => state.management.blogContent);
  const contentStore = useSelector((state) => state.management);
  const [categoryList, setCategoryList] = useState([]);
  const [getDropdownValue, setDropdownValue] = useState();

  // ** Functions
  const handlePublish = () => {
    // console.log(contentBlog);
    let subCateList = contentBlog?.subCategory?.map(function (item) {
      return { subCateId: item.subCategoryId, blogId: contentStore.blogId };
    });
    toast.promise(
      instances
        .put(`/blogs`, {
          blog: {
            blogId: contentStore.blogId,
            title: contentBlog?.title || null,
            imageUrl: contentBlog?.coverImage?.url || null,
            blogStatus: 3, // (DELETED: 0, ACTIVE: 1, DRAFT:2, PENDING: 3)
            videoUrl: contentBlog?.videoUrl || null,
            minutesToCook: contentBlog?.minutesToCook || null,
            isEvent: contentBlog?.isEvent || null,
            eventExpiredDate: contentBlog?.eventExpiredDate || null,
            cookingMethodId: contentBlog?.cookingMethodId || null,
            regionId: contentBlog?.regionId || null,
          },
          Packages: contentBlog?.Packages || null,
          // Recipe: {
          //   packagePrice: parseInt(contentBlog?.packagePrice) || null,
          //   cookedPrice: parseInt(contentBlog?.cookedPrice) || null,
          //   maxSize: parseInt(contentBlog?.maxSize) || null,
          //   minSize: parseInt(contentBlog?.minSize) || null,
          //   totalKcal: parseInt(contentBlog?.totalKcal) || null,
          // },
          // RecipeDetails: contentBlog?.ingredients || [],
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
          navigate(`/management/blog`);
        }),
      {
        pending: 'Đang đăng bài viết',
        success: 'Bài viết đang được chờ duyệt 👌',
        error: {
          render({ data }) {
            // return data.response?.data.error;
          },
        },
      },
    );
  };

  // ** get category list
  useEffect(() => {
    const fetch = async () => {
      const res = await instances.get('/categories');
      // console.log(res.data);
      setCategoryList(res.data);
    };
    fetch();
  }, []);

  useEffect(() => {
    dispatch(setBlogSubCategory(getDropdownValue?.subCategories));
    // console.log(getDropdownValue);
  }, [getDropdownValue]);

  return (
    <div className="font-inter">
      <div className="">
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            <button
              onClick={() => setToggle('edit')}
              className={`${
                toggle == 'edit' ? 'font-semibold text-black' : 'text-[#848484]'
              } p-2 rounded-[5px] hover:bg-[#e6e6e6] `}
            >
              Tạo bài viết
            </button>
            <button
              onClick={() => setToggle('preview')}
              className={`${
                toggle == 'preview' ? 'font-semibold text-black' : 'text-[#848484]'
              } p-2 rounded-[5px] hover:bg-[#e6e6e6]`}
            >
              Xem trước
            </button>
          </div>
          <button
            disabled={contentBlog == null ? true : false}
            onClick={() => handlePublish()}
            className={`${
              contentBlog == null ? 'bg-secondary cursor-not-allowed' : 'bg-primary'
            } text-[14px] font-medium text-white rounded-full  px-5 py-2`}
          >
            Đăng bài
          </button>
        </div>
        <div className="main-blog mt-5">
          {toggle == 'edit' && (
            <>
              <div className="flex items-center gap-2 mb-3">
                <p className="text-[#848484]">Chọn danh mục</p>
                <div>
                  <Dropdown
                    dropDownType="Danh mục"
                    data={categoryList}
                    getValue={setDropdownValue}
                    idType="categoryId"
                    nameType="name"
                  />
                </div>
                <p className="text-redError text-[14px] font-medium">* Chọn danh mục cho bài viết</p>
              </div>
              <EditBlog />
            </>
          )}
          {toggle == 'preview' && <PreviewBlog />}
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
