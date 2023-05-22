import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

import styles from "./Register.module.scss";
import Image from "../../components/Image";
import Button from "../../components/Button";
import images from "../../assets/images";
import config from "../../config";

const cx = classNames.bind(styles);

function Register() {
  const onChange = (value) => {
    console.log("Captcha value:", value);
  };

  return (
    <div className={cx("container")}>
      <div className={cx("photo")}>
        <Image
          src={images.register}
          alt={images.noImage}
          className={cx("image")}
        />
      </div>
      <div className={cx("main")}>
        <Link to={config.routes.home}>
          <Image
            src={images.logo}
            alt={images.noImage}
            className={cx("logo")}
          />
        </Link>
        <div className={cx("description")}>
          Mời bạn tham gia Vebotv. Hãy chia sẻ những trải nghiệm của bạn để
          Vebotv hoàn thiện hơn.
        </div>
        <div className={cx("register-form")}>
          <input type="text" placeholder="Tên hiển thị" required />
          <input type="email" placeholder="Email đăng ký" required />
          <input type="email" placeholder="Nhập lại email" required />
          <input type="password" placeholder="Mật khẩu" required />
          <input type="password" placeholder="Nhập lại mật khẩu" required />
        </div>
        <div className={cx("checkbox")}>
          <input type="checkbox" />
          <label>I agree to the terms and conditions</label>
        </div>
        <div className={cx("capcha")}>
          {/* tối ưu và validate sau */}
          <ReCAPTCHA
            sitekey="6LfHIeglAAAAAA1LUDYoeHSKluKoiw8oRQppSIZ2"
            onChange={onChange}
          />
        </div>
        <Button primary to={"/"} className={cx("btn")}>
          Đăng ký mới
        </Button>
      </div>
    </div>
  );
}

export default Register;
