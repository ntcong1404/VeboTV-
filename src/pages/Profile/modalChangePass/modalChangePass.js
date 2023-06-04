import PropTypes from "prop-types";
import Modal from "react-modal";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

import styles from "./modalChangePass.module.scss";
import Button from "../../../components/Button";

const cx = classNames.bind(styles);

function modalChangePass({ showModalPass, setShowModalPass }) {
  return (
    <Modal
      isOpen={showModalPass}
      onRequestClose={() => setShowModalPass(!showModalPass)}
      ariaHideApp={false}
      overlayClassName={cx("overlay")}
      className={cx("modal")}
    >
      <div
        className={cx("close")}
        onClick={() => setShowModalPass(!showModalPass)}
      >
        <FontAwesomeIcon className={cx("icon-close")} icon={faClose} />
      </div>
      <div className={cx("title-edit-pass")}>Đổi mật khẩu</div>
      <div className={cx("form-box")}>
        <div className={cx("input-box-pass")}>
          <label>Mật khẩu hiện tại</label>
          <input type="password" />
        </div>
        <div className={cx("input-box-pass")}>
          <label>Mật khẩu mới</label>
          <input type="password" />
        </div>
        <div className={cx("input-box-pass")}>
          <label>Nhập lại mật khẩu mới</label>
          <input type="password" />
        </div>
      </div>
      <Button text className={cx("btn-save")}>
        Lưu mật khẩu
      </Button>
    </Modal>
  );
}

modalChangePass.propTypes = {
  showModalPass: PropTypes.bool.isRequired,
  setShowModalPass: PropTypes.bool.isRequired,
};

export default modalChangePass;
