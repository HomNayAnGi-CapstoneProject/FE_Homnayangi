import { useState, useEffect } from 'react';
import { Tooltip } from '@mui/material';
import { Modal } from '@mui/material';

import Tabs from './Tabs';
import MonthFilter from './MonthFilter';
import YearFilter from './YearFilter';
import DateFilter from './DateFilter';

import { ic_category_white } from '../../../../../../../../../assets';

const ReportTypeDD = (props) => {
  const { setReportType } = props;
  const [activeType, setActiveType] = useState(1); // 1: monthly, 2: yearly, 3: daily
  const [openFilterDate, setOpenFilterDate] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilterDate(true);
  };

  return (
    <div>
      <Tooltip title="Lọc thống kê theo thời gian" placement="top">
        <button onClick={() => handleOpenFilter()} className="bg-primary rounded-[10px] px-3 py-1">
          <img alt="" className="object-cover w-[20px] h-[20px]" src={ic_category_white} />
        </button>
      </Tooltip>
      <Modal open={openFilterDate} onClose={() => setOpenFilterDate(false)}>
        <div
          className="fixed left-[50%]
      top-[50%] translate-y-[-50%] translate-x-[-50%] bg-white rounded-[5px] sm:w-[350px] w-full"
        >
          <div className="px-7 py-6">
            {/* header */}
            <div className="pb-2 mb-5 border-b border-[#b7b7b7]">
              <p className="text-[18px] font-medium">Lọc thời gian thống kê</p>
            </div>
            <Tabs activeType={activeType} setActiveType={setActiveType} />
            {activeType == 1 && (
              <div>
                <MonthFilter setReportType={setReportType} setOpenFilterDate={setOpenFilterDate} />
              </div>
            )}
            {activeType == 2 && (
              <div>
                <YearFilter setReportType={setReportType} setOpenFilterDate={setOpenFilterDate} />
              </div>
            )}
            {activeType == 3 && (
              <div>
                <DateFilter setReportType={setReportType} setOpenFilterDate={setOpenFilterDate} />
              </div>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ReportTypeDD;
