import { useEffect, useState } from "react";
import Modal from "react-modal";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from "@tippyjs/react/headless";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  faArrowRight,
  faChevronDown,
  faClose,
  faFutbolBall,
  faRightFromBracket,
  faSpinner,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import * as Service from "../../../apiService/Service";
import images from "../../../assets/images";
import Image from "../../../components/Image";
import styles from "./Header.module.scss";
import config from "../../../config";
import Button from "../../../components/Button";
// import Modal from "./Modal";

const cx = classNames.bind(styles);

const userMenu = [
  {
    icon: <FontAwesomeIcon icon={faUser} />,
    title: "Tài khoản",
    to: "/profile",
  },
  {
    icon: <FontAwesomeIcon icon={faRightFromBracket} />,
    title: "Đăng xuất",
    to: "/",
    logOut: true,
  },
];

function Header() {
  const navigate = useNavigate();

  const [mailValue, setMailValue] = useState("");
  const [passValue, setPassValue] = useState("");

  const [currentUser, setCurrentUser] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [leagues, setLeagues] = useState([]);

  // loading cho button dang nhap
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Service.Leagues()
      .then((data) => {
        setLeagues(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleClickMenu = (slug, id) => {
    navigate(`/league/${slug}/${id}`);
  };

  const renderLeague = (attrs) => (
    <div className={cx("league-list")} tabIndex="-1" {...attrs}>
      {leagues.map((league) => (
        <div
          className={cx("league-item")}
          key={league.unique_ids.default}
          onClick={() =>
            handleClickMenu(league.slug, league.unique_ids.default)
          }
        >
          <div>{league.name}</div>
        </div>
      ))}
    </div>
  );

  const renderUserMenu = (attrs) => (
    <div className={cx("userMenu-list")} tabIndex="-1" {...attrs}>
      {userMenu.map((item, index) => (
        <NavLink
          className={cx("userMenu-item")}
          key={index}
          to={item.to}
          onClick={() => {
            if (item.logOut === true) {
              setCurrentUser(false);
            }
          }}
        >
          <div className={cx("icon")}>{item.icon}</div>
          <div className={cx("title")}>{item.title}</div>
        </NavLink>
      ))}
    </div>
  );

  const handleChangeEmail = (e) => {
    const valueMail = e.target.value;
    if (!valueMail.startswith(" ")) {
      setMailValue(valueMail);
    }
  };
  const handleChangePass = (e) => {
    const valuePass = e.target.value;
    if (!valuePass.startswith(" ")) {
      setPassValue(valuePass);
    }
  };

  const handleLogIn = () => {
    setCurrentUser(!currentUser);
    setShowModal(!showModal);
  };

  return (
    <header className={cx("wrapper")}>
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
        <div className={cx("title")}>
          <h2>Chào huynh đài</h2>
          <p>
            Huynh đài cần đăng nhập để tham gia bình luận và sử dụng các tính
            năng nâng cao nhé.
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
            to={config.routes.register}
            rightIcon={<FontAwesomeIcon icon={faArrowRight} />}
          >
            Đăng ký mới
          </Button>
        </div>
      </Modal>
      <div className={cx("inner")}>
        <div className={cx("logo-link")}>
          <Link to={config.routes.home}>
            <Image
              className={cx("logo")}
              src={images.logo}
              alt={images.noImage}
            />
          </Link>
        </div>
        <div className={cx("actions")}>
          <NavLink
            className={(nav) => cx("action-item", { active: nav.isActive })}
            to={config.routes.home}
          >
            Trực Tiếp
          </NavLink>

          <Tippy
            interactive
            zIndex={10}
            delay={[0, 300]}
            offset={[290, 4]}
            placement="bottom-end"
            render={renderLeague}
          >
            <NavLink className={cx("action-item")}>
              Giải Đấu
              <FontAwesomeIcon className={cx("icon")} icon={faChevronDown} />
            </NavLink>
          </Tippy>

          <NavLink
            className={(nav) => cx("action-item", { active: nav.isActive })}
            to={config.routes.result}
          >
            Kết Quả
          </NavLink>
          <NavLink
            className={(nav) => cx("action-item", { active: nav.isActive })}
            to={config.routes.schedule}
          >
            Lịch Thi Đấu
          </NavLink>
          <NavLink
            className={(nav) => cx("action-item", { active: nav.isActive })}
            to={config.routes.news}
          >
            Tin Tức
          </NavLink>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            primary
            large
            href="https://nbet.fun/"
            leftIcon={<FontAwesomeIcon icon={faFutbolBall} />}
          >
            {"Đặt cược"}
          </Button>
          {currentUser ? (
            <Tippy
              interactive
              zIndex={10}
              placement="bottom-end"
              render={renderUserMenu}
            >
              <Image
                className={cx("user-avatar")}
                alt="NTCong"
                // có API sẽ gọi lấy ra user rồi render ra
                src={images.user}
              />
            </Tippy>
          ) : (
            <Button user xsmall onClick={() => setShowModal(!showModal)}>
              {<FontAwesomeIcon className={cx("icon-user")} icon={faUser} />}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
