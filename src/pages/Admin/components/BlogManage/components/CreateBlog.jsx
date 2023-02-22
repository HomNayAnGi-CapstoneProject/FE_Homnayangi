import { useState, useEffect } from 'react';
import EditBlog from './EditBlog';
import PreviewBlog from './PreviewBlog';
import Dropdown from '../../../../../share/components/Admin/Dropdown';
import instances from '../../../../../utils/plugin/axios';

// ** Redux
import { clearBlogContent, setBlogSubCategory } from '../../../../../redux/actionSlice/managementSlice';
import { useDispatch } from 'react-redux';

// ** Assets
import { ic_caret_gray, ic_menu, ic_caret_down_white } from '../../../../../assets';

// ** Third party libraries
import { useNavigate } from 'react-router-dom';
import OutsideClickHandler from 'react-outside-click-handler';

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
  const [activeItem, setActiveItem] = useState(1);
  const [categoryList, setCategoryList] = useState([]);
  const [getDropdownValue, setDropdownValue] = useState();

  // ** Functions
  const handlePublish = () => {
    // dispatch(setUploadBlog((prev) => !prev));
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
            onClick={() => handlePublish()}
            className="text-[14px] font-medium text-white rounded-full bg-primary px-5 py-2"
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
