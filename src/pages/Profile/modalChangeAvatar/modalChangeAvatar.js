import Modal from "react-modal";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faUpload } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

import { avatarClub, avatarPlayer } from "../../../assets/images/avatar";
import styles from "./modalChangeAvatar.module.scss";
import Button from "../../../components/Button";
import Image from "../../../components/Image";

const cx = classNames.bind(styles);

const listAvatar = [
  { title: "Cầu thủ", avatar: avatarPlayer },
  { title: "Câu lạc bộ", avatar: avatarClub },
];

function ModalChangeAvatar({
  showModalAvatar,
  setShowModalAvatar,
  setChooseAvatar,
}) {
  const [avatar, setAvatar] = useState([]);
  const [active, setActive] = useState(avatarPlayer);
  const [saveAvatar, setSaveAvatar] = useState(avatarPlayer[0].avatar);

  const handleAvatar = ({ item }) => {
    setActive(item.avatar);
  };

  const handleSaveAvatar = () => {
    // prop ngoai(saveAvatar)
    setChooseAvatar(saveAvatar);
    setShowModalAvatar(!showModalAvatar);
  };

  const handleChooseFileAvatar = (e) => {
    if (e.target.files && e.target.files[0]) {
      setChooseAvatar(URL.createObjectURL(e.target.files[0]));
      setShowModalAvatar(!showModalAvatar);
    }
  };

  useEffect(() => {
    setAvatar(active);
  }, [active]);

  return (
    <Modal
      isOpen={showModalAvatar}
      onRequestClose={() => setShowModalAvatar(!showModalAvatar)}
      ariaHideApp={false}
      overlayClassName={cx("overlay")}
      className={cx("modal")}
    >
      <div
        className={cx("close")}
        onClick={() => setShowModalAvatar(!showModalAvatar)}
      >
        <FontAwesomeIcon className={cx("icon-close")} icon={faClose} />
      </div>
      <div className={cx("title-edit-avatar")}>
        <div className={cx("title-avatar")}>Chọn avatar</div>
        <div className={cx("upload-avatar")}>
          <button className={cx("btn-upload")}>
            <FontAwesomeIcon className={cx("upload-icon")} icon={faUpload} />
            Upload
            <input
              type="file"
              accept="image/*"
              onChange={handleChooseFileAvatar}
            />
          </button>
        </div>
      </div>
      <div>
        <div className={cx("nav-list-avatar")}>
          {listAvatar.map((item, index) => (
            <div
              className={cx("nav-item-avatar", {
                active: active === item.avatar ? "active" : "",
              })}
              onClick={() => handleAvatar({ item, index })}
            >
              {item.title}
            </div>
          ))}
        </div>
      </div>

      <div className={cx("choose-avatar")}>
        {avatar.map((avatar, index) => (
          <div
            className={cx("avatar-item")}
            key={index}
            onClick={() => setSaveAvatar(avatar.avatar)}
          >
            <Image
              className={cx("avatar-img", {
                active: saveAvatar === avatar.avatar ? "choose" : "",
              })}
              key={index}
              src={avatar.avatar}
              alt=""
              loading="lazy"
            />
          </div>
        ))}
      </div>

      <Button text className={cx("btn-save")} onClick={handleSaveAvatar}>
        Lưu avatar
      </Button>
    </Modal>
  );
}

export default ModalChangeAvatar;
