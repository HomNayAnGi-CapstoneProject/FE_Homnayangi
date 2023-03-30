import { useState, useEffect } from 'react';
import instances from '../../../../utils/plugin/axios';
import ic_loading from '../../../../assets/images/sand-clock.png';

// ** components
import SeeMore from '../../../../share/components/SeeMore';
import IngredientCard from '../../../../share/components/IngredientCard';

const IngredientSection = () => {
  // ** const
  const [ingredientList, setIngredientList] = useState([]);
  const [currentPageSize, setCurrentPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [pageSizeIns, setPageSizeIns] = useState(0);

  // ** get ingredients
  useEffect(() => {
    const fetch = async () => {
      const res = await instances.get('/ingredients/customer', {
        params: {
          PageSize: currentPageSize,
          PageNumber: null,
        },
      });
      setIngredientList(res.data.result.resource);
      setTotalCount(res.data.result.totalCount);
    };

    fetch();
  }, [currentPageSize, pageSizeIns]);

  return (
    <div className="font-inter">
      <p className="text-black font-semibold text-[20px] mb-3">Nguyên liệu</p>
      <div className="grid xs:grid-cols-2 smd:grid-cols-4 xxlg:grid-cols-5 xl:grid-cols-5 gap-[6px]">
        {ingredientList?.length > 0 ? (
          ingredientList?.map((item) => (
            <div key={item.ingredientId}>
              <IngredientCard data={item} />
            </div>
          ))
        ) : (
          <div className="text-center flex justify-center">
            <div
              className="w-[30px] h-[30px] bg-cover animate-spin"
              style={{ backgroundImage: `url(${ic_loading})` }}
            />
          </div>
        )}
      </div>
      {currentPageSize !== totalCount && ingredientList?.length > 9 && (
        <SeeMore
          increaseSize={5}
          currentSize={currentPageSize}
          setPageSizeIns={setPageSizeIns}
          setCurrentPageSize={setCurrentPageSize}
          totalCount={totalCount}
        />
      )}
    </div>
  );
};

export default IngredientSection;
