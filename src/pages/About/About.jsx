import React from 'react';
import styles from '../../style';
import about_1 from '../../assets/images/about_1.webp';
import about_2 from '../../assets/images/about_2.webp';
const About = () => {
  return (
    <div className={`${styles.flexCenter}`}>
      <div className={`${styles.container}`}>
        <div className="sm:flex mt-[50px] justify-center gap-[60px]">
          <div className="flex-col px-[16px] font-inter">
            <p className="sm:w-[470px] sm:px-0 sm:text-left text-center uppercase font-inter text-subText font-light text-[32px] mb-2 tracking-widest">
              Hoàn cảnh
            </p>

            <div className="w-full">
              <p className="text-[16px] sm:w-[500px] sm:px-0 w-550 leading-[30px]">
                “Hôm nay ăn gì?” từ lâu đã trở thành một trong các câu hỏi nhức nhối của mọi người từ những người sinh
                sống một mình cho tới các bà nội trợ trong gia đình. Mỗi ngày khi bước chân ra đường đi chợ là cả một
                vấn đề khi chẳng biết hôm nay ăn cái gì bây giờ... Ăn gì cho đừng ngán? Nấu gì để có lợi cho sức khỏe?
                Cuối tháng rồi ăn gì cho tiết kiệm?
              </p>
              <p className="text-[16px] sm:w-[500px] sm:px-0 w-550 leading-[30px] py-5">
                Thấu hiểu nỗi đau đó chúng tôi - Homnayangi, được tạo ra nhằm giải quyết những vấn đề đang còn tồn đọng
                trong tâm trí của mọi người.
              </p>
            </div>
          </div>
          <img src={about_1} className="sm:w-[642px] w-full h-[368px] sm:rounded-md" />
        </div>
        <div className={`sm:flex py-20 gap-[60px] justify-center px-[0px] `}>
          <img src={about_2} className="sm:flex hidden w-[500px] h-[383px] rounded-md" />
          <div className="font-inter px-[16px] ">
            <p className="sm:w-[470px] sm:text-left text-center sm:px-[0px] uppercase font-inter text-subText font-light text-[32px] mb-2 tracking-widest">
              Về chúng tôi
            </p>
            <div className="sm:w-[642px] w-550">
              <p className="text-[16px] leading-[30px] ">
                Đến với Homnayangi, chúng tôi sẽ gợi ý cho bạn đa dạng các món ăn thường ngày từ khắp các vùng miền trên
                đất nước Việt Nam (Bắc - Trung - Nam). Với bài hướng dẫn cách nấu chi tiết kèm theo đó các gói nguyên
                liệu để bạn có thể tham khảo hoặc đặt làm các món ăn trong thực đơn trong trường hợp bạn lười nấu hoặc
                không có thời gian.
              </p>
              <p className="text-[16px] leading-[30px] py-5">
                Với danh mục các thực đơn phong phú, đa dạng, không chỉ các món ăn đặc trưng vùng miền mà còn cả những
                món thường dùng trong các dịp đặc biệt, các món ăn dành cho người ăn chay, ăn kiêng, tăng cân, ... Chúng
                tôi sẽ giúp các bạn giải quyết nỗi khổ mỗi khi suy nghĩ “Hôm nay sẽ ăn gì?”
              </p>
            </div>
          </div>
          <img src={about_2} className="sm:hidden w-full h-[383px]" />
        </div>
      </div>
    </div>
  );
};

export default About;
