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
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getAuth, signOut } from "firebase/auth";

import * as Service from "../../../apiService/Service";
import images from "../../../assets/images";
import Image from "../../../components/Image";
import styles from "./Header.module.scss";
import config from "../../../config";
import Button from "../../../components/Button";
import ModalLogin from "./ModalLogin";
import "../../../firebase/firebase";

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

  const [currentUser, setCurrentUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [leagues, setLeagues] = useState([]);

  const auth = getAuth();

  // handle firebase auth change
  useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        console.log("user is not registered");
        return;
      }

      const token = await user.getIdToken();
      console.log(token);
      setCurrentUser(!!user);
    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, [auth]);

  // loading cho button dang nhap

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

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        setCurrentUser(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <header className={cx("wrapper")}>
      <ModalLogin
        showModal={showModal}
        setShowModal={setShowModal}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />
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
            to={"/result/Hôm nay"}
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
            to={"/news/page/1"}
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
