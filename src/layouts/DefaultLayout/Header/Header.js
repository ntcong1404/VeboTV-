import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from "@tippyjs/react/headless";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  faChevronDown,
  faFutbolBall,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import "firebase/compat/auth";

import * as Service from "../../../apiService/Service";
import images from "../../../assets/images";
import Image from "../../../components/Image";
import styles from "./Header.module.scss";
import config from "../../../config";
import Button from "../../../components/Button";
import ModalLogin from "./ModalLogin";
import { UserAuth } from "../../../context/AuthContext";

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

  const { user, currentUser, logOut } = UserAuth();

  const [showModal, setShowModal] = useState(false);

  const [leagues, setLeagues] = useState([]);

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
              return handleLogOut();
            }
          }}
        >
          <div className={cx("icon")}>{item.icon}</div>
          <div className={cx("title")}>{item.title}</div>
        </NavLink>
      ))}
    </div>
  );

  const handleLogOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log();
    }
  };

  return (
    <header className={cx("wrapper")}>
      <ModalLogin showModal={showModal} setShowModal={setShowModal} />
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
          <div>
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
          </div>

          <NavLink
            className={(nav) => cx("action-item", { active: nav.isActive })}
            to={"/result"}
          >
            Kết Quả
          </NavLink>
          <NavLink
            className={(nav) => cx("action-item", { active: nav.isActive })}
            to={"/schedule"}
          >
            Lịch Thi Đấu
          </NavLink>
          <NavLink
            className={(nav) => cx("action-item", { active: nav.isActive })}
            to={"/news"}
          >
            Tin Tức
          </NavLink>
          <NavLink
            className={(nav) => cx("action-item", { active: nav.isActive })}
            to={"/highlight"}
          >
            Highlight
          </NavLink>
          <NavLink
            className={(nav) => cx("action-item", { active: nav.isActive })}
            to={"/scrutiny"}
          >
            Soi kèo
          </NavLink>
          <NavLink
            className={(nav) => cx("action-item", { active: nav.isActive })}
            to={"/replay"}
          >
            Xem lại
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
            <div>
              <Tippy
                interactive
                zIndex={10}
                placement="bottom-end"
                render={renderUserMenu}
              >
                <Image
                  className={cx("user-avatar")}
                  alt={user.displayName}
                  src={user.photoURL}
                />
              </Tippy>
            </div>
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
