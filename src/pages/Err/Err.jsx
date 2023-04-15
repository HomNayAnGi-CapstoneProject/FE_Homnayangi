import React from 'react';
import Lottie from 'lottie-react';
import connectionError from '../../share/lottie/connectionError.json';
const Err = () => {
  return (
    <div className="bg-white w-full h-[100vh] flex sm:flex-row flex-col gap-5 justify-center items-center">
      <div>
        <p className="text-[18px] font-semibold text-black">Mất kết nối với máy chủ Homnayangi...</p>
        <button
          onClick={() => (window.location = '/')}
          className="mt-2 px-5 py-2 text-white font-medium rounded-[5px] bg-primary"
        >
          Thử lại
        </button>
      </div>

      <Lottie animationData={connectionError} loop={true} controls={false} className="h-[25vh]" />
    </div>
  );
};

export default Err;
