import React from 'react'
import { ic_boiling_white } from '../../../assets';
import North from "../../../assets/images/North.png";
import FoodCard from "./FoodCard";
const SuggestRegion = (props) => {
    const {NorthFood} = props;
  return (
    <div className="signature-food pt-40">
<div className="flex justify-center">
        <div className="grid">
      <h1 className="font-inter text-primary text-2xl flex justify-center">Bữa ăn đăc trưng</h1>
      <h1 className="font-inter font-bold text-black text-5xl flex justify-center">Món ăn đặc trưng
vùng miền</h1>

</div>

      </div>
      <div className="grid grid-flow-col gap-4">
      <div className="flex flex-col gap-10 mb-12 px-10 py-10">
  
    <FoodCard key={NorthFood.id} foods={NorthFood}/>
    <div className="flex justify-center">
        <button className="flex btn-view hover:scale-125 transition ease-out duration-500 "><p className="mr-2">Xem Thêm</p> <div className="w-[24px] h-[24px] bg-cover" style={{ backgroundImage: `url(${ic_boiling_white})` }} /></button> </div>
    
</div>
<div className="row-span-3 col-span-2 ml-56 "><img className="border-8 border-orange-400 rounded-full" src={North}></img></div>
</div>
</div>
  )
}

export default SuggestRegion