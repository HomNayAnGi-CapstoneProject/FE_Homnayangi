import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import instances from '../../../../../../../../utils/plugin/axios';

// ** Redux
import { setContentBlog } from '../../../../../../../../redux/actionSlice/managementSlice';
import { useDispatch, useSelector } from 'react-redux';

// ** Assets
import { ic_plus_white } from '../../../../../../../../assets';

// ** components
import Item from './components/Item';
import Package from './components/Package';

const SidePackage = () => {
  // ** consts
  const params = useParams();
  const store = useSelector((state) => state.management);
  const ingredientsStore = useSelector((state) => state.management?.blogContent);
  const confirmPackage = useSelector((state) => state.management.confirmPackage);

  const dispatch = useDispatch();

  const [packageList, setPackageList] = useState([]);
  const [dataPackageList, setDataPackageList] = useState([]);

  // ** check root package length
  useEffect(() => {
    if (confirmPackage == false) {
      setPackageList([]);
    }
  }, [confirmPackage]);

  // ** get packge to edit
  useEffect(() => {
    if (params.blogId) {
      const fetch = async () => {
        const res = await instances.get(`/blogs/staff-preview/${params.blogId}`);
        let dataIngredient = res.data.packages;
        if (dataIngredient.slice(1).length > 0) {
          console.log(dataIngredient.slice(1));
          dataIngredient.slice(1).forEach((item) => {
            handleAddPackage(item);
          });
        }
      };
      fetch();
    }
  }, []);

  // ** functions
  const handleAddPackage = (editItem) => {
    setPackageList((prev) => [...prev, { id: crypto.randomUUID(), cookedId: crypto.randomUUID(), editItem }]);
  };

  const handleRemovePackage = (id) => {
    setPackageList((current) => current.filter((item) => item.id !== id));
    let Packages = [...store.blogContent.Packages];
    let modifiedPac = Packages.filter((item) => item.item1.packageId !== id);
    // console.log(Packages);
    dispatch(setContentBlog({ Packages: modifiedPac }));

    setDataPackageList((current) => current.filter((item) => item.packageId !== id));
  };

  const handleKeyDown = (e) => {
    if (
      e.keyCode === 69 ||
      e.keyCode === 190 ||
      e.keyCode === 110 ||
      e.keyCode === 107 ||
      e.keyCode === 109 ||
      e.keyCode === 189 ||
      e.keyCode === 231
    ) {
      e.preventDefault();
    }
  };

  return (
    <div className="mt-5">
      {packageList?.length > 0 ? (
        <>
          {packageList.map((item, i) => (
            <div key={item.id}>
              <Package
                editItem={item.editItem}
                id={item.id}
                cookedId={item.cookedId}
                index={i}
                handleKeyDown={handleKeyDown}
                handleRemovePackage={handleRemovePackage}
                setDataPackageList={setDataPackageList}
                // setSelectedPrice={setSelectedPrice}
                // selectedPrice={selectedPrice}
                // setSelectedList={setSelectedList}
                // selectedList={selectedList}
              />
            </div>
          ))}
          <button
            // disabled={ingredientsStore?.length > 0 ? false : true}
            onClick={() => handleAddPackage()}
            className={`
            font-medium text-white flex gap-1 items-center px-4 py-2 rounded-[10px]`}
          >
            Thêm gói nguyên liệu <img className="w-[20px]" src={ic_plus_white} />
          </button>
        </>
      ) : (
        <button
          disabled={!confirmPackage ? true : false}
          onClick={() => handleAddPackage()}
          className={`${
            !confirmPackage ? 'cursor-not-allowed bg-green-300' : 'bg-green-500'
          }  font-medium text-white flex gap-1 items-center px-4 py-2 rounded-[10px]`}
        >
          Thêm gói nguyên liệu <img className="w-[20px]" src={ic_plus_white} />
        </button>
      )}
    </div>
  );
};

export default SidePackage;
