import { useEffect, useState } from 'react';
import instances from '../../../../../../utils/plugin/axios';
import useDebounce from '../../../../../../share/hooks/useDebounce';

import ConfirmModal from '../../../../../../share/components/Admin/ConfirmModal';

import { ic_blog_create } from '../../../../../../assets';
import Search from '../../../../../../share/components/Search';
import DataTable from './components/DataTable';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProductManagement = () => {
  //** Const */
  const navigate = useNavigate();
  const [ingredientsList, setIngredientList] = useState([]);
  const [updateTable, setUpdateTable] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [confirmData, setConfirmData] = useState();
  const [searchhInput, setSearchhInput] = useState(null);
  const debounced = useDebounce(searchhInput, 600);
  const [loading, setLoading] = useState(false);

  // ** Call api
  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const res = await instances.get('/ingredients/managing', {
        params: {
          searchString: debounced?.trim(),
        },
      });
      setLoading(false);
      // console.log(res.data.resource);
      setIngredientList(res.data.result);
    };

    fetch();
  }, [updateTable, debounced]);

  // ** Func
  const handleOpenEdit = (data) => {
    // console.log(data);
    navigate(`/management/product/edit/${data?.ingredientId}`);
  };

  const handleOpenDelete = (data) => {
    setIsShowModal(true);
    setConfirmData(data);
  };
  const handleConfirmDelete = () => {
    // console.log(confirmData?.typeId);
    toast.promise(
      instances.delete(`/ingredients/${confirmData?.ingredientId}`).then(() => {
        setUpdateTable((prev) => !prev);
        setIsShowModal(false);
      }),
      {
        pending: 'Đang xóa sản phẩm',
        success: 'Đã xóa thành công! 👌',
        error: 'Xóa sản phẩm thất bại',
      },
    );
  };
  const handleConfirmRestore = () => {
    toast.promise(
      instances
        .put(`/ingredients`, {
          ingredientId: confirmData?.ingredientId,
          name: confirmData?.name,
          kcal: confirmData?.kcal,
          description: confirmData?.description,
          unitId: confirmData?.unitId,
          listImage: confirmData?.listImage,
          picture: confirmData?.picture,
          price: confirmData?.price,
          typeId: confirmData?.typeId,
          listImagePosition: confirmData?.listImagePosition,
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
          modalTitle="Sản phẩm"
          statusTypeAvai={true}
          statusTypeNotAvai={false}
          setUpdateTable={setUpdateTable}
          itemName={confirmData?.name}
          handleConfirmDelete={handleConfirmDelete}
          handleConfirmRestore={handleConfirmRestore}
        />
      )}
      <div className="flex ss:flex-row flex-col gap-4 item-center justify-between mb-[20px]">
        <Search
          value={searchhInput !== null ? searchhInput : ''}
          placeholder="Tìm kiếm tại đây..."
          setSearchhInput={setSearchhInput}
        />
        <button
          onClick={() => navigate('/management/product/new')}
          className="flex items-center w-fit gap-2 py-2 px-3 bg-primary text-white font-medium rounded-[10px]"
        >
          Thêm nguyên liệu
          <img src={ic_blog_create} />
        </button>
      </div>
      <div>
        <DataTable
          ingredientsList={ingredientsList}
          handleOpenEdit={handleOpenEdit}
          handleOpenDelete={handleOpenDelete}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default ProductManagement;
