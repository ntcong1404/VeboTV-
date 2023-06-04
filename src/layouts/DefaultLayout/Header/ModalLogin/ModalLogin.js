import PropTypes from "prop-types";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "react-modal";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/compat/app";

import Button from "../../../../components/Button";
import styles from "./ModalLogin.module.scss";
import config from "../../../../config";
import {
  faArrowRight,
  faClose,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { UserAuth } from "../../../../context/AuthContext";
import { auth } from "../../../../firebase/firebase";

const cx = classNames.bind(styles);

const uiConfig = {
  signInFlow: "popup",
  signInSuccessUrl: "/",
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
};

function ModalLogin({ showModal, setShowModal }) {
  const navigate = useNavigate();
  const { signIn } = UserAuth();

  const [loading, setLoading] = useState(false);
  const [mailValue, setMailValue] = useState("");
  const [passValue, setPassValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChangeEmail = (e) => {
    const valueMail = e.target.value;
    setMailValue(valueMail);
  };
  const handleChangePass = (e) => {
    const valuePass = e.target.value;
    setPassValue(valuePass);
  };

  const handleLogIn = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await signIn(mailValue, passValue)
        .then(() => {
          setLoading(false);
          setShowModal(!showModal);
        })
        .catch((error) => setErrorMessage(error.code));
    } catch (error) {
      console.log(error);
    }
  };

  const handleNextPageRegister = () => {
    navigate(config.routes.register);
  };

  return (
    <Modal
      isOpen={showModal}
      onRequestClose={() => setShowModal(!showModal)}
      ariaHideApp={false}
      overlayClassName={cx("overlay")}
      className={cx("modal")}
    >
      <div className={cx("close")} onClick={() => setShowModal(!showModal)}>
        <FontAwesomeIcon className={cx("icon-close")} icon={faClose} />
      </div>
      <div className={cx("noti-gr")}>
        {errorMessage === "auth/wrong-password" ? (
          <p className={cx("noti-err")}>Vui lòng nhập đúng mật khẩu</p>
        ) : errorMessage === "auth/user-not-found" ? (
          <p className={cx("noti-err")}>Không tìm thấy người dùng</p>
        ) : errorMessage === "auth/invalid-email" ? (
          <p className={cx("noti-err")}>Email không hợp lệ</p>
        ) : errorMessage === "auth/missing-password" ? (
          <p className={cx("noti-err")}>Thiếu mật khẩu</p>
        ) : (
          <></>
        )}
      </div>
      <div className={cx("title")}>
        <h2>Chào huynh đài</h2>
        <p>
          Huynh đài cần đăng nhập để tham gia bình luận và sử dụng các tính năng
          nâng cao nhé.
        </p>
      </div>
      <div className={cx("form-box")}>
        <div className={cx("input-box")}>
          <input
            value={mailValue}
            onChange={handleChangeEmail}
            type="email"
            placeholder="Email..."
          />
        </div>
        <div className={cx("input-box")}>
          <input
            value={passValue}
            onChange={handleChangePass}
            type="password"
            placeholder="Password..."
          />
        </div>
        <Button text className={cx("btn", "login")} onClick={handleLogIn}>
          Đăng nhập
          {loading && (
            <FontAwesomeIcon className={cx("loading")} icon={faSpinner} />
          )}
        </Button>
        <Button
          text
          className={cx("btn", "register")}
          onClick={handleNextPageRegister}
          rightIcon={<FontAwesomeIcon icon={faArrowRight} />}
        >
          Đăng ký mới
        </Button>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
      </div>
    </Modal>
  );
}

ModalLogin.propTypes = {
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
};

export default ModalLogin;
