import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import Tippy from "@tippyjs/react/headless";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./BoxChat.module.scss";
import { UserAuth } from "../../../context/AuthContext";
import Button from "../../../components/Button";
import {
  faArrowDown,
  faEllipsisV,
  faExclamation,
  faMessage,
  faTimes,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

const filter = [
  {
    title: "TOP CHAT",
    desc: "Featured messages",
  },
  {
    title: "LIVE CHAT",
    desc: "All messages are visible",
  },
];
const menu = [
  {
    icon: <FontAwesomeIcon icon={faUser} />,
    title: "Participants",
  },
  {
    icon: <FontAwesomeIcon icon={faTimes} />,
    title: "Toggle timestamps",
  },
  {
    icon: <FontAwesomeIcon icon={faExclamation} />,
    title: "Send feedback",
  },
];

function BoxChat() {
  const { user } = UserAuth();

  const [showChat, setShowChat] = useState(true);
  const [filterChat, setFilterChat] = useState(filter[0]);

  console.log(user);

  const renderFilterChat = (attrs) => (
    <div className={cx("filter-list")} tabIndex="-1" {...attrs}>
      {filter.map((item, index) => (
        <div
          key={index}
          className={cx("filter-item")}
          onClick={() => handleFilterChat(item)}
        >
          <h3>{item.title}</h3>
          <h4>{item.desc}</h4>
        </div>
      ))}
    </div>
  );
  const renderMenuChat = (attrs) => (
    <div className={cx("menu-list")} tabIndex="-1" {...attrs}>
      {menu.map((item, index) => (
        <div
          key={index}
          className={cx("menu-item")}
          onClick={() => handleMenuChat(item)}
        >
          <h3>{item.icon}</h3>
          <h4>{item.title}</h4>
        </div>
      ))}
    </div>
  );

  const handleFilterChat = (item) => {
    //thuc hien filter khi co data cua kenh chat
    setFilterChat(item);
    console.log(item);
  };
  const handleMenuChat = () => {
    console.log("menu chat");
  };

  return (
    <div className={cx("lf-right")}>
      <div className={cx("btn-chat")}>
        <Button live small onClick={() => setShowChat(!showChat)}>
          {showChat ? "Mở chat" : "Tắt chat"}
        </Button>
      </div>
      <div className={cx("chat-box")}>
        {showChat ? (
          <div className={cx("overlay-chat")}>
            <Button
              bet
              small
              leftIcon={<FontAwesomeIcon icon={faMessage} />}
              onClick={() => setShowChat(!showChat)}
            >
              Xem bình luận
            </Button>
          </div>
        ) : (
          <></>
        )}
        {!showChat ? (
          <>
            <div className={cx("cb-header")}>
              <div className={cx("top-chat")}>
                <Tippy
                  interactive
                  zIndex={10}
                  offset={[50, 4]}
                  placement="bottom-end"
                  render={renderFilterChat}
                >
                  <div className={cx("filter")}>
                    <div>{filterChat.title}</div>
                    <FontAwesomeIcon
                      className={cx("filter-icon")}
                      icon={faArrowDown}
                    />
                  </div>
                </Tippy>
              </div>
              <div className={cx("menu-chat")}>
                <Tippy
                  interactive
                  zIndex={10}
                  offset={[10, 10]}
                  placement="bottom-end"
                  render={renderMenuChat}
                >
                  <div className={cx("menu")}>
                    <FontAwesomeIcon
                      className={cx("menu-icon")}
                      icon={faEllipsisV}
                    />
                  </div>
                </Tippy>
              </div>
            </div>
            <div className={cx("cb-content")}></div>
            <div className={cx("cb-comment")}>
              <div className={cx("cm-avatar")}></div>
              <div className={cx("cm-name")}></div>
              <div className={cx("cm-input")}></div>
              <div className={cx("cm-icon")}></div>
              <div className={cx("cm-sent")}></div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default BoxChat;
