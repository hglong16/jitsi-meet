import React from 'react';

const Footer = () => {
  return (
    <div className="footer d-flex justify-between">
      <div className='left'>
        <p className="footer__highlight">CƠ QUAN CỦA TÒA ÁN NHÂN DÂN TỐI CAO</p>
        <p>Trụ sở Tòa soạn: 262 Đội Cấn, Ba Đình, Hà Nội</p>
        <p>Giấy phép số 226/BTTTT do Bộ Thông tin và Truyền thông cấp</p>
      </div>
      <div className='right'>
        <p>
        Tổng Biên tập: <span className="footer__highlight">Trần Đức Vinh</span>
        </p>
        <p>
        Phó Tổng Biên tập: <span className="footer__highlight">Tô Thị Lan Phương</span>
        </p>
        <p>
        Phó Tổng Biên tập: <span className="footer__highlight">Nguyễn Thế Tâm</span>
        </p>
      </div>
    </div>
  );
};

export default Footer;
