import React from 'react'
import { ic_boiling_white } from '../../../assets';
import { ic_add_to_cart_white } from '../../../assets';
const FoodCard = (props) => {
  const{food} = props;
    console.log(food);
  return (
    <>
{ 
      <div key={food.id} className=" flex card">
       
        <img className='w-[200px] h-[200px] bg-contain bg-center px-2 py-2 ' src={food.image}></img>
        <div >
    <div  className= "font-bold text-lg">{food.name}</div>

  <div className='flex'>

  {
  food.tags.map((tag)=>{
    return(
      <>
      {tag === "buổi trưa" ?  <div className='mr-2 tag border-borderYellow bg-tagYellow' >{tag}</div> :  <div className='mr-2 tag border-borderGreen bg-greenSuccess ' >{tag}</div> }
     
      </>
    )
  })}</div>
<div className='flex'>
  {!food.ingredient ? "":  <><p className='font-inter font-extralight mr-1 '>{food.ingredient}:</p>
  <p className='text-redError font-semibold'>{food.price}</p></> }

</div>
    <p>{food.title}</p>
    <div className='flex absolute bottom-[10px] gap-[8px]'>
    <button className='flex justify-center items-center rounded-md mr-5 p-2 min-w-[25%] btn-card hover:shadow-xl'><p className='mr-2'>Công Thức</p> <div className="w-[24px] h-[24px] bg-cover" style={{ backgroundImage: `url(${ic_boiling_white})` }} /></button>
    <button className='flex justify-center items-center rounded-md p-2 min-w-[20%] btn-order hover:shadow-xl'><p className='mr-2'>Đặt Làm</p><div className="w-[25px] h-[25px] bg-cover" style={{ backgroundImage: `url(${ic_add_to_cart_white})` }}/></button>
    </div>
    </div>
    
    </div>
  
  }


</> )
}

export default FoodCard