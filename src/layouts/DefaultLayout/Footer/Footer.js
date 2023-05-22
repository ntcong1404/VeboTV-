import classNames from "classnames/bind";

import styles from "./Footer.module.scss";
import images from "../../../assets/images";
import Image from "../../../components/Image";

const cx = classNames.bind(styles);

function Footer() {
  return (
    <div className={cx("footer")}>
      <div className={cx("container")}>
        <div className={cx("copyright")}>
          <div className={cx("logo")}>
            <Image className={cx("logo-img")} src={images.logo} />
          </div>
          <div className={cx("content")}>Copyright © 2023 by VeboTV</div>
        </div>
        <div className={cx("menu")}>
          <div className={cx("list")}>
            <div className={cx("item")}>Về chúng tôi</div>
            <div className={cx("item")}>Chính sách</div>
            <div className={cx("item")}>Tin tức</div>
            <div className={cx("item")}>Liên hệ</div>
            <div className={cx("item")}>Điều khoản</div>
            <div className={cx("item")}>Thành viên</div>
          </div>
        </div>
        <div className={cx("about")}>
          <div className={cx("desc")}>
            Mọi trận đấu cho dù giải nhỏ cho tới các giải đấu lớn thì VeBoTV đều
            cung cấp đầy đủ link xem trực tiếp bóng đá online với độ phân giải
            và chất lượng cao nhất. Ngoài việc xem bóng đá trực tuyến, chúng tôi
            còn gửi tới bạn đọc lịch thi đấu bóng đá, kết quả bóng đá và soi kèo
            bóng đá với tỷ lệ chiến thắng cao. Chúc bạn đọc xem bóng đá vui vẻ
            và luôn ủng hộ VeBoTV
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
