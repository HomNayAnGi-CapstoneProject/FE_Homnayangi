import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setReportTypee, setReportFilterYear } from '../../../../../../../../../redux/actionSlice/managementSlice';

const YearFilter = (props) => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.management);
  const { setReportType, setOpenFilterDate } = props;
  const [activeYear, setActiveYear] = useState('');
  const [errMsgYear, setErrMsgYear] = useState('');

  const handleChangeYear = (e) => {
    setActiveYear(e.target.value);
  };

  useEffect(() => {
    setActiveYear(store.reportFilterYear);
  }, [store.reportFilterYear]);

  const handleConfirm = () => {
    if (activeYear !== '') {
      dispatch(setReportFilterYear(activeYear));
      setReportType(2);
      dispatch(setReportTypee(2));
      setOpenFilterDate(false);
    } else {
      if (activeYear == '') {
        setErrMsgYear('Vui lòng điền đầy đủ thông tin');
      }
    }
  };

  return (
    <div className="mt-5 p-3">
      <label className="font-medium">Năm</label>
      <input
        value={activeYear}
        onChange={(e) => handleChangeYear(e)}
        name="name"
        className={`block mt-2 w-full h-[47px]  p-[12px] text-subText sm:text-md  border border-[#B9B9B9] rounded-[5px] focus:outline-primary`}
      />
      {errMsgYear && <p className="text-redError font-medium my-2">{errMsgYear}</p>}
      <button
        onClick={() => handleConfirm()}
        className="mt-5 py-2 px-3 text-white bg-primary rounded font-medium w-full"
      >
        Xác nhận
      </button>
    </div>
  );
};

export default YearFilter;
