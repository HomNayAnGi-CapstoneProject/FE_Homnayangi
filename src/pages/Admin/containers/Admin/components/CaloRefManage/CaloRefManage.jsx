import { useState, useEffect } from 'react';
import instances from '../../../../../../utils/plugin/axios';

// **Assets
import { ic_blog_create } from '../../../../../../assets';

// ** Components
import DataTable from './components/DataTable';
import ConfirmModal from './components/ConfirmModal';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CaloRefManage = () => {
  // ** Const
  const navigate = useNavigate();
  const [calorefList, setCaloRefList] = useState([]);
  const [updateTable, setUpdateTable] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [confirmData, setConfirmData] = useState();
  const [loading, setLoading] = useState(false);

  // ** Call api
  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const res = await instances.get('/caloreference');
      // console.log(res.data);
      setLoading(false);
      setCaloRefList(res.data);
    };
    fetch();
  }, [updateTable]);

  // ** Func
  const handleOpenEdit = (data) => {
    navigate(`/management/caloref-manage/edit/${data?.caloReferenceId}`);
  };

  const handleOpenDelete = (data) => {
    setIsShowModal(true);
    setConfirmData(data);
  };

  const handleConfirmDelete = () => {
    // console.log(confirmData?.unitId);
    toast.promise(
      instances.delete(`/caloreference/${confirmData?.caloReferenceId}`).then(() => {
        setUpdateTable((prev) => !prev);
        setIsShowModal(false);
      }),
      {
        pending: 'Đang xóa calo gợi ý',
        success: 'Đã xóa thành công! 👌',
        error: 'Xóa calo gợi ý thất bại',
      },
    );
  };
  const handleConfirmRestore = () => {
    toast.promise(
      instances
        .put(`/caloreference`, {
          caloReferenceId: confirmData?.caloReferenceId,
          name: confirmData?.name,
          description: confirmData?.description,
          status: true,
        })
        .then((res) => {
          setUpdateTable((prev) => !prev);
          setIsShowModal(false);
        }),
      {
        pending: 'Đang phục hồi',
        success: 'Đã phục hồi thành công! 👌',
        error: {},
      },
    );
  };
  return (
    <div>
      {isShowModal && (
        <ConfirmModal
          setIsShowModal={setIsShowModal}
          data={confirmData}
          modalTitle="Calo gợi ý"
          statusTypeAvai={true}
          statusTypeNotAvai={false}
          setUpdateTable={setUpdateTable}
          itemName={confirmData?.name}
          handleConfirmDelete={handleConfirmDelete}
          handleConfirmRestore={handleConfirmRestore}
        />
      )}
      <div className="flex ss:flex-row flex-col gap-4 items-center mb-[20px]">
        <button
          onClick={() => navigate('/management/caloref-manage/new')}
          className="flex items-center w-fit gap-2 py-2 px-3 bg-primary text-white font-medium rounded-[10px]"
        >
          Thêm Calo gợi ý
          <img src={ic_blog_create} />
        </button>
        <a
          target="_blank"
          href="https://www.vinmec.com/vi/tin-tuc/thong-tin-suc-khoe/dinh-duong/nhu-cau-calo-uoc-tinh-moi-ngay-theo-do-tuoi-gioi-tinh/"
          className="text-primary underline font-semibold"
        >
          Tham khảo calo theo độ tuổi giới tính
        </a>
      </div>
      <div>
        <DataTable
          calorefList={calorefList}
          handleOpenEdit={handleOpenEdit}
          handleOpenDelete={handleOpenDelete}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default CaloRefManage;
