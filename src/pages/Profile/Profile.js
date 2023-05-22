import classNames from "classnames/bind";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faKey,
  faPen,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./Profile.module.scss";
import images from "../../assets/images";
import Image from "../../components/Image";
import { ModalPass } from "./modalChangePass";
import { ModalAvatar } from "./modalChangeAvatar";

import { NavLink } from "react-router-dom";

const cx = classNames.bind(styles);

function Profile() {
  const [name, setName] = useState("vd nntcong");
  const [value, setValue] = useState(name);
  const [startEdit, setStartEdit] = useState(false);

  const [showModalPass, setShowModalPass] = useState(false);
  const [showModalAvatar, setShowModalAvatar] = useState(false);

  const [chooseAvatar, setChooseAvatar] = useState(images.user);

  const handleSuccessEdit = () => {
    setName(value);
    setStartEdit(!startEdit);
  };

  const handleCancelEdit = () => {
    setValue(name);
    setStartEdit(!startEdit);
  };

  return (
    <div className={cx("wrapper")}>
      <ModalPass
        showModalPass={showModalPass}
        setShowModalPass={setShowModalPass}
      />
      <ModalAvatar
        setChooseAvatar={setChooseAvatar}
        showModalAvatar={showModalAvatar}
        setShowModalAvatar={setShowModalAvatar}
      />

      <div className={cx("container")}>
        <div className={cx("header")}>
          <h2>NTCong</h2>
          <div className={cx("navbar")}>
            <NavLink
              className={(nav) => cx("nav-item", { active: nav.isActive })}
              to={"#"}
            >
              Tài khoản
            </NavLink>
            {/* <NavLink
              className={(nav) => cx("nav-item", { active: nav.isActive })}
              to={config.routes.result}
            >
              Bảo mật
            </NavLink>
            <NavLink
              className={(nav) => cx("nav-item", { active: nav.isActive })}
              to={config.routes.schedule}
            >
              Quyền riêng tư
            </NavLink> */}
          </div>
        </div>
        <div className={cx("body")}>
          <div className={cx("input-group")}>
            <div className={cx("input-box")}>
              <label>Email đăng ký</label>
              <input
                className={cx("input-control")}
                type="email"
                value={"abc@gmail.com"}
                disabled={true}
              />
            </div>
            <div className={cx("input-box")}>
              <label>Tên hiển thị</label>
              <div className={cx("edit-name")}>
                <input
                  className={cx("input-control")}
                  type="text"
                  value={value}
                  disabled={!startEdit}
                  onChange={(e) => setValue(e.target.value)}
                />
                <div className={cx("btn-edit")}>
                  {startEdit ? (
                    <>
                      <FontAwesomeIcon
                        className={cx("btn-cancel")}
                        icon={faTimes}
                        onClick={handleCancelEdit}
                      />
                      <FontAwesomeIcon
                        className={cx("btn-success")}
                        icon={faCheck}
                        onClick={handleSuccessEdit}
                      />
                    </>
                  ) : (
                    <FontAwesomeIcon
                      className={cx("icon")}
                      icon={faPen}
                      onClick={() => setStartEdit(!startEdit)}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className={cx("input-box")}>
              <label>Ngày tham gia</label>
              <input
                className={cx("input-control")}
                type="text"
                value={"14/04/2023"}
                disabled={true}
              />
            </div>
            <div
              className={cx("input-box")}
              onClick={() => setShowModalPass(!showModalPass)}
            >
              <label>Mật khẩu</label>
              <div className={cx("edit-pass")}>
                <FontAwesomeIcon className={cx("icon")} icon={faKey} />
                <div className={cx("title")}>Đổi mật khẩu</div>
              </div>
            </div>
          </div>
          <div className={cx("avatar")}>
            <div
              className={cx("avatar-gr")}
              onClick={() => setShowModalAvatar(!showModalAvatar)}
            >
              <Image src={chooseAvatar} className={cx("image")} />
              <p className={cx("title")}>Đổi avatar</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Profile;
