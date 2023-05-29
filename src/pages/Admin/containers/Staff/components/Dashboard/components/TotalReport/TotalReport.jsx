import { useState, useEffect } from 'react';
import instances from '../../../../../../../../utils/plugin/axios';

import ReportTypeDD from './components/ReportTypeDD';
import BarChart from './components/BarChart';

//  ** redux
import { useDispatch, useSelector } from 'react-redux';
import { setReportData } from '../../../../../../../../redux/actionSlice/managementSlice';

// ** asssets
import { ic_dollar_white } from '../../../../../../../../assets';

// ** dedault value
const defaultMonth = new Date().getMonth() + 1;
const defaultYear = new Date().getFullYear();

const TotalReport = () => {
  // ** const
  const store = useSelector((state) => state.management);
  const dispatch = useDispatch();
  const [csvFile, setCsvFile] = useState();
  const [reportType, setReportType] = useState(1); // 1: monthly, 2: yearly, 3: daily
  const [revenueData, setRevenueData] = useState([]);
  const [shipCost, setShipCost] = useState([]);

  // ** get report data
  useEffect(() => {
    const fetchMonthly = async () => {
      const res = await instances.get(`/orders/report/monthly`, {
        params: {
          month: store.reportFilterMonth,
          year: store.reportFilterYear,
        },
      });
      dispatch(setReportData(res.data));
    };

    const fetchYealy = async () => {
      const res = await instances.get(`/orders/report/yearly`, {
        params: {
          year: store.reportFilterYear,
        },
      });
      dispatch(setReportData(res.data));
    };

    const fetchDaily = async () => {
      const res = await instances.get(`/orders/report`, {
        params: {
          startDate: store.reportFilterDateFrom,
          endDate: store.reportFilterDateTo,
        },
      });
      dispatch(setReportData(res.data));
    };

    const fetchMonthlyReport = async () => {
      const res = await instances.get(`/orders/report/monthly/export`, {
        params: {
          month: store.reportFilterMonth,
          year: store.reportFilterYear,
        },
      });
      setCsvFile(res.data);
    };

    const fetchYearlyReport = async () => {
      const res = await instances.get(`/orders/report/yearly/export`, {
        params: {
          year: store.reportFilterYear,
        },
      });
      setCsvFile(res.data);
    };

    switch (reportType) {
      case 1:
        fetchMonthly();
        fetchMonthlyReport();
        break;
      case 2:
        fetchYealy();
        fetchYearlyReport();
        break;
      case 3:
        fetchDaily();
        setCsvFile();
        break;
      default:
        fetchMonthly();
        break;
    }
  }, [
    reportType,
    store.reportFilterMonth,
    store.reportFilterYear,
    store.reportFilterDateFrom,
    store.reportFilterDateTo,
  ]);

  // ** get chart data
  useEffect(() => {
    const fetch = async () => {
      const res = await instances.get('/orders/report/yearly/details', {
        params: {
          year: new Date().getFullYear(),
        },
      });
      setRevenueData(res.data.map((item) => item.revenue));
      setShipCost(res.data.map((item) => item.shipCost));
    };
    fetch();
  }, []);

  return (
    <div className="font-inter w-full bg-white drop-shadow-sm rounded-[25px] px-8 py-5">
      {/* body */}
      <div className="flex gap-5 justify-between">
        <div className="flex-1 w-1/3">
          <p className="text-[20px] font-semibold text-black flex gap-3 items-center">
            Thống kê {<ReportTypeDD setReportType={setReportType} />}
          </p>
          {/* Total revenue */}
          <div className="mt-10">
            <p className="my-2 text-gray-400">Doanh thu</p>
            <p className="text-[28px] font-medium text-black">
              {Intl.NumberFormat().format(store?.reportData?.revenue || 0)}vnđ
            </p>
          </div>

          {/* download report */}
          {csvFile && (
            <div className="mt-8 mb-2">
              <a
                className="bg-primary text-white px-3 py-2 rounded-[5px]"
                href={`data:text/csv;charset=utf-8,${escape(csvFile)}`}
                download={`${reportType == 1 ? 'Monthly-Report.csv' : 'Yearly-Report.csv'}`}
              >
                Xuất dữ liệu
              </a>
            </div>
          )}
        </div>

        {/* chart */}
        {revenueData?.length > 0 && (
          <div className="w-2/3">
            <BarChart revenueData={revenueData} shipCost={shipCost} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TotalReport;
