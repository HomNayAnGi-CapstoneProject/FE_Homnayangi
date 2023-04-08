import { useState, useEffect } from 'react';
import instances from '../../../../../../utils/plugin/axios';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Tooltip } from '@mui/material';

import { ic_edit } from '../../../../../../assets';

import DataTable from './components/DataTable';

const CronJobConfigManage = () => {
  const navigate = useNavigate();
  const [updateTable, setUpdateTable] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [confirmData, setConfirmData] = useState();
  const [cronJobList, setCronJobList] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await instances.get('/cronjobtimeconfig');
      // console.log(res.data);
      setCronJobList(res.data);
    };
    fetch();
  }, [updateTable]);

  // ** Func
  const handleOpenEdit = (data) => {
    navigate(`/management/cronjob/edit/${data?.cronJobTimeConfigId}`);
  };

  return (
    <div>
      <p className="font-semibold text-[#898989] text-[18px] mb-3">Thiết lập thời gian trao huy hiệu và mã giảm giá</p>
      <div>{/* <DataTable cronJobList={cronJobList} handleOpenEdit={handleOpenEdit} /> */}</div>
      <div className="bg-white p-5 rounded-[5px]">
        {cronJobList.length > 0 &&
          cronJobList.map((item) => (
            <div key={item.cronJobTimeConfigId} className="flex items-center gap-3 py-2">
              <p>{item.targetObject == 0 ? 'Thời gian trao huy hiệu' : 'Thời gian trao mã giảm giá'}: </p>
              <p className="font-bold">
                Mỗi {item?.day && <span className=" font-bold text-red-500">tháng vào ngày {item?.day}</span>}{' '}
                {(item.hour !== undefined || item?.day !== undefined) && (
                  <span className=" font-bold text-red-500">
                    {item?.day !== undefined ? 'lúc' : 'ngày vào'} {item.hour !== undefined ? item.hour : 0} giờ
                  </span>
                )}{' '}
                {item?.day == undefined && item.hour == undefined && (
                  <span className=" font-bold text-red-500">
                    đầu giờ tại phút thứ {item.minute !== undefined ? item.minute : 0}
                  </span>
                )}{' '}
                {(item?.day !== undefined || item.hour !== undefined) && (
                  <span className=" font-bold text-red-500">{item.minute !== undefined ? item.minute : 0} phút</span>
                )}{' '}
              </p>
              <Tooltip title="chỉnh sửa" placement="right">
                <button
                  onClick={() => navigate(`/management/cronjob/edit/${item?.cronJobTimeConfigId}`)}
                  className="hover:bg-gray-300 text-white font-medium rounded-[5px] px-3 py-2 flex items-center gap-2"
                >
                  <img alt="" src={ic_edit} />
                </button>
              </Tooltip>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CronJobConfigManage;
