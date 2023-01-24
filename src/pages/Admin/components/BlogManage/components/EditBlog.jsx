import { useEffect, useState, useRef } from 'react';

// ** Components
import SubcateSelect from './SubcateSelect/SubcateSelect';
import MaterialSelect from './MaterialSelect/MaterialSelect';

// ** Markdown
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import EmojiPicker from '../../../../../utils/plugin/EmojiPicker';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

const EditBlog = () => {
  // ** Const
  // Initialize a markdown parser
  const mdParser = new MarkdownIt(/* Markdown-it options */);
  const mdEditDescription = useRef();
  const mdEditPrepare = useRef();
  const mdEditCooking = useRef();
  const mdEditCompletation = useRef();
  MdEditor.use(EmojiPicker);

  const ref = useRef(null);

  // ** handle height textarea
  const handleInput = (e) => {
    if (ref.current) {
      ref.current.style.height = 'auto';
      ref.current.style.height = `${e.target.scrollHeight}px`;
    }
  };

  // ** Functs
  // get html value
  const getHtmlValuee = () => {
    console.log(mdEditDescription.current.getHtmlValue());
  };

  const getMdValuee = () => {
    console.log(mdEditDescription.current.getMdValue());
  };

  function handleEditorChange({ html, text }) {
    // console.log('handleEditorChange', html, text);
  }

  function onImageUpload(file) {
    return new Promise((resolve) => {
      // //create folder and image name
      // const imageRef = ref(storage, `images/${file.name + crypto.randomUUID()}`);
      // //upload image
      // uploadBytes(imageRef, file).then((snapshot) => {
      //   getDownloadURL(snapshot.ref).then((url) => {
      //     resolve(url);
      //     setImageList((prev) => [...prev, { url: url, path: snapshot.ref.fullPath }]);
      //   });
      // });
    });
  }

  return (
    <div className="bg-white font-inter rounded-[5px] shadow-md py-5 px-5">
      <button className="bg-primary rounded-[5px] text-white font-medium py-2 px-3 mt-5">Thêm ảnh bìa</button>

      {/* ================================= TIÊU ĐỀ BÀI VIẾT ================================= */}
      <div className="my-7">
        <textarea
          required
          rows={1}
          ref={ref}
          onChange={(e) => handleInput(e)}
          placeholder="Tiêu đề..."
          className={`text-[30px] text-[#a1a1a1] font-semibold outline-none border-none w-full max-h-[150px] scroll-bar resize-none`}
        />

        {/* ================================= DANH MỤC PHỤ ================================= */}
        <div className="my-7">
          <SubcateSelect maxLenght={3} />
        </div>

        {/* ================================= MÔ TẢ BÀI VIẾT ================================= */}
        <div className="my-7">
          <MdEditor
            markdownClass="md_description"
            name="description"
            view={{ menu: true, md: true, html: false }}
            placeholder="Mô tả bài viết..."
            plugins={['header', 'font-bold', 'font-italic', 'font-underline', 'clear', 'logger', 'emoji-picker']}
            style={{ height: '150px', width: '100%' }}
            renderHTML={(text) => mdParser.render(text)}
            ref={mdEditDescription}
          />
        </div>

        {/* ================================= NGUYÊN LIỆU ================================= */}
        <div className="my-7">
          <p className="font-semibold text-[20px]">
            Nguyên liệu:{' '}
            <span className="text-redError text-[14px] font-medium">
              * Các bài viết bắt buộc phải có mục nguyên liệu{' '}
            </span>{' '}
          </p>
          <div className="my-3">
            <MaterialSelect />
          </div>
        </div>

        {/* ================================= SƠ CHẾ ================================= */}
        <div className="my-7">
          <p className="font-semibold text-[20px]">
            Sơ chế: <span className="text-redError text-[14px] font-medium">* Phần sơ chế nguyên liệu </span>{' '}
          </p>
          <div className="my-3">
            <MdEditor
              markdownClass="md_description"
              name="preparation"
              view={{ menu: true, md: true, html: false }}
              placeholder="Các bước sơ chế nguyên liệu..."
              plugins={[
                'header',
                'font-bold',
                'font-italic',
                'font-underline',
                'list-unordered',
                'list-ordered',
                'table,',
                'image',
                'clear',
                'logger',
                'emoji-picker',
              ]}
              style={{ height: '350px', width: '100%' }}
              renderHTML={(text) => mdParser.render(text)}
              // onChange={handleEditorChange}
              onImageUpload={onImageUpload}
              ref={mdEditPrepare}
              imageAccept=".jpg,.png,.jpeg"
            />
          </div>
        </div>

        {/* ================================= CÁCH CHẾ BIẾN ================================= */}
        <div className="my-7">
          <p className="font-semibold text-[20px]">
            Cách chế biến: <span className="text-redError text-[14px] font-medium">* Phần chế biến món ăn </span>{' '}
          </p>
          <div className="my-3">
            <MdEditor
              markdownClass="md_description"
              name="cooking"
              view={{ menu: true, md: true, html: false }}
              placeholder="Các bước chế biến món ăn..."
              plugins={[
                'header',
                'font-bold',
                'font-italic',
                'font-underline',
                'list-unordered',
                'list-ordered',
                'table,',
                'image',
                'clear',
                'logger',
                'emoji-picker',
              ]}
              style={{ minHeight: '350px', height: 'max-content', width: '100%' }}
              renderHTML={(text) => mdParser.render(text)}
              // onChange={handleEditorChange}
              onImageUpload={onImageUpload}
              ref={mdEditCooking}
              imageAccept=".jpg,.png,.jpeg"
            />
          </div>
        </div>

        {/* ================================= THÀNH PHẨM ================================= */}
        <div className="my-7">
          <p className="font-semibold text-[20px]">
            Thành phẩm: <span className="text-redError text-[14px] font-medium">* Thành phẩm món ăn </span>{' '}
          </p>
          <div className="my-3">
            <MdEditor
              markdownClass="md_description"
              name="completation"
              view={{ menu: true, md: true, html: false }}
              placeholder="Thành quả sau khi nấu..."
              plugins={[
                'header',
                'font-bold',
                'font-italic',
                'font-underline',
                'list-unordered',
                'list-ordered',
                'table,',
                'image',
                'clear',
                'logger',
                'emoji-picker',
              ]}
              style={{ height: '350px', width: '100%' }}
              renderHTML={(text) => mdParser.render(text)}
              // onChange={handleEditorChange}
              onImageUpload={onImageUpload}
              ref={mdEditCompletation}
              imageAccept=".jpg,.png,.jpeg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBlog;
