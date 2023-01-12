import React from 'react';
import moment from 'moment';
import Breadcrumbs from '../../../share/components/Breadcrumbs';

// ** Assets
import staticFood from '../../../assets/images/about_1.webp';

// ** dataa
const ingredients = [
  {
    id: 233,
    name: 'Cá lóc',
    description: '1 con khoảng 700g, bạn nên chọn cá lóc đồng để nếu thịt cá sẽ thơm ngon và dai hơn nhìu.',
  },
  { id: 234, name: 'Thịt heo', description: '200g (phần thịt rọi nhiều mỡ)' },
  { id: 235, name: 'Hành lá', description: '50g' },
  { id: 236, name: 'Ớt chỉ thiên', description: '5 trái' },
  { id: 237, name: 'Ớt ngọt', description: 'mỗi loại 1 trái' },
  { id: 238, name: 'Giềng', description: '1 nhánh to' },
  { id: 239, name: 'Gừng', description: '1 nhánh' },
  { id: 240, name: 'Gia vị', description: ['Hạt nêm', 'Tiêu', 'Nước mắm', 'Bột ngọt'] },
];

const MainBlog = (props) => {
  return (
    <div className="font-inter bg-white rounded-[5px] shadow-md">
      <div
        className="w-full bg-cover bg-center h-[384px] rounded-tl-[5px] rounded-tr-[5px]"
        style={{ backgroundImage: `url(${staticFood})` }}
      />
      <div className="py-5 px-5">
        <p className="text-[#8f8f8f] text-[14px] mb-2">{moment('2023-01-10T03:18:10.005Z').startOf('day').fromNow()}</p>
        <p className="text-[30px] text-black font-semibold">
          Just relax 🍀 stop overthinking, calm your anxiety - lofi hip hop mix - aesthetic lofi
        </p>
        <div className="mt-[12px] flex flex-wrap gap-2">
          <div className="rounded-full w-max bg-[#EAD35B] border-[2px] border-[#8F8137] border-solid xs:px-[10px] px-[2px] py-[0px] text-[12px] text-[#525252]">
            Buổi sáng
          </div>
          <div className="rounded-full w-max bg-[#EAD35B] border-[2px] border-[#8F8137] border-solid xs:px-[10px] px-[2px] py-[0px] text-[12px] text-[#525252]">
            Buổi sáng
          </div>
          <div className="rounded-full w-max bg-[#EAD35B] border-[2px] border-[#8F8137] border-solid xs:px-[10px] px-[2px] py-[0px] text-[12px] text-[#525252]">
            Buổi sáng
          </div>
          <div className="rounded-full w-max bg-[#EAD35B] border-[2px] border-[#8F8137] border-solid xs:px-[10px] px-[2px] py-[0px] text-[12px] text-[#525252]">
            Buổi sáng
          </div>
          <div className="rounded-full w-max bg-[#EAD35B] border-[2px] border-[#8F8137] border-solid xs:px-[10px] px-[2px] py-[0px] text-[12px] text-[#525252]">
            Buổi sáng
          </div>
        </div>
        <p className="mt-[30px] leading-7 text-[18px]">
          Cá lóc kho tộ luôn là món ăn quen thuộc và hấp dẫn trong bữa cơm hàng ngày của gia đình người Việt Nam, một
          đĩa cá lóc kho tộ, một bát canh rau, một chén nhỏ cà muối luôn tạo cho chúng ta những niềm cảm hứng đặc biệt
          khi thưởng thức. Chính vì thế, chúng tôi sẽ chia sẻ cho các bạn hướng dẫn cách làm cá lóc kho tộ thơm ngon cho
          cả gia đình. Hãy vào bếp làm món ngon này mỗi cuối tuần để chiêu đãi cả nhà bạn nhé!
        </p>

        <div id="ingredient" className="mt-[30px]">
          <p className="font-semibold text-[20px]">Nguyên liệu:</p>
          <div className="p-5 bg-[#FFDACA] rounded-[10px] mt-[18px] text-[18px]">
            {ingredients?.length > 0 &&
              ingredients?.map((item, i) => (
                <div key={item.id} className="">
                  <p>
                    {i + 1}.{' '}
                    <span
                      className={`${
                        item.name == 'Gia vị' ? 'text-black' : 'cursor-pointer text-primary font-semibold'
                      }`}
                    >
                      {item.name}
                    </span>
                    <span>
                      :{' '}
                      {item.name == 'Gia vị' ? (
                        <>
                          {item.description.map((item, i) => (
                            <span key={i} className="cursor-pointer text-primary font-semibold">
                              {(i ? ', ' : '') + item}
                            </span>
                          ))}
                          <span>. Hoặc</span>
                          <span className="text-primary cursor-pointer font-semibold"> Gói gia vị homnayangi</span>
                        </>
                      ) : (
                        item.description
                      )}
                    </span>
                  </p>
                </div>
              ))}
          </div>
        </div>

        <div className="buy-order my-[20px]">
          <div className="flex justify-center items-center gap-6">
            <i>Mua gói nguyên liệu này?</i>
            <button className="rounded-[5px] bg-primary hover:bg-primaryHover transition px-6 py-2 text-white font-medium uppercase">
              Đặt mua
            </button>
          </div>
          <p className="text-center my-3 text-[#8B8B8B]">Hoặc</p>
          <div className="flex justify-center items-center gap-6">
            <i>Đặt làm riêng món này?</i>
            <button className="rounded-[5px] bg-redError hover:bg-redErrorHover transition px-6 py-2 text-white font-medium uppercase">
              Đặt làm
            </button>
          </div>
        </div>

        <div id="preparation" className="mt-[30px]">
          <p className="font-semibold text-[20px]">Sơ chế:</p>

          <div className="preparation-content mt-[18px]">
            <div className="leading-7 text-[18px]">
              Thịt mua về ngâm trong nước muối pha loãng tầm 10 phút để làm sạch và khử mùi, sau đó vớt ra rửa sạch để
              ráo. Hoặc bạn cũng có thể chần qua thịt, rửa lại rồi để ráo nước. Theo kinh nghiệm của Homnayangi, việc
              chần qua giúp miếng thịt dễ thái hơn. Tuy nhiên, để thịt sống thì khi ướp sẽ thấm vị hơn. Sau khi ráo
              nước, thái thịt thành từng khúc với kích cỡ tùy thích nhưng không nên nhỏ quá sẽ dễ bị nát trong quá trình
              kho. Thường thì khi nấu thịt kho tàu, người ta hay thái to bản, bề ngang tầm 2-3 đốt ngón tay còn độ dày
              khoảng 2 đốt ngón tay.
            </div>

            <div className="mt-[18px] text-center">
              <img
                className="w-full rounded-[5px] mb-[10px]"
                alt=""
                src="https://cookbeo.com/media/2020/11/thit-kho-tau/thumbnails/thai-thit-768.webp"
              />
              <i className="mt-[15px] text-center">Cắt thịt thành từng khúc vừa ăn (nguồn: cookbeo.com)</i>
            </div>

            <div className="leading-7 text-[18px] mt-10">
              Hành và tỏi bóc vỏ, ớt cắt làm đôi, cho tất cả vào cối. Cho vào cối 1 thìa cà phê muối, 1 thìa cà phê
              đường rồi giã nhuyễn.
            </div>

            <div className="mt-[18px] text-center">
              <img
                className="w-full rounded-[5px] mb-[10px]"
                alt=""
                src="https://cookbeo.com/media/2020/11/thit-kho-tau/thumbnails/gia-toi-ot-768.webp"
              />
              <i className="mt-[15px] text-center">Ướp thịt (nguồn: cookbeo.com)</i>
            </div>
          </div>
        </div>

        <div id="cooking" className="mt-[30px]">
          <p className="font-semibold text-[20px]">Cách chế biến:</p>

          <div className="cooking-content mt-[18px]">
            <div className="leading-7 text-[18px]">
              Trong lúc đợi thịt ngấm gia vị, cho trứng vào nồi luộc. Để trứng đậm và dễ bóc, cho vào nồi luộc 1 ít muối
              hạt. Để nhiệt độ bếp ở mức vừa phải, không nên quá lớn trứng dễ bị vỡ vỏ. Sau khi nước sôi, hạ bớt nhiệt
              độ xuống, để sôi liu riu trong 7-8 phút là trứng chín tới. Trứng luộc chín, để nguội rồi bóc vỏ, cho trứng
              vào bát riêng. Trứng luộc chín, để nguội rồi bóc vỏ, cho trứng vào bát riêng. Để trứng dễ bóc vỏ mà không
              bị nứt bên trong, trước khi bóc bạn dập nhẹ xung quanh viền quả, sau đó lột nhẹ nhàng lớp vỏ ra. Trứng các
              bạn để nguyên quả kho, khi ăn thì tách ra, tránh lòng đỏ bị tan ra hòa vào nước kho thịt. Món ăn này với
              người miền Nam xưa hay ăn vào dịp Tết, với miếng thịt được thái to vuông vắn, trong khi hột vịt to tròn
              vành vạnh mang ý nghĩa "vuông tròn đều đặn, mọi sự bình an" cho 1 năm mới. Để làm thịt kho tàu, bạn dùng
              trứng vịt, trứng gà hay trứng cút đều được. Nhưng phổ biến nhất vẫn là trứng vịt bởi vì trứng vịt lòng
              trắng trứng có độ trong, dai, rất thích hợp để kho.
            </div>

            <div className="my-[18px] text-center">
              <img
                className="w-full rounded-[5px] mb-[10px]"
                alt=""
                src="https://cookbeo.com/media/2020/11/thit-kho-tau/thumbnails/xao-thit-768.webp"
              />
              <i className="mt-[15px] text-center">Xào thịt (nguồn: cookbeo.com)</i>
            </div>

            <div className="leading-7 text-[18px]">
              Cho 2 thìa canh dầu ăn vào nồi. Làm nóng dầu thì mình đổ thịt vào, đảo đều ở lửa vừa, mục đích để làm xém
              cạnh và săn chắc miếng thịt, giúp cho thịt lát nữa có kho lâu cũng không bị bở, nát miếng. Kho thịt lần 1:
              Khi thịt săn lại thì các bạn đổ hết phần nước ướp thịt cùng với 900ml nước dừa vào. Về lượng nước dừa thì
              các bạn cứ áng chừng sao cho ngập mặt thịt là được.
            </div>

            <div className="my-[18px] text-center">
              <img
                className="w-full rounded-[5px] mb-[10px]"
                alt=""
                src="https://cookbeo.com/media/2020/11/thit-kho-tau/thumbnails/kho-thit-lan-1-768.webp"
              />
              <i className="mt-[15px] text-center">Kho thịt lần 1 với nước dừa (nguồn: cookbeo.com)</i>
            </div>

            <div className="leading-7 text-[18px]">
              Để ở lửa vừa thôi, đợi đến khi nước kho thịt sôi thì mình hớt bỏ bọt, sau đó hạ nhỏ lửa xuống, để sôi liu
              riu, kho thịt trong khoảng 30-35 phút. Để thịt được trong, không bị đục thì mình không đậy nắp nồi, thay
              vào đó sẽ sử dụng 1 miếng lá chuối hoặc là lá mít cũng được, rửa sạch sẽ sau đó phủ lên trên bề mặt thịt.
              Lá chuối vừa thơm, vừa có tác dụng hút các chất bọt bẩn, giúp cho nước kho thịt trong hơn. Ngoài ra, vì sử
              dụng nước dừa nên các bạn cần phải chú ý đến nhiệt độ 1 chút, mình không nên để lửa quá lớn, dễ khiến nước
              kho thịt bị đục mà miếng thịt cũng sẽ bị đậm màu hơn vì trong dừa có nước đường.
            </div>
          </div>
        </div>

        <div id="completion" className="mt-[30px]">
          <p className="font-semibold text-[20px]">Thành phẩm:</p>
          <div className="completion-content mt-[18px]">
            <div className="leading-7 text-[18px]">
              Miếng thịt kho mềm rục có màu trắng trong của lớp mỡ và đỏ au của thịt nạc, màu nâu cánh gián bóng bẩy của
              lớp bì heo hầm nhừ, màu nước đường vàng đậm, sóng sánh, hương vị thơm ngon, bùi bùi ngầy ngậy.
            </div>

            <div className="my-[18px] text-center">
              <img
                className="w-full rounded-[5px] mb-[10px]"
                alt=""
                src="https://cookbeo.com/media/2020/11/thit-kho-tau/thumbnails/mon-thit-kho-tau-ngon-768.webp"
              />
              <i className="mt-[15px] text-center">(nguồn: cookbeo.com)</i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainBlog;
