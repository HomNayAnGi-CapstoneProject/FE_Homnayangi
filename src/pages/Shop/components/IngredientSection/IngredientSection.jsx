import { useState, useEffect } from 'react';
import instances from '../../../../utils/plugin/axios';

// ** components
import SeeMore from '../../../../share/components/SeeMore';
import IngredientCard from '../../../../share/components/IngredientCard';

const IngredientSection = () => {
  // ** const
  const [ingredientList, setIngredientList] = useState([]);

  // ** get ingredients
  useEffect(() => {}, []);

  return (
    <div className="font-inter">
      <p className="text-black font-semibold text-[20px] mb-3">Nguyên liệu</p>
      <div className="grid xs:grid-cols-2 smd:grid-cols-4 xxlg:grid-cols-5 xl:grid-cols-5 gap-[6px]">
        <IngredientCard />
        <IngredientCard />
        <IngredientCard />
        <IngredientCard />
        <IngredientCard />
      </div>
      <SeeMore />
    </div>
  );
};

export default IngredientSection;
